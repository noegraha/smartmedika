import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Input,
  Row,
  Select,
} from "antd";
import React from "react";
import { useContext } from "react";
import { SatuSehatOrganizationContext } from "../context/SatuSehatOrganizationContext";
import dayjs from "dayjs";

const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;

const SSEncounter = () => {
  const {
    SSToken,
    OrgIhsNum,
    regPas,
    setregPas,
    satuSehatStatus,
    setsatuSehatStatus,
    IHSPAtient,
    IHSPraktisi,
    satuSehatNmPas,
    satuSehatNmPrak,
    periodStart,
    setperiodStart,
    periodEnd,
    setperiodEnd,
    satuSehatLokasi,
    setsatuSehatLokasi,
    satuSehatNmLokasi,
    setsatuSehatNmLokasi,
    idEncounter,
    idEncounterGet,
    setidEncounterGet,
    resPostEncounter,
    resGetEncounter,
    // func
    createEncounter,
    getEncounterbyId,
    // spin
    spGetEncounter,
  } = useContext(SatuSehatOrganizationContext);

  const klikCreateEncounter = () => {
    let identifier = [
      {
        system: `http://sys-ids.kemkes.go.id/encounter/${OrgIhsNum}`,
        value: regPas,
      },
    ];

    let class1 = {
      system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
      code: "AMB",
      display: "ambulatory",
    };

    let subject = {
      reference: `Patient/${IHSPAtient}`,
      display: satuSehatNmPas,
    };

    let participant = [
      {
        type: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                code: "ATND",
                display: "attender",
              },
            ],
          },
        ],
        individual: {
          reference: `Practitioner/${IHSPraktisi}`,
          display: satuSehatNmPrak,
        },
      },
    ];

    let period = {
      start: dayjs(periodStart).format(),
    };

    let location = [
      {
        location: {
          reference: satuSehatLokasi,
          display: satuSehatNmLokasi,
        },
      },
    ];

    let statusHistory = [
      {
        status: satuSehatStatus,
        period: {
          start: dayjs(periodStart).format(),
          end: dayjs(periodEnd).format(),
        },
      },
    ];

    let serviceProvider = {
      reference: `Organization/${OrgIhsNum}`,
    };

    let data = {};
    data.resourceType = "Encounter";
    data.identifier = identifier;
    data.status = satuSehatStatus;
    data.class = class1;
    data.subject = subject;
    data.participant = participant;
    data.period = period;
    data.location = location;
    data.statusHistory = statusHistory;
    data.serviceProvider = serviceProvider;

    console.log("send : ", data);
    createEncounter(data);
  };

  const klikGetEncounter = () => {
    getEncounterbyId(idEncounterGet);
  };

  return (
    <div>
      <Collapse defaultActiveKey={1}>
        <Panel header="CREATE ENCOUNTER" key="1">
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>IHS Rumah Sakit :</Col>
            <Col span={4}>
              <Input value={OrgIhsNum} size="small" />
            </Col>
            <Col span={4}>
              <span style={{ marginLeft: "5px" }}>No. Registrasi :</span>
            </Col>
            <Col span={4}>
              <Input
                value={regPas}
                onChange={(e) => setregPas(e.target.value)}
                size="small"
              />
            </Col>
            <Col span={4}>
              <span style={{ marginLeft: "5px" }}>Status :</span>
            </Col>
            <Col span={4}>
              <Select
                size="small"
                value={satuSehatStatus}
                defaultValue="arrived"
                style={{ width: "100%" }}
              >
                <Option value="arrived">Sudah datang</Option>
                <Option value="triaged">Triase</Option>
                <Option value="in-progress">Sedang berlangsung</Option>
                <Option value="onleave">Sedang pergi</Option>
                <Option value="finished">Sudah selesai</Option>
                <Option value="cancelled">Dibatalkan</Option>
              </Select>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>IHS Pasien :</Col>
            <Col span={4}>
              <Input value={IHSPAtient} size="small" />
            </Col>
            <Col span={4}>
              <span style={{ marginLeft: "5px" }}>Nama Pasien :</span>
            </Col>
            <Col span={12}>
              <Input value={satuSehatNmPas} size="small" />
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>IHS Praktisi :</Col>
            <Col span={4}>
              <Input value={IHSPraktisi} size="small" />
            </Col>
            <Col span={4}>
              <span style={{ marginLeft: "5px" }}>Nama Praktisi :</span>
            </Col>
            <Col span={12}>
              <Input value={satuSehatNmPrak} size="small" />
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>Period Start :</Col>
            <Col span={8}>
              <DatePicker
                size="small"
                value={dayjs(periodStart)}
                format={"DD-MM-YYYY HH:mm"}
                showTime
                onChange={(e) => setperiodStart(dayjs(e))}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={4}>
              <span style={{ marginLeft: "5px" }}>Period End :</span>
            </Col>
            <Col span={8}>
              <DatePicker
                size="small"
                value={dayjs(periodEnd)}
                format={"DD-MM-YYYY HH:mm"}
                showTime
                onChange={(e) => setperiodEnd(dayjs(e))}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>Lokasi :</Col>
            <Col span={8}>
              <Input value={satuSehatLokasi} size="small" />
            </Col>
            <Col span={4}>
              <span style={{ marginLeft: "5px" }}>Nama Lokasi :</span>
            </Col>
            <Col span={8}>
              <Input value={satuSehatNmLokasi} size="small" />
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col span={24}>
              <Button
                onClick={() => klikCreateEncounter()}
                type="primary"
                size="small"
                style={{ width: "100%" }}
              >
                CREATE
              </Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>ID Encounter :</Col>
            <Col span={20}>
              <Input value={idEncounter} size="small" />
            </Col>
          </Row>
          <Row>
            <Col>Response :</Col>
          </Row>
          <Row>
            <Col span={24}>
              <TextArea
                value={JSON.stringify(resPostEncounter, undefined, 2)}
                rows={11}
                placeholder="Response..."
              />
            </Col>
          </Row>
        </Panel>

        <Panel header="GET ENCOUNTER" key="2">
          <Card loading={spGetEncounter}>
            <Row style={{ marginBottom: "2px" }}>
              <Col span={4}>ID Encounter :</Col>
              <Col span={8}>
                <Input
                  value={idEncounterGet}
                  onChange={(e) => setidEncounterGet(e.target.value)}
                  size="small"
                />
              </Col>
              <Col span={12}>
                <Button
                  onClick={() => klikGetEncounter()}
                  type="primary"
                  size="small"
                  style={{ marginLeft: "5px", width: "100%" }}
                >
                  GET ENCOUNTER
                </Button>
              </Col>
            </Row>

            <Row>
              <Col>Response :</Col>
            </Row>
            <Row>
              <Col span={24}>
                <TextArea
                  value={JSON.stringify(resGetEncounter, undefined, 2)}
                  rows={11}
                  placeholder="Response..."
                />
              </Col>
            </Row>
          </Card>
        </Panel>

        <Panel header="PUT ENCOUNTER" key="3">
          <p>POST DIAGNOSTIC</p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default SSEncounter;
