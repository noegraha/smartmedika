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
import { v4 as uuidv4 } from "uuid";

const { TextArea } = Input;

const PemTTV = () => {
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
    getRiwRscId,
    getResourceById,
    kirimBundleV2,
    setmsRscdetail,
    spCvg,
  } = useContext(SatuSehatEncounterContext);

  const [lisTTVRS, setlisTTVRS] = useState([]);
  const [modalTTvrs, setmodalTTvrs] = useState(false);

  const [listnilaiSistolik, setlistnilaiSistolik] = useState([]);

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
          setlisTTVRS(res.data.result);
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
      align: 'center',
      render: (text) => dayjs(text).format("DD-MM-YYYY HH:mm"), // Memformat tanggal
    },
    {
      title: "Sistolik",
      dataIndex: "tekananDarahSistolik",
      key: "tekananDarahSistolik",
      align: 'center',
      render: (_, record) => (
        <>
          <div>{record.tekananDarahSistolik}</div>
        </>
      ),
    },
    {
      title: "Diastolik",
      dataIndex: "tekananDarahDiastolik",
      key: "tekananDarahDiastolik",
      align: 'center',
      render: (_, record) => (
        <>
          <div>{record.tekananDarahDiastolik}</div>
        </>
      ),
    },
    {
      title: "Suhu Tubuh",
      dataIndex: "suhuTubuh",
      key: "suhuTubuh",
      align: 'center',
      render: (_, record) => (
        <>
          <div>{record.suhuTubuh}</div>
        </>
      ),
    },
    {
      title: "Frekuensi Nadi",
      dataIndex: "frekuensiNadi",
      key: "frekuensiNadi",
      align: 'center',
      render: (_, record) => (
        <>
          <div>{record.frekuensiNadi}</div>
        </>
      ),
    },
    {
      title: "Frekuensi Nafas",
      dataIndex: "frekuensiNafas",
      key: "frekuensiNafas",
      align: 'center',
      render: (_, record) => (
        <>
          <div>{record.frekuensiNafas}</div>
        </>
      ),
    },
    {
      title: "Tingkat Kesadaran",
      dataIndex: "tingkatKesadaran",
      key: "tingkatKesadaran",
      render: (_, record) => (
        <>
          <div>GCS Mata: {record.gcsMata}</div>
          <div>GCS Suara: {record.gcsSuara}</div>
          <div>GCS Gerakan: {record.gcsGerakan}</div>
          <div>GCS Total: {record.gcsTotal}</div>
        </>
      ),
    },
    {
      title: "Tinggi Badan",
      dataIndex: "tinggiBadan",
      key: "tinggiBadan",
      align: 'center',
      render: (_, record) => (
        <>
          <div>{record.tinggiBadan}</div>
        </>
      ),
    },
    {
      title: "Berat Badan",
      dataIndex: "beratBadan",
      key: "beratBadan",
      align: 'center',
      render: (_, record) => (
        <>
          <div>{record.beratBadan}</div>
        </>
      ),
    },
    {
      title: "Body surface area",
      dataIndex: "Body surface area",
      key: "Body surface area",
      align: 'center',
      render: (_, record) => (
        <>
          <div>
            {Math.sqrt((record.beratBadan * record.tinggiBadan) / 3600).toFixed(
              2
            )}
          </div>
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
            onClick={async () => {

              let datasistolik = null;
              if (record.tekananDarahSistolik) {
                datasistolik = {
                  resourceType: "Observation",
                  status: "final",
                  category: [
                    {
                      coding: [
                        {
                          system: "http://terminology.hl7.org/CodeSystem/observation-category",
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
                        code: "8480-6",
                        display: "Systolic blood pressure",
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
                    value: record.tekananDarahSistolik,
                    // value: 133,
                    unit: "mm[Hg]",
                    system: "http://unitsofmeasure.org",
                    code: "mm[Hg]",
                  },
                };
              };

              let dataDiastolik = null;
              if (record.tekananDarahDiastolik) {
                dataDiastolik = {
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
                        code: "8462-4",
                        display: "Diastolic blood pressure",
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
                    value: record.tekananDarahDiastolik,
                    unit: "mm[Hg]",
                    system: "http://unitsofmeasure.org",
                    code: "mm[Hg]",
                  },
                };
              };

              let dataSuhu = null;
              if (record.suhuTubuh) {
                dataSuhu = {
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
                        code: "8310-5",
                        display: "Body temperature",
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
                    value: record.suhuTubuh,
                    unit: "Cel",
                    system: "http://unitsofmeasure.org",
                    code: "Cel",
                  },
                };
              };

              let dataNadi = null;
              if (record.frekuensiNadi) {
                dataNadi = {
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
                        code: "8867-4",
                        display: "Heart rate",
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
                    value: record.frekuensiNadi,
                    unit: "{beats}/min",
                    system: "http://unitsofmeasure.org",
                    code: "{beats}/min",
                  },
                };
              };

              let datarespirasi = null;
              if (record.frekuensiNafas) {
                datarespirasi = {
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
                        code: "9279-1",
                        display: "Respiratory rate",
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
                    value: record.frekuensiNafas,
                    unit: "breaths/min",
                    system: "http://unitsofmeasure.org",
                    code: "/min",
                  },
                };
              };

              let dataKesadaran = null;
              if (record.gcsTotal) {
                const gcs = record.gcsTotal;

                let responsiveness = {};

                if (gcs === 15) {
                  responsiveness = {
                    code: "248234008", // Mentally alert
                    display: "Mentally alert",
                  };
                } else if (gcs >= 13 && gcs <= 14) {
                  responsiveness = {
                    code: "162631005", // Confused
                    display: "Confused",
                  };
                } else if (gcs >= 9 && gcs <= 12) {
                  responsiveness = {
                    code: "248235009", // Drowsy
                    display: "Drowsy",
                  };
                } else if (gcs >= 6 && gcs <= 8) {
                  responsiveness = {
                    code: "248236005", // Stupor
                    display: "Stupor",
                  };
                } else if (gcs >= 3 && gcs <= 5) {
                  responsiveness = {
                    code: "28710003", // Coma
                    display: "Coma",
                  };
                };

                dataKesadaran = {
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
                        code: "67775-7",
                        display: "Level of responsiveness",
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
                  valueCodeableConcept: {
                    coding: [
                      {
                        system: "http://snomed.info/sct",
                        code: responsiveness.code,
                        display: responsiveness.display,
                      },
                    ],
                  },
                };
              };

              let dataTinggiBadan = null;
              if (record.tinggiBadan) {
                dataTinggiBadan = {
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
              };

              let dataBeratBadan = null;
              if (record.beratBadan) {
                dataBeratBadan = {
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
              };

              let datalUasTubuh = null;
              if (record.tinggiBadan && record.beratBadan) {
                datalUasTubuh = {
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
              };

              const array = [
                datasistolik,
                dataDiastolik,
                dataSuhu,
                dataNadi,
                datarespirasi,
                dataKesadaran,
                dataTinggiBadan,
                dataBeratBadan,
                datalUasTubuh,
              ];

              const filteredObjArray = array.filter(obj => obj !== null);

              const newArray = filteredObjArray.map((data) => ({
                fullUrl: `urn:uuid:${uuidv4()}`,
                resource: data, // Mengubah menjadi array untuk konsistensi
                request: {
                  method: "POST",
                  url: "Observation",
                },
              }));

              let dataKirim = {
                resourceType: "Bundle",
                type: "transaction",
                entry: newArray,
              };

              // console.log('dataKirim : ', dataKirim);
              kirimBundleV2(dataKirim, "Observation", "15");
            }}
            icon={<CheckOutlined />}
            size="small"
            style={{ backgroundColor: "#73d13d", borderColor: "#73d13d" }}
          />
        </div>
      ),
    },
  ];

  const klikRefresh = async () => {
    const codeGroups = ["15"];

    try {
      // Jalankan semua permintaan data secara paralel
      const results = await Promise.all(
        codeGroups.map((codeGrup) =>
          getRiwRscId(identitasPx.RegistrasiId, codeGrup)
        )
      );
      setlistnilaiSistolik(results[0]); // Untuk codeGrup "15"
      console.log("15");
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
          <Col span={24} style={{ paddingRight: "5px" }}>
            <Divider
              variant="dotted"
              orientation="left"
              style={{
                borderColor: "#7cb305",
              }}
            >
              Tanda Vital Pasien
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
              Tambah
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
          {/* <Divider
            variant="dotted"
            orientation="left"
            style={{
              borderColor: "#7cb305",
            }}
          >
            Data Yang Sudah Terkirim
          </Divider> */}
          <Table
            bordered
            // loading={spCvg}
            columns={colRiwPenyakit}
            dataSource={listnilaiSistolik}
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
        <Spin
          spinning={spCvg}
          tip="Loading... 😁"
        >
          <Table
            bordered
            columns={colTTv}
            dataSource={lisTTVRS}
            pagination={false}
            size="small"
          />
        </Spin>
      </Modal>

      {/* <MdDetailResorce /> */}
    </div>
  );
};

export default PemTTV;
