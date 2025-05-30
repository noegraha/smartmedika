import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import { Button, Col, Divider, Input, Row, Space, Spin } from "antd";

const Patch = () => {
  const { identitasPx, paramEncounter, patchResource, getRiwRscId, spCvg } =
    useContext(SatuSehatEncounterContext);
  const [diagnosisPrimer, setDiagnosisPrimer] = useState(null);
  const [diagnosisSekunder, setDiagnosaSekunder] = useState(null);
  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
    if (codeGrup === "79") {
      setDiagnosisPrimer(data.lenght !== 0 ? data[0].ResourceID : null);
      console.log(data.lenght !== 0 ? data[0] : null);
    } else if (codeGrup === "80") {
      setDiagnosaSekunder(data.lenght !== 0 ? data[0].ResourceID : null);
    }
  };

  const klikPatch = () => {
    let data = [];

    let tempData = {
      op: "add",
      path: "/problem",
      value: [
        {
          reference: `Condition/${diagnosisPrimer}`,
        },
        {
          reference: `Condition/${diagnosisSekunder}`,
        },
      ],
    };

    data.push(tempData);
    console.log("klikPatch : ", data);

    patchResource(data, "Encounter", paramEncounter.ResourceID);
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
        Patch Diagnosis Primer & Sekunder
      </Divider>

      <Spin
        spinning={spCvg}
        tip="Loading... 😁"
      >
        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>Diagnosis Primer :</Col>
          <Col span={21}>
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
        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>Diagnosis Sekunder :</Col>
          <Col span={21}>
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

        <hr />
        <Row>
          <Col span={24}>
            <Space style={{ float: "right" }}>
              <Button
                type="primary"
                onClick={() => klikPatch()}
                style={{ float: "right", width: "150px" }}
              >
                Patch
              </Button>
            </Space>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default Patch;
