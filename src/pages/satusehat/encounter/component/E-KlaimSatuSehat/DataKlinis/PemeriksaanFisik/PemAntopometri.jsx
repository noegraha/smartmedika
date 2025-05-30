import { CheckOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Input,
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

const PemAntopometri = () => {
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
  } = useContext(SatuSehatEncounterContext);

  const [riwPenyakitSekarang, setriwPenyakit] = useState();
  const [riwPenyKeluarga, setriwPenyKeluarga] = useState();
  const [riwPenyKeluargaOut, setriwPenyKeluargaOut] = useState();
  const [ketRiwayat, setketRiwayat] = useState();
  const [ketRiwKeluarga, setketRiwKeluarga] = useState();
  const [kematian, setkematian] = useState(false);
  const [flagRiwayat, setflagRiwayat] = useState();
  const [SndRiwPenyakit, setSndRiwPenyakit] = useState();

  const [lisTTVRS, setlisTTVRS] = useState([]);
  const [modalTTvrs, setmodalTTvrs] = useState(false);

  const [nilaiSistolik, setnilaiSistolik] = useState();
  const [nilaiDiastolik, setnilaiDiastolik] = useState();
  const [nilaiSuhu, setnilaiSuhu] = useState();
  const [nilaiNadi, setnilaiNadi] = useState();
  const [nilaiRespirasi, setnilaiRespirasi] = useState();
  const [nilaiKesadaran, setnilaiKesadaran] = useState();

  const [listTinggiBadan, setlistTinggiBadan] = useState([]);
  const [listBeratBadan, setlistBeratBadan] = useState([]);
  const [listLuasBadan, setlistLuasBadan] = useState([]);

  const [listRiwPenyakitSekarang, setlistRiwPenyakitSekarang] = useState([]);
  const [listRiwPenyakitDahulu, setlistRiwPenyakitDahulu] = useState([]);
  const [listRiwPenyakitKeluarga, setlistRiwPenyakitKeluarga] = useState([]);

  const [sSearch, setsSearch] = useState();

  const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);
  const [mdLookupSNOMEDRiw, setmdLookupSNOMEDRiw] = useState(false);
  const [mdTmbhRiwKel, setmdTmbhRiwKel] = useState(false);

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

  const colTTv = [
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
      render: (text) => dayjs(text).format("DD-MM-YYYY HH:mm"), // Memformat tanggal
    },
    {
      title: "tinggiBadan",
      dataIndex: "tinggiBadan",
      key: "tinggiBadan",
      render: (_, record) => (
        <>
          <div>{record.tinggiBadan}</div>
          <Button
            type="primary"
            onClick={() => {
              const dataTinggiBadan = {
                resourceType: "Observation",
                status: "final",
                category: [
                  {
                    coding: [
                      {
                        system:
                          "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "vital-signs",
                        display: "Vital Signs",
                      },
                    ],
                  },
                ],
                code: {
                  coding: [
                    {
                      system: "http://loinc.org",
                      code: "8302-2",
                      display: "Body height",
                    },
                  ],
                },
                subject: {
                  reference: `Patient/${ihsPasien}`,
                  display: identitasPx.Nama,
                },
                encounter: {
                  reference: `Encounter/${paramEncounter.ResourceID}`,
                },
                effectiveDateTime: dayjs(waktuPelayanan)
                  .subtract(7, "hour")
                  .format(),
                issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
                performer: [
                  {
                    reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                    display: paramEncounter.NamaDPJP,
                  },
                ],
                valueQuantity: {
                  value: record.tinggiBadan,
                  unit: "cm",
                  system: "http://unitsofmeasure.org",
                  code: "cm",
                },
              };
              postResource(dataTinggiBadan, "Observation", "49");
            }}
            style={{ padding: 0 }}
          >
            Kirim
          </Button>
        </>
      ),
    },
    {
      title: "beratBadan",
      dataIndex: "beratBadan",
      key: "beratBadan",
      render: (_, record) => (
        <>
          <div>{record.beratBadan}</div>
          <Button
            type="primary"
            onClick={() => {
              const dataBeratBadan = {
                resourceType: "Observation",
                status: "final",
                category: [
                  {
                    coding: [
                      {
                        system:
                          "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "vital-signs",
                        display: "Vital Signs",
                      },
                    ],
                  },
                ],
                code: {
                  coding: [
                    {
                      system: "http://loinc.org",
                      code: "29463-7",
                      display: "Body weight",
                    },
                  ],
                },
                subject: {
                  reference: `Patient/${ihsPasien}`,
                  display: identitasPx.Nama,
                },
                encounter: {
                  reference: `Encounter/${paramEncounter.ResourceID}`,
                },
                effectiveDateTime: dayjs(waktuPelayanan)
                  .subtract(7, "hour")
                  .format(),
                issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
                performer: [
                  {
                    reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                    display: paramEncounter.NamaDPJP,
                  },
                ],
                valueQuantity: {
                  value: record.beratBadan,
                  unit: "kg",
                  system: "http://unitsofmeasure.org",
                  code: "kg",
                },
              };
              postResource(dataBeratBadan, "Observation", "50");
            }}
            style={{ padding: 0 }}
          >
            Kirim
          </Button>
        </>
      ),
    },
    {
      title: "Body surface area",
      dataIndex: "Body surface area",
      key: "Body surface area",
      render: (_, record) => (
        <>
          <div>
            {Math.sqrt((record.beratBadan * record.tinggiBadan) / 3600).toFixed(
              2
            )}
          </div>
          <Button
            type="primary"
            onClick={() => {
              const datalUasTubuh = {
                resourceType: "Observation",
                status: "final",
                category: [
                  {
                    coding: [
                      {
                        system:
                          "http://terminology.hl7.org/CodeSystem/observation-category",
                        code: "vital-signs",
                        display: "Vital Signs",
                      },
                    ],
                  },
                ],
                code: {
                  coding: [
                    {
                      system: "http://loinc.org",
                      code: "8277-6",
                      display: "Body surface area",
                    },
                  ],
                },
                subject: {
                  reference: `Patient/${ihsPasien}`,
                  display: identitasPx.Nama,
                },
                encounter: {
                  reference: `Encounter/${paramEncounter.ResourceID}`,
                },
                effectiveDateTime: dayjs(waktuPelayanan)
                  .subtract(7, "hour")
                  .format(),
                issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
                performer: [
                  {
                    reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                    display: paramEncounter.NamaDPJP,
                  },
                ],
                valueQuantity: {
                  value: parseFloat(
                    Math.sqrt(
                      (record.beratBadan * record.tinggiBadan) / 3600
                    ).toFixed(2)
                  ),
                  unit: "m2",
                  system: "http://unitsofmeasure.org",
                  code: "m2",
                },
              };
              postResource(datalUasTubuh, "Observation", "51");
            }}
            style={{ padding: 0 }}
          >
            Kirim
          </Button>
        </>
      ),
    },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "aksi",
      align: "center",
      width: 70,
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => {
              // console.log(record);
              postRiwayat(
                record.tinggiBadan,
                record.beratBadan,
                parseFloat(
                  Math.sqrt(
                    (record.beratBadan * record.tinggiBadan) / 3600
                  ).toFixed(2)
                )
              );
            }}
            icon={<CheckOutlined />}
            size="small"
            style={{ backgroundColor: "#73d13d", borderColor: "#73d13d" }}
          />
        </div>
      ),
    },
  ];

  const postRiwayat = async (tinggiBadan, beratBadan, luastubuh) => {
    //datatinggi badan
    const dataTinggiBadan = {
      resourceType: "Observation",
      status: "final",
      category: [
        {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "vital-signs",
              display: "Vital Signs",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "8302-2",
            display: "Body height",
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        display: identitasPx.Nama,
      },
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
      },
      effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      performer: [
        {
          reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
          display: paramEncounter.NamaDPJP,
        },
      ],
      valueQuantity: {
        value: tinggiBadan,
        unit: "cm",
        system: "http://unitsofmeasure.org",
        code: "cm",
      },
    };

    //databeratbadan
    const dataBeratBadan = {
      resourceType: "Observation",
      status: "final",
      category: [
        {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "vital-signs",
              display: "Vital Signs",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "29463-7",
            display: "Body weight",
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        display: identitasPx.Nama,
      },
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
      },
      effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      performer: [
        {
          reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
          display: paramEncounter.NamaDPJP,
        },
      ],
      valueQuantity: {
        value: beratBadan,
        unit: "kg",
        system: "http://unitsofmeasure.org",
        code: "kg",
      },
    };

    //dataluastubuh
    const datalUasTubuh = {
      resourceType: "Observation",
      status: "final",
      category: [
        {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "vital-signs",
              display: "Vital Signs",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "8277-6",
            display: "Body surface area",
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        display: identitasPx.Nama,
      },
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
      },
      effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      performer: [
        {
          reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
          display: paramEncounter.NamaDPJP,
        },
      ],
      valueQuantity: {
        value: luastubuh,
        unit: "m2",
        system: "http://unitsofmeasure.org",
        code: "m2",
      },
    };

    console.log(dataTinggiBadan, "Observation", "49");
    console.log(dataBeratBadan, "Observation", "50");
    console.log(datalUasTubuh, "Observation", "51");
    const datakirim = [
      { data: dataTinggiBadan, type: "Observation", id: "49" },
      { data: dataBeratBadan, type: "Observation", id: "50" },
      { data: datalUasTubuh, type: "Observation", id: "51" },
    ];

    try {
      // Send all the data using Promise.all
      const results = await Promise.all(
        datakirim.map((item) => postResource(item.data, item.type, item.id))
      );
      console.log("Semua data berhasil dimuat.");
    } catch (error) {
      console.error("Terjadi kesalahan saat memuat data:", error);
    }
  };

  const klikRefresh = async () => {
    const codeGroups = ["49", "50", "51"];

    try {
      // Jalankan semua permintaan data secara paralel
      const results = await Promise.all(
        codeGroups.map((codeGrup) =>
          getRiwRscId(identitasPx.RegistrasiId, codeGrup)
        )
      );

      // Perbarui state masing-masing grup data berdasarkan hasil
      setlistTinggiBadan(results[0]); // Untuk codeGrup "15"
      setlistBeratBadan(results[1]); // Untuk codeGrup "16"
      setlistLuasBadan(results[2]); // Untuk codeGrup "17"

      console.log("Semua data berhasil dimuat.");
    } catch (error) {
      console.error("Terjadi kesalahan saat memuat data:", error);
    }
  };

  const klikDetail = (id, rscType) => {
    setmsRscdetail(true);
    getResourceById(id, rscType);
  };

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
              Riwayat Antopometri Pasien
            </Divider>
          </Col>
        </Row>

        <Row style={{ marginBottom: "5px" }}>
          <Col span={12}>
            <Button
              type="primary"
              onClick={() => {
                GettvReg(identitasPx.RegistrasiId);
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
            Berat Badan
          </Divider>
          <Table
            bordered
            loading={spCvg}
            columns={colRiwPenyakit}
            dataSource={listBeratBadan}
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
            Tinggi Badan
          </Divider>
          <Table
            bordered
            loading={spCvg}
            columns={colRiwPenyakit}
            dataSource={listTinggiBadan}
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
            Body Surfce Area
          </Divider>
          <Table
            bordered
            loading={spCvg}
            columns={colRiwPenyakit}
            dataSource={listLuasBadan}
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
        <Table bordered columns={colTTv} dataSource={lisTTVRS} size="small" />
      </Modal>

      {/* <MdDetailResorce /> */}
    </div>
  );
};

export default PemAntopometri;
