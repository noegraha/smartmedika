import { Button, Modal } from "antd";
import React, { useContext } from "react";
import { PasienContext } from "../context/PasienContext";
import { ExclamationCircleOutlined, WhatsAppOutlined } from "@ant-design/icons";
const { confirm } = Modal;
const ButtonWA = () => {
  const { noWA, dataTelemedicine, namawa, poliwa, dokterwa, kelaminwa } =
    useContext(PasienContext);
  return (
    <div>
      <Button
        size="small"
        style={{
          backgroundColor: "#25D366",
          borderColor: "#25D366",
          color: "white",
        }}
        onClick={() => {
          confirm({
            width: "50%",
            title: "Apakah Anda akan melakukan Telemedicine melalui Whatsapp?",
            icon: <ExclamationCircleOutlined />,
            content: (
              <span>
                Anda akan melakukan Telemedicine kepada pasien <b>{namawa}</b>{" "}
                dengan no tujuan 0{noWA} <br /> Pasien tersebut memiliki keluhan
                :
                <div style={{ color: "red" }}>
                  {dataTelemedicine.keluhanUtama}
                </div>
              </span>
            ),
            onOk() {
              window.open(
                `//api.whatsapp.com/send?phone=62${noWA}&text=Selamat pagi ${kelaminwa} ${namawa} kami dari ${poliwa} RSUD Prof. Dr. Margono Soekarjo. ${kelaminwa} telah mendaftar telemedicine dengan dokter ${dokterwa}. Telemedicine akan dilaksanakan melalui videocall Whatsapp sekitar pukul 09.00 WIB, dimohon bersiap sebelum waktu pelaksanaan tersebut. Terimakasih.`,
                "_blank"
              );
            },
            onCancel() {
              console.log("Cancel");
            },
            okText: "Hubungi WA",
          });
        }}
      >
        <WhatsAppOutlined />
        Whatsapp
      </Button>
    </div>
  );
};

export default ButtonWA;
