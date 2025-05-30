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
const MedisDiagnostik = () => {
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
  } = useContext(SatuSehatEncounterContext);

  const [idRequest, setidRequest] = useState("");
  const [noOrder, setnoOrder] = useState("");
  const [icd9, seticcd9] = useState({});
  const [kptlPilih, setptlPilih] = useState({});
  const [icd10, seticd10] = useState({});
  const [deskReq, setdeskReq] = useState("");
  const [deskProcedure, setdeskProcedure] = useState("");

  const [jenisTindakan, setjenisTindakan] = useState("");
  const [idProcedure, setidProcedure] = useState("");
  const [icd9ProcSnom, seticd9ProcSnom] = useState({});
  const [procedureKfa, setprocedureKfa] = useState({});

  const [obsLoinc, setobsLoinc] = useState({});
  const [deskObservation, setdeskObservation] = useState("");

  const [modalTTvrs, setmodalTTvrs] = useState(false);

  const [listServicerequest, setlistServicerequest] = useState([]);
  const [listProcedure, setlistProcedure] = useState([]);
  const [listObservation, setlistObservation] = useState([]);

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















  const postRiwayat = async (request, procedure, observation) => {
    // const datakirim = [
    //   { data: dataTinggiBadan, type: "Observation", id: "49" },
    //   { data: dataBeratBadan, type: "Observation", id: "50" },
    //   { data: datalUasTubuh, type: "Observation", id: "51" },
    // ];
    // try {
    //   const results = await Promise.all(
    //     datakirim.map((item) => postResource(item.data, item.type, item.id))
    //   );
    //   console.log("Semua data berhasil dimuat.");
    // } catch (error) {
    //   console.error("Terjadi kesalahan saat memuat data:", error);
    // }
  };

  const handleSubmit = async () => {
    let datarequest = {
      resourceType: "ServiceRequest",
      identifier: [
        {
          system: `http://sys-ids.kemkes.go.id/servicerequest/${ihsRS}`,
          value: noOrder,
        },
      ],
      status: "active",
      intent: "original-order",
      priority: "routine",
      category: [
        {
          coding: [
            {
              system: "http://terminology.kemkes.go.id",
              code: "TK000028",
              display: "Diagnostic procedure",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://hl7.org/fhir/sid/icd-9-cm",
            code: icd9.code,
            display: icd9.display,
          },
          {
            system: "http://terminology.kemkes.go.id/CodeSystem/kptl",
            code: kptlPilih.code,
            display: kptlPilih.display,
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        //   display: identitasPx.Nama,
      },
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
      },
      occurrenceDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      authoredOn: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      requester: {
        reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
        display: paramEncounter.NamaDPJP,
      },
      performer: [
        {
          reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
          display: paramEncounter.NamaDPJP,
        },
      ],
      reasonCode: [
        {
          coding: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: icd10.code,
              display: icd10.display,
            },
          ],
        },
      ],
    };

    let dataPrcedure = {
      resourceType: "Procedure",
      // basedOn: [
      //   {
      //     reference: `ServiceRequest/${idRequest}`,
      //   },
      // ],
      status: "completed",
      category: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "103693007",
            display: "Diagnostic procedure",
          },
        ],
        text: "Prosedur Diagnostik",
      },
      code: {
        coding: [
          {
            system: "http://hl7.org/fhir/sid/icd-9-cm",
            code: icd9.code,
            display: icd9.display,
          },
          {
            system: "http://snomed.info/sct",
            code: icd9ProcSnom.code,
            display: icd9ProcSnom.display,
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        //   display: identitasPx.Nama,
      },
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
      },
      performedPeriod: {
        start: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        end: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      },
      performer: [
        {
          actor: {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        },
      ],
      usedCode: [
        {
          coding: [
            {
              system: "http://sys-ids.kemkes.go.id/kfa",
              code: procedureKfa.code,
              display: procedureKfa.display,
            },
          ],
        },
      ],
    };

    let dataObservation = {
      resourceType: "Observation",
      // basedOn: [
      //   {
      //     reference: `ServiceRequest/${idRequest}`,
      //   },
      // ],
      // partOf: [
      //   {
      //     reference: `Procedure/${idProcedure}`,
      //   },
      // ],
      status: "final",
      category: [
        {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "exam",
              display: "Exam",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: obsLoinc.code,
            display: obsLoinc.display,
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        //   display: identitasPx.Nama,
      },
      performer: [
        {
          reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
          // display: paramEncounter.NamaDPJP,
        },
      ],
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
      },
      effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      // component: [
      //   {
      //     code: {
      //       coding: [
      //         {
      //           system: "http://snomed.info/sct",
      //           code: "426783006",
      //           display: "Electrocardiogram: sinus rhythm",
      //         },
      //       ],
      //     },
      //     valueBoolean: false,
      //   },
      //   {
      //     code: {
      //       coding: [
      //         {
      //           system: "http://snomed.info/sct",
      //           code: "164889003",
      //           display: "Electrocardiographic atrial fibrillation",
      //         },
      //       ],
      //     },
      //     valueBoolean: true,
      //   },
      //   {
      //     code: {
      //       coding: [
      //         {
      //           system: "http://snomed.info/sct",
      //           code: "76388001",
      //           display: "ST segment elevation",
      //         },
      //       ],
      //     },
      //     valueBoolean: true,
      //   },
      //   {
      //     code: {
      //       coding: [
      //         {
      //           system: "http://snomed.info/sct",
      //           code: "26141007",
      //           display: "ST segment depression",
      //         },
      //       ],
      //     },
      //     valueBoolean: true,
      //   },
      //   {
      //     code: {
      //       coding: [
      //         {
      //           system: "http://snomed.info/sct",
      //           code: "59931005",
      //           display: "Inverted T wave",
      //         },
      //       ],
      //     },
      //     valueBoolean: true,
      //   },
      //   {
      //     code: {
      //       coding: [
      //         {
      //           system: "http://snomed.info/sct",
      //           code: "164873001",
      //           display: "Electrocardiographic left ventricle hypertrophy",
      //         },
      //       ],
      //     },
      //     valueBoolean: true,
      //   },
      // ],
      valueString: deskObservation,
    };

    try {
      // Step 1: Simpan data ServiceRequest
      await postResource(datarequest, "ServiceRequest", "84");
      const dataResult84 = await getRiwRscId(identitasPx.RegistrasiId, "84");
      console.log(datarequest);
      // Validasi hasil 84
      if (!dataResult84 || dataResult84.length === 0) {
        throw new Error("Data hasil ServiceRequest (84) kosong.");
      }

      const latestResourceID84 = dataResult84.sort(
        (a, b) => new Date(b.DateEntry) - new Date(a.DateEntry)
      )[0].ResourceID;
      console.log(dataResult84, latestResourceID84);
      const updatedDataProcedure = {
        ...dataPrcedure,
        basedOn: [
          {
            reference: `ServiceRequest/${latestResourceID84}`,
          },
        ],
      };
      console.log(updatedDataProcedure);
      // Step 2: Simpan data Procedure
      await postResource(updatedDataProcedure, "Procedure", "85");
      const dataResult85 = await getRiwRscId(identitasPx.RegistrasiId, "85");
      console.log("cekget", dataResult85);
      // Validasi hasil 85
      if (!dataResult85 || dataResult85.length === 0) {
        throw new Error("Data hasil Procedure (85) kosong.");
      }

      const latestResourceID85 = dataResult85.sort(
        (a, b) => new Date(b.DateEntry) - new Date(a.DateEntry)
      )[0].ResourceID;
      console.log(dataResult85, latestResourceID85);
      const updatedDataObservation = {
        ...dataObservation,
        basedOn: [
          {
            reference: `ServiceRequest/${latestResourceID84}`,
          },
        ],
        partOf: [
          {
            reference: `Procedure/${latestResourceID85}`,
          },
        ],
      };
      console.log(updatedDataObservation);
      // Step 3: Simpan data Observation
      await postResource(updatedDataObservation, "Observation", "86");

      console.log("Semua data berhasil diproses.");
    } catch (error) {
      console.error("Terjadi kesalahan dalam memproses data:", error.message);
    }
  };

  const handleSubmitHD = async () => {
    let dataRequestHD = {
      resourceType: "ServiceRequest",
      identifier: [
        {
          system: `http://sys-ids.kemkes.go.id/servicerequest/${ihsRS}`,
          value: noOrder,
        },
      ],
      status: "active",
      intent: "original-order",
      priority: "routine",
      category: [
        {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "277132007",
              display: "Therapeutic procedure",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://hl7.org/fhir/sid/icd-9-cm",
            code: icd9.code,
            display: icd9.display,
          },
          {
            system: "http://terminology.kemkes.go.id/CodeSystem/kptl",
            code: kptlPilih.code,
            display: kptlPilih.display,
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        //   display: identitasPx.Nama,
      },
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
      },
      occurrenceDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      authoredOn: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      requester: {
        reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
        display: paramEncounter.NamaDPJP,
      },
      performer: [
        {
          reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
          display: paramEncounter.NamaDPJP,
        },
      ],
      reasonCode: [
        {
          coding: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: icd10.code,
              display: icd10.display,
            },
          ],
        },
      ],
      note: [
        {
          text: deskReq,
        },
      ],
    };

    let dataprocedureHD = {
      resourceType: "Procedure",
      // basedOn: [
      //   {
      //     reference: `ServiceRequest/${idRequest}`,
      //   },
      // ],
      status: "completed",
      category: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "277132007",
            display: "Therapeutic procedure",
          },
        ],
        text: "Therapeutic procedure",
      },
      code: {
        coding: [
          {
            system: "http://hl7.org/fhir/sid/icd-9-cm",
            code: icd9.code,
            display: icd9.display,
          },
          {
            system: "http://snomed.info/sct",
            code: icd9ProcSnom.code,
            display: icd9ProcSnom.display,
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        //   display: identitasPx.Nama,
      },
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
      },
      performedPeriod: {
        start: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        end: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      },
      performer: [
        {
          actor: {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        },
      ],
      reasonCode: [
        {
          coding: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: icd10.code,
              display: icd10.display,
            },
          ],
        },
      ],
      note: [
        {
          text: deskProcedure,
        },
      ],
    };

    try {
      // Step 1: Simpan data ServiceRequest
      await postResource(dataRequestHD, "ServiceRequest", "84");
      const dataResult84 = await getRiwRscId(identitasPx.RegistrasiId, "84");
      console.log(dataRequestHD);
      // Validasi hasil 84
      if (!dataResult84 || dataResult84.length === 0) {
        throw new Error("Data hasil ServiceRequest (84) kosong.");
      }

      const latestResourceID84 = dataResult84.sort(
        (a, b) => new Date(b.DateEntry) - new Date(a.DateEntry)
      )[0].ResourceID;
      console.log(dataResult84, latestResourceID84);
      const updatedDataProcedure = {
        ...dataprocedureHD,
        basedOn: [
          {
            reference: `ServiceRequest/${latestResourceID84}`,
          },
        ],
      };
      console.log(updatedDataProcedure);
      // Step 2: Simpan data Procedure
      await postResource(updatedDataProcedure, "Procedure", "85");

      console.log("Semua data berhasil diproses.");
    } catch (error) {
      console.error("Terjadi kesalahan dalam memproses data:", error.message);
    }
  };

  const handleSubmitkonsul = async () => {
    let dataReqKonsul = {
      resourceType: "ServiceRequest",
      identifier: [
        {
          system: `http://sys-ids.kemkes.go.id/servicerequest/${ihsRS}`,
          value: noOrder,
        },
      ],
      status: "active",
      intent: "original-order",
      priority: "routine",
      category: [
        {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "409063005",
              display: "Counseling",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://hl7.org/fhir/sid/icd-9-cm",
            code: icd9.code,
            display: icd9.display,
          },
          {
            system: "http://terminology.kemkes.go.id/CodeSystem/kptl",
            code: kptlPilih.code,
            display: kptlPilih.display,
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        //   display: identitasPx.Nama,
      },
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
      },
      occurrenceDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      authoredOn: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      requester: {
        reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
        display: paramEncounter.NamaDPJP,
      },
      performer: [
        {
          reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
          display: paramEncounter.NamaDPJP,
        },
      ],
      reasonCode: [
        {
          coding: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: icd10.code,
              display: icd10.display,
            },
          ],
        },
      ],
      note: [
        {
          text: deskReq,
        },
      ],
    };

    let dataProcKonsul = {
      resourceType: "Procedure",
      // basedOn: [
      //   {
      //     reference: `ServiceRequest/${idRequest}`,
      //   },
      // ],
      status: "completed",
      category: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "409063005",
            display: "Counseling",
          },
        ],
      },
      code: {
        coding: [
          {
            system: "http://hl7.org/fhir/sid/icd-9-cm",
            code: icd9.code,
            display: icd9.display,
          },
          {
            system: "http://snomed.info/sct",
            code: icd9ProcSnom.code,
            display: icd9ProcSnom.display,
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        //   display: identitasPx.Nama,
      },
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
      },
      performedPeriod: {
        start: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        end: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      },
      performer: [
        {
          actor: {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        },
      ],
      reasonCode: [
        {
          coding: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: icd10.code,
              display: icd10.display,
            },
          ],
        },
      ],
      note: [
        {
          text: deskProcedure,
        },
      ],
    };

    try {
      // Step 1: Simpan data ServiceRequest
      await postResource(dataReqKonsul, "ServiceRequest", "84");
      const dataResult84 = await getRiwRscId(identitasPx.RegistrasiId, "84");
      console.log(dataReqKonsul);
      // Validasi hasil 84
      if (!dataResult84 || dataResult84.length === 0) {
        throw new Error("Data hasil ServiceRequest (84) kosong.");
      }

      const latestResourceID84 = dataResult84.sort(
        (a, b) => new Date(b.DateEntry) - new Date(a.DateEntry)
      )[0].ResourceID;
      console.log(dataResult84, latestResourceID84);
      const updatedDataProcedure = {
        ...dataProcKonsul,
        basedOn: [
          {
            reference: `ServiceRequest/${latestResourceID84}`,
          },
        ],
      };
      console.log(updatedDataProcedure);
      // Step 2: Simpan data Procedure
      await postResource(updatedDataProcedure, "Procedure", "85");

      console.log("Semua data berhasil diproses.");
    } catch (error) {
      console.error("Terjadi kesalahan dalam memproses data:", error.message);
    }
  };

  const klikRefresh = async () => {
    const codeGroups = ["84", "85", "86"];
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

      // Perbarui state masing-masing grup data berdasarkan hasil
      setlistServicerequest(results[0]); // Untuk codeGrup "15"
      setlistProcedure(results[1]); // Untuk codeGrup "16"
      setlistObservation(results[2]); // Untuk codeGrup "17"

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
      <Row>
        <Col span={24} style={{ paddingRight: "5px" }}>
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

      <Spin spinning={spCvg} tip="Loading... 😁">
        <Row style={{ marginBottom: "5px" }}>
          <Col span={12}>
            <Button
              type="primary"
              onClick={() => {
                // GettvReg(identitasPx.RegistrasiId);
                setmodalTTvrs(true);
                setidRequest("");
                setnoOrder("101011");
                seticcd9({
                  code: "89.52",
                  display: "Electrocardiogram",
                });
                setptlPilih({
                  code: "13396.PC002",
                  display: "Perekaman EKG pasien dewasa",
                });
                seticd10({
                  code: "N18.5",
                  display: "Chronic kidney disease, stage 5",
                });

                setidProcedure("");
                seticd9ProcSnom({
                  code: "29303009",
                  display: "Electrocardiographic procedure",
                });
                setprocedureKfa({
                  code: "33999999",
                  display: "Alat EKG merk X",
                });

                setobsLoinc({
                  code: "40701008",
                  display: "Echocardiography",
                });
                setdeskObservation(
                  "Hasil pemeriksaan EKG menunjukkan adanya gangguan pada jantung"
                );
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
        <Table
          bordered
          // loading={spCvg}
          columns={colRiwPenyakit}
          dataSource={listServicerequest}
          pagination={false}
          title={() => 'Service Request'}
          size="small"
          style={{ marginBottom: '5px' }}
        />
        <Table
          bordered
          // loading={spCvg}
          columns={colRiwPenyakit}
          dataSource={listProcedure}
          pagination={false}
          title={() => 'Procedure'}
          size="small"
          style={{ marginBottom: '5px' }}
        />
        <Table
          bordered
          // loading={spCvg}
          columns={colRiwPenyakit}
          dataSource={listObservation}
          pagination={false}
          title={() => 'Observation'}
          size="small"
          style={{ marginBottom: '5px' }}
        />
      </Spin>

      <Modal
        visible={modalTTvrs}
        onCancel={() => setmodalTTvrs(false)}
        // title="Data Tanda Vital Pasien"
        width={1000}
        footer={null}
        closable={false}
        style={{ top: 50 }}
      >
        <Divider
          variant="dotted"
          orientation="left"
          style={{
            borderColor: "#7cb305",
          }}
        >
          Tambah Tindakan / Prosedur Medis
        </Divider>

        <Form.Item
          {...formItemLayoutdpjp}
          label="Status Psikologis"
          style={{ marginBottom: 5 }}
        >
          <Input.Group compact>
            <Input
              value={noOrder}
              //   readOnly
              onChange={(e) => {
                setnoOrder(e.target.value);
              }}
              placeholder="No order"
              style={{ width: "90%" }}
            />
            <Button
              type="primary"
              onClick={() => {
                setjenisTindakan("DIAGNOSTIK");
              }}
              style={{ width: "10%" }}
            >
              Cari
            </Button>
          </Input.Group>
          <Input.Group compact>
            <Input
              value={noOrder}
              //   readOnly
              onChange={(e) => {
                setjenisTindakan("HD");
                setnoOrder(e.target.value);
                seticcd9({
                  code: "39.95",
                  display: "Hemodialysis",
                });
                setptlPilih({
                  code: "11586.HD002.PC002.LT016.x",
                  display:
                    "Hemodialisis, Slow Efficiency Dialysis (SLED), Dewasa, di ruang intensif, x",
                });
                seticd10({
                  code: "N18.5",
                  display: "Chronic kidney disease, stage 5",
                });

                seticd9ProcSnom({
                  code: "302497006",
                  display: "Hemodialysis",
                });

                setdeskReq("Pasien melakukan hemodialisis");
                setdeskProcedure("Pasien melakukan hemodialisis");
              }}
              placeholder="No order"
              style={{ width: "90%" }}
            />
            <Button type="primary" onClick={() => { }} style={{ width: "10%" }}>
              Cari HD
            </Button>
          </Input.Group>
          <Input.Group compact>
            <Input
              value={noOrder}
              //   readOnly
              onChange={(e) => {
                setjenisTindakan("KONSUL");
                setnoOrder(e.target.value);
                seticcd9({
                  code: "94.4",
                  display: "Other psychotherapy and counselling",
                });
                setptlPilih({
                  code: "12017.PC013",
                  display: "Konseling Individu",
                });
                seticd10({
                  code: "A91",
                  display: "Dengue haemorrhagic fever",
                });

                seticd9ProcSnom({
                  code: "445142003",
                  display: "Counseling about disease",
                });

                setdeskReq(
                  "Pasien melakukan konseling terkait masalah penyakitnya"
                );
                setdeskProcedure(
                  "Konseling keresahan pasien karena diagnosis DB"
                );
              }}
              placeholder="No order"
              style={{ width: "90%" }}
            />
            <Button type="primary" onClick={() => { }} style={{ width: "10%" }}>
              Cari Konsul
            </Button>
          </Input.Group>
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            //             84	ServiceRequest - EKG
            // 85	Procedure - EKG
            // 86	Observation - EKG
            jenisTindakan === "DIAGNOSTIK"
              ? handleSubmit()
              : jenisTindakan === "HD"
                ? handleSubmitHD()
                : jenisTindakan === "KONSUL"
                  ? handleSubmitkonsul()
                  : message.warning(
                    "Silahkan Pilih Jenis Tindakan Terlebih Dahulu!"
                  );
          }}
        >
          Kirim
        </Button>
      </Modal>

      {/* <MdDetailResorce /> */}
    </div>
  );
};

export default MedisDiagnostik;
