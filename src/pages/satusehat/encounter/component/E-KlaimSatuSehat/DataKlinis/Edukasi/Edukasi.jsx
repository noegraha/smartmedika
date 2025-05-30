import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Row, Space, Table } from "antd";
import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import dayjs from "dayjs";

const Edukasi = () => {
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
  } = useContext(SatuSehatEncounterContext);
  const [edukasiSNOMED, setEdukasiSNOMED] = useState({
    code: "",
    display: "",
  });
  const [edukasi, setEdukasi] = useState({
    code: "",
    display: "",
  });
  const [keterangan, setKeterangan] = useState("");
  const [listEdukasi, setListEdukasi] = useState([]);
  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
    if (codeGrup === "99") {
      setListEdukasi(data);
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
  const dataEdukasi = {
    resourceType: "Procedure",
    status: "completed",
    category: {
      coding: [
        {
          system: "http://snomed.info/sct",
          code: "409073007",
          display: "Education",
        },
      ],
      text: "Education",
    },
    code: {
      coding: [
        {
          system: "http://snomed.info/sct",
          code: edukasiSNOMED.code,
          display: edukasiSNOMED.display,
        },
        {
          system: "http://terminology.kemkes.go.id/CodeSystem/kptl",
          code: edukasi.code,
          display: edukasiSNOMED.display,
        },
      ],
    },
    subject: {
      reference: `Patient/${ihsPasien}`,
      display: identitasPx.Nama,
    },
    encounter: {
      reference: `Encounter/${paramEncounter.ResourceID}`,
      display: `Edukasi Proses Penyakit, Diagnosis, dan Rencana Asuhan kepada ${identitasPx.Nama} di hari Kamis, 22 Desember 2022`,
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
    note: [
      {
        text: keterangan,
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
        Edukasi
      </Divider>
      <Col span={9}>
        <Button
          type="primary"
          onClick={() => {
            setEdukasi({
              code: "10913",
              display: "Edukasi Kesehatan Individu",
            });
            setEdukasiSNOMED({
              code: "84635008",
              display: "Disease process or condition education ",
            });
            setKeterangan(
              "Edukasi Proses Penyakit, Diagnosis, dan Rencana Asuhan"
            );
          }}
          icon={<PlusOutlined />}
        >
          Tambah Edukasi
        </Button>
      </Col>
      <Row>
        <Col span={4}>Edukasi SNOMED :</Col>
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
              value={edukasiSNOMED.code}
            />
            <Input
              style={{
                width: "80%",
              }}
              value={edukasiSNOMED.display}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Edukasi :</Col>
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
              value={edukasi.code}
            />
            <Input
              style={{
                width: "80%",
              }}
              value={edukasi.display}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Keterangan :</Col>
        <Col span={20}>
          <Input value={keterangan} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              console.log(dataEdukasi);
              postResource(dataEdukasi, "Procedure", "99");
            }}
            style={{ float: "right", width: "150px" }}
          >
            Post Edukasi
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            onClick={() => {
              klikRefresh("99");
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
          dataSource={listEdukasi}
          pagination={false}
          size="small"
        />
      </Row>
    </div>
  );
};

export default Edukasi;
