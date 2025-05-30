import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Modal, Row, Space, Spin, Table } from "antd";
import PatchResiko from "./Patch";

const PenilaianResiko = () => {
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
  const [prediksi, setPrediksi] = useState({ code: "", display: "" });
  const [decimal, setDecimal] = useState(null);
  const [mitigasi, setMitigasi] = useState(null);
  const [diagnosisPrimer, setDiagnosisPrimer] = useState(null);
  const [keluhanUtama, setKeluhanUtama] = useState(null);
  const [listRasionalKlinis, setListPenilaianResiko] = useState([]);
  const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);

  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
    if (codeGrup === "79") {
      setDiagnosisPrimer(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "1") {
      setKeluhanUtama(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "82") {
      setListPenilaianResiko(data);
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


  const klikPost = () => {
    let data = {
      resourceType: "RiskAssessment",
      status: "final",
      code: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "709510001",
            display: "Assessment of risk for disease",
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
      },
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
      },
      performer: {
        reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
      },
      condition: {
        reference: `Condition/${diagnosisPrimer}`,
      },
      reasonReference: [
        {
          reference: `Condition/${keluhanUtama}`,
        },
      ],
      prediction: [
        {
          outcome: {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: prediksi.code,
                display: prediksi.display,
              },
            ],
          },
          probabilityDecimal: decimal,
        },
      ],
      mitigation: mitigasi,
    };

    postResource(data, "RiskAssessment", "82");
  }

  return (
    <div>
      <Divider
        variant="dotted"
        orientation="left"
        style={{
          borderColor: "#7cb305",
        }}
      >
        Penilaian Resiko
      </Divider>

      <Spin
        spinning={spCvg}
        tip="Loading... 😁"
      >
        <Row style={{ marginBottom: '5px' }}>
          <Col span={12}>
            <Button
              type="primary"
              onClick={() => {
                setMitigasi(
                  "Perlu diberikan infus untuk mencegah DB semakin parah"
                );
                setDecimal(0.2);
                setPrediksi({
                  code: "409678004",
                  display: "Dengue hemorrhagic fever, grade III",
                });
                setmdTambahRiwayat(true);
              }}
              icon={<PlusOutlined />}
            >
              Tambah
            </Button>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                klikRefresh("82");
              }}
              style={{ float: "right" }}
            >
              Refresh
            </Button>
          </Col>
        </Row>

        <Table
          bordered
          // loading={spCvg}
          columns={colTriase}
          dataSource={listRasionalKlinis}
          pagination={false}
          size="small"
        />
      </Spin>

      <Modal
        visible={mdTambahRiwayat}
        onCancel={() => setmdTambahRiwayat(false)}
        width="80%"
        footer={null}
        closable={false}
        style={{ top: 50 }}
      >
        <Divider
          variant="dotted"
          orientation="left"
          style={{
            borderColor: '#7cb305',
          }}
        >
          Tambah Penilaian Resiko
        </Divider>

        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>Diagnosa Primer :</Col>
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
          <Col span={3}>Prediction :</Col>
          <Col span={21}>
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <Input value={keluhanUtama} />
              <Button type="primary" onClick={() => klikRefresh("1")}>
                Refresh
              </Button>
            </Space.Compact>
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>Prediction :</Col>
          <Col span={21}>
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <Input
                style={{
                  width: "20%",
                }}
                value={prediksi.code}
              />
              <Input
                style={{
                  width: "80%",
                }}
                value={prediksi.display}
              />
            </Space.Compact>
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>Decimal :</Col>
          <Col span={21}>
            <Input value={decimal} />
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>Mitigasi :</Col>
          <Col span={21}>
            <Input value={mitigasi} />
          </Col>
        </Row>

        <hr />
        <Row>
          <Col span={24}>
            <Button
              type="primary"
              onClick={() => {
                // console.log(data);
                klikPost();
              }}
              style={{ float: "right", width: "150px" }}
            >
              Post
            </Button>
          </Col>
        </Row>
      </Modal>

      {/* <PatchResiko /> */}
    </div>
  );
};

export default PenilaianResiko;
