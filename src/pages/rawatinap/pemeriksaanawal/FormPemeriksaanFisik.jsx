import React, { useState, useContext } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  Modal,
  Button,
  Input,
  Card,
  Form,
  Radio,
  Tabs,
  InputNumber,
  Checkbox,
  Row,
  Col,
  Space,
  Affix,
} from "antd";
import "../../App.css";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Iframe from "react-iframe";
import Abdomen from "../../../assets/img/regions abdomen.jpg";
import dayjs from "dayjs";
import { PasienRIContext } from "../context/PasienRIContext";
import { PemeriksaanFisikContext } from "../../rawatjalan/context/PemeriksaanFisikContext";
import { AnamnesaRIContext } from "../context/AnamnesaRIContext";
import { LoginContext } from "../../rawatjalan/context";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles

const { TextArea } = Input;
const { TabPane } = Tabs;
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const layout2 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const PemeriksaanFisikRI = () => {
  const { getPrintfisikRI } = useContext(PrintOutContext);
  const {
    insertPemFisiikRI,
    pmrfisik,
    setpmrfisik,
    detailpmfisikRI,
    pmrFisikId,
    setpmrFisikId,
  } = useContext(AnamnesaRIContext);
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");

  return (
    <div>
      <Card size="small">
        <Form.Item>
          {/* <CKEditor
            editor={ClassicEditor}
            data={pmrfisik}
            
            onChange={(event, editor) => {
              const data = editor.getData();
              
            }} */}
          {/* /> */}
          <ReactQuill
            value={pmrfisik}
            onChange={(e) => {
              setpmrfisik(e);
              console.log(e);
            }}
          />
        </Form.Item>
      </Card>

      <Card size="samll">
        <Row>
          <Col span={12}>
            <Button
              onClick={() => {
                getPrintfisikRI(curpasRI.registrasiId, "1");
              }}
            >
              Cetak
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setpmrfisik(
                    "<br><b>Pemeriksaan Kepala&nbsp;&nbsp;&nbsp;&nbsp;:</b><br>- Mata&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<br>- Telinga/Hidung&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Mulut dan Gigi&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Lain-Lain&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>Pemeriksaan Leher&nbsp;&nbsp;&nbsp;&nbsp;:</b><br>- Tyroid&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>Pemeriksaan Dada&nbsp;&nbsp;&nbsp;&nbsp;:</b><br>- Paru&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Jantung&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Dinding Dada&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>Pemeriksaan Abdomen :</b><br>- Dinding Perut&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Hepar / Lien&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Usus&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>Pemeriksaan punggung:</b><br>- C. Vertebrae&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Ginjal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>Pemeriksaan coxae&nbsp;&nbsp;&nbsp;&nbsp;:</b><br>Pemeriksaan genitalia eksterna&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>Pemeriksaan extremitas&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b><br>- Superior&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Inferior&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>Pemeriksaaan limphonodi&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>Pemeriksaan reflek&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>Pemeriksaan turgor kulit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>Pemeriksaan akral&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>Pemeriksaan Lokal&nbsp;&nbsp;&nbsp;&nbsp;:</b><br><b>ANALISA&nbsp;</b><br>Permasalah Medis&nbsp;&nbsp;&nbsp;&nbsp;:<br>Permasalahan Perawat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>Dx Awal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>RENCANA</b><br>Terapi Medis&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>Tindakan Medis&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>Tindakan Keperawatan :<br>Prognosis&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>&nbsp;"
                  );
                  setpmrFisikId(0);
                }}
              >
                Batal
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  insertPemFisiikRI({
                    pemeriksaanFisikId: pmrFisikId,
                    registrasiId: curpasRI.registrasiId,
                    groupLayananID: "1",
                    ruangId: curpasRI.ruangId,
                    tglPeriksa: dayjs().format("YYYY-MM-DDTHH:mm"),
                    pelaksanaId: curpasRI.dokterId,
                    catatan: pmrfisik,
                    hapus: false,
                    userId: namauser,
                    clientName: host,
                    clientIp: ip,
                    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm"),
                  });
                }}
              >
                Simpan
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PemeriksaanFisikRI;
