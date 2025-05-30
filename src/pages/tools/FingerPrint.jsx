import React from "react";
import { Button, message, Spin } from "antd";
import axios from "axios";
const FingerPrint = () => {
  const [openLoading, setOpenLoading] = React.useState(false);
  const [openLoadingDaftar, setOpenLoadingDaftar] = React.useState(false);
  const usr = sessionStorage.getItem("userId");
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpenLoading(true);
          axios
            .post(`http://localhost:5000/api/show-form`, {
              Username: usr,
            })
            .then((res) => {
              if (res.data.StatusCode === 200) {
                setOpenLoading(false);
                console.log(res);
                message.info(res.data.Result);
              } else {
                setOpenLoading(false);
                message.warning(res.data.Result);
              }
            })
            .catch((err) => {
              setOpenLoading(false);
              console.log(err);
            });

          // setTimeout(() => {
          //   setOpenLoading(false);
          //   // message.error("Timed Out. Silahkan coba lagi!");
          // }, 10000);
        }}
      >
        Finger
      </Button>{" "}
      <Button
        type="primary"
        style={{ backgroundColor: "#389e0d", borderColor: "#389e0d" }}
        onClick={() => {
          setOpenLoadingDaftar(true);
          axios
            .post(`http://localhost:5000/api/fingerprint/enrollment`, {
              Username: usr,
              FingerprintCode: "",
            })
            .then((res) => {
              if (res.data.StatusCode === 200) {
                setOpenLoadingDaftar(false);
                console.log(res);
                message.info(res.data.Result);
              } else {
                setOpenLoadingDaftar(false);
                message.warning(res.data.Result);
              }
            })
            .catch((err) => {
              setOpenLoadingDaftar(false);
              console.log(err);
            });

          // setTimeout(() => {
          // setOpenLoadingDaftar(false);
          // message.error("Timed Out. Silahkan coba lagi!");
          // }, 50000);
        }}
      >
        Daftar
      </Button>
      {openLoading && (
        <div>
          <Spin
            spinning={openLoading}
            fullscreen
            tip="Tempelkan Jari Anda ke Fingerprint"
          />
        </div>
      )}
      {openLoadingDaftar && (
        <div>
          <Spin
            spinning={openLoadingDaftar}
            fullscreen
            tip="Daftarkan Jari Anda. Tempelkan Jari Anda ke Fingerprint 4 kali"
          />
        </div>
      )}
    </div>
  );
};

export default FingerPrint;
