import { CheckOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Row,
  Spin,
  Table,
} from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import dayjs from "dayjs";
import MdDetailResorce from "../MdDetailResorce";
import Search from "antd/es/transfer/search";

const { TextArea } = Input;
const formItemLayoutdpjp = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const KondisiPasienPulang = () => {
  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };
  const {
    ihsPasien,
    identitasPx,
    paramEncounter,
    waktuPelayanan,
    listSNDRiwPenySendiri,
    tempListSNDRiwPenySendiri,
    settempListSNDRiwPenySendiri,
    listRiwayatDx,

    lookupSNOMEDKeluhan,
    postResource,
    getRiwayatDx,
    getRiwRscId,
    getResourceById,

    setmsRscdetail,
    regId,
    spCvg,
    ihsRS,
    ihsRuang,
    namaRuang,
    diagnosis,
    setdiagnosis,
  } = useContext(SatuSehatEncounterContext);

  const [diagnosissementara, setdiagnosissementara] = useState([]);
  const [rm13, setRM13] = useState({});
  const [rujukan, setrujukan] = useState({});

  //Condition - Kondisi Saat Meninggalkan Fasyankes
  const [stsKondisi, setstsKondisi] = useState({});
  const [snomedKondisi, setsnomedKondisi] = useState({});

  const [modalTTvrs, setmodalTTvrs] = useState(false);
  //state tampil data
  const [listkondisi, setlistkondisi] = useState([]);

  const colRiwPenyakit = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      align: "center",
      ellipsis: true,
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "RegistrasiId",
      dataIndex: "RegistrasiId",
      align: "center",
      key: "RegistrasiId",
      width: 150,
    },
    {
      title: "ResourceId",
      dataIndex: "ResourceID",
      key: "ResourceID",
    },
    {
      title: "ResourceType",
      dataIndex: "ResourceType",
      key: "ResourceType",
    },
    {
      title: "DateEntry",
      dataIndex: "DateEntry",
      key: "DateEntry",
      align: "center",
      width: 200,
    },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "aksi",
      align: "center",
      width: 70,
      render: (text, record, index) => (
        <div>
          <Button
            type="primary"
            onClick={() => klikDetail(record.ResourceID, record.ResourceType)}
            icon={<SearchOutlined />}
            size="small"
            style={{ backgroundColor: "#73d13d", borderColor: "#73d13d" }}
          />
        </div>
      ),
    },
  ];

  const klikPost = () => {
    let dataKondisiPasien = {
      resourceType: "Condition",
      clinicalStatus: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: "active",
            display: "Active",
          },
        ],
      },
      category: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/condition-category",
              code: stsKondisi.code,
              display: stsKondisi.display,
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: snomedKondisi.code,
            display: snomedKondisi.display,
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        display: identitasPx.Nama,
      },
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
        display: rujukan.catatan,
      },
    };

    postResource(dataKondisiPasien, "Condition", "104");
  }

  const klikRefresh = async () => {
    const codeGroups = ["104"];
    //     84	ServiceRequest - EKG
    // 85	Procedure - EKG
    // 86	Observation - EKG

    try {
      // Jalankan semua permintaan data secara paralel
      const results = await Promise.all(
        codeGroups.map((codeGrup) =>
          getRiwRscId(identitasPx.RegistrasiId, codeGrup)
        )
      );
      setlistkondisi(results[0]); // Untuk codeGrup "16"

      console.log("Semua data berhasil dimuat.");
    } catch (error) {
      console.error("Terjadi kesalahan saat memuat data:", error);
    }
  };

  const klikDetail = (id, rscType) => {
    setmsRscdetail(true);
    getResourceById(id, rscType);
  };

  const getRm13 = (id) => {
    //  setLoad(true);
    axios
      .get(`${apiku}/EmrResumePerawatan/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRM13(res.data.result);

          setmodalTTvrs(true);
        } else {
          setRM13({});
        }
      })
      .catch((err) => {
        message.error("Error Mengambil Data RM 13");
        //  setLoad(false);
        setRM13({});
      });
  };

  const getrujukan = (regid) => {
    axios
      .get(`${apiku}/EmrRujukan/GetByRegistrasiId/${regid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setrujukan(res.data.result);
        } else {
          setrujukan({});
        }
      })
      .catch((err) => {
        setrujukan({});
      });
  };

  const tableData = Object.entries(rm13).map(([key, value]) => ({
    key,
    field: key,
    value: typeof value === "string" ? value.replace(/\n/g, " ") : value,
  }));

  const columns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (text) => <div>{text}</div>,
    },
  ];

  return (
    <div>
      <Spin spinning={spCvg} tip="Loading... 😁">
        <Row>
          <Col span={22} style={{ paddingRight: "5px" }}>
            <Divider
              variant="dotted"
              orientation="left"
              style={{
                borderColor: "#7cb305",
              }}
            >
              Tindakan/Prosedur Medis
            </Divider>
          </Col>
        </Row>

        <Row style={{ marginBottom: "5px" }}>
          <Col span={12}>
            <Button
              type="primary"
              onClick={() => {
                // getRm13(identitasPx.RegistrasiId);
                setRM13({
                  resumePerawatanId: 275656,
                  registrasiId: "2412060249",
                  diagnosaMasuk: "D39.7",
                  diagnosaMasukDesk:
                    "Neoplasm of uncertain or unknown behaviour of other female genital organs",
                  tindakan:
                    "POST LAPAROTOMI EKSPLORASI; COMPLEX ADHESIOLISIS TAJAM DAN TUMPUL; CONSERVATIVE SURGICAL STAGING; SITOLOGI CAIRAN ASCITES 7/12/24",
                  dokterPenanggungJawab: "D248",
                  dokterPenanggungJawabDesk: "SUTRISNO,Dr.Sp.OG",
                  diagnosaPulang:
                    "D39.7-NEOPLASM OF UNCERTAIN OR UNKNOWN BEHAVIOUR OF OTHER FEMALE GENITAL ORGANS\nN73.6-FEMALE PELVIC PERITONEAL ADHESIONS",
                  keadaanPasien: "Membaik",
                  hasilPenunjang:
                    "Darah Lengkap:   ,Hemoglobin:  13.0 g/dL,Leukosit:  9670 /mm³,Trombosit:  448000 /mm³,",
                  pemeriksaanFisik:
                    "Abdomen : \nCembung, lembut, Luka operasi tertutup perban (-), rembesan (-) ",
                  riwayatPenyakit:
                    "PERUT MEMBESAR SEJAK 2 MINGGU, NYERI PINGGANG, SESAK NAFAS, BEGAH \n\nLAPAROTOMI EKSPLORASI; COMPLEX ADHESIOLISIS TAJAM DAN TUMPUL; CONSERVATIVE SURGICAL STAGING; SITOLOGI CAIRAN ASCITES; AKSES RETROPERITONEAL BILATERAL; LIGASI ARTERI HIPOGASTRIKA BILATERAL DUE TO BLEEDING CONTROL; PARTIAL OOPHORECTOMY BILATERAL; SALPINGEKTOMI BILATERAL; OMENTEKTOMI TOTALIS; BILATERAL PELVIC LYMPHADENECTOMY; PERITONEKTOMI DAN BIOPSI PERITONEUM MULTIPLE PADA PERITONEUM PARACOLICA GUTTER KANAN DAN KIRI; PADA PERITONEUM CAVUM DOUGLASS-PREREKTAL DAN PRE-VESIKA URINARIA; APPENDEKTOMI; INSERSI DRAIN ABDOMEN; SAMPEL TCM TUBA FALOPII KANAN",
                  perkembanganPasien: "",
                  pengobatan:
                    "ONOIWA KAPSUL 500 MG: 10 KAPSUL; 3 x SEHARI 1 KAPSUL  ,TRAMADOL TABLET 50 MG: 20 TABLET; 3 x SEHARI 1 TABLET  ,MECOBALAMIN KAPSUL 0,5 MG: 20 TABLET; 3 x SEHARI 1 KAPSUL  ,OMEPRAZOLE KAPSUL 20 MG: 14 TABLET; 2 x SEHARI 1 KAPSUL  ,SIPROFLOKSASIN TABLET 500 MG: 20 TABLET; 3 X SEHARI 1 TABLET, RUTIN SAMPAI HABIS  ,ONDANSETRON TABLET 8 MG: 14 TABLET; 2 x SEHARI 1 TABLET  ,CURCUMA TABLET 20 MG: 7 TABLET; 1 X SEHARI 1 TABLET  ",
                  prognosa: "Dubia At Bonam",
                  anjuran:
                    "Kontrol Tanggal 17-12-2024, di KLINIK ONKOLOGI GINEKOLOGI - RSMS, \n\nCatatan : \n- DIIT TINGGI PROTEIN, EKSTRA PUTIH TELOR 6 BUTIR/ HARI, \n- MINUM OBAT SESUAI ATURAN, \n- RAWAT LUKA TGL 14/12/2024 ATAU JIKA REMBES DI FASKES TERDEKAT\n- KOSONGKAN DAN CATAT PRODUKSI DRAIN TIAP PAGI\n",
                  pembedahan:
                    "POST LAPAROTOMI EKSPLORASI; COMPLEX ADHESIOLISIS TAJAM DAN TUMPUL; CONSERVATIVE SURGICAL STAGING; SITOLOGI CAIRAN ASCITES 7/12/24",
                  userId: "NISA H",
                  tanggal: "2024-12-10T13:23:24",
                });
                setrujukan({
                  rujukanId: "1111R0011224K008676",
                  tanggalRujukan: "2024-12-17T00:00:00",
                  noJaminan: "1111R0011224V007462",
                  registrasiId: "2412060249",
                  pasienId: "02309581",
                  noPolish: "0003099412732",
                  namaPasien: "SRI FADINA SINAGA NY",
                  tipeRujukan: "3",
                  jenisPelayanan: "2",
                  ppkasal: "1107R002",
                  namaPpkasal: "RSUI HARAPAN ANDA, Tegal - KOTA TEGAL",
                  diagnosisId: "N83.2",
                  jenisFaskes: "2",
                  ppktujuan: "1111R001",
                  namaPpktuju: "RSUD MARGONO SOEKARJO -KAB.BANYUMAS",
                  poliTujuanId: "9146",
                  dokterKontrolId: "D248",
                  namaPoli: "KLINIK ONKOLOGI GINEKOLOGI - RSMS",
                  catatan:
                    "- DIIT TINGGI PROTEIN, EKSTRA PUTIH TELOR 6 BUTIR/ HARI, \n- MINUM OBAT SESUAI ATURAN, \n- RAWAT LUKA JIKA REMBES DI FASKES TERDEKAT\n- KOSONGKAN DAN CATAT PRODUKSI DRAIN TIAP PAGI\n",
                  noRujukanAsal: "1107R0021224B000342",
                  sebabRujuk: "",
                  rencanaTindakan: "KONTROL",
                  program: "KONTROL",
                  digunakan: null,
                  userId: "NISA H",
                  dokterKontrolBPJS: "21023",
                  PembayaranId: "0051",
                  poliTujuanIdBPJS: "021",
                });
                setdiagnosissementara({
                  code: "A91",
                  display: "Dengue haemorrhagic fever",
                });
                setmodalTTvrs(true);
                setstsKondisi({
                  system:
                    "http://terminology.hl7.org/CodeSystem/condition-category",
                  code: "problem-list-item",
                  display: "Problem List Item",
                });
                setsnomedKondisi({
                  system: "http://snomed.info/sct",
                  code: "359746009",
                  display: "Patient's condition stable",
                });
              }}
              icon={<PlusOutlined />}
            >
              Tambah Riwayat
            </Button>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                klikRefresh("6");
              }}
              style={{ float: "right" }}
            >
              Refresh
            </Button>
          </Col>
        </Row>
        <Row>
          <Divider
            variant="dotted"
            orientation="left"
            style={{
              borderColor: "#7cb305",
            }}
          >
            Kondisi Pasien Pulang
          </Divider>
          <Table
            bordered
            loading={spCvg}
            columns={colRiwPenyakit}
            dataSource={listkondisi}
            pagination={false}
            size="small"
          />
        </Row>
      </Spin>

      <Modal
        visible={modalTTvrs}
        onCancel={() => setmodalTTvrs(false)}
        title="Data Tanda Vital Pasien"
        width={1000}
        footer={null}
        closable={false}
        style={{ top: 50 }}
      >
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          bordered
        />
        <Button
          type="primary"
          onClick={() => {
            // postResource(dataKondisiPasien, "Condition", "104");
            klikPost();
          }}
        >
          Kirim
        </Button>
      </Modal>

      {/* <MdDetailResorce /> */}
    </div>
  );
};

export default KondisiPasienPulang;
