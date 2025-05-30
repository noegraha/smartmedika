import React, { useContext, useState } from "react";
import {
  Table,
  Tag,
  Input,
  Button,
  Empty,
  Typography,
  Switch,
  Space,
  DatePicker,
  Row,
  Col,
  Card,
  Modal,
  Select,
} from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { PasienContext } from "../../../../rawatjalan/context/PasienContext";
import HdContext from "../../HdContext";
import '../Hemodialisa/style.css'
import { PemeriksaanFisikContext } from "../../../../rawatjalan/context/PemeriksaanFisikContext";
const { Search } = Input;

const {
  PasiensContext,
} = HdContext;

const { Option } = Select;

const TabelPasienPenunjangHD = () => {
  const props = useContext(PasiensContext)
  const {
    detailPemfisik,
    detailPemfisikById,
  } = useContext(PemeriksaanFisikContext);

  const {
    pasien,
    cariPasien,
    ruangasal,
    setLebar,
    poli1,
    cariPasienPoli,
    setRefresh,
    // getPasienDetail,
  } = useContext(PasienContext);

  const [lebarnama, setLebarNama] = useState("120px");
  const [mdketwarna, setmdketwarna] = useState(false)
  const [sSearch, setsSearch] = useState()

  const onLebar = (e) => {
    e === true ? setLebar(450) : setLebar(250);
    e === true ? setLebarNama("180px") : setLebarNama("120px");
  };

  const columns = [
    {
      title: "No",
      dataIndex: 'no',
      key: 'no',
      width: "35px",
    },
    {
      title: "No Reg",
      key: 'registrasiId',
      width: "90px",
      sorter: (a, b) => a.registrasiId - b.registrasiId,
      render: (record) => (
        <div>
          {record.ruangOrder === "91" ? record.registrasiId : <Tag color="magenta">{record.registrasiId}</Tag>}
        </div>
      ),
    },
    {
      title: "Nama",
      dataIndex: 'namaPasien',
      key: 'namaPasien',
      width: lebarnama,
      sorter: (a, b) => a.namaPasien.localeCompare(b.namaPasien),
      render: text => <a style={{ color: 'blue' }}>{text}</a>,
    },
    {
      title: "No Pasien",
      dataIndex: 'pasienId',
      key: 'pasienId',
      width: "80px",
    },
    {
      title: "UserId",
      dataIndex: 'UserId',
      key: 'UserId',
      ellipsis: true,
      width: "80px",
    },
    {
      title: "DPJP",
      width: "150px",
      dataIndex: 'namaDPJP',
      key: 'namaDPJP',
      ellipsis: true,
    },
  ];

  // 9406, 9456
  const ruangHd = [
    {
      id: '9406',
      desk: 'HAEMODIALISA - RSMS'
    },
    {
      id: '9456',
      desk: 'HAEMODIALISA - ABIYASA'
    }
  ]

  const onrefresh = () => {
    cariPasienPoli(poli1);
    setRefresh(true);
  };

  const klikKetWarna = () => {
    setmdketwarna(true)
  }

  const klikSearch = (e) => {
    if (e.length < 6) {
      Modal.warn({
        title: "Perhatian!",
        content: "Inputan search masih kosong! Minimal 6 karakter untuk mencari.",
      });
    }
    else {
      props.onSearch(e)
    }
  }

  const klikRefresh = () => {
    props.onSearch();
    setsSearch("")
  }

  const changeRuang = (e) => {
    console.log('changeRuange : ', e);
    props.setruangId(e)
    props.fetchData(e)
  }

  return (
    <div>
      <Row style={{ marginBottom: '2px' }}>
        <Col span={24}>
          <Select
            value={props.ruangId}
            onChange={(e) => changeRuang(e)}
            style={{ width: "100%" }}
          >
            {ruangHd.map((item, index) => (
              <Option key={index} value={item.id}>
                {item.desk}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <DatePicker
        defaultValue={props.tglList}
        format={"DD-MM-YYYY"}
        onChange={props.changeDate}
        style={{ width: '100%', marginBottom: '5px' }}
      />
      <Search
        placeholder="Cari No Registrasi / No CM..."
        value={sSearch}
        onSearch={(e) => klikSearch(e)}
        style={{ marginBottom: '5px' }}
      />
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              props.setdpjpRuangOrder(record.dPJP)
              // if (record.ruangOrder === '93') {
              props.getDataPasien(record.noOrder)
              detailPemfisikById(record.pasienId)
              // detailPemfisik(record.registrasiId)
              // getListAskepById(record.registrasiId)
              // getCatatanPasien(record.registrasiId)
              // cekAssementTombol(record.registrasiId)
              // getAssesmentById(record.registrasiId);
              // getAssesmentResikoJatuh(record.registrasiId);
              // getAssesmentDetailTG(record.registrasiId);
              // props.sethanyaBaca(true);
              // console.log('ini pasien rawat inap');
              // } else {
              // console.log('ini pasien selain rawat inap');
              // props.getDataPasien(record.noOrder)
              // detailPemfisik(record.registrasiId)
              // }
            }
          };
        }}
        // rowClassName={(record, index) => (
        //   record.dialisisHeaderId !== null && record.aksesVaskulerId === null ? "greena" :
        //     record.aksesVaskulerId !== null && record.durasi === null ? "greenb" :
        //       record.durasi !== null && record.heparinasi !== null && record.waktuMulai === null ? "greenc" :
        //         record.waktuMulai !== null && record.waktuSelesai !== null && record.volumeSisaPriming === null ? "greend" :
        //           record.volumeSisaPriming !== null ? "greene" :
        //             "white"
        // )}
        rowClassName={(record, index) => (
          record.dialisisHeaderId === null ? "belum_entry" :
            record.aksesVaskulerId === null ? "pasien_tersimpan" :
              record.durasi === null ? "assesment_terisi" :
                record.waktuMulai === null ? "preskripsi_terisi" :
                  record.volumeSisaPriming === null ? "intrahd_terisi" :
                    "selesai_entry"
        )}
        loading={props.isLoading}
        style={{ maxHeight: 570 }}
        columns={columns}
        dataSource={props.pasiens.result ? props.pasiens.result : []}
        size="small"
        className="RCM_two_level_table1"
        scroll={{ x: 300, y: 445 }}
        pagination={false}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={"Tidak ada Pasien"}
            />
          ),
        }}
        footer={() => (
          <div>
            <Space style={{ marginBottom: '5px' }}>
              Atur Lebar :
              <Switch
                onChange={onLebar}
                checkedChildren="Max"
                unCheckedChildren="Min"
              />
              <Button
                size="small"
                type="primary"
                onClick={() => klikRefresh()}
                style={{ backgroundColor: "forestgreen", borderColor: "green" }}
              >
                <UndoOutlined />
                Refresh Pasien
              </Button>
            </Space>
            <br />
            <span>
              <Button
                size="small"
                onClick={() => klikKetWarna()}
                style={{ width: '100%' }}
              >
                <b>KETERANGAN WARNA</b>
              </Button>
              {/* <b><u>Keterangan Warna :</u></b> */}
            </span>

          </div>
        )}
      />

      <Modal
        title={<u>Keterangan Warna pada List Pasien Hemodialisa :</u>}
        visible={mdketwarna}
        onCancel={() => setmdketwarna(false)}
        footer={null}
        width={790}
      >
        <Row style={{ marginBottom: '2px' }}>
          <Col span={4} style={{ backgroundColor: "#ffffff", border: "1px solid #595959" }}>
          </Col>
          <Col span={20}>
            <span style={{ marginLeft: '5px' }}>
              <b>: Belum Entry </b>
            </span>
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={4} style={{ backgroundColor: "#ffec3d", border: "1px solid #595959" }}>
          </Col>
          <Col span={20}>
            <span style={{ marginLeft: '5px' }}>
              <b>: Pasien Tersimpan</b>
            </span>
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={4} style={{ backgroundColor: "#36cfc9", border: "1px solid #595959" }}>
          </Col>
          <Col span={20}>
            <span style={{ marginLeft: '5px' }}>
              <b>: Assesment Terisi</b>
            </span>
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={4} style={{ backgroundColor: "#9254de", border: "1px solid #595959" }}>
          </Col>
          <Col span={20}>
            <span style={{ marginLeft: '5px' }}>
              <b>: Preskripsi Terisi</b>
            </span>
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={4} style={{ backgroundColor: "#f759ab", border: "1px solid #595959" }}>
          </Col>
          <Col span={20}>
            <span style={{ marginLeft: '5px' }}>
              <b>: Intra HD Terisi</b>
            </span>
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={4} style={{ backgroundColor: "#73d13d", border: "1px solid #595959" }}>
          </Col>
          <Col span={20}>
            <span style={{ marginLeft: '5px' }}>
              <b>: Entry Selesai</b>
            </span>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default TabelPasienPenunjangHD;
