import React, { useState, useEffect } from "react";
import { Input, Modal, message } from "antd";
import axios from "axios";

import Iframe from "react-iframe";

const FormAntalRuangan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [noreg, setnoreg] = useState("");

  const handleOpenModal = (e) => {
    axios
      .get(`http://182.168.7.251:5001/GetUrlDirect/RENCANAKONTROLRJTH/4`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUrl(res.data.result);
          setIsModalOpen(true);
        } else {
          //  setPassWordsaja("");
          message.warning("Maaf data tidak ditemukan!");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Menjalan Kan Sistem!");
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUrl(""); // Kosongkan URL saat menutup modal
  };

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
        setUrl("");
      }, 2); // Waktu dalam milidetik sebelum modal ditutup, di sini 5000 milidetik (5 detik)
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <div>
      <Input
        type="number"
        placeholder="..."
        style={{ width: "100%" }}
        onChange={(e) => setnoreg(e.target.value)}
        value={noreg}
      />
      <button onClick={handleOpenModal}>Cetak</button>
      <Modal
        width="70%"
        footer={null}
        visible={isModalOpen} // Mengubah properti 'open' menjadi 'visible'
        onCancel={handleCloseModal} // Gunakan handleCloseModal langsung
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Iframe
          url={url}
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          style={{ display: "none" }}
          position="relative"
        />
      </Modal>
    </div>
  );
};

export default FormAntalRuangan;
