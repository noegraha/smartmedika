import { CheckOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
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

const { TextArea } = Input;

const PemFungsionalADL = () => {
  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const formItemLayoutdpjp = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const options = {
    headers: { Authorization: "Bearer " + token },
  };
  const {
    ruangId,
    ihsPasien,
    identitasPx,
    paramEncounter,
    waktuPelayanan,

    lookupSNOMEDKeluhan,
    postResource,
    getRiwayatDx,
    getRiwRscId,
    getResourceById,
    settempListSnomed,
    listSNOMEDKeluhan,
    setmsRscdetail,
    tempListSnomed,
    regId,
    spCvg,
  } = useContext(SatuSehatEncounterContext);

  const [kelUtama, setkelUtama] = useState({});
  const [mdLookupSnomed, setmdLookupSnomed] = useState(false);

  const [lisTTVRS, setlisTTVRS] = useState([]);
  const [modalTTvrs, setmodalTTvrs] = useState(false);

  const [nilaiADL, setnilaiADL] = useState();

  const [listFungsional, setlistFungsional] = useState([]);
  const [listADL, setlistADL] = useState([]);

  const [sSearch, setsSearch] = useState();

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

  const GettvReg = (id) => {
    // setLoad(true);
    axios
      .get(`${apiku}/EmrTandaVital/GetAllById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          //   setlisTTVRS(res.data.result);
          setlisTTVRS([
            {
              tanggal: "2024-12-06T22:30:00",
              tinggiBadan: 165,
              beratBadan: 65,
            },
          ]);
          setmodalTTvrs(true);
        } else {
          setlisTTVRS([]);
        }
      })
      .catch((err) => {
        setlisTTVRS([]);
      });
  };

  const colSnomed = [
    {
      title: "Code",
      dataIndex: "Code",
      key: "Code",
      align: "center",
      width: 150,
    },
    {
      title: "Display",
      dataIndex: "Display",
      key: "Display",
    },
    {
      title: "Keterangan",
      dataIndex: "Keterangan",
      key: "Keterangan",
      // align: 'center',
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
            onClick={() => {
              setkelUtama(record);
              setmdLookupSnomed(false);
            }}
            // disabled={!sstoken || record.StsKirim === 'true'}
            icon={<CheckOutlined />}
            size="small"
            style={{ backgroundColor: "#73d13d", borderColor: "#73d13d" }}
          />
        </div>
      ),
    },
  ];
  const onSearchSnomed = (e) => {
    let temp = listSNOMEDKeluhan.filter((item) =>
      item.Keterangan.toLowerCase().includes(e)
    );
    settempListSnomed(temp);
    setsSearch(e);
  };

  //   const postRiwayat = async (tinggiBadan, beratBadan, luastubuh) => {

  const klikRefresh = async () => {
    const codeGroups = ["58", "59"];

    try {
      // Jalankan semua permintaan data secara paralel
      const results = await Promise.all(
        codeGroups.map((codeGrup) =>
          getRiwRscId(identitasPx.RegistrasiId, codeGrup)
        )
      );

      // Perbarui state masing-masing grup data berdasarkan hasil
      setlistFungsional(results[0]); // Untuk codeGrup "58"
      setlistADL(results[1]); // Untuk codeGrup "59"

      console.log("Semua data berhasil dimuat.");
    } catch (error) {
      console.error("Terjadi kesalahan saat memuat data:", error);
    }
  };

  const klikDetail = (id, rscType) => {
    setmsRscdetail(true);
    getResourceById(id, rscType);
  };

  const klikTambahKeluhan = (e) => {
    setmdLookupSnomed(true);
    setsSearch();
    settempListSnomed(listSNOMEDKeluhan);
    if (listSNOMEDKeluhan.length === 0) {
      lookupSNOMEDKeluhan("58");
    }
  };

  const klikPost = () => {
    //datatinggi badan
    const dataFungsional = {
      resourceType: "Observation",
      status: "final",
      category: [
        {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "survey",
              display: "Survey",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "8693-4",
            display: "Mental Status",
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        // display: identitasPx.Nama,
      },
      performer: [
        {
          reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
          //   display: paramEncounter.NamaDPJP,
        },
      ],
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
        display: `Pemeriksaan Status Psikologis  ${identitasPx.Nama} di ${dayjs(
          waktuPelayanan
        )
          .subtract(7, "hour")
          .format()}`,
      },
      effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      valueCodeableConcept: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: kelUtama.Code,
            display: kelUtama.Display,
          },
        ],
      },
    };

    postResource(dataFungsional, "Observation", "58");
  };

  const klikPost2 = () => {
    //databeratbadan
    const dataADL = {
      resourceType: "Observation",
      status: "final",
      category: [
        {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "survey",
              display: "Survey",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "715823002",
            display:
              "World Health Organization Disability Assessment Schedule 2.0 score",
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        // display: identitasPx.Nama,
      },
      performer: [
        {
          reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
          //   display: paramEncounter.NamaDPJP,
        },
      ],
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
        display: `Pemeriksaan Skor ADL ${identitasPx.Nama} di ${dayjs(
          waktuPelayanan
        )
          .subtract(7, "hour")
          .format()}`,
      },
      effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      valueQuantity: {
        value: nilaiADL,
        unit: "{score}",
        system: "http://unitsofmeasure.org",
        code: "{score}",
      },
    };

    postResource(dataADL, "Observation", "59");
  };

  return (
    <div>
      <Row>
        <Col span={24} style={{ paddingRight: "5px" }}>
          <Divider
            variant="dotted"
            orientation="left"
            style={{
              borderColor: "#7cb305",
            }}
          >
            Pemeriksaan Fungsional
          </Divider>
        </Col>
      </Row>

      <Spin spinning={spCvg} tip="Loading... 😁">
        <Row style={{ marginBottom: "5px" }}>
          <Col span={12}>
            <Button
              type="primary"
              onClick={() => {
                setkelUtama({
                  system: "http://snomed.info/sct",
                  code: "17326005",
                  display: "Well in self",
                });
                setnilaiADL(35);
                setmodalTTvrs(true);
              }}
              icon={<PlusOutlined />}
            >
              Tambah Riwayat
            </Button>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                klikRefresh();
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
            Status Psikologis
          </Divider>
          <Table
            bordered
            // loading={spCvg}
            columns={colRiwPenyakit}
            dataSource={listFungsional}
            pagination={false}
            size="small"
          />
        </Row>

        <Row>
          <Divider
            variant="dotted"
            orientation="left"
            style={{
              borderColor: "#7cb305",
            }}
          >
            Skor ADL
          </Divider>
          <Table
            bordered
            // loading={spCvg}
            columns={colRiwPenyakit}
            dataSource={listADL}
            pagination={false}
            size="small"
          />
        </Row>
      </Spin>

      <Modal
        visible={modalTTvrs}
        onCancel={() => setmodalTTvrs(false)}
        title=""
        width={1000}
        footer={null}
        closable={false}
        style={{ top: 50 }}
      >
        <Divider
          variant="dotted"
          orientation="left"
          style={{
            borderColor: '#7cb305',
          }}
        >
          Tambah Status Psikologis
        </Divider>

        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>
            <span>Status Psikologis :</span>
          </Col>
          <Col span={21}>
            <Input.Group compact>
              <Input
                value={kelUtama ? kelUtama.Code : null}
                readOnly
                placeholder="Code"
                style={{ width: "25%" }}
              />
              <Input
                value={kelUtama ? kelUtama.Display : null}
                readOnly
                placeholder="Display"
                style={{ width: "40%" }}
              />
              <Input
                value={kelUtama ? kelUtama.Keterangan : null}
                readOnly
                placeholder="Keterangan"
                style={{ width: "30%" }}
              />

              <Button
                onClick={() => klikTambahKeluhan("1")}
                style={{ width: "5%" }}
              >
                Cari
              </Button>
            </Input.Group>
          </Col>
        </Row>

        <hr />
        <Row>
          <Col span={24}>
            <Button
              type='primary'
              onClick={() => {
                klikPost();
              }}
              style={{ float: 'right', width: '150px' }}>
              Post
            </Button>
          </Col>
        </Row>

        <Divider
          variant="dotted"
          orientation="left"
          style={{
            borderColor: '#7cb305',
          }}
        >
          Tambah Skor ADL
        </Divider>

        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>
            <span>Skor ADL :</span>
          </Col>
          <Col span={21}>
            <InputNumber
              type="text"
              //   placeholder={`Enter ${part.label}`}
              onChange={(e) => setnilaiADL(e.target.value)}
              value={nilaiADL}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>

        <hr />
        <Row>
          <Col span={24}>
            <Button
              type='primary'
              onClick={() => {
                klikPost2();
              }}
              disabled={ruangId.slice(0, 2) === '93' ? false : true}
              style={{ float: 'right', width: '150px' }}>
              Post
            </Button>
          </Col>
        </Row>
      </Modal>

      <Modal
        visible={mdLookupSnomed}
        onCancel={() => setmdLookupSnomed(false)}
        title="DAFTAR SNOMED"
        width={1000}
        footer={null}
        closable={false}
        style={{ top: 50 }}
      >
        <Spin spinning={spCvg} tip="Loading... 😁">
          <Row style={{ marginBottom: "5px" }}>
            <Col span={3}>
              <span>Kolom Cari :</span>
            </Col>
            <Col span={21}>
              <Input
                value={sSearch}
                placeholder="Search by Keterangan.."
                onChange={(e) => onSearchSnomed(e.target.value)}
              />
            </Col>
          </Row>
          <Table
            bordered
            // loading={spGetOrganization}
            columns={colSnomed}
            dataSource={tempListSnomed}
            size="small"
          />
        </Spin>
      </Modal>

      {/* <MdDetailResorce /> */}
    </div>
  );
};

export default PemFungsionalADL;
