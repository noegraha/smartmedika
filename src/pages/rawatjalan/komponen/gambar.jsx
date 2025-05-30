import React, { useRef, useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  Col,
  Form,
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
  UploadOutlined,
} from "@ant-design/icons";
import { GambarContext } from "../context/GambarContext";
import { PasienContext } from "../context/PasienContext";
const badan = require("../../../assets/img/body.png");
const gigi = require("../../../assets/img/gigi.jpeg");
const mata = require("../../../assets/img/mata.jpg");
const paru = require("../../../assets/img/paruparu.png");
const bidan = require("../../../assets/img/kebidanan.PNG");
const bedahsaraf = require("../../../assets/img/dermatome.PNG");
const Gambar = () => {
  const { gambar, insertGambar } = useContext(GambarContext);
  const { curpas } = useContext(PasienContext);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [undoSteps, setUndoSteps] = useState({});
  const [redoStep, setRedoStep] = useState({});

  const [undo, setUndo] = useState(0);
  const [redo, setRedo] = useState(0);
  const [warna, setWarna] = useState("red");
  const [tebal, setTebal] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);

  // const [binary, setBinary] = useState("");
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.lineCap = "round";
    context.strokeStyle = "red";
    context.lineWidth = 3;

    contextRef.current = context;

    // Panggil loadGambar dengan ruangId saat mount
    if (curpas?.ruangId) {
      loadGambar(curpas.ruangId);
    } else {
      // Load default image jika tidak ada ruangId
      const image = new Image();
      image.src = badan;
      image.onload = () => {
        context.drawImage(image, 0, 0, 600, 570);
      };
    }
  }, [curpas?.ruangId]); // Tambahkan dependency
  const loadGambar = (ruangId) => {
    let imageSrc;

    switch (ruangId) {
      case "9110":
      case "9167":
      case "9138":
      case "9135":
      case "91B4":
      case "91B5":
        imageSrc = gigi;
        break;
      case "9109":
      case "9166":
        imageSrc = mata;
        break;
      case "9115":
      case "9172":
        imageSrc = paru;
        break;
      case "9119":
      case "9176":
        imageSrc = bidan;
        break;
      case "9105":
        imageSrc = bedahsaraf;
        break;
      default:
        imageSrc = badan;
    }

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      if (contextRef.current) {
        contextRef.current.clearRect(0, 0, 600, 570); // Clear canvas first
        contextRef.current.drawImage(image, 0, 0, 600, 570);
      }
    };
  };

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
    const image = new Image();
    image.src = badan;
    image.onload = () => {
      contextRef.current.drawImage(image, 0, 0, 600, 570);
    };
    setUndo(0);
    setRedo(0);
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
      contextRef.current.drawImage(base_image, 0, 0);
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
    console.log(canvasRef.current.toDataURL().substr(22));
    console.log({
      registrasiId: curpas.registrasiId,
      gambar: canvasRef.current.toDataURL().substr(22),
    });
    // setBinary(canvasRef.current.toDataURL().substr(22));
    insertGambar({
      registrasiId: curpas.registrasiId,
      gambar: canvasRef.current.toDataURL().substr(22),
    });
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
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={18} xl={14}>
            <canvas
              style={{ border: "1px solid black", borderRadius: "4px" }}
              width="590px"
              height="570px"
              onMouseDown={startDrawing}
              onMouseUp={finishDrawing}
              onTouchStart={startDrawing}
              onTouchEnd={finishDrawing}
              onTouchMove={draw}
              onMouseMove={draw}
              ref={canvasRef}
            />
            {/* <img width={200} src={gambar} /> */}
          </Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={10}>
            <Space size={[8, 8]} wrap>
              <Button
                type="primary"
                onClick={() => loadGambar(curpas.ruangId)}
                style={{
                  backgroundColor: "#d48806",
                  borderColor: "transparent",
                }}
              >
                <DownloadOutlined /> Ambil Gambar Khusus
              </Button>
              <Button type="primary" onClick={save}>
                <SaveOutlined /> Simpan
              </Button>
              <Button
                type="primary"
                onClick={ambil}
                style={{
                  backgroundColor: "#7cb305",
                  borderColor: "transparent",
                }}
              >
                <UploadOutlined /> Load
              </Button>
              <Button
                style={{ background: "lightskyblue", borderColor: "lightblue" }}
                type="primary"
                onClick={clear}
              >
                <ClearOutlined /> Reset
              </Button>
              <Button disabled={undo === 0} onClick={undoLastOperation}>
                <UndoOutlined /> Undo
              </Button>
              <Button disabled={redo === 0} onClick={redoLastOperation}>
                <RedoOutlined /> Redo
              </Button>
            </Space>
            <Row>
              <Form.Item label="Tebal">
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
              </Form.Item>
            </Row>
            <Row>
              Warna :&nbsp;
              <SketchPicker
                color={warna}
                onChangeComplete={handleChangeComplete}
              />
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Gambar;
