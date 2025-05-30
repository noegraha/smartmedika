import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import dayjs from "dayjs";
import { Button, Col, Divider, Input, Row, Space, Table } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const Prognosis = () => {
  const {
    ihsPasien,
    waktuPelayanan,
    identitasPx,
    paramEncounter,
    postResource,
    getRiwRscId,
    spCvg,
    getResourceById,
    setmsRscdetail,
    ihsRS,
  } = useContext(SatuSehatEncounterContext);
  const [diagnosisPrimer, setDiagnosisPrimer] = useState(null);
  const [diagnosisPrimerCode, setDiagnosisPrimerCode] = useState({
    code: "",
    display: "",
  });
  const [diagnosisSekunder, setDiagnosaSekunder] = useState(null);
  const [diagnosisSekunderCode, setDiagnosaSekunderCode] = useState({
    code: "",
    display: "",
  });
  const [observationLab, setObservationLab] = useState(null);
  const [investigation, setInvestigation] = useState(null);
  const [summary, setSummary] = useState(null);
  const [prognosisId, setPrognosisId] = useState("");

  const [listPrognosis, setListPrognosis] = useState([]);
  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
    if (codeGrup === "102") {
      setListPrognosis(data);
    } else if (codeGrup === "79") {
      setDiagnosisPrimer(data.lenght !== 0 ? data[0].ResourceID : null);
      console.log(data.lenght !== 0 ? data[0] : null);
    } else if (codeGrup === "80") {
      setDiagnosaSekunder(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "68") {
      setObservationLab(data.lenght !== 0 ? data[0].ResourceID : null);
    }
  };
  const colTriase = [
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
  const klikDetail = (id, rscType) => {
    setmsRscdetail(true);
    getResourceById(id, rscType);
  };

  const klikPost = () => {
    let dataPrognosis = {
      resourceType: "ClinicalImpression",
      identifier: [
        {
          system: `http://sys-ids.kemkes.go.id/servicerequest/${ihsRS}`,
          use: "official",
          value: prognosisId,
        },
      ],
      status: "completed",
      code: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "20481000",
            display: "Determination of prognosis",
          },
        ],
      },
      description: `Ibu ${identitasPx.Nama}Terdiagnosis Gagal Ginjal Stage 5`,
      subject: {
        reference: `Patient/${ihsPasien}`,
        display: identitasPx.Nama,
      },
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
        display: `Kunjungan ${identitasPx.Nama} di hari Kamis, 22 Desember 2022`,
      },
      effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      date: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      assessor: {
        reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
      },
      problem: [
        {
          reference: `Condition/${diagnosisPrimer}`,
        },
      ],
      investigation: [
        {
          code: {
            text: investigation,
          },
          item: [
            {
              reference: `Observation/${observationLab}`,
              display: "Hasil Pemeriksaan Penunjang Laboratorium",
            },
          ],
        },
        // {
        //   code: {
        //     text: "Pemeriksaan USG Ginjal",
        //   },
        //   item: [
        //     {
        //       reference: "Observation/{{Observation_RadResult_id}}",
        //       display: "Hasil Pemeriksaan Penunjang Radiologi",
        //     },
        //   ],
        // },
      ],
      summary: summary,
      finding: [
        {
          itemCodeableConcept: {
            coding: [
              {
                system: "http://hl7.org/fhir/sid/icd-10",
                code: diagnosisPrimerCode.code,
                display: diagnosisPrimerCode.display,
              },
            ],
          },
          itemReference: {
            reference: `Condition/${diagnosisPrimer}`,
          },
        },
        {
          itemCodeableConcept: {
            coding: [
              {
                system: "http://hl7.org/fhir/sid/icd-10",
                code: diagnosisSekunderCode.code,
                display: diagnosisSekunderCode.display,
              },
            ],
          },
          itemReference: {
            reference: `Condition/${diagnosisSekunder}`,
          },
        },
      ],
      prognosisCodeableConcept: [
        {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "65872000",
              display: "Fair prognosis",
            },
          ],
        },
      ],
    };

    postResource(dataPrognosis, "ClinicalImpression", "102");
  };

  return (
    <div>
      <Divider
        variant="dotted"
        orientation="left"
        style={{
          borderColor: "#7cb305",
        }}
      >
        Prognosis
      </Divider>
      <Col span={9}>
        <Button
          type="primary"
          onClick={() => {
            setInvestigation("Pemeriksaan Kreatinin");
            setSummary("Prognosis Gagal Ginjal Stage 5");
            setDiagnosisPrimerCode({
              code: "N18.5",
              display: "Chronic kidney disease, stage 5",
            });
            setDiagnosaSekunderCode({
              code: "D63.8",
              display: "Anemia in chronic kidney disease",
            });
            setPrognosisId("10422");
          }}
          icon={<PlusOutlined />}
        >
          Tambah Prognosis
        </Button>
      </Col>
      <Row>
        <Col span={4}>Diagnosis Primer :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={diagnosisPrimer} />
            <Button type="primary" onClick={() => klikRefresh("79")}>
              Refresh
            </Button>
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Diagnosis Primer :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input
              style={{
                width: "20%",
              }}
              value={diagnosisPrimerCode.code}
            />
            <Input
              style={{
                width: "80%",
              }}
              value={diagnosisPrimerCode.display}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Diagnosis Sekunder :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={diagnosisSekunder} />
            <Button type="primary" onClick={() => klikRefresh("80")}>
              Refresh
            </Button>
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Diagnosis Sekunder :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input
              style={{
                width: "20%",
              }}
              value={diagnosisSekunderCode.code}
            />
            <Input
              style={{
                width: "80%",
              }}
              value={diagnosisSekunderCode.display}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              // console.log(dataPrognosis);
              // postResource(dataPrognosis, "ClinicalImpression", "102");
              klikPost();
            }}
            style={{ float: "right", width: "150px" }}
          >
            Post Prognosis
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            onClick={() => {
              klikRefresh("102");
            }}
            style={{ float: "right" }}
          >
            Refresh
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          bordered
          loading={spCvg}
          columns={colTriase}
          dataSource={listPrognosis}
          pagination={false}
          size="small"
        />
      </Row>
    </div>
  );
};

export default Prognosis;
