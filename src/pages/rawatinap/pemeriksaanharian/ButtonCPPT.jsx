import React, { useContext, useState } from "react";
import Iframe from "react-iframe";
import {
  Button,
  Modal,
  Select,
  Row,
  Col,
  Tree,
  Typography,
  Space,
  Form,
  Checkbox,
  Table,
  Empty,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { PasienRIContext } from "../context/PasienRIContext";

const { Column } = Table;
const { Option } = Select;
const { Text, Link, Title } = Typography;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const ButtonCPPT = () => {
  const [pilihWaktu, setpilihWaktu] = useState("Sekarang");
  const {
    getPrintCPPTRI,
    loadDelay,
    setloadDelay,
    printCPPTRI,
    setprintCPPTRI,

    modalCPPT,
    setmodalCPPT,
  } = useContext(PrintOutContext);
  const { curpasRI } = useContext(PasienRIContext);
  const [modalRM02, setmodalRM02] = useState(false);
  const [URL, setURL] = useState("");
  const [layanan, setLayanan] = useState("");
  const id = sessionStorage.getItem("norm");
  const handleCariSelect = (e) => {
    setURL(e);
    setLayanan(e);
  };
  const onMV = () => {
    getPrintCPPTRI(curpasRI.registrasiId, "2");
  };
  const handleOk = () => {
    setmodalRM02(false);
    setURL("");
    setLayanan("");
  };
  return (
    <div>
      <Button
        size="small"
        onClick={onMV}
        style={{ backgroundColor: "#bae7ff", borderColor: "#40a9ff" }}
      >
        CPPT
      </Button>
      <Modal
        width="70%"
        footer={null}
        open={modalCPPT}
        onCancel={() => {
          setmodalCPPT(false);
        }}
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Iframe
          loading={loadDelay}
          onLoad={() => {
            setloadDelay(false);
          }}
          url={printCPPTRI}
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal>
    </div>
  );
};

export default ButtonCPPT;
