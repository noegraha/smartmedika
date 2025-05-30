import React, { useState } from "react";
import { Card, Button, Drawer, Row, Col } from "antd";
import FormTandaVitalRJ from "./FormTandaVitalRJ";
import FormListDiagnosaAskep from "../AskepRJ/FormListDiagnosaAskep";
// import FormPengkajianAskep from "../AskepRJ/FormPengkajianAskep";
// import FormImplementasiAskep from "../AskepRJ/FormImplementasiAskep";
// import FormEvaluasiAskep from "../AskepRJ/FormEvaluasiAskep";
// import bukusaku from '../../../PDFBUKUSAKUENCP.pdf'
// import bukuEncp from "../AskepRJ/BukuSaku";
// import Iframe from "react-iframe";
// import BukuSaku from "../AskepRJ/BukuSaku";
import FormPengkajianAskepRJNEW from "../AskepRJ/FormPengkajianAskepRJNew";
// import { PasienContext } from "../context/PasienContext";
// const { Panel } = Collapse;

const FormAskep = () => {
  const [visible, setVisible] = useState(false);
  // const { poli1 } = useContext(PasienContext);
  // const RsLokasi = sessionStorage.getItem("RSMana");
  return (
    <div>
      <FormTandaVitalRJ />
      {/* <Formperawat /> */}
      <Card
        size="small"
        title="Asuhan Keperawatan"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        extra={
          <Button
            size="small"
            type="primary"
            style={{
              backgroundColor: "#9933FF",
              borderColor: "transparent",
            }}
            onClick={() => {
              window.open(
                "https://drive.google.com/file/d/1cEocjxUBWXxBROa8EPNnocL4bEWm_9bA/view?usp=sharing",
                "_blank"
              );
            }}
          >
            Buku Panduan
          </Button>
        }
      >
        <Row gutter={[4, 4]}>
          <Col span={24}>
            <FormListDiagnosaAskep />
          </Col>
          <Col span={24}>
            <FormPengkajianAskepRJNEW />
          </Col>
        </Row>

        {/* <Collapse style={{ padding: "1px ,1px" }}>
          <Panel header="Pengkajian Dan Intervensi" key="1"> */}
        {/* <FormPengkajianAskep /> */}

        {/* </Panel> */}
        {/* <Panel header="Implementasi" key="2">
            <FormImplementasiAskep />
          </Panel>
          <Panel header="Evaluasi" key="3">
            <FormEvaluasiAskep />
          </Panel> */}
        {/* </Collapse> */}
      </Card>

      <Drawer
        title="Buku Panduan Asuhan Keperawatan"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        width="50%"
        onContextMenu={(e) => {
          e.preventDefault();
          return false;
        }}
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        onCopy={(e) => {
          e.preventDefault();
          return false;
        }}
      >
        {/* <BukuSaku /> */}
        {/* <Iframe
                    onContextMenu={(e) => {
                        e.preventDefault();
                        return false;
                    }}
                    onPaste={(e) => {
                        e.preventDefault();
                        return false;
                    }}
                    onCopy={(e) => {
                        e.preventDefault();
                        return false;
                    }}
                    url={bukusaku}
                    width="100%"
                    height="750px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                /> */}
      </Drawer>
    </div>
  );
};

export default FormAskep;
