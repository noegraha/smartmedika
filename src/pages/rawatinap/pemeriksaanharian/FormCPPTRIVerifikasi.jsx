import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  Popconfirm,
  message,
  Card,
  Tabs,
  Space,
  DatePicker,
  Empty,
  Modal,
  Table,
  Radio,
  Divider,
  Alert,
  Tooltip,
  Tag,
  Switch,
  Spin,
  Popover,
} from "antd";
import * as faceapi from "face-api.js";
import Column from "antd/lib/table/Column";
import { LoginContext } from "../../rawatjalan/context/LoginContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { PerkembanganPasienRIContext } from "../context/PerkembanganPasienRIContext";
import dayjs from "dayjs";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import axios from "axios";
import { UserSwitchOutlined } from "@ant-design/icons";
import { UserContext } from "../../appsetting/UserContext";

const FormCPPTRIVerifikasi = ({ onEnrollmentSuccess }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const kdPegawai = sessionStorage.getItem("pegawai");
  const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [nama, setNama] = useState("");
  const [namadaftar, setnamadaftar] = useState("");
  const { namauser } = useContext(LoginContext);
  const { getPrintCPPTRI } = useContext(PrintOutContext);
  const {
    menuMaster,
    getApptesting,
    appTesting,
    setappTesting,
    getSMFbyUser,
    smfUser,
    setsmfUser,
    kategpriUser,
    setkategpriUser,
  } = useContext(UserContext);
  const {
    tandaVitalId,
    settandaVitalId,
    gcsMata,
    setgcsMata,
    gcsSuara,
    setgcsSuara,
    gcsGerakan,
    setgcsGerakan,
    tekananDarahSistolik,
    settekananDarahSistolik,
    tekananDarahDiastolik,
    settekananDarahDiastolik,
    suhuTubuh,
    setsuhuTubuh,
    frekuensiNadi,
    setfrekuensiNadi,
    frekuensiNafas,
    setfrekuensiNafas,
    skorNyeri,
    setskorNyeri,
    katonTTV,
    setKatonTTV,
    bacaTTV,
    setBacaTTV,
    insertTTVPasien,
    tglTTV,
    setTglTTV,
    ttvByNoreg,
    getTTVAll,
    grabikTTV,
    userTTV,
    setUserTTV,
    deleteTTV,
    getTTVById,
    tingkatKesadaranId,
    settingkatKesadaranId,
    tingkatKesadaran,
    settingkatKesadaran,
    iramaNadi,
    setiramaNadi,
    resikoJatuh,
    setresikoJatuh,
    saturasiOksigen,
    setsaturasiOksigen,
    tinggiBadan,
    settinggiBadan,
    beratBadan,
    setberatBadan,
    KosongkanFormTTV,
    pegawaiId,
    setPegawaiId,
    //catatan medis//
    insertCatatanMedis,
    catatanMedisId,
    setcatatanMedisId,
    setsubjektif,
    objektif,
    setobjektif,
    assesment,
    setassesment,
    planning,
    setplanning,
    instruksi,
    setinstruksi,
    evaluasi,
    setevaluasi,
    implementasi,
    setimplementasi,
    temuanDx,
    settemuanDx,
    namaProfesi,
    setnamaProfesi,
    verified,
    setverified,
    verifiedTime,
    setverifiedTime,
    skalaNyeri,
    setskalaNyeri,
    citasi,
    setcitasi,
    citNomer,
    setcitNomer,
    citated,
    setcitated,
    buttonRiwayat,
    setbuttonRiwayat,
    buttonVerifikasi,
    setbuttonVerifikasi,
    waktuenrol,
    setwaktuenroll,
    verifPilih,
    setverifPilih,
    modalEnrollNew,
    setmodalEnrollNew,

    getCPPT,
    cpptRi,
    setCpptRi,
    insertCPPTDr,
    deleteCPPT,
    insertVerifDr,
    loading,
    setloading,
    getTglLibur,
    settglLibur,
    tglLibur,
  } = useContext(PerkembanganPasienRIContext);
  const { curpasRI, ruangRiDesk, setruangRiDesk } = useContext(PasienRIContext);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const namalengkap = sessionStorage.getItem("namapetugas");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        // console.log("Model berhasil dimuat");
        const labeledDescriptors = await loadLabeledImages();
        setLabeledFaceDescriptors(labeledDescriptors);
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

  const onmodel = () => {
    const loadModels = async () => {
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        // console.log("Model berhasil dimuat");
        const labeledDescriptors = await loadLabeledImages();
        setLabeledFaceDescriptors(labeledDescriptors);
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
  };

  const loadLabeledImages = async () => {
    try {
      // Request data from the API
      const res = await axios.get(
        `${apiku}/FaceRecognition/Read/${namauser}`,
        options
      );

      if (res.data.statusCode === 200) {
        const result = res.data.result;
        // console.log(res.data.result);
        // Ensure the Descriptor is a Float32Array
        const descriptorArray = result.Deskriptor.split(",").map(parseFloat);

        // Return the LabeledFaceDescriptors with the proper format
        return new faceapi.LabeledFaceDescriptors(result.UserId, [
          new Float32Array(descriptorArray),
        ]);
      } else {
        // console.log("Warning: Data not found");
        return null;
      }
    } catch (err) {
      console.log("Error: ", err);
      return null;
    }
  };

  const onRiwayat = () => {
    setbuttonRiwayat(true);
    getCPPT(curpasRI.registrasiId);
  };

  const onCanceltiphapus = () => {
    // console.log("");
  };

  const aksiverifikasi = (e) => {
    setverifPilih(e);
    const smfcoba = [
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "11",
      "12",
      "13",
      "20",
    ];
    const smfok = smfcoba.includes(smfUser); // Check if smfUser is in smfcoba
    if (appTesting) {
      if (menuMaster || smfok) {
        if (!waktuenrol) {
          setmodalEnrollNew(true);
          startVideo();
        } else {
          // const enrollmentDate = dayjs(waktuenrol);
          // const thirtyMinutesLater = enrollmentDate.add(30, "minute");
          // if (dayjs().isAfter(thirtyMinutesLater)) {
          //   setmodalEnrollNew(true);
          //   startVideo();
          // } else {
          insertVerifDr(e);
          // }
        }
      } else {
        insertVerifDr(e);
      }
    } else {
      insertVerifDr(e);
    }
  };

  const startVideo = () => {
    // setmodalEnrollNew(true);
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setVideoStream(stream);
        setIsWebcamActive(true);
        setShowCanvas(true);
        setIsDetecting(true);
        // console.log("Webcam berhasil dinyalakan");
      })
      .catch((err) => {
        Modal.warning({
          title: "Kamera Tidak Ditemukan!",
          content: JSON.stringify(
            "Terjadi Kesalahan saat memuat kamera, pastikan kamera terpasang dengan benar dan berfungsi! Gunakan Komputer AIO ",
            err
          ),
        });
        console.error("Error accessing webcam: ", err);
        setmodalEnrollNew(false);
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
      // console.log("Webcam berhasil dimatikan");
      setIsDetecting(false);
      setShowCanvas(false);
      // setFaceDetected(false);
      setNama("");
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
        alert(
          "Tidak ada wajah yang terdeteksi. Tutup dan Ulangi Verifikasi Lagi"
        );
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

      // Capture gambar dari kamera
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Konversi gambar ke Base64
      const imageSrc = canvas.toDataURL("image/jpeg");

      // Konversi Base64 menjadi File
      const base64toFile = (base64String, filename, mimeType) => {
        const binaryString = atob(base64String.split(",")[1]);
        const arrayBuffer = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          arrayBuffer[i] = binaryString.charCodeAt(i);
        }
        return new File([arrayBuffer], filename, { type: mimeType });
      };

      const filename = "capture.jpg";
      const mimeType = "image/jpeg";
      const file = base64toFile(imageSrc, filename, mimeType);

      // Simpan user ke server
      const response = await axios.post(
        `${apiku}/FaceRecognition/PostEnroll`,
        user,
        options
      );

      if (response.data.statusCode === 200) {
        // Kirim file gambar ke server
        const formData = new FormData();
        formData.append("RuangId", ruangRiDesk.split("+").shift());
        formData.append("RuangDeskripsi", ruangRiDesk.split("+").pop());
        formData.append("IPComputer", ip);
        formData.append("image", file); // Tambahkan file hasil konversi

        try {
          const res = await axios.post(
            `${apiku}/SisSendFile/SimpanPresensi`,
            formData,
            {
              headers: { Authorization: "Bearer " + token },
              "Content-Type": "multipart/form-data",
            }
          );

          // Berhasil Simpan Data
          const currentTime = dayjs().format("YYYY-MM-DDTHH:mm:ss");
          sessionStorage.setItem("saatenrol", currentTime);
          setwaktuenroll(currentTime);

          // Modal success
          Modal.success({
            title: "Berhasil Mendaftarkan Wajah!",
            content: "Klik Ok Untuk Verifikasi",
            onOk: () => {
              // Panggil insertVerifDr hanya setelah tombol Ok diklik
              insertVerifDr(verifPilih);
            },
          });
        } catch (err) {
          Modal.error({
            title: "Data Gagal Disimpan, silahkan ulangi lagi!",
            content: JSON.stringify(err),
          });
        }

        setEnrollmentSuccess(true);

        // Stop Video
        stopVideo(); // Matikan kamera
      } else {
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

  const handleVideoPlay = async () => {
    if (
      !isModelLoaded ||
      !labeledFaceDescriptors ||
      !videoRef.current.videoWidth
    ) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    let previousLandmarks = null;
    let noMovementFrames = 0;
    let previousFrame = null;
    let livenessCounter = 0;
    const livenessThreshold = 5; // Liveness harus terdeteksi pada 5 frame berturut-turut
    let isSaved = false; // Flag untuk memastikan hanya disimpan sekali

    const detectFaces = async () => {
      if (!isDetecting || !isWebcamActive || isSaved) {
        // Tambahkan pengecekan isSaved
        return;
      }

      try {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
          .withFaceLandmarks()
          .withFaceDescriptors();

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        if (!detections || detections.length === 0) {
          // setFaceDetected(false);
          setNama(
            "Wajah tidak Terdeteksi, Hadapkan Wajah Kekamera, Pastikan Pencahayaan Mencukupi!"
          );
          if (isDetecting) requestAnimationFrame(detectFaces);
          return;
        }

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

        const currentFrame = canvas
          .getContext("2d")
          .getImageData(0, 0, canvas.width, canvas.height);
        let pixelDifference = 0;

        if (previousFrame) {
          for (let i = 0; i < currentFrame.data.length; i += 4) {
            const rDiff = Math.abs(
              currentFrame.data[i] - previousFrame.data[i]
            );
            const gDiff = Math.abs(
              currentFrame.data[i + 1] - previousFrame.data[i + 1]
            );
            const bDiff = Math.abs(
              currentFrame.data[i + 2] - previousFrame.data[i + 2]
            );
            pixelDifference += rDiff + gDiff + bDiff;
          }
        }

        previousFrame = currentFrame;

        const pixelThreshold = 20000;
        if (pixelDifference < pixelThreshold) {
          noMovementFrames++;
        } else {
          noMovementFrames = 0;
        }

        const validLiveness = resizedDetections.some((detection) => {
          const landmarks = detection.landmarks;
          const mouth = landmarks.getMouth();
          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();

          if (previousLandmarks) {
            const noseMovementX = Math.abs(
              landmarks.getNose()[0].x - previousLandmarks.getNose()[0].x
            );
            const noseMovementY = Math.abs(
              landmarks.getNose()[0].y - previousLandmarks.getNose()[0].y
            );

            const movementThreshold = 3;
            if (
              noseMovementX < movementThreshold &&
              noseMovementY < movementThreshold
            ) {
              noMovementFrames++;
            } else {
              noMovementFrames = 0;
            }
          }
          previousLandmarks = landmarks;

          const mouthOpen = Math.abs(mouth[13].y - mouth[19].y) > 15;
          const leftEyeBlink = Math.abs(leftEye[1].y - leftEye[5].y) < 5;
          const rightEyeBlink = Math.abs(rightEye[1].y - rightEye[5].y) < 5;

          if (leftEyeBlink || rightEyeBlink || mouthOpen) {
            livenessCounter++;
          } else {
            livenessCounter = 0;
          }

          return livenessCounter >= livenessThreshold;
        });

        if (noMovementFrames > 30 || !validLiveness) {
          setNama(
            "Wajah tidak menunjukkan tanda keaslian (liveness), Kedipkan Mata/Buka Mulut/Gelengkan Kepala!"
          );
          if (isDetecting) requestAnimationFrame(detectFaces);
          return;
        }

        const faceMatcher = new faceapi.FaceMatcher(
          labeledFaceDescriptors,
          0.4
        );
        const results = resizedDetections.map((d) =>
          faceMatcher.findBestMatch(d.descriptor)
        );

        const isFaceDetected = results.some(
          (result) =>
            result.label && result.label !== "unknown" && result.distance <= 0.4
        );

        // setFaceDetected(isFaceDetected);

        if (!isFaceDetected) {
          setNama(
            "Wajah tidak sesuai, Hadapkan Wajah Kekamera, Pastikan Pencahayaan Mencukupi!"
          );
          if (isDetecting) requestAnimationFrame(detectFaces);
          return;
        }
        const captureCanvas = document.createElement("canvas");
        captureCanvas.width = video.videoWidth;
        captureCanvas.height = video.videoHeight;
        const ctx = captureCanvas.getContext("2d");
        ctx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
        const imageSrc = captureCanvas.toDataURL("image/jpeg");
        // Setelah wajah terdeteksi dan cocok, hentikan deteksi dan matikan webcam
        setIsDetecting(false);
        setIsWebcamActive(false);
        isSaved = true; // Tandai bahwa penyimpanan telah dilakukan
        // setmodalEnrollNew(false);

        // Hanya lakukan penyimpanan sekali
        const result = results[0]; // Gunakan hanya wajah pertama yang cocok
        if (
          result.label &&
          result.label !== "unknown" &&
          result.distance <= 0.4
        ) {
          const terdeteksinama = result.label;
          setNama(terdeteksinama);

          const base64toFile = (base64String, filename, mimeType) => {
            const binaryString = atob(base64String.split(",")[1]);
            const arrayBuffer = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              arrayBuffer[i] = binaryString.charCodeAt(i);
            }
            return new File([arrayBuffer], filename, { type: mimeType });
          };

          const filename = "capture.jpg";
          const mimeType = "image/jpeg";
          const file = base64toFile(imageSrc, filename, mimeType);

          const formData = new FormData();
          formData.append("RuangId", ruangRiDesk.split("+").shift());
          formData.append("RuangDeskripsi", ruangRiDesk.split("+").pop());
          formData.append("IPComputer", ip);
          formData.append("image", file);

          try {
            const res = await axios.post(
              `${apiku}/SisSendFile/SimpanPresensi`,
              formData,
              {
                headers: { Authorization: "Bearer " + token },
                "Content-Type": "multipart/form-data",
              }
            );

            const currentTime = dayjs().format("YYYY-MM-DDTHH:mm:ss");
            sessionStorage.setItem("saatenrol", currentTime);
            setwaktuenroll(currentTime);

            Modal.success({
              title: "Pencocokan Wajah Sesuai!",
              content: "Klik Ok Untuk Verifikasi",
              onOk: () => {
                insertVerifDr(verifPilih);
              },
            });
          } catch (err) {
            Modal.error({
              title: "Data Gagal Disimpan, silahkan ulangi lagi!",
              content: JSON.stringify(err),
            });
          }
        }
      } catch (err) {
        console.error("Error during face detection:", err);
        if (isDetecting) requestAnimationFrame(detectFaces);
      }
    };

    detectFaces();
  };

  const handleVideoenrol = async () => {
    if (!isDetecting || !isWebcamActive) {
      return;
    }
    try {
      if (!videoRef.current) {
        console.error("Video reference is not available");
        return;
      }
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceDescriptors();

      const canvas = canvasRef.current;
      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      };
      faceapi.matchDimensions(canvas, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      if (!detections || detections.length === 0) {
        setFaceDetected(false);
        setnamadaftar(
          "Wajah tidak Terdeteksi, Hadapkan Wajah Kekamera, Pastikan Pencahayaan Mencukupi!"
        );
      } else {
        const detection = detections[0];
        const landmarks = detection.landmarks;

        // Get the positions of key facial landmarks: nose, left eye, right eye, and mouth
        const nose = landmarks.getNose();
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();
        const mouth = landmarks.getMouth();

        // Check if mouth, nose, or eyes are missing or not visible (indicating occlusion)
        const isMouthVisible =
          mouth &&
          mouth.length > 0 &&
          mouth[0].y < videoRef.current.videoHeight;
        const isNoseVisible =
          nose && nose.length > 0 && nose[0].y < videoRef.current.videoHeight;
        const isEyesVisible =
          leftEye &&
          leftEye.length > 0 &&
          rightEye &&
          rightEye.length > 0 &&
          leftEye[0].y < videoRef.current.videoHeight &&
          rightEye[0].y < videoRef.current.videoHeight;

        // If any of the key facial landmarks (mouth, nose, or eyes) are not visible, do not detect the face
        if (!isMouthVisible || !isNoseVisible || !isEyesVisible) {
          setFaceDetected(false);
          setnamadaftar(
            "Wajah tidak Terdeteksi dengan jelas, Pastikan Pencahayaan Mencukupi dan Wajah Tersedia!"
          );
          requestAnimationFrame(handleVideoenrol); // Keep detecting faces
          return;
        }

        // Check if the face size is large enough (i.e., not too far from the camera)
        const faceBox = detection.detection.box;
        const faceWidth = faceBox.width;
        const faceHeight = faceBox.height;

        const minFaceSize = 130; // Minimum face size for valid detection (increased to 150px for stricter detection)

        // If the face is too small (i.e., too far from the camera), don't detect it
        if (faceWidth < minFaceSize || faceHeight < minFaceSize) {
          setFaceDetected(false);
          setnamadaftar(
            "Wajah terlalu jauh dari kamera, pastikan wajah lebih dekat."
          );
          requestAnimationFrame(handleVideoenrol); // Keep detecting faces
          return;
        }

        // Otherwise, the face is detected properly
        setFaceDetected(true);
        setnamadaftar("Wajah Terdeteksi, Silakan Klik DAFTARKAN WAJAH ...");
      }

      // Request animation frame to keep detecting faces
      if (isDetecting) {
        requestAnimationFrame(handleVideoenrol);
      }
    } catch (error) {
      message.error("Error detecting faces.");
      console.error("Error details:", error); // Detailed error log
    }
  };

  return (
    <div>
      <>
        <Space>
          <Button
            onClick={() => {
              getPrintCPPTRI(curpasRI.registrasiId, "1");
            }}
          >
            Cetak
          </Button>
          <Button onClick={onRiwayat}>Riwayat</Button>
          {tglLibur ? (
            <Button
              disabled={kdPegawai[0] === "D" || menuMaster ? false : true}
              onClick={onRiwayat}
            >
              Verifikasi
            </Button>
          ) : (
            <Tooltip title="DPJP Yang Dapat Melakukan Verifikasi!">
              <Button
                disabled={
                  kdPegawai === curpasRI.dokterId || menuMaster ? false : true
                }
                onClick={onRiwayat}
              >
                Verifikasi
              </Button>
            </Tooltip>
          )}
        </Space>
      </>

      <Modal
        title="CPPT PASIEN!"
        open={buttonRiwayat}
        width="80%"
        style={{ marginTop: 5 }}
        footer={null}
        onCancel={() => {
          setbuttonRiwayat(false);
        }}
      >
        <Table
          bordered
          locale={{ emptyText: <Empty description="Data CPPT Kosong" /> }}
          // pagination={false}
          dataSource={cpptRi}
          size="small"
          // rowKey="reg"
          pagination={{
            position: ["topRight"],
            pageSize: [5],
          }}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                <>
                  <Row gutter={[0, 5]}>
                    <Col span={3}>Subjektif:</Col>
                    <Col span={21}>{record.Subjektif}</Col>

                    <Col span={3}>Objektif:</Col>
                    <Col span={21}>{record.Objektif}</Col>

                    <Col span={3}>Assesment:</Col>
                    <Col span={21}>{record.Assesment}</Col>

                    <Col span={3}>Planning:</Col>
                    <Col span={21}>{record.Planning}</Col>

                    <Col span={3}>Instruksi:</Col>
                    <Col span={21}>{record.Instruksi}</Col>

                    <Col span={3}>Implementasi:</Col>
                    <Col span={21}>{record.Implementasi}</Col>

                    <Col span={3}>Evaluasi:</Col>
                    <Col span={21}>{record.Evaluasi}</Col>

                    <Col span={3}>Temuan Diagnosa:</Col>
                    <Col span={21}>{record.TemuanDiagnosa}</Col>
                  </Row>
                </>
              </p>
            ),
          }}
        >
          <Column
            title="Tanggal"
            key="planning"
            render={(cpptRi) => (
              <span>{dayjs(cpptRi.TglJam).format("DD-MM-YYYY HH:mm")}</span>
            )}
          />
          <Column
            title="User"
            key="planning"
            render={(cpptRi) => (
              <>
                <Row>
                  <Col span={12} style={{ textAlign: "right" }}>
                    {cpptRi.NamaProfesi === "Dokter Spesialis" ? (
                      <Tag color="gold" style={{ color: "black" }}>
                        {cpptRi.NamaProfesi}
                      </Tag>
                    ) : cpptRi.NamaProfesi === "Dokter PPDS" ? (
                      <Tag color="magenta" style={{ color: "black" }}>
                        {cpptRi.NamaProfesi}
                      </Tag>
                    ) : cpptRi.NamaProfesi === "Perawat" ? (
                      <Tag color="cyan" style={{ color: "black" }}>
                        {cpptRi.NamaProfesi}
                      </Tag>
                    ) : (
                      <Tag color="blue" style={{ color: "black" }}>
                        {cpptRi.NamaProfesi}
                      </Tag>
                    )}
                  </Col>
                  <Col span={12}>
                    <Tag> {cpptRi.UserID}</Tag>
                  </Col>
                </Row>
              </>
            )}
          />
          <Column
            title="Aksi"
            key="planning"
            render={(cpptRi) => {
              const isVerified =
                cpptRi.Verified !== false && cpptRi.Verified !== null;
              const isDoctor = tglLibur
                ? kdPegawai[0] === "D"
                : kdPegawai === curpasRI.dokterId;

              const handleCopy = () => {
                setsubjektif(cpptRi.Subjektif);
                setobjektif(cpptRi.Objektif);
                setassesment(cpptRi.Assesment);
                setplanning(cpptRi.Planning);
                setinstruksi(cpptRi.Instruksi);
                setevaluasi(cpptRi.Evaluasi);
                setimplementasi(cpptRi.Implementasi);
                settemuanDx(cpptRi.TemuanDiagnosa);
                setbuttonRiwayat(false);
              };

              const handleEdit = () => {
                settandaVitalId(cpptRi.TandaVitalId);
                setgcsMata(cpptRi.GcsMata);
                setgcsSuara(cpptRi.GcsSuara);
                setgcsGerakan(cpptRi.GcsGerakan);
                settekananDarahSistolik(cpptRi.TekananDarahSistolik);
                settekananDarahDiastolik(cpptRi.TekananDarahDiastolik);
                setsuhuTubuh(cpptRi.SuhuTubuh);
                setfrekuensiNadi(cpptRi.FrekuensiNadi);
                setfrekuensiNafas(cpptRi.FrekuensiNafas);
                setskorNyeri(cpptRi.SkorNyeri);
                setTglTTV(dayjs(cpptRi.TglJam));
                // settingkatKesadaranId("");
                // settingkatKesadaran("");
                setiramaNadi(cpptRi.IramaNadi);
                setresikoJatuh(cpptRi.ResikoJatuh);
                setsaturasiOksigen(cpptRi.SaturasiOksigen);
                settinggiBadan(cpptRi.TinggiBadan);
                setberatBadan(cpptRi.BeratBadan);
                setcatatanMedisId(cpptRi.CatatanMedisId);
                setsubjektif(cpptRi.Subjektif);
                setobjektif(cpptRi.Objektif);
                setassesment(cpptRi.Assesment);
                setplanning(cpptRi.Planning);
                setinstruksi(cpptRi.Instruksi);
                setevaluasi(cpptRi.Evaluasi);
                setimplementasi(cpptRi.Implementasi);
                settemuanDx(cpptRi.TemuanDiagnosa);
                setbuttonRiwayat(false);
                // setverified(false);
                // setverifiedTime(null);
              };

              const handleDelete = () => {
                deleteCPPT(
                  curpasRI.registrasiId,
                  cpptRi.CatatanMedisId,
                  cpptRi.TandaVitalId
                );
              };

              const handleVerify = () => {
                aksiverifikasi({
                  catatanMedisId: cpptRi.CatatanMedisId,
                  registrasiId: curpasRI.registrasiId,
                  subjektif: cpptRi.Subjektif,
                  objektif: cpptRi.Objektif,
                  assesment: cpptRi.Assesment,
                  planning: cpptRi.Planning,
                  instruksi: cpptRi.Instruksi,
                  evaluasi: cpptRi.Evaluasi,
                  implementasi: cpptRi.Implementasi,
                  tglJam: dayjs(cpptRi.TglJam).format("YYYY-MM-DDTHH:mm"),
                  pelaksanaId: cpptRi.PelaksanaId,
                  namaProfesi: cpptRi.NamaProfesi,
                  tandaVitalId: cpptRi.TandaVitalId,
                  userId: cpptRi.UserID,
                  verified: true,
                  hapus: false,
                  ruangId: cpptRi.RuangId,
                  verifiedTime: dayjs().format("YYYY-MM-DDTHH:mm"),
                  temuanDiagnosa: cpptRi.TemuanDiagnosa,
                  citasi,
                  citNomer,
                  citated,
                  clientHost: host,
                  clientIP: ip,
                });
              };

              return (
                <span>
                  {!isVerified ? (
                    isDoctor || menuMaster ? (
                      <Space direction="horizontal">
                        <Button
                          size="small"
                          style={{ backgroundColor: "#722ed1", color: "white" }}
                          onClick={handleCopy}
                        >
                          Copy
                        </Button>
                        <Popconfirm
                          title="Anda Yakin akan Menghapus Data Ini?"
                          onConfirm={handleDelete}
                          onCancel={onCanceltiphapus}
                          okText="Ya"
                          cancelText="Tidak"
                        >
                          <Button
                            size="small"
                            style={{ backgroundColor: "red", color: "white" }}
                          >
                            Hapus
                          </Button>
                        </Popconfirm>
                        <Button
                          onClick={handleEdit}
                          style={{ backgroundColor: "green", color: "white" }}
                          size="small"
                        >
                          Edit
                        </Button>
                        <Popconfirm
                          title="Anda Yakin akan Memverifikasi Data Ini?"
                          onConfirm={handleVerify}
                          onCancel={onCanceltiphapus}
                          okText="Ya"
                          cancelText="Tidak"
                        >
                          <Button
                            style={{
                              backgroundColor: "blue",
                              color: "white",
                            }}
                            size="small"
                            // onClick={handleVerify}
                          >
                            Verif
                          </Button>
                        </Popconfirm>
                      </Space>
                    ) : (
                      <Space direction="horizontal">
                        <Popconfirm
                          title="Anda Yakin akan Menghapus Data Ini?"
                          onConfirm={handleDelete}
                          onCancel={onCanceltiphapus}
                          okText="Ya"
                          cancelText="Tidak"
                        >
                          <Button
                            size="small"
                            style={{ backgroundColor: "red", color: "white" }}
                          >
                            Hapus
                          </Button>
                        </Popconfirm>
                        <Button
                          onClick={handleEdit}
                          style={{ backgroundColor: "green", color: "white" }}
                          size="small"
                        >
                          Edit
                        </Button>
                      </Space>
                    )
                  ) : (
                    <div>
                      <Space direction="horizontal">
                        <Button
                          size="small"
                          style={{ backgroundColor: "#722ed1", color: "white" }}
                          onClick={handleCopy}
                        >
                          Copy
                        </Button>
                        <Tag color="blue">Diverifikasi</Tag>
                      </Space>
                    </div>
                  )}
                </span>
              );
            }}
          />
        </Table>
        <p style={{ color: "red" }}>Gunakan + untuk melihat CPPT</p>
      </Modal>

      <Modal
        title={"Pengenalan Wajah " + namalengkap}
        open={modalEnrollNew}
        width="50%"
        style={{ top: 10 }}
        footer={null}
        onCancel={() => {
          stopVideo();
          setmodalEnrollNew(false);
        }}
      >
        {labeledFaceDescriptors === null ? (
          <>
            {/* Alert untuk pendaftaran wajah */}
            <Alert
              message="Wajah Belum Terdaftar Di Sistem! Dekatkan Wajah Ke Kamera."
              description="Dekatkan Wajah Ke Kamera. Pastikan wajah anda tidak terhalang masker dan terlihat jelas atau
        pencahayaan yang cukup agar proses pendaftaran berjalan dengan baik."
              type="info"
              showIcon
            />
            <Spin size="large" spinning={!isModelLoaded} tip="Memuat Models">
              <Row>
                <Col span={24} style={{ textAlign: "center" }}>
                  {/* Video untuk pendaftaran */}
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "0 auto",
                      width: "100%",
                      maxWidth: "800px",
                    }}
                  >
                    <video
                      ref={videoRef}
                      onPlay={handleVideoenrol}
                      autoPlay
                      muted
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "100%",
                      }}
                    />
                    {showCanvas && (
                      <canvas
                        ref={canvasRef}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    )}
                    {namadaftar && (
                      <div
                        style={{
                          position: "absolute",
                          top: "10%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: "rgba(253, 32, 32, 0.7)",
                          color: "white",
                          fontWeight: "bold",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          textAlign: "center",
                          zIndex: 3,
                        }}
                      >
                        {namadaftar}
                      </div>
                    )}
                  </div>
                </Col>

                <Col span={24} style={{ textAlign: "center" }}>
                  {/* Button Daftar Wajah */}
                  <Button
                    type="primary"
                    onClick={handleEnroll}
                    disabled={!isWebcamActive || isEnrolling || !faceDetected}
                    style={{ marginTop: "16px" }}
                  >
                    {isEnrolling ? "Mendaftarkan..." : "Daftarkan Wajah"}
                  </Button>
                </Col>
              </Row>
            </Spin>
          </>
        ) : (
          <>
            {/* Alert untuk pencocokan wajah yang sudah terdaftar */}
            <Alert
              message="Pengenalan Wajah!"
              description="Pastikan wajah anda tidak terhalang masker dan terlihat jelas atau
        pencahayaan yang cukup agar proses pendaftaran berjalan dengan baik. Anda dapat melakukan pembaruan wajah yang terdaftar di sistem dengan mengklik 'Perbarui'"
              type="info"
              showIcon
              // action={
              //   <Button
              //     type="primary"
              //     size="small"
              //     shape="round"
              //     icon={<UserSwitchOutlined />}
              //     iconPosition="end"
              //     onClick={() => {
              //       setLabeledFaceDescriptors(null);
              //       startVideo(); // Memulai kembali video untuk pembaruan wajah
              //     }}
              //   >
              //     Perbarui
              //   </Button>
              // }
            />
            <Spin size="large" spinning={!isModelLoaded} tip="Memuat Models">
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto",
                  width: "100%",
                  maxWidth: "800px",
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  onPlay={handleVideoPlay}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "100%",
                  }}
                />
                {showCanvas && (
                  <canvas
                    ref={canvasRef}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
                {nama && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "rgba(253, 32, 32, 0.7)",
                      color: "white",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      textAlign: "center",
                      zIndex: 3,
                    }}
                  >
                    {nama}
                  </div>
                )}
              </div>
            </Spin>
          </>
        )}
      </Modal>
    </div>
  );
};

export default FormCPPTRIVerifikasi;
