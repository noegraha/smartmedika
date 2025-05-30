import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Modal, Row, Table } from "antd";
import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import dayjs from "dayjs";

const Triase = () => {
  const {
    ihsPasien,
    identitasPx,
    paramEncounter,
    postResource,
    getRiwRscId,
    spCvg,
    getResourceById,
    setmsRscdetail,
  } = useContext(SatuSehatEncounterContext);
  const [modalTriase, setModalTriase] = useState(false);
  const [listTriase, setListTriase] = useState([]);

  const [triase, setTriase] = useState({ code: "", display: "" });
  const [codeStrk, setCodeStrk] = useState({ code: "", display: "" });
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
  const data = {
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
          code: triase.code,
          display: triase.display,
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
    effectiveDateTime: dayjs().subtract(7, "hour").format(),
    issued: dayjs().subtract(7, "hour").format(),
    performer: [
      {
        reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
      },
    ],
    valueCodeableConcept: {
      coding: [
        {
          system: "http://loinc.org",
          code: codeStrk.code,
          display: codeStrk.display,
        },
      ],
    },
  };
  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);

    if (codeGrup === "9") {
      setListTriase(data);
      console.log("data : ", data);
    }
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
        Kondisi Pasien Tiba (Triase)
      </Divider>
      <Row style={{ marginBottom: "5px" }}>
        <Col span={3}>SNOMED :</Col>
        <Col span={9}>
          <Button
            type="primary"
            onClick={() => {
              setModalTriase(true);
              setTriase({
                code: "75910-0",
                display: "Canadian triage and acuity scale [CTAS]",
              });
              setCodeStrk({ code: "LA6113-0", display: "2" });
              // setflagRiwayat("9");
            }}
            icon={<PlusOutlined />}
          >
            Tambah Triase
          </Button>
        </Col>
        <Col span={12}>
          <Button
            onClick={() => {
              klikRefresh("9");
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
          dataSource={listTriase}
          pagination={false}
          size="small"
        />
      </Row>
      <Modal
        open={modalTriase}
        onCancel={() => setModalTriase(false)}
        width="80%"
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
          Tambah Triase
        </Divider>
        Triase Code : <Input value={triase.code} />
        Triase Display : <Input value={triase.display} />
        <Divider />
        mRS Code : <Input value={codeStrk.code} />
        mRs Display :<Input value={codeStrk.display} />
        <Row>
          <Col span={24}>
            <Button
              type="primary"
              onClick={() => postResource(data, "Observation", "9")}
              style={{ float: "right", width: "150px" }}
            >
              Post Triase
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Triase;
