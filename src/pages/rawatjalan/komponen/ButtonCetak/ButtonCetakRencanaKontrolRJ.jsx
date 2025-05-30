import { Button, Modal, Spin, Tooltip, message } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import Iframe from "react-iframe";
import ButtonPanduanCetak from "../ButtonPanduanCetak";
import { LoginContext } from "../../context";

const ButtonCetakRencanaKontrolRJ = (props) => {
  const { apiReport } = useContext(LoginContext);
  const token = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };
  const [modalopen, setModalOpen] = useState(false);
  const [loadDelay, setloadDelay] = useState(false);
  const [printRKRJ, setPrintRKRJ] = useState(false);
  const getPrintRKRJ = (noreg) => {
    axios
      .get(`${apiReport}/GetUrlSingle/rencanakontrolrj/${noreg}/`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setPrintRKRJ(res.data.result);
        } else {
          message.warning("Data Rencana Kontrol Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data Rencana Kontrol!");
      });
  };
  return (
    <div>
      <Tooltip title={<ButtonPanduanCetak />}>
        <Button
          type="primary"
          style={{
            backgroundColor: "#95de64",
            borderColor: "#95de64",
          }}
          onClick={() => {
            setModalOpen(true);
            getPrintRKRJ(props.noreg);
          }}
        >
          Cetak
        </Button>
      </Tooltip>
      <Modal
        closable={false}
        footer={null}
        width="80%"
        centered={true}
        open={modalopen}
        onCancel={() => setModalOpen(false)}
      >
        <Spin spinning={loadDelay}>
          <Iframe
            onLoad={() => {
              setloadDelay(false);
            }}
            url={printRKRJ}
            width="100%"
            height="750px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Spin>
      </Modal>
    </div>
  );
};

export default ButtonCetakRencanaKontrolRJ;
