import React, { useContext, useState } from "react";
import {
  Descriptions,
  Col,
  Input,
  Card,
  Button,
  Table,
  Empty,
  DatePicker,
  Row,
  Space,
  Form,
  Modal,
} from "antd";
import { MasterPegawaiContext } from "../master/context/masterpegawai/MasterPegawaiContext";
import { LogBookAskepContext } from "../master/context/masteraskep/LogBookAskepContext";

const { Search } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const PageheadPegawai = () => {
  const [modal, setModal] = useState(false);
  const {
    getpegawaidetail,
    pegawaiDetail,
    setPegawaiDetail,
    pegawaidetail,
    panggolBawahan,
    getpanggolBawahan,
  } = useContext(MasterPegawaiContext);
  const { infoBawahan, setinfoBawahan } = useContext(LogBookAskepContext);

  let page = 1;
  return (
    <div>
      <Row>
        {/* <Button
          onClick={() => {
            console.log(infoBawahan);
          }}
        >
          cek
        </Button> */}
        <Col span={24}>
          <Card
            headStyle={{ fontWeight: "bolder", backgroundColor: "whitesmoke" }}
            size="small"
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
          >
            <Descriptions bordered size="small">
              <Descriptions.Item label="Nama">
                {infoBawahan.namapegawai}
              </Descriptions.Item>
              <Descriptions.Item label="NIP">
                {infoBawahan.nip}
              </Descriptions.Item>
              <Descriptions.Item label="Unit Kerja">
                {infoBawahan.ruangan}
              </Descriptions.Item>
              <Descriptions.Item label="Jabatan">
                {infoBawahan.jabatan_pegawai}
              </Descriptions.Item>
              <Descriptions.Item label="Jabfung">
                {panggolBawahan.Deskripsi} / {panggolBawahan.KategoriGolongan}
              </Descriptions.Item>
              <Descriptions.Item label="Pangkat">
                {panggolBawahan.PangkatGolongan} / {panggolBawahan.Jenjang}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      <Modal
        visible={modal}
        footer={null}
        onCancel={() => {
          setModal(false);
        }}
        width="500px"
      ></Modal>
    </div>
  );
};

export default PageheadPegawai;
