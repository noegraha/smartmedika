import { Button, FloatButton, Modal, message } from "antd";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { detectFaces } from "face-api.js";
import { CameraOutlined } from "@ant-design/icons";
const videoConstraints = {
  width: 600,
  height: 400,
  facingMode: "user",
  aspectRatio: 0.5,
};
const TestCamera = () => {
  const kirimPresensi = () => {
    message.info("Success!");
    console.log(imgSrc);
  };

  const webcamRef = useRef(null);
  const faceapiRef = useRef(null);
  const [isRecording, setIsRecording] = useState(true);
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);
  const [faces, setFaces] = useState([]);
  const detectFaces = async () => {
    const capture = await webcamRef.current.createCapture();
    const image = await capture.toDataURL();

    const faces = await detectFaces(image);

    setFaces(faces);
  };

  const startRecording = () => {
    setIsRecording(true);
    // Lakukan tindakan tambahan jika perlu
  };
  const stopRecording = () => {
    setIsRecording(false);
    capture();
    // Lakukan tindakan tambahan jika perlu
  };
  const onUserMedia = () => {
    // Callback saat media (kamera) diaktifkan
    if (isRecording) {
      // Lakukan tindakan tambahan jika perlu saat media aktif
    }
  };

  return (
    <div>
      <FloatButton
        icon={<CameraOutlined />}
        type="primary"
        onClick={() => setOpen(true)}
      />
      <Modal
        width={700}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        style={{ textAlign: "center" }}
      >
        {isRecording ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              mirrored={true}
              height={400}
              width={600}
              videoConstraints={videoConstraints}
              onUserMedia={onUserMedia}
            />
            <Button type="primary" onClick={stopRecording}>
              Rekam Foto
            </Button>
          </>
        ) : (
          <>
            {imgSrc && <img src={imgSrc} />}
            <Button onClick={startRecording}>Ambil Ulang Foto</Button>{" "}
            <Button onClick={() => kirimPresensi()} type="primary">
              Test Hasil
            </Button>
          </>
        )}
        {faces.map((face) => (
          <div key={face.faceId}>
            <img src={face.faceRectangle.toDataURL()} />
            <p>Face ID: {face.faceId}</p>
            <p>Confidence: {face.confidence}</p>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default TestCamera;
