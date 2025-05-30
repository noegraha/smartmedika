import {
  Card,
  Col,
  Descriptions,
  Image,
  Row,
  Table,
  Button,
  Empty,
  Tabs,
  Typography,
  Space,
  Tree,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import React, { useContext, useState } from "react";
import Iframe from "react-iframe";
import { ResepContext } from "../../rawatjalan/orderresep/ResepContext";
import { PasienContext } from "../../rawatjalan/context/PasienContext";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { HasilLabContext } from "../../rawatjalan/context/HasilLabContext";
import RiwayatOrder from "../../rawatjalan/orderresep/RiwayatOrder";
import { HasilRadiologiContext } from "../../rawatjalan/context/HasilRadiologiContext";
import FormLaporanKala from "../pemeriksaanharian/FormLaporanKala";
import RiwayatPemeriksaan from "../../rekammedis/RiwayatPemeriksaan";
const { Column } = Table;
const { TabPane } = Tabs;
const { Text, Title } = Typography;

const HistoriPasien = () => {
  const { getRiwayatObat } = useContext(ResepContext);
  const {
    setPasienID,
    setLoading,
    loading,
    setLoadingDetail,
    loadingdetail,
    pasienlist,
    cariPasienListAll,
    getPasienDetail,
    // insertPasien,
    detailRiwayatPasien,
    setCurpas,
    riwayatpenyakit,
    riwayatpemeriksaan,
    riwayatpasien,
    detailRiwayatPenyakit,
    detailRiwayatPemeriksaan,
    pasienid,
    detailPasien,
  } = useContext(PasienContext);

  const namauser = sessionStorage.getItem("userId");
  const [viewaskep, setviewaskep] = useState("");
  const namaPasien = sessionStorage.getItem("namaPasienRawat");
  const { GetHasilRadiologiByNoreg, hasilRisByNoreg } = useContext(
    HasilRadiologiContext
  );
  const {
    getListOpByPasienIdnNOreg,
    listOpinNoreg,
    getListLabByNOreg,
    listPkbyNoreg,
  } = useContext(HasilLabContext);
  const {
    getPrintRm02,
    getPrintRm13,
    printRm02,
    printRm13,
    getPrintHasilOp,
    printHasilOp,
    setprintHasilOp,
    getPrintLabPk,
    printLabPk,
    setprintLabPk,
    getPrintTerimaPasien,
    getPrintAnamnesa,
    getPrintfisikRI,
    getPrintAssAske,
    getPrintRM11,
    getPrintAsuhan,
    getPrintKonsulRI,
    getPrintCatatanPerawat,

    printRm02Kunjungan,
    printCPPTRI,
    printDokterIGD,
    printPerawatIGD,
    printAnamnesa,
    printFirikRI,
    printAss,
    printRM11,
    printasuhan,
    printKonsulRI,
    printSBarPerawat,
    getPrintRm02Kunjungan,
    getPrintCPPTRI,
    getPrintDokterIGD,
    getPrintPerawatIGD,
  } = useContext(PrintOutContext);
  const [URLNoreg, setURLNoreg] = useState("");

  const onAmbilRiwayat = (e) => {
    getPrintCPPTRI(e, "riwayat");
    detailRiwayatPenyakit(e);
    detailRiwayatPemeriksaan(e);
    getListOpByPasienIdnNOreg(e);
    getListLabByNOreg(pasienid, e);
    GetHasilRadiologiByNoreg(pasienid, e);
    getPrintRm02Kunjungan(pasienid, e);
    getPrintRm13(pasienid, e, "riwayat");
    detailPasien(e);
    getPrintTerimaPasien(e);
    getPrintAnamnesa(e);
    getPrintfisikRI(e);
    getPrintAssAske(e, "1");
    getPrintRM11(e);
    getPrintAsuhan(e);
    getPrintKonsulRI(e);
    getPrintCatatanPerawat(e, "riwayat");
    getPrintDokterIGD(e);
    getPrintPerawatIGD(e);
  };
  const [warnarow, setWarnaRow] = useState(null);

  const columns = [
    {
      title: "No Pasien",
      dataIndex: "pasienId",
    },
    {
      title: "Nama Pasien",
      dataIndex: "nama",
    },
    {
      title: "Tanggal Lahir",
      dataIndex: "tanggalLahir",
      render: (_, record) => {
        return <div>{record.tanggalLahir.substr(0, 10)}</div>;
      },
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
    },
  ];

  const setAmbil = (e) => {
    cariPasienListAll(e);
    setLoading(true);
  };
  return (
    <div className="backcontent" id="divcontents">
      <Card
        size="small"
        style={{ margin: 3 }}
        title="Pencarian Pasien"
        headStyle={{ fontWeight: "bold", fontSize: "14" }}
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Search
              placeholder="Cari Nama Pasien / No Medis Pasien"
              enterButton
              onSearch={(e) => setAmbil(e)}
            />
            <Table
              pagination={false}
              scroll={{ y: 250 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setWarnaRow(rowIndex);
                    getPasienDetail(record.pasienId);
                    // setForm(true);
                    setLoadingDetail(true);
                    setPasienID(record.pasienId);
                    detailRiwayatPasien(record.pasienId);
                    // listHasilLabPK();
                    getRiwayatObat(record.pasienId);
                    sessionStorage.setItem("norm", record.pasienId);
                    setCurpas("a");
                    setLoading(true);
                  }, // click row
                };
              }}
              loading={loading}
              columns={columns}
              dataSource={pasienlist}
              size="small"
              rowClassName={(record, rowIndex) =>
                rowIndex === warnarow ? "bgcolorsuccess" : null
              }
            />
          </Col>
          <Col span={24}>
            <RiwayatPemeriksaan />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default HistoriPasien;
