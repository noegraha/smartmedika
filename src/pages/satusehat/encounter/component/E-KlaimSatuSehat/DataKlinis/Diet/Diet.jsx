import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Row, Space, Table } from "antd";
import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import dayjs from "dayjs";

const Diet = () => {
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
  const [exclude, setExclude] = useState({
    code: "",
    display: "",
  });
  const [oral, setOral] = useState({
    code: "",
    display: "",
  });
  const [nutrisi, setNutrisi] = useState({
    code: "",
    display: "",
  });
  const [amount, setAmount] = useState({
    value: 0,
    unit: "",
  });
  const [listDiet, setListDiet] = useState([]);
  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
    if (codeGrup === "98") {
      setListDiet(data);
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
  const dataDiet = {
    resourceType: "NutritionOrder",
    status: "active",
    intent: "proposal",
    patient: {
      reference: `Patient/${ihsPasien}`,
    },
    encounter: {
      reference: `Encounter/${paramEncounter.ResourceID}`,
    },
    dateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
    orderer: {
      reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
    },
    excludeFoodModifier: [
      {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: exclude.code,
            display: exclude.display,
          },
        ],
      },
    ],
    oralDiet: {
      type: [
        {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: oral.code,
              display: oral.display,
            },
          ],
        },
      ],
      nutrient: [
        {
          modifier: {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: nutrisi.code,
                display: nutrisi.display,
              },
            ],
          },
          amount: {
            value: amount.value,
            unit: amount.unit,
            system: "http://unitsofmeasure.org",
            code: amount.unit,
          },
        },
      ],
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
        Diet
      </Divider>
      <Col span={9}>
        <Button
          type="primary"
          onClick={() => {
            setExclude({ code: "1296980001", display: "Soft drink" });
            setOral({
              code: "113148007",
              display: "Fluid intake encouragement",
            });
            setNutrisi({ code: "444695006", display: "Mineral water" });
            setAmount({ value: 2, unit: "L" });
          }}
          icon={<PlusOutlined />}
        >
          Tambah Diet
        </Button>
      </Col>
      <Row>
        <Col span={4}>Exclude Food Modifier :</Col>
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
              value={exclude.code}
            />
            <Input
              style={{
                width: "80%",
              }}
              value={exclude.display}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Diet Oral :</Col>
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
              value={oral.code}
            />
            <Input
              style={{
                width: "80%",
              }}
              value={oral.display}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Nutrition :</Col>
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
              value={nutrisi.code}
            />
            <Input
              style={{
                width: "80%",
              }}
              value={nutrisi.display}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Amount :</Col>
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
              value={amount.value}
            />
            <Input
              style={{
                width: "20%",
              }}
              value={amount.unit}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              console.log(dataDiet);
              postResource(dataDiet, "NutritionOrder", "98");
            }}
            style={{ float: "right", width: "150px" }}
          >
            Post Diet
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            onClick={() => {
              klikRefresh("98");
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
          dataSource={listDiet}
          pagination={false}
          size="small"
        />
      </Row>
    </div>
  );
};

export default Diet;
