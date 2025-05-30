import { Button, Col, Divider, Input, Radio, Row, Table } from "antd";
import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import dayjs from "dayjs";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const ResikoLukaDecubitus = () => {
  const {
    ihsPasien,
    identitasPx,
    paramEncounter,
    postResource,
    getRiwRscId,
    spCvg,
    getResourceById,
    setmsRscdetail,
    waktuPelayanan,
  } = useContext(SatuSehatEncounterContext);
  const [risikoLukaDecubitus, setRisikoLukaDecubitus] = useState(true);
  const [skalaNorton, setSkalaNorton] = useState(false);
  const [scoreSkalaNorton, setScoreSkalaNorton] = useState(0);
  const [listRisikoLuka, setListRisikoLuka] = useState([]);
  const [listSkalaNorton, setListSkalaNorton] = useState([]);
  const [skalaNortonId, setSkalaNortonId] = useState(null);
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
  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);

    if (codeGrup === "52") {
      setListRisikoLuka(data);
      console.log("data : ", data);
    } else if (codeGrup === "53") {
      setListSkalaNorton(data);
      console.log("data : ", data);
    }
  };

  const klikRefreshid = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
    if (codeGrup === "53") {
      setSkalaNortonId(data.lenght !== 0 ? data[0].ResourceID : null);
      console.log(data);
    }
  };
  const dataPilihan = {
    resourceType: "Observation",
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
          code: "285304000",
          display: "At risk of pressure injury",
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
      },
    ],
    valueBoolean: risikoLukaDecubitus,
    hasMember: [
      {
        reference: `Observation/${skalaNortonId}`,
      },
    ],
  };

  const dataSkalaNorton = {
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
          code: "75249-3",
          display: "Norton scale total score",
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
      },
    ],
    valueQuantity: {
      value: scoreSkalaNorton,
      unit: "{score}",
      system: "http://unitsofmeasure.org",
      code: "{score}",
    },
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
        Skala Norton
      </Divider>
      <Row>
        <Col span={3}>Nilai :</Col>
        <Col span={6}>
          <Input value={scoreSkalaNorton} />
        </Col>
        <Col span={15}>
          <Button
            type="primary"
            onClick={() => {
              console.log(dataSkalaNorton);
              postResource(dataSkalaNorton, "Observation", "53");
            }}
            style={{ float: "right", width: "150px" }}
          >
            Post Skala Norton
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            onClick={() => {
              klikRefresh("53");
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
          dataSource={listSkalaNorton}
          pagination={false}
          size="small"
        />
      </Row>
      <Divider
        variant="dotted"
        orientation="left"
        style={{
          borderColor: "#7cb305",
        }}
      >
        Risiko Luka Decubitus
      </Divider>
      <Row style={{ marginBottom: "5px" }}>
        <Col span={3}>SNOMED :</Col>
        <Col span={9}>
          <Radio.Group
            onChange={(e) => {
              setScoreSkalaNorton(12);
              setRisikoLukaDecubitus(e.target.value);
            }}
            value={risikoLukaDecubitus}
          >
            <Radio value={true}>YA</Radio>
            <Radio value={false}>TIDAK</Radio>
          </Radio.Group>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            onClick={() => {
              console.log(dataPilihan);
              postResource(dataPilihan, "Observation", "52");
            }}
            style={{ float: "right", width: "150px" }}
          >
            Post Risiko Luka
          </Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: "5px" }}>
        <Col span={3}>Skala Norton :</Col>
        <Col span={9}>
          <Input value={skalaNortonId} />
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            onClick={() => {
              klikRefreshid("53");
            }}
            style={{ float: "right", width: "150px" }}
          >
            Refresh
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            onClick={() => {
              klikRefresh("52");
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
          dataSource={listRisikoLuka}
          pagination={false}
          size="small"
        />
      </Row>
    </div>
  );
};

export default ResikoLukaDecubitus;
