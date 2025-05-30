import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import { Button, Col, Divider, Input, Modal, Row, Space, Spin, Table } from "antd";
import { SearchOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";

const RasionalKlinis = () => {
  const {
    ihsPasien,
    identitasPx,
    paramEncounter,
    postResource,
    patchResource,
    waktuPelayanan,
    getRiwRscId,
    spCvg,
    getResourceById,
    setmsRscdetail,
  } = useContext(SatuSehatEncounterContext);

  const [observationPenunjang, setObservationPenunjang] = useState(null);
  const [ket, setKet] = useState(null);
  const [listRasionalKlinis, setListRasionalKlinis] = useState([]);
  const [listDx1, setlistDx1] = useState([]);
  const [listDx2, setlistDx2] = useState([]);
  const [listPenilaianRisiko, setlistPenilaianRisiko] = useState([]);
  const [rscIdPatch, setrscIdPatch] = useState();
  const [mdPatch, setmdPatch] = useState(false);

  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);

    if (codeGrup === "68") {
      setObservationPenunjang(data.lenght !== 0 ? data[0].ResourceID : null);
      console.log(data);
    } else if (codeGrup === "78") {
      setListRasionalKlinis(data);
    } else if (codeGrup === "79") {
      setlistDx1(data);
    } else if (codeGrup === "80") {
      setlistDx2(data);
    } else if (codeGrup === "82") {
      setlistPenilaianRisiko(data);
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
      width: 150,
      render: (text, record, index) => (
        <div>
          <Space>
            <Button
              type="primary"
              onClick={() => klikDetail(record.ResourceID, record.ResourceType)}
              icon={<SearchOutlined />}
              size="small"
              style={{ backgroundColor: "#73d13d", borderColor: "#73d13d" }}
            />
            <Button
              type="default"
              onClick={() => {
                setmdPatch(true);
                setrscIdPatch(record.ResourceID);
              }}
              icon={<VerticalAlignBottomOutlined />}
              size="small"
            >
              Patch
            </Button>
          </Space>
        </div>
      ),
    },
  ];

  const colTriase1 = [
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
      width: 150,
      render: (text, record, index) => (
        <div>
          <Space>
            <Button
              type="primary"
              onClick={() => klikDetail(record.ResourceID, record.ResourceType)}
              icon={<SearchOutlined />}
              size="small"
              style={{ backgroundColor: "#73d13d", borderColor: "#73d13d" }}
            />
            {record.ResourceType === "RiskAssessment" ?
              <Button
                type="default"
                onClick={() => {
                  patchPenilaianResiko(rscIdPatch);
                }}
                icon={<VerticalAlignBottomOutlined />}
                size="small"
              >
                Patch
              </Button> : null
            }
          </Space>
        </div>
      ),
    }
  ];

  const klikDetail = (id, rscType) => {
    setmsRscdetail(true);
    getResourceById(id, rscType);
  };

  const patch = (rscId) => {
    const combinedArray = [...listDx1, ...listDx2];

    const array2 = combinedArray.map(item => ({
      reference: `Condition/${item.ResourceID}` // Membentuk properti reference dari ResourceID
    }));

    // console.log(array2);

    let dataPatch = [
      {
        op: "add",
        path: "/problem",
        value: array2
      }
    ];

    patchResource(dataPatch, 'ClinicalImpression', rscId);
  };

  const patchPenilaianResiko = (rscId) => {
    let data = listPenilaianRisiko.map(item => ({
      reference: `RiskAssessment/${item.ResourceID}`
    }));

    let dataPatch = [
      {
        op: "add",
        path: "/prognosisReference",
        value: data
      }
    ];

    // console.log('dataPatch : ', dataPatch);

    patchResource(dataPatch, 'ClinicalImpression', rscId);
  };

  const klikPost = () => {
    let dataRasionalKlinis = {
      resourceType: "ClinicalImpression",
      status: "completed",
      code: {
        coding: [
          {
            system: "http://terminology.kemkes.go.id",
            code: "TK000056",
            display: "Rasional Klinis",
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
      date: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      assessor: {
        reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
      },
      investigation: [
        {
          code: {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "271336007",
                display: "Examination / signs",
              },
            ],
          },
          item: [
            {
              reference: `Observation/${observationPenunjang}`,
              display: "Hasil Pemeriksaan Penunjang Laboratorium",
            },
          ],
        },
      ],
      summary: ket,
    };

    postResource(dataRasionalKlinis, "ClinicalImpression", "78");
  }

  return (
    <div>
      <Spin
        spinning={spCvg}
        tip="Loading... 😁"
      >
        <Divider
          variant="dotted"
          orientation="left"
          style={{
            borderColor: "#7cb305",
          }}
        >
          Tambah Rasional Klinis
        </Divider>

        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>Observasi Penunjang :</Col>
          <Col span={21}>
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <Input value={observationPenunjang} />
              <Button type="primary" onClick={() => klikRefresh("68")}
                style={{ width: '100px' }}>
                Refresh
              </Button>
            </Space.Compact>
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>Keterangan :</Col>
          <Col span={21}>
            <Space.Compact
              style={{
                width: "100%",
              }}>
              <Input value={ket} />
              <Button
                type="primary"
                onClick={() =>
                  setKet(
                    "Pasien datang dengan keluhan utama demam menggigil disertai sakit kepala. Hasil pemeriksaan penunjang mengarah pada kemungkinan pasien menderita Demam Berdarah"
                  )
                }
                style={{ width: '100px' }}
              >
                Ambil
              </Button>
            </Space.Compact>
          </Col>
        </Row>

        <hr />
        <Row>
          <Col span={24}>
            <Button
              type="primary"
              onClick={() => {
                // console.log(dataRasionalKlinis);
                klikPost();
              }}
              style={{ float: "right", width: "150px" }}
            >
              Post
              {/* Rasional Klinis */}
            </Button>
          </Col>
        </Row>

        <Divider
          variant="dotted"
          orientation="left"
          style={{
            borderColor: "#7cb305",
          }}
        >
          Rasional Klinis
        </Divider>

        <Row style={{ marginBottom: '5px' }}>
          <Col span={24}>
            <Button
              onClick={() => {
                klikRefresh("78");
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
            // loading={spCvg}
            columns={colTriase}
            dataSource={listRasionalKlinis}
            pagination={false}
            size="small"
          />
        </Row>
      </Spin>

      <Modal
        visible={mdPatch}
        onCancel={() => setmdPatch(false)}
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
          Patch Rasional Klinis
        </Divider>

        <Spin
          spinning={spCvg}
          tip="Loading... 😁"
        >

          <Row style={{ marginBottom: '5px' }}>
            <Col span={22}>
              <span>Diagnosa Primer</span>
            </Col>
            <Col span={2}>
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
            columns={colTriase1}
            dataSource={listDx1}
            pagination={false}
            size="small"
            style={{ marginBottom: '5px' }}
          />

          <Row style={{ marginBottom: '5px' }}>
            <Col span={22}>
              <span>Diagnosa Sekunder</span>
            </Col>
            <Col span={2}>
              <Button
                onClick={() => {
                  klikRefresh("80");
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
            columns={colTriase1}
            dataSource={listDx2}
            pagination={false}
            size="small"
            style={{ marginBottom: '5px' }}
          />

          <Row style={{ marginBottom: '5px' }}>
            <Col span={22}>
              <span>Penilaian Risiko</span>
            </Col>
            <Col span={2}>
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
            columns={colTriase1}
            dataSource={listPenilaianRisiko}
            pagination={false}
            size="small"
            style={{ marginBottom: '5px' }}
          />

          <span>Id Rasional Klinis : {rscIdPatch}</span>

          <hr />
          <Row>
            <Col span={24}>
              <Button
                type="primary"
                onClick={() => {
                  // console.log(dataPrimary);
                  patch(rscIdPatch);
                }}
                style={{ float: "right", width: "150px" }}
              >
                Patch
              </Button>
            </Col>
          </Row>

        </Spin>
      </Modal>
    </div >
  );
};

export default RasionalKlinis;
