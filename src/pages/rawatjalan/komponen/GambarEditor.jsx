import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Button, Col, Row, Space, Tooltip } from "antd";
import { UndoOutlined, RedoOutlined, ClearOutlined } from "@ant-design/icons";
import { PasienContext } from "../context/PasienContext";
import { GambarContext } from "../context/GambarContext";
import bedahsaraf from "../../../assets/img/dermatome.PNG";
import badan from "../../../assets/img/body.png";
import gigi from "../../../assets/img/gigi.jpeg";
import mata from "../../../assets/img/mata.jpg";
import paru from "../../../assets/img/paruparu.png";
import anak from "../../../assets/img/denver.png";
import bidan from "../../../assets/img/kebidanan.PNG";
const SimpleImageEditor = () => {
  const { curpas, poli1 } = useContext(PasienContext);
  const { insertGambar, gambar } = useContext(GambarContext);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen"); // pen, rect, circle, text, select
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [textInput, setTextInput] = useState("");
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [showTextInput, setShowTextInput] = useState(false);

  // Shape preview state
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [previewShape, setPreviewShape] = useState(null);

  // Selectable elements
  const [elements, setElements] = useState([]);
  const [selectedElementIndex, setSelectedElementIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // History for undo/redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Image paths
  // const bedahsaraf = require("../../../assets/img/dermatome.PNG");
  // const badan = require("../../../assets/img/body.png");
  // const gigi = require("../../../assets/img/gigi.jpeg");
  // const mata = require("../../../assets/img/mata.jpg");
  // const paru = require("../../../assets/img/paruparu.png");
  // const anak = require("../../../assets/img/denver.png");
  // const bidan = require("../../../assets/img/kebidanan.PNG");

  // Add image caching
  const [imageCache, setImageCache] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Get default image based on poli1
  const getDefaultImage = useCallback(() => {
    if (poli1 === "9105" || poli1 === "9163") return bedahsaraf;
    if (["9110", "9167", "9138", "9135", "91B4", "91B5"].includes(poli1))
      return gigi;
    if (["9115", "9172"].includes(poli1)) return paru;
    if (["9119", "9176"].includes(poli1)) return bidan;
    if (["9109", "9166", "9148", "91A1"].includes(poli1)) return mata;
    if (poli1 === "9144") return anak;
    return badan;
  }, [poli1]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
        drawElements();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isValidImage = (imagePath) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imagePath;
    });
  };

  // Initialize canvas and load image
  useEffect(() => {
    const loadImage = async () => {
      try {
        setLoading(true);
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;

        const imagePath = gambar || getDefaultImage();

        const image = new Image();
        image.crossOrigin = "anonymous";

        await new Promise((resolve, reject) => {
          image.onload = resolve;
          image.onerror = reject;
          image.src = imagePath;
        });

        setImageCache((prev) => ({ ...prev, [imagePath]: image }));

        const initialElements = [
          {
            type: "image",
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height,
            source: imagePath,
          },
        ];

        setElements(initialElements);
        setHistory([initialElements]);
        setHistoryIndex(0);
        setIsImageLoaded(true);
      } catch (err) {
        console.error("Failed to load image:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [gambar, poli1]);

  // Draw all elements to canvas
  const drawElements = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar semua elemen (sinkron)
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (element.type === "image") {
        const img = imageCache[element.source];
        if (img) {
          context.drawImage(
            img,
            element.x,
            element.y,
            element.width,
            element.height
          );
        }
      } else if (element.type === "pen") {
        context.beginPath();
        context.lineWidth = element.lineWidth;
        context.strokeStyle = element.color;
        context.lineCap = "round";

        element.points.forEach((point, j) => {
          if (j === 0) {
            context.moveTo(point.x, point.y);
          } else {
            context.lineTo(point.x, point.y);
          }
        });
        context.stroke();
      } else if (element.type === "rect") {
        context.beginPath();
        context.lineWidth = element.lineWidth;
        context.strokeStyle = element.color;
        context.strokeRect(element.x, element.y, element.width, element.height);
      } else if (element.type === "circle") {
        context.beginPath();
        context.lineWidth = element.lineWidth;
        context.strokeStyle = element.color;
        context.arc(element.x, element.y, element.radius, 0, 2 * Math.PI);
        context.stroke();
      } else if (element.type === "text") {
        context.font = "20px Arial";
        context.fillStyle = element.color;
        context.fillText(element.text, element.x, element.y);
      }

      // Jika dipilih, gambar border seleksi
      if (i === selectedElementIndex && element.type !== "image") {
        context.setLineDash([5, 5]);
        context.strokeStyle = "#0095ff";
        context.lineWidth = 1;

        if (element.type === "circle") {
          context.strokeRect(
            element.x - element.radius,
            element.y - element.radius,
            element.radius * 2,
            element.radius * 2
          );
        } else if (element.type === "pen") {
          let minX = Infinity,
            minY = Infinity,
            maxX = 0,
            maxY = 0;
          element.points.forEach((point) => {
            minX = Math.min(minX, point.x);
            minY = Math.min(minY, point.y);
            maxX = Math.max(maxX, point.x);
            maxY = Math.max(maxY, point.y);
          });
          context.strokeRect(
            minX - 5,
            minY - 5,
            maxX - minX + 10,
            maxY - minY + 10
          );
        } else if (element.type === "text") {
          const textWidth = context.measureText(element.text).width;
          context.strokeRect(element.x - 5, element.y - 25, textWidth + 10, 30);
        } else {
          context.strokeRect(
            element.x - 5,
            element.y - 5,
            element.width + 10,
            element.height + 10
          );
        }

        context.setLineDash([]);
      }
    }

    // Gambar bentuk sementara (preview)
    if (isDrawing && previewShape) {
      context.beginPath();
      context.lineWidth = lineWidth;
      context.strokeStyle = color;

      if (previewShape.type === "rect") {
        context.strokeRect(
          previewShape.x,
          previewShape.y,
          previewShape.width,
          previewShape.height
        );
      } else if (previewShape.type === "circle") {
        context.arc(
          previewShape.x,
          previewShape.y,
          previewShape.radius,
          0,
          2 * Math.PI
        );
        context.stroke();
      }
    }
  }, [
    elements,
    imageCache,
    selectedElementIndex,
    isDrawing,
    previewShape,
    lineWidth,
    color,
  ]);

  // Update canvas whenever elements or preview changes
  useEffect(() => {
    drawElements();
  }, [elements, previewShape, selectedElementIndex]);

  // Helper function to save state to history
  const saveToHistory = (newElements) => {
    // Batch the updates to prevent multiple re-renders
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newElements]);

    // Update all state at once
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Get cursor position relative to canvas
  const getCursorPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  // Check if point is inside an element (for selection)
  const isPointInElement = (x, y, element) => {
    if (element.type === "rect" || element.type === "image") {
      return (
        x >= element.x &&
        x <= element.x + element.width &&
        y >= element.y &&
        y <= element.y + element.height
      );
    } else if (element.type === "circle") {
      const dx = x - (element.x + element.radius);
      const dy = y - (element.y + element.radius);
      return Math.sqrt(dx * dx + dy * dy) <= element.radius;
    } else if (element.type === "text") {
      // Approximate text width
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const textWidth = context.measureText(element.text).width;

      return (
        x >= element.x &&
        x <= element.x + textWidth &&
        y >= element.y - 20 &&
        y <= element.y
      );
    } else if (element.type === "pen") {
      // Check if point is near any point in the path
      // Simplified approach: check if within bounding box
      let minX = Infinity,
        minY = Infinity,
        maxX = 0,
        maxY = 0;
      element.points.forEach((point) => {
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
      });

      return x >= minX - 5 && x <= maxX + 5 && y >= minY - 5 && y <= maxY + 5;
    }

    return false;
  };

  // Find element under cursor (for selection)
  const getElementAtPosition = (x, y) => {
    // Check elements in reverse order (top-to-bottom visually)
    for (let i = elements.length - 1; i >= 0; i--) {
      // Skip background image
      if (elements[i].type === "image" && i === 0) continue;

      if (isPointInElement(x, y, elements[i])) {
        return i;
      }
    }

    return -1;
  };

  const startDrawing = (e) => {
    if (!isImageLoaded) return;
    const pos = getCursorPosition(e);

    if (tool === "select") {
      const elementIndex = getElementAtPosition(pos.x, pos.y);
      setSelectedElementIndex(elementIndex);

      if (elementIndex !== -1) {
        setIsDragging(true);
        const element = elements[elementIndex];
        setDragOffset({
          x: pos.x - element.x,
          y: pos.y - element.y,
        });
      }
      return;
    }

    setSelectedElementIndex(-1);

    if (tool === "text") {
      setTextPosition(pos);
      setShowTextInput(true);
      return;
    }

    setStartPos(pos);
    setIsDrawing(true);

    if (tool === "pen") {
      const newElement = {
        type: "pen",
        points: [pos],
        color: color,
        lineWidth: lineWidth,
      };

      const newElements = [...elements, newElement];
      setElements(newElements);
      // Don't save to history yet since we're still drawing
    } else if (tool === "rect" || tool === "circle") {
      if (tool === "rect") {
        setPreviewShape({
          type: "rect",
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0,
        });
      } else {
        setPreviewShape({
          type: "circle",
          x: pos.x,
          y: pos.y,
          radius: 0,
        });
      }
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const pos = getCursorPosition(e);

    if (tool === "pen") {
      setElements((prevElements) => {
        const lastElement = { ...prevElements[prevElements.length - 1] };
        const newPoint = { x: pos.x, y: pos.y };
        lastElement.points = [...lastElement.points, newPoint];

        return [...prevElements.slice(0, -1), lastElement];
      });
    } else if (tool === "rect") {
      setPreviewShape({
        type: "rect",
        x: Math.min(startPos.x, pos.x),
        y: Math.min(startPos.y, pos.y),
        width: Math.abs(pos.x - startPos.x),
        height: Math.abs(pos.y - startPos.y),
      });
    } else if (tool === "circle") {
      // Calculate radius from center point to current position
      const dx = pos.x - startPos.x;
      const dy = pos.y - startPos.y;
      const radius = Math.sqrt(dx * dx + dy * dy);

      // Set preview to keep center at startPos
      setPreviewShape({
        type: "circle",
        x: startPos.x,
        y: startPos.y,
        radius: radius,
      });
    }
  };

  const handleDrag = (e) => {
    if (!isDragging || selectedElementIndex === -1) return;

    const pos = getCursorPosition(e);

    setElements((prevElements) => {
      const newElements = [...prevElements];
      const element = { ...newElements[selectedElementIndex] };

      const newX = pos.x - dragOffset.x;
      const newY = pos.y - dragOffset.y;

      if (element.type === "pen") {
        // Move all points
        const dx = newX - element.points[0].x;
        const dy = newY - element.points[0].y;

        element.points = element.points.map((point) => ({
          x: point.x + dx,
          y: point.y + dy,
        }));
      } else {
        element.x = newX;
        element.y = newY;
      }

      newElements[selectedElementIndex] = element;
      return newElements;
    });
  };

  // When drag finishes, save to history
  const finishDrag = () => {
    if (isDragging) {
      saveToHistory([...elements]);
      setIsDragging(false);
    }
  };

  const finishDrawing = (e) => {
    if (!isDrawing && !isDragging) return;

    if (isDragging) {
      finishDrag();
      return;
    }

    const pos = getCursorPosition(e);

    if (tool === "rect" || tool === "circle") {
      let newElement;
      if (tool === "rect") {
        newElement = {
          type: "rect",
          x: Math.min(startPos.x, pos.x),
          y: Math.min(startPos.y, pos.y),
          width: Math.abs(pos.x - startPos.x),
          height: Math.abs(pos.y - startPos.y),
          color: color,
          lineWidth: lineWidth,
        };
      } else {
        // Circle
        const dx = pos.x - startPos.x;
        const dy = pos.y - startPos.y;
        const radius = Math.sqrt(dx * dx + dy * dy);

        newElement = {
          type: "circle",
          x: startPos.x,
          y: startPos.y,
          radius: radius,
          color: color,
          lineWidth: lineWidth,
        };
      }

      const newElements = [...elements, newElement];
      setElements(newElements);
      saveToHistory(newElements);
      setPreviewShape(null);
    } else if (tool === "pen") {
      // Save the completed pen stroke to history
      saveToHistory([...elements]);
    }

    setIsDrawing(false);
  };

  const addText = () => {
    if (!textInput) {
      setShowTextInput(false);
      return;
    }

    const newText = {
      type: "text",
      x: textPosition.x,
      y: textPosition.y,
      text: textInput,
      color: color,
    };

    const newElements = [...elements, newText];
    setElements(newElements);
    saveToHistory(newElements);
    setTextInput("");
    setShowTextInput(false);
  };

  const handleCanvasLeave = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setPreviewShape(null);
    }

    if (isDragging) {
      setIsDragging(false);
    }
  };

  const deleteSelectedElement = () => {
    if (selectedElementIndex !== -1) {
      const newElements = elements.filter(
        (_, index) => index !== selectedElementIndex
      );
      setElements(newElements);
      saveToHistory(newElements);
      setSelectedElementIndex(-1);
    }
  };

  const clear = () => {
    // Keep only the base image or create a completely blank canvas
    const baseImage = elements.find((el) => el.type === "image");
    const newElements = baseImage ? [baseImage] : [];
    setElements(newElements);
    saveToHistory(newElements);
    setSelectedElementIndex(-1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
      setSelectedElementIndex(-1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
      setSelectedElementIndex(-1);
    }
  };

  const saveImageToDisk = () => {
    // Hide selection outline before saving
    const tempSelectedIndex = selectedElementIndex;
    setSelectedElementIndex(-1);

    // Wait for render with cleared selection
    setTimeout(() => {
      const canvas = canvasRef.current;
      const data = canvas.toDataURL("image/png");

      if (data) {
        console.log(data);
        insertGambar({
          registrasiId: curpas.registrasiId,
          gambar: data.substr(22),
        });
      }

      // Restore selection
      setSelectedElementIndex(tempSelectedIndex);
    }, 50);
  };

  useEffect(() => {
    return () => {
      // Cleanup cached images
      setImageCache({});
      // Reset states
      setElements([]);
      setHistory([]);
      setHistoryIndex(-1);
      setIsImageLoaded(false);
    };
  }, []);

  // if (loading) {
  //   return <div>Loading editor...</div>;
  // }

  // if (error) {
  //   return <div>Error loading image. Please try again.</div>;
  // }

  return (
    <div>
      <Row>
        <Col span={20}>
          <div
            ref={containerRef}
            className="editor-container"
            style={{
              position: "relative",
              width: "1000px",
              height: "600px",
            }}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={(e) => {
                if (isDrawing) draw(e);
                if (isDragging) handleDrag(e);
              }}
              onMouseUp={finishDrawing}
              onMouseLeave={handleCanvasLeave}
              style={{
                border: "1px solid #ccc",
                width: "100%",
                height: "100%",
                cursor: tool === "select" ? "move" : "crosshair",
              }}
            />

            {showTextInput && (
              <div
                style={{
                  position: "absolute",
                  left: textPosition.x,
                  top: textPosition.y,
                  zIndex: 10,
                }}
              >
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addText();
                  }}
                  autoFocus
                />
                <Button size="small" onClick={addText}>
                  Add
                </Button>
              </div>
            )}
          </div>

          <Row style={{ marginTop: "10px" }}>
            <Col span={24}>
              <Space wrap>
                {/* Drawing Tools */}
                <Space>
                  <Tooltip title="Selection Tool">
                    <Button
                      type={tool === "select" ? "primary" : "default"}
                      onClick={() => setTool("select")}
                    >
                      Select
                    </Button>
                  </Tooltip>
                  <Tooltip title="Draw Freehand">
                    <Button
                      type={tool === "pen" ? "primary" : "default"}
                      onClick={() => setTool("pen")}
                    >
                      Draw
                    </Button>
                  </Tooltip>
                  <Tooltip title="Draw Rectangle">
                    <Button
                      type={tool === "rect" ? "primary" : "default"}
                      onClick={() => setTool("rect")}
                    >
                      Rectangle
                    </Button>
                  </Tooltip>
                  <Tooltip title="Draw Circle">
                    <Button
                      type={tool === "circle" ? "primary" : "default"}
                      onClick={() => setTool("circle")}
                    >
                      Circle
                    </Button>
                  </Tooltip>
                  <Tooltip title="Add Text">
                    <Button
                      type={tool === "text" ? "primary" : "default"}
                      onClick={() => setTool("text")}
                    >
                      Text
                    </Button>
                  </Tooltip>
                </Space>

                {/* Style Controls */}
                <Space>
                  <Tooltip title="Color">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      style={{ width: "40px", height: "32px" }}
                    />
                  </Tooltip>
                  <Tooltip title="Line Width">
                    <select
                      value={lineWidth}
                      onChange={(e) => setLineWidth(parseInt(e.target.value))}
                      style={{ height: "32px" }}
                    >
                      <option value="1">Thin</option>
                      <option value="5">Medium</option>
                      <option value="10">Thick</option>
                    </select>
                  </Tooltip>
                </Space>

                {/* Action Controls */}
                <Space>
                  <Tooltip title="Undo">
                    <Button
                      icon={<UndoOutlined />}
                      onClick={undo}
                      disabled={historyIndex <= 0}
                    />
                  </Tooltip>
                  <Tooltip title="Redo">
                    <Button
                      icon={<RedoOutlined />}
                      onClick={redo}
                      disabled={historyIndex >= history.length - 1}
                    />
                  </Tooltip>
                  <Tooltip title="Clear All">
                    <Button icon={<ClearOutlined />} onClick={clear} />
                  </Tooltip>
                  {selectedElementIndex !== -1 &&
                    selectedElementIndex !== 0 && (
                      <Tooltip title="Delete Selected Element">
                        <Button danger onClick={deleteSelectedElement}>
                          Delete
                        </Button>
                      </Tooltip>
                    )}
                </Space>
                <Space>
                  <Button
                    type="primary"
                    className="button"
                    onClick={clear}
                    style={{
                      backgroundColor: "darkturquoise",
                      borderColor: "darkturquoise",
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    className="button"
                    onClick={saveImageToDisk}
                  >
                    Simpan Gambar
                  </Button>
                </Space>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SimpleImageEditor;
