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
import UpdateJabatan from "./UpdateJabatan";
import {
  DownloadOutlined,
  PlusCircleOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { LogBookAskepContext } from "../master/context/masteraskep/LogBookAskepContext";
const { Search } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const PageHeadPak = () => {
  const [modal, setModal] = useState(false);
  const {
    getpegawaidetail,
    pegawaiDetail,
    setPegawaiDetail,
    panggolByBulan,
    loadingdetail,
    setLoadingDetail,
    detailPegawaiNadiku,
    synchNadiku,
  } = useContext(MasterPegawaiContext);

  let page = 1;
  return (
    <div>
      <Row>
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
              <Descriptions.Item label="NIP">
                {pegawaiDetail.NIP}
              </Descriptions.Item>
              <Descriptions.Item label="Nama">
                {pegawaiDetail.Nama}
              </Descriptions.Item>
              <Descriptions.Item label="NIK">
                <Row>
                  <Col span={20}>{pegawaiDetail.NIK}</Col>
                  <Col span={4}>
                    <Button
                      icon={<UserSwitchOutlined />}
                      onClick={() => {
                        console.log("cek");
                        setLoadingDetail(true);
                        synchNadiku(pegawaiDetail.PegawaiId);
                      }}
                      size="small"
                      loading={loadingdetail}
                      style={{ backgroundColor: "#d46b08", color: "white" }}
                    >
                      Synch
                    </Button>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="PegawaiId">
                {pegawaiDetail.PegawaiId} / {pegawaiDetail.UserId}
              </Descriptions.Item>
              <Descriptions.Item label="Jabatan">
                {panggolByBulan.Deskripsi} / {panggolByBulan.KategoriGolongan}
              </Descriptions.Item>
              <Descriptions.Item label="Golongan">
                <Row>
                  <Col span={20}>
                    {panggolByBulan.PangkatGolongan} / {panggolByBulan.Jenjang}
                  </Col>
                  <Col span={4}>
                    <Button
                      icon={<PlusCircleOutlined />}
                      onClick={() => {
                        setModal(true);
                      }}
                      size="small"
                      style={{ backgroundColor: "#52c41a", color: "white" }}
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </Descriptions.Item>
              {/* <Descriptions.Item label="Jabatan">
                {detailPegawaiNadiku.jabatan}
              </Descriptions.Item>
              <Descriptions.Item label="Unit Kerja">
                {detailPegawaiNadiku.unit_kerja} - {detailPegawaiNadiku.ruangan}
              </Descriptions.Item> */}
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
      >
        <UpdateJabatan />
      </Modal>
    </div>
  );
};

export default PageHeadPak;
