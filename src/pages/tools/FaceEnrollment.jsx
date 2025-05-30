import React, { useState, useRef, useEffect, useContext } from "react";
import { Button, Input, Modal, Tabs } from "antd";
import * as faceapi from "face-api.js";
import { LoginContext } from "../rawatjalan/context";
import dayjs from "dayjs";
import FaceRecognition from "./FaceRecognition";
import { MasterDokterContext } from "../master/context/MasterDokter/MasterDokterContext";
import axios from "axios";
const { TabPane } = Tabs;
const FaceEnrollment = ({ onEnrollmentSuccess }) => {
  const videoRef = useRef();
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [username, setUsername] = useState("");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const { pegawaiId, pegawai, namauser } = useContext(LoginContext);
  const {
    getEnrolDokter,
    insertEnrolDokter,
    enrollDokter,
    setenrollDokter,
    descriptorDokter,
    setdescriptorDokter,
  } = useContext(MasterDokterContext);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        console.log("Model berhasil dimuat");
        setIsModelLoaded(true);
      } catch (err) {
        console.error("Error loading models:", err);
      }
    };

    loadModels();

    return () => {
      if (isWebcamActive) {
        stopVideo();
      }
    };
  }, [isWebcamActive]);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setVideoStream(stream);
        setIsWebcamActive(true);
        console.log("Webcam berhasil dinyalakan");
      })
      .catch((err) => {
        console.error("Error accessing webcam: ", err);
        setIsWebcamActive(false);
      });
  };

  const stopVideo = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      setIsWebcamActive(false);
      setVideoStream(null);
      console.log("Webcam berhasil dimatikan");
    }
  };

  const handleEnroll = async () => {
    if (!isModelLoaded) {
      alert("Model belum siap!");
      return;
    }

    setIsEnrolling(true);

    try {
      const video = videoRef.current;
      const detections = await faceapi
        .detectSingleFace(video)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detections) {
        alert("Tidak ada wajah yang terdeteksi. Coba lagi.");
        setIsEnrolling(false);
        return;
      }

      // Ambil data deskriptor
      const descriptor = detections.descriptor;
      const user = {
        userId: namauser,
        deskriptor: Array.from(descriptor).join(","), // Konversi ke string
        dateEntry: dayjs().format("YYYY-MM-DDTHH:mm:ss"), // Format waktu
      };

      console.log("Enrollment berhasil:", user);

      // Capture gambar dari kamera
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Konversi gambar ke base64
      const imageBase64 = canvas.toDataURL("image/jpeg");

      // Gabungkan data user dengan gambar
      const userWithImage = { ...user, imageBase64 };

      // Simpan user ke server
      const response = await axios.post(
        `${apiku}/FaceRecognition/PostEnroll`,
        userWithImage,
        options
      );
      console.log(userWithImage);
      if (response.data.statusCode === 200) {
        console.log("Data enroll berhasil disimpan.");
        Modal.success({
          content: "Berhasil Simpan Data Enroll!",
        });
        // Refresh data setelah berhasil menyimpan
        await getEnrolDokter(user.userId);

        setEnrollmentSuccess(true);
        if (onEnrollmentSuccess) {
          onEnrollmentSuccess(user); // Callback jika ada
        }

        stopVideo(); // Matikan kamera
      } else {
        console.warn("Gagal menyimpan data enroll:", response.data);
        Modal.warning({
          content: "Gagal menyimpan data enroll!",
        });
      }
    } catch (err) {
      console.error("Error selama proses enroll:", err);
      Modal.error({
        content: "Terjadi Kesalahan Koneksi!",
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div>
      <h1>Enroll Wajah Baru</h1>
      <Button
        type="primary"
        onClick={startVideo}
        disabled={isWebcamActive || !isModelLoaded}
        style={{ marginBottom: "16px" }}
      >
        Nyalakan Webcam
      </Button>
      <Button
        onClick={stopVideo}
        disabled={!isWebcamActive}
        style={{ marginLeft: "8px", marginBottom: "16px" }}
      >
        Matikan Webcam
      </Button>
      <Button
        onClick={() => {
          getEnrolDokter(namauser);
        }}
        style={{ marginLeft: "8px", marginBottom: "16px" }}
      >
        GetEnrol
      </Button>
      {enrollmentSuccess && <p>Wajah berhasil didaftarkan untuk {username}!</p>}
      <div style={{ position: "relative", width: "640px", height: "480px" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <Button
        type="primary"
        onClick={handleEnroll}
        disabled={!isWebcamActive || isEnrolling}
        style={{ marginTop: "16px" }}
      >
        {isEnrolling ? "Mendaftarkan..." : "Daftarkan Wajah"}
      </Button>
    </div>
  );
};

export default FaceEnrollment;
