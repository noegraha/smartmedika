import { Button, Checkbox, Col, Divider, Row, Table, Tabs } from "antd";
import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import { SearchOutlined } from "@ant-design/icons";

const Gastro = () => {
  const {
    ihsPasien,
    identitasPx,
    paramEncounter,
    postResource,
    waktuPelayanan,
    getRiwRscId,
    spCvg,
    ihsRS,
    getResourceById,
    setmsRscdetail,
  } = useContext(SatuSehatEncounterContext);
  const [jenis, setJenis] = useState({
    code: "62315008",
    display: "Diarrhea",
  });
  const [nilai, setNilai] = useState(true);
  const onTabs = (e) => {
    if (e === "62315008") {
      setJenis({ code: "62315008", display: "Diarrhea" });
    } else if (e === "79890006") {
      setJenis({ code: "79890006", display: "Loss of appetite" });
    } else if (e === "422587007") {
      setJenis({ code: "422587007", display: "Nausea" });
    } else if (e === "422400008") {
      setJenis({ code: "422400008", display: "Vomiting" });
    }
  };
  const [listGejalaGastro, setListGejalaGastro] = useState([]);
  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
    if (codeGrup === "56") {
      setListGejalaGastro(data);
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
  const data = {
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
          code: jenis.code,
          display: jenis.display,
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
    valueBoolean: nilai,
  };
  const items = [
    {
      label: "Diare",
      key: "62315008",
      children: (
        <>
          <Divider
            variant="dotted"
            orientation="left"
            style={{
              borderColor: "#7cb305",
            }}
          >
            Diare
          </Divider>
          <Row>
            <Col span={4}>Pilihan :</Col>
            <Col span={20}>
              <Checkbox
                value={nilai}
                checked={nilai}
                onChange={(e) => setNilai(e.target.checked)}
              />
            </Col>
          </Row>
        </>
      ),
    },
    {
      label: "Anoreksia",
      key: "79890006",
      children: (
        <>
          <Divider
            variant="dotted"
            orientation="left"
            style={{
              borderColor: "#7cb305",
            }}
          >
            Anoreksia
          </Divider>
          <Row>
            <Col span={4}>Pilihan :</Col>
            <Col span={20}>
              <Checkbox
                value={nilai}
                checked={nilai}
                onChange={(e) => setNilai(e.target.checked)}
              />
            </Col>
          </Row>
        </>
      ),
    },
    {
      label: "Mual",
      key: "422587007",
      children: (
        <>
          <Divider
            variant="dotted"
            orientation="left"
            style={{
              borderColor: "#7cb305",
            }}
          >
            Mual
          </Divider>
          <Row>
            <Col span={4}>Pilihan :</Col>
            <Col span={20}>
              <Checkbox
                value={nilai}
                checked={nilai}
                onChange={(e) => setNilai(e.target.checked)}
              />
            </Col>
          </Row>
        </>
      ),
    },
    {
      label: "Muntah",
      key: "422400008",
      children: (
        <>
          <Divider
            variant="dotted"
            orientation="left"
            style={{
              borderColor: "#7cb305",
            }}
          >
            Muntah
          </Divider>
          <Row>
            <Col span={4}>Pilihan :</Col>
            <Col span={20}>
              <Checkbox
                value={nilai}
                checked={nilai}
                onChange={(e) => setNilai(e.target.checked)}
              />
            </Col>
          </Row>
        </>
      ),
    },
  ];

  return (
    <div>
      <Divider
        variant="dotted"
        orientation="left"
        style={{
          borderColor: "#7cb305",
        }}
      >
        Gastro
      </Divider>
      <Tabs onChange={onTabs} type="card" items={items} />
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              console.log(data);
              postResource(data, "Observation", "56");
            }}
            style={{ float: "right", width: "150px" }}
          >
            Post Skrining Gastro
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            onClick={() => {
              klikRefresh("56");
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
          dataSource={listGejalaGastro}
          pagination={false}
          size="small"
        />
      </Row>
    </div>
  );
};

export default Gastro;
