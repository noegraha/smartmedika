import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import {
  Button,
  Col,
  Divider,
  Input,
  InputNumber,
  Radio,
  Row,
  Slider,
  Table,
  Tabs,
} from "antd";
import KajianResikoJatuh from "../KajianResikoJatuh/KajianResikoJatuh";
import { SearchOutlined } from "@ant-design/icons";
// import { PlusOutlined } from "@ant-design/icons";

const AssesmenNyeri = () => {
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
  const [stateNyeri, setStateNyeri] = useState(false);
  const [skalaNRS, setSkalaNRS] = useState(0);
  const [skalaBPS, setSkalaBPS] = useState(0);
  const [facial, setFacial] = useState({
    code: "",
    display: "",
  });
  const [cry, setCry] = useState({
    code: "",
    display: "",
  });
  const [breath, setBreath] = useState({
    code: "",
    display: "",
  });
  const [arms, setArms] = useState({
    code: "",
    display: "",
  });
  const [legs, setLegs] = useState({
    code: "",
    display: "",
  });
  const [arousal, setArousal] = useState({
    code: "",
    display: "",
  });
  const [skalaNIPS, setSkalaNIPS] = useState(0);
  const [listAssesmenNyeri, setListAssesmenNyeri] = useState([]);
  const [listNRS, setListNRS] = useState([]);
  const items = [
    {
      key: "1",
      label: "Numeric Rating Scale Score",
      children: (
        <Row>
          <Col span={6}>Numeric Rating Scale Score :</Col>
          <Col span={18}>
            <Row>
              <Col span={12}>
                <Slider
                  min={1}
                  max={10}
                  onChange={(e) => setSkalaNRS(e)}
                  value={typeof skalaNRS === "number" ? skalaNRS : 0}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={10}
                  style={{
                    margin: "0 16px",
                  }}
                  value={skalaNRS}
                  onChange={(e) => setSkalaNRS(e)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      label: "Baker Pain Scale Score",
      children: (
        <Row>
          <Col span={6}>Baker Pain Scale Score :</Col>
          <Col span={18}>
            <Row>
              <Col span={12}>
                <Slider
                  min={1}
                  max={10}
                  onChange={(e) => setSkalaBPS(e)}
                  value={typeof skalaBPS === "number" ? skalaBPS : 0}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={10}
                  style={{
                    margin: "0 16px",
                  }}
                  value={skalaBPS}
                  onChange={(e) => setSkalaBPS(e)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      ),
    },
    {
      key: "3",
      label: "Neonatal Infant Pain Scale Score",
      children: (
        <div>
          <Row>
            <Col span={6}>Facial Expression :</Col>
            <Col span={18}>
              <Row>
                <Col span={4}>
                  <Input value={facial.code} />
                </Col>
                <Col span={12}>
                  <Input value={facial.display} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={6}>Cry :</Col>
            <Col span={18}>
              <Row>
                <Col span={4}>
                  <Input value={cry.code} />
                </Col>
                <Col span={12}>
                  <Input value={cry.display} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={6}>Breathing Pattern :</Col>
            <Col span={18}>
              <Row>
                <Col span={4}>
                  <Input value={breath.code} />
                </Col>
                <Col span={12}>
                  <Input value={breath.display} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={6}>Arms :</Col>
            <Col span={18}>
              <Row>
                <Col span={4}>
                  <Input value={arms.code} />
                </Col>
                <Col span={12}>
                  <Input value={arms.display} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={6}>Legs :</Col>
            <Col span={18}>
              <Row>
                <Col span={4}>
                  <Input value={legs.code} />
                </Col>
                <Col span={12}>
                  <Input value={legs.display} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={6}>State Of Arousal :</Col>
            <Col span={18}>
              <Row>
                <Col span={4}>
                  <Input value={arousal.code} />
                </Col>
                <Col span={12}>
                  <Input value={arousal.display} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={6}>Total Score NIPS :</Col>
            <Col span={18}>
              <Row>
                <Col span={4}>
                  <Input value={skalaNIPS} />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      ),
    },
  ];
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

    if (codeGrup === "12") {
      setListAssesmenNyeri(data);
      console.log("data : ", data);
    } else if (codeGrup === "13") {
      setListNRS(data);
      console.log("data : ", data);
    }
  };
  const onTabs = (key) => {
    console.log(key);
    if (key === "1") {
      setSkalaNRS(10);
    } else if (key === "2") {
      setSkalaBPS(8);
    } else if (key === "3") {
      setFacial({ code: "LA32299-2", display: "Grimace" });
      setCry({ code: "LA32301-6", display: "Whimper" });
      setBreath({
        code: "LA32284-4",
        display:
          "Change in breathing (e.g., indrawing, irregular, faster than usual, gagging, or breath holding)",
      });
      setArms({ code: "LA32285-1", display: "Restrained" });
      setLegs({ code: "LA32285-1", display: "Restrained" });
      setArousal({
        code: "LA32298-4",
        display: "Fussy (alert, restless, and/or thrashing)",
      });
      setSkalaNIPS(2);
    }
  };

  const dataNRS = {
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
          system: "http://snomed.info/sct",
          code: "1172399009",
          display: "Numeric rating scale score",
        },
      ],
    },
    performer: [
      {
        reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
      },
    ],
    subject: {
      reference: `Patient/${ihsPasien}`,
      display: identitasPx.Nama,
    },
    encounter: {
      reference: `Encounter/${paramEncounter.ResourceID}`,
    },
    effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
    issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
    valueInteger: 10,
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
          system: "http://snomed.info/sct",
          code: "22253000",
          display: "Pain",
        },
      ],
    },
    performer: [
      {
        reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
      },
    ],
    subject: {
      reference: `Patient/${ihsPasien}`,
      display: identitasPx.Nama,
    },
    encounter: {
      reference: `Encounter/${paramEncounter.ResourceID}`,
    },
    effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
    issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
    valueBoolean: stateNyeri,
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
        Assesmen Nyeri
      </Divider>
      <Row>
        <Col span={3}>Nyeri :</Col>
        <Col span={6}>
          <Radio.Group
            onChange={(e) => setStateNyeri(e.target.value)}
            value={stateNyeri}
          >
            <Radio value={true}>YA</Radio>
            <Radio value={false}>TIDAK</Radio>
          </Radio.Group>
        </Col>
        <Col span={15}>
          <Button
            type="primary"
            onClick={() => {
              console.log(data, dataNRS);
              postResource(data, "Observation", "12");
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
              klikRefresh("12");
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
          dataSource={listAssesmenNyeri}
          pagination={false}
          size="small"
        />
      </Row>
      {stateNyeri ? (
        <div>
          <Divider
            variant="dotted"
            orientation="left"
            style={{
              borderColor: "#7cb305",
            }}
          >
            Skala Nyeri
          </Divider>
          <Tabs defaultActiveKey="1" items={items} onChange={onTabs} />
          <Row>
            <Col span={24}>
              <Button
                type="primary"
                onClick={() => {
                  postResource(dataNRS, "Observation", "13");
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
                  klikRefresh("13");
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
              dataSource={listNRS}
              pagination={false}
              size="small"
            />
          </Row>
        </div>
      ) : (
        <></>
      )}

      <KajianResikoJatuh />
    </div>
  );
};

export default AssesmenNyeri;
