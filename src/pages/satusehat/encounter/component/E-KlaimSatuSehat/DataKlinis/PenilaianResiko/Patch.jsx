import { Button, Col, Divider, Input, Row, Space } from "antd";
import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";

const PatchResiko = () => {
  const { identitasPx, paramEncounter, patchResource, getRiwRscId } =
    useContext(SatuSehatEncounterContext);
  const [penilaianResiko, setPenilaianResiko] = useState(null);

  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
    if (codeGrup === "82") {
      setPenilaianResiko(data.lenght !== 0 ? data[0].ResourceID : null);
    }
  };

  const klikPatch = () => {
    let data = [];

    let tempData = {
      op: "add",
      path: "/prognosisReference",
      value: [
        {
          reference: `Condition/${penilaianResiko}`,
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
        Patch Penilaian Resiko
      </Divider>

      <Row style={{ marginBottom: '2px' }}>
        <Col span={3}>Penilaian Resiko :</Col>
        <Col span={21}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={penilaianResiko} />
            <Button type="primary" onClick={() => klikRefresh("82")}>
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
    </div>
  );
};

export default PatchResiko;
