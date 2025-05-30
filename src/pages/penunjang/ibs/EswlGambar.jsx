import { Ginjal } from "../../../assets/ginjal";
import React, { useRef, useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  Col,
  InputNumber,
  message,
  Row,
  Slider,
  Space,
} from "antd";
import { SketchPicker } from "react-color";
import {
  UndoOutlined,
  RedoOutlined,
  SaveOutlined,
  ClearOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import { ESWLContext } from "./context/ESWLContext";

const badan = ``;
const gambar = `${Ginjal}`;

const EswlGambar = () => {
  const { setGambar } = useContext(ESWLContext);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [undoSteps, setUndoSteps] = useState({});
  const [redoStep, setRedoStep] = useState({});

  const [undo, setUndo] = useState(0);
  const [redo, setRedo] = useState(0);
  const [warna, setWarna] = useState("red");
  const [tebal, setTebal] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    // canvas.width = window.innerWidth * 1;
    // canvas.height = window.innerHeight * 1;
    // canvas.style.width = `${window.innerWidth}px`;
    // canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    // context.scale(1, 1)
    context.lineCap = "round";
    context.strokeStyle = "red";
    context.lineWidth = 3;

    const image = new Image();
    image.src = badan;
    image.onload = () => {
      context.drawImage(image, 10, 10, 500, 550);
    };

    contextRef.current = context;
    // console.log(canvas.toDataURL());
  }, [gambar]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    const temp = {
      ...undoSteps,
      [undo + 1]: [],
    };
    temp[undo + 1].push({ offsetX, offsetY });
    setUndoSteps(temp);
    setUndo(undo + 1);
    contextRef.current.strokeStyle = warna;
    contextRef.current.lineWidth = tebal;
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clear = () => {
    contextRef.current.clearRect(0, 0, 550, 550);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    const temp = {
      ...undoSteps,
    };
    temp[undo].push({ offsetX, offsetY });
    setUndoSteps(temp);
  };

  const undoLastOperation = () => {
    if (undo > 0) {
      const data = undoSteps[undo];
      contextRef.current.strokeStyle = "white";
      contextRef.current.beginPath();
      contextRef.current.lineWidth = tebal + 1;
      contextRef.current.moveTo(data[0].offsetX, data[0].offsetY);
      data.forEach((item, index) => {
        if (index !== 0) {
          contextRef.current.lineTo(item.offsetX, item.offsetY);
          contextRef.current.stroke();
        }
      });
      contextRef.current.closePath();
      contextRef.current.strokeStyle = warna;
      const temp = {
        ...undoSteps,
        [undo]: [],
      };
      const te = {
        ...redoStep,
        [redo + 1]: [...data],
      };
      setUndo(undo - 1);
      setRedo(redo + 1);
      setRedoStep(te);
      setUndoSteps(temp);
    }
  };

  const redoLastOperation = () => {
    if (redo > 0) {
      const data = redoStep[redo];
      contextRef.current.strokeStyle = warna;
      contextRef.current.beginPath();
      contextRef.current.lineWidth = 3;
      contextRef.current.moveTo(data[0].offsetX, data[0].offsetY);
      data.forEach((item, index) => {
        if (index !== 0) {
          contextRef.current.lineTo(item.offsetX, item.offsetY);
          contextRef.current.stroke();
        }
      });
      contextRef.current.closePath();
      const temp = {
        ...redoStep,
        [redo]: [],
      };
      setUndo(undo + 1);
      setRedo(redo - 1);
      setRedoStep(temp);
      setUndoSteps({
        ...undoSteps,
        [undo + 1]: [...data],
      });
    }
  };

  const ambilGambar = () => {
    const base_image = new Image();
    base_image.src = gambar;
    base_image.onload = function () {
      contextRef.current.drawImage(base_image, 10, 10, 500, 550);
    };
  };

  const ambil = () => {
    if (gambar === null) {
      message.warning("Tidak ada gambar yang tersimpan");
    } else {
      ambilGambar();
    }
  };
  const save = () => {
    // console.log(canvasRef);
    // console.log(canvasRef.current.toDataURL());
    setGambar(canvasRef.current.toDataURL().substr(22));
    alert("simpan gambar berhasil");
    // fromposteswl({ gambar: canvasRef.current.toDataURL().substr(22)})
  };

  const handleChangeComplete = (color) => {
    setWarna(color.hex);
    console.log(color.hex);
  };

  return (
    <div>
      <Card
        size="small"
        title="Gambar"
        headStyle={{
          fontWeight: "bolder",
          backgroundColor: "rgb(69, 203, 221)",
        }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Row>
          <Col span={13}>
            <canvas
              style={{ border: "1px solid black", borderRadius: "4px" }}
              width="520px"
              height="540px"
              onMouseDown={startDrawing}
              onMouseUp={finishDrawing}
              onTouchStart={startDrawing}
              onTouchEnd={finishDrawing}
              onTouchMove={draw}
              onMouseMove={draw}
              ref={canvasRef}
            />
            {/* <img width={200} src={Ginjal} /> */}
          </Col>
          <Col span={8}>
            <Space>
              <Button type="primary" onClick={save}>
                <SaveOutlined /> Simpan
              </Button>
              <Button type="primary" onClick={ambil}>
                <DownloadOutlined /> Ambil
              </Button>
              <Button type="primary" onClick={clear}>
                <ClearOutlined /> Clear
              </Button>
            </Space>
            <br />
            <br />
            <Row>
              <Button disabled={undo === 0} onClick={undoLastOperation}>
                <UndoOutlined /> Undo
              </Button>
              <Button disabled={redo === 0} onClick={redoLastOperation}>
                <RedoOutlined /> Redo
              </Button>
            </Row>
            <br />
            <br />
            <Row>
              Tebal :
              <Slider
                style={{ width: 150 }}
                min={1}
                max={20}
                onChange={(e) => setTebal(e)}
                value={typeof tebal === "number" ? tebal : 0}
              />
              <InputNumber
                min={1}
                max={20}
                style={{ margin: "0 16px" }}
                value={tebal}
                onChange={(e) => setTebal(e)}
              />
            </Row>
            <br />
            <br />
            <Row>
              Warna :&nbsp;
              <SketchPicker
                color={warna}
                onChangeComplete={handleChangeComplete}
              />
            </Row>
            {/* <TextArea rows={20} value={binary}></TextArea> */}
          </Col>
        </Row>
      </Card>
      {/* <Draw /> */}
    </div>
  );
};

export default EswlGambar;
