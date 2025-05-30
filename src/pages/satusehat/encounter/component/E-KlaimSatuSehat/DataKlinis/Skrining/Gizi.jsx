import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Row, Table } from "antd";
import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import dayjs from "dayjs";

const Gizi = () => {
  const {
    ihsPasien,
    identitasPx,
    paramEncounter,
    postResource,
    ihsRS,
    waktuPelayanan,
    getRiwRscId,
    spCvg,
    getResourceById,
    setmsRscdetail,
  } = useContext(SatuSehatEncounterContext);
  const [scoreSkriningGizi, setScoreSkriningGizi] = useState(0);
  const [scoreGizi, setScoreGizi] = useState(0);
  const [listSkriningGizi, setListSkriningGizi] = useState([]);
  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
    if (codeGrup === "55") {
      setListSkriningGizi(data);
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
  const dataResikoMalnutrisiAnak = {
    resourceType: "Observation",
    identifier: [
      {
        system: `http://sys-ids.kemkes.go.id/observation/${ihsRS}`,
        value: identitasPx.RegistrasiId,
      },
    ],
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
          system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
          code: "OC000184",
          display: "Hasil skrining risiko malnutrisi",
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
      value: scoreSkriningGizi,
      unit: "{score}",
      system: "http://unitsofmeasure.org",
      code: "{score}",
    },
    interpretation: [
      {
        coding: [
          {
            system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
            code: scoreGizi.code,
            display: scoreGizi.display,
          },
        ],
      },
    ],
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
        Gizi
      </Divider>
      <Col span={9}>
        <Button
          type="primary"
          onClick={() => {
            setScoreSkriningGizi(5);
            setScoreGizi({
              code: "OV000300",
              display: "Risiko malnutrisi tinggi",
            });
          }}
          icon={<PlusOutlined />}
        >
          Tambah Skrining Gizi Anak
        </Button>
      </Col>
      <Row>
        <Col span={4}>Score :</Col>
        <Col span={20}>
          <Input value={scoreSkriningGizi} />
        </Col>
      </Row>
      <Row>
        <Col span={4}>Code :</Col>
        <Col span={20}>
          <Input value={scoreGizi.code} />
        </Col>
      </Row>
      <Row>
        <Col span={4}>Display :</Col>
        <Col span={20}>
          <Input value={scoreGizi.display} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              console.log(dataResikoMalnutrisiAnak);
              postResource(dataResikoMalnutrisiAnak, "Observation", "55");
            }}
            style={{ float: "right", width: "150px" }}
          >
            Post Skrining Gizi
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            onClick={() => {
              klikRefresh("55");
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
          dataSource={listSkriningGizi}
          pagination={false}
          size="small"
        />
      </Row>
    </div>
  );
};

export default Gizi;
