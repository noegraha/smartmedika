import { Button, Col, Divider, Input, Row, Table } from "antd";
import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import dayjs from "dayjs";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const KajianResikoJatuh = () => {
  const {
    ihsPasien,
    identitasPx,
    paramEncounter,
    postResource,
    waktuPelayanan,
    getRiwRscId,
    spCvg,
    getResourceById,
    setmsRscdetail,
  } = useContext(SatuSehatEncounterContext);
  const [scoreMorse, setScoreMorse] = useState(0);
  const [codeMorse, setCodeMorse] = useState({ code: "", display: "" });
  const [ketMorse, setketMorse] = useState("");
  const [listMorse, setListMorse] = useState([]);
  const onAmbil = () => {
    setScoreMorse(44);
    setketMorse("Risiko sedang");
    setCodeMorse({
      code: "OI000027",
      display: "25 - 44 (Risiko sedang)",
    });
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
  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);

    if (codeGrup === "14") {
      setListMorse(data);
      console.log("data : ", data);
    }
  };
  const dataMorse = {
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
          system: "http://loinc.org",
          code: "59461-4",
          display: "Fall risk level [Morse Fall Scale]",
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
      value: scoreMorse,
      unit: "{score}",
      system: "http://unitsofmeasure.org",
      code: "{score}",
    },
    interpretation: [
      {
        coding: [
          {
            system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
            code: codeMorse.code,
            display: codeMorse.display,
          },
        ],
        text: "Risiko sedang",
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
        Kajian Resiko Jatuh
      </Divider>
      <Button type="primary" onClick={() => onAmbil()} icon={<PlusOutlined />}>
        Tambah Kajian
      </Button>
      <Row>
        <Col span={3}>Nilai :</Col>
        <Col span={6}>
          <Input value={scoreMorse} />
        </Col>
      </Row>
      <Row>
        <Col span={3}>Code SNOMED :</Col>
        <Col span={6}>
          <Input value={codeMorse.code} />
        </Col>
      </Row>
      <Row>
        <Col span={3}>Deskripsi :</Col>
        <Col span={6}>
          <Input value={codeMorse.display} />
        </Col>
      </Row>
      <Row>
        <Col span={3}>Keterangan :</Col>
        <Col span={6}>
          <Input value={ketMorse} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              console.log(dataMorse);
              postResource(dataMorse, "Observation", "14");
            }}
            style={{ float: "right", width: "150px" }}
          >
            Post Assesmen
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            onClick={() => {
              klikRefresh("14");
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
          dataSource={listMorse}
          pagination={false}
          size="small"
        />
      </Row>
    </div>
  );
};

export default KajianResikoJatuh;
