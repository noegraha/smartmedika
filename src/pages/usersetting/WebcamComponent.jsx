import { Button, Modal, Spin, message } from "antd";
import React, { useContext, useRef, useState } from "react";
import Webcam from "react-webcam";
import { CameraOutlined } from "@ant-design/icons";
import axios from "axios";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import { CatatanmedisContext } from "../rawatjalan/context/CatatanmedisContext";
import dayjs from "dayjs";
import { LoginContext } from "../rawatjalan/context";
const videoConstraints = {
  width: 600,
  height: 400,
  facingMode: "user",
  aspectRatio: 0.5,
};
const WebcamComponent = () => {
  const { poli2 } = useContext(PasienContext);
  const {
    setTandaTangan,
    setVerified,
    setVerifiedTime,
    setModalOpen,
    setModalOpen1,
  } = useContext(CatatanmedisContext);
  const { namauser } = useContext(LoginContext);
  const apiku = sessionStorage.getItem("api");
  const ip = sessionStorage.getItem("IP");
  const namapet = sessionStorage.getItem("namapetugas");
  const [loading, setLoading] = useState(false);

  const kirimPresensi = () => {
    setLoading(true);
    const tok = sessionStorage.getItem("userData");
    const options = {
      headers: { Authorization: "Bearer " + tok },
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();

    formData.append("RuangId", poli2.split("+").shift()); // Replace with the actual value
    formData.append("RuangDeskripsi", poli2.split("+").pop()); // Replace with the actual username
    formData.append("IPComputer", ip); // Replace with the actual IP
    formData.append("image", files); // Append other JSON data to the FormData

    axios
      .post(`${apiku}/SisSendFile/SimpanPresensi`, formData, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success(
            <>
              Presensi berhasil. Terima kasih telah melakukan presensi. <br />{" "}
              Jangan Lupa Klik Simpan!
            </>
          );
          setOpen(false);
          setIsRecording(true);
          setLoading(false);
          setVerified(true);
          setTandaTangan(sessionStorage.getItem("ttd"));
          setVerifiedTime(dayjs().format("YYYY-MM-DDTHH:mm:ss"));
          setModalOpen(false);
          setModalOpen1(false);
          // simpanCatatanMedis();
        } else {
          message.warning(res.data.message);
          console.log(res.data);
          console.log(imgSrc);
          setLoading(false);
        }
      })
      .catch((err) => {
        message.warning("Presensi Gagal!");
        console.log(err);
        setLoading(false);
      });
  };

  const webcamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(true);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    function base64toFile(base64String, filename, mimeType) {
      // Remove the data:image/... prefix and convert to binary
      const binaryString = atob(base64String.split(",")[1]);

      // Create a Uint8Array from the binary string
      const arrayBuffer = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        arrayBuffer[i] = binaryString.charCodeAt(i);
      }

      // Create a Blob from the Uint8Array
      const blob = new Blob([arrayBuffer], { type: mimeType });

      // Create a File from the Blob
      const file = new File([blob], filename, { type: mimeType });

      return file;
    }
    const base64String = imageSrc;
    const filename = "example.jpg";
    const mimeType = "image/jpeg";

    const file = base64toFile(base64String, filename, mimeType);
    setFiles(file);
  }, [webcamRef, setImgSrc]);

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
      <Button
        icon={<CameraOutlined />}
        type="primary"
        onClick={() => setOpen(true)}
      >
        Capture
      </Button>
      <Modal
        width={700}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        style={{ textAlign: "center" }}
      >
        <Spin spinning={loading}>
          Nama : {namapet} | User : {namauser}
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
              {imgSrc && <img src={imgSrc} alt="foto" />}
              <Button onClick={startRecording}>Ambil Ulang Foto</Button>{" "}
              <Button onClick={() => kirimPresensi()} type="primary">
                Presensi
              </Button>
            </>
          )}
        </Spin>
      </Modal>
    </div>
  );
};

export default WebcamComponent;
