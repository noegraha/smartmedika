import { PlusOutlined, SearchOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Modal, Row, Space, Spin, Table } from "antd";
import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import dayjs from "dayjs";

const Primary = () => {
  const {
    ihsPasien,
    identitasPx,
    paramEncounter,
    postResource,
    waktuPelayanan,
    getRiwRscId,
    getDiagPrimer,
    patchResource,
    spCvg,
    getResourceById,
    setmsRscdetail,
  } = useContext(SatuSehatEncounterContext);
  const [codeICD, setCodeICD] = useState({ code: "", display: "" });
  const [codeSNOMED, setCodeSNOMED] = useState({ code: "", display: "" });
  const [keterangan, setKeterangan] = useState(null);
  const [rasionalklinis, setRasionalKlinis] = useState(null);
  const [listDiagnosis, setListDiagnosis] = useState([]);
  const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);

  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
    if (codeGrup === "78") {
      setRasionalKlinis(data.lenght !== 0 ? data[0].ResourceID : null);
      console.log(data);
    } else if (codeGrup === "79") {
      setListDiagnosis(data);
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

  // const dataPrimary = 

  const load = async () => {
    let data = await getDiagPrimer(identitasPx.RegistrasiId);
    setCodeICD({
      code: data.DiagnosisId,
      display: data.Deskripsi,
    });
  };

  const post = () => {
    let data = {
      resourceType: "Condition",
      clinicalStatus: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: "active",
            display: "Active",
          },
        ],
      },
      category: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/condition-category",
              code: "encounter-diagnosis",
              display: "Encounter Diagnosis",
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: "http://hl7.org/fhir/sid/icd-10",
            code: codeICD.code,
            display: codeICD.display,
          }
          // {
          //   system: "http://snomed.info/sct",
          //   code: codeSNOMED.code,
          //   display: codeSNOMED.display,
          // },
        ],
        // text: keterangan,
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        display: identitasPx.Nama,
      },
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
      },
      onsetDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      recordedDate: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      // stage: [
      //   {
      //     assessment: [
      //       {
      //         reference: `ClinicalImpression/${rasionalklinis}`,
      //       },
      //     ],
      //   },
      // ],
    };

    postResource(data, "Condition", "79");
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
        Diagnosis Primer
      </Divider>

      <Row style={{ marginBottom: '5px' }}>
        <Col span={12}>
          <Button
            type="primary"
            onClick={() => {
              setCodeICD({
                code: null,
                display: null,
              });
              // setCodeSNOMED({
              //   code: "20927009",
              //   display: "Dengue hemorrhagic fever",
              // });
              // setKeterangan("Diagnosis primer Demam Berdarah (DHF)");
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
              klikRefresh("79");
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
        dataSource={listDiagnosis}
        pagination={false}
        size="small"
      />

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
          Tambah Diagnosa Primer
        </Divider>

        <Spin
          spinning={spCvg}
          tip="Loading... 😁"
        >
          <Row style={{ marginBottom: '2px' }}>
            <Col span={3}>
              <span>Code ICD :</span>
            </Col>
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
                  value={codeICD.code}
                />
                <Input
                  // style={{
                  //   width: "80%",
                  // }}
                  value={codeICD.display}
                />
                <Button
                  type="primary"
                  onClick={() => load()}
                >
                  LOAD
                </Button>
              </Space.Compact>
            </Col>
          </Row>

          {/* <Row style={{ marginBottom: '2px' }}>
            <Col span={3}>
              <span>Code SNOMED :</span>
            </Col>
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
                  value={codeSNOMED.code}
                />
                <Input
                  style={{
                    width: "80%",
                  }}
                  value={codeSNOMED.display}
                />
              </Space.Compact>
            </Col>
          </Row>
          <Row style={{ marginBottom: '2px' }}>
            <Col span={3}>
              <span>Keterangan :</span>
            </Col>
            <Col span={21}>
              <Input value={keterangan} />
            </Col>
          </Row>
          <Row style={{ marginBottom: '2px' }}>
            <Col span={3}>
              <span>Rasional Klinis :</span>
            </Col>
            <Col span={21}>
              <Space.Compact
                style={{
                  width: "100%",
                }}
              >
                <Input value={rasionalklinis} />
                <Button type="primary" onClick={() => klikRefresh("78")}>
                  Refresh
                </Button>
              </Space.Compact>
            </Col>
          </Row> */}

          <hr />
          <Row>
            <Col span={24}>
              <Button
                type="primary"
                onClick={() => {
                  // console.log(dataPrimary);
                  post();
                }}
                style={{ float: "right", width: "150px" }}
              >
                Post
              </Button>
            </Col>
          </Row>
        </Spin>
      </Modal>
    </div>
  );
};

export default Primary;
