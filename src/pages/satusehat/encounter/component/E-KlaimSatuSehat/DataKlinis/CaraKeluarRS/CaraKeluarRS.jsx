import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import dayjs from "dayjs";
import { Button, Col, Divider, Input, Row, Space, Table } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const CaraKeluarRS = () => {
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
    ihsRS,
  } = useContext(SatuSehatEncounterContext);
  const [diagnosisPrimer, setDiagnosisPrimer] = useState(null);
  const [diagnosisSekunder, setDiagnosisSekunder] = useState(null);
  const [keluhanUtama, setKeluhanUtama] = useState(null);
  const [listKeluar, setListKeluar] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
    if (codeGrup === "106") {
      setListKeluar(data);
    } else if (codeGrup === "79") {
      setDiagnosisPrimer(data.lenght !== 0 ? data[0].ResourceID : null);
      console.log(data.lenght !== 0 ? data[0] : null);
    } else if (codeGrup === "80") {
      setDiagnosisSekunder(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "1") {
      setKeluhanUtama(data.lenght !== 0 ? data[0].ResourceID : null);
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
      resourceType: "Encounter",
      id: "{{Encounter_id}}",
      identifier: [
        {
          system: `http://sys-ids.kemkes.go.id/servicerequest/${ihsRS}`,
          value: identitasPx.RegistrasiId,
        },
      ],
      status: "finished",
      class: {
        system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        code: "AMB",
        display: "ambulatory",
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
        display: identitasPx.Nama,
      },
      participant: [
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
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        },
      ],
      period: {
        start: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        end: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      },
      length: {
        value: 300,
        unit: "min",
        system: "http://unitsofmeasure.org",
        code: "min",
      },
      location: [
        {
          location: {
            reference: `Location/${paramEncounter.SatuSehatIdRuang}`,
            display: paramEncounter.RuangDeskripsi,
          },
          period: {
            start: dayjs(paramEncounter.TanggalMasuk)
              .subtract(7, "hour")
              .format(),
            end: dayjs(waktuPelayanan).subtract(7, "hour").format(),
          },
          extension: [
            {
              url: "https://fhir.kemkes.go.id/r4/StructureDefinition/ServiceClass",
              extension: [
                {
                  url: "value",
                  valueCodeableConcept: {
                    coding: [
                      {
                        system:
                          "http://terminology.kemkes.go.id/CodeSystem/locationServiceClass-Outpatient",
                        code: "reguler",
                        display: "Kelas Reguler",
                      },
                    ],
                  },
                },
                {
                  url: "upgradeClassIndicator",
                  valueCodeableConcept: {
                    coding: [
                      {
                        system:
                          "http://terminology.kemkes.go.id/CodeSystem/locationUpgradeClass",
                        code: "kelas-tetap",
                        display: "Kelas Tetap Perawatan",
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
      diagnosis: [
        {
          condition: {
            reference: `Condition/${diagnosisPrimer}`,
          },
          use: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/diagnosis-role",
                code: "DD",
                display: "Discharge diagnosis",
              },
            ],
          },
          rank: 1,
        },
        {
          condition: {
            reference: `Condition/${diagnosisSekunder}`,
          },
          use: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/diagnosis-role",
                code: "DD",
                display: "Discharge diagnosis",
              },
            ],
          },
          rank: 2,
        },
        {
          condition: {
            reference: `Condition/${keluhanUtama}`,
          },
          use: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/diagnosis-role",
                code: "CC",
                display: "Chief Complaint",
              },
            ],
          },
        },
      ],
      statusHistory: [
        {
          status: "arrived",
          period: {
            start: dayjs(waktuPelayanan).subtract(7, "hour").format(),
            end: dayjs(waktuPelayanan).subtract(7, "hour").format(),
          },
        },
        {
          status: "in-progress",
          period: {
            start: dayjs(waktuPelayanan).subtract(7, "hour").format(),
            end: dayjs(waktuPelayanan).subtract(7, "hour").format(),
          },
        },
        {
          status: "finished",
          period: {
            start: dayjs(waktuPelayanan).subtract(7, "hour").format(),
            end: dayjs(waktuPelayanan).subtract(7, "hour").format(),
          },
        },
      ],
      hospitalization: {
        dischargeDisposition: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/discharge-disposition",
              code: "home",
              display: "Home",
            },
          ],
          text: keterangan,
        },
      },
      serviceProvider: {
        reference: `Organization/${ihsRS}`,
      },
    };

    postResource(data, "Encounter", "102");
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
        Prognosis
      </Divider>
      <Col span={9}>
        <Button
          type="primary"
          onClick={() => {
            setKeterangan(
              "Anjuran dokter untuk pulang dan kontrol kembali 1 minggu setelah istirahat"
            );
          }}
          icon={<PlusOutlined />}
        >
          Tambah Cara Keluar
        </Button>
      </Col>
      <Row>
        <Col span={4}>Diagnosis Primer :</Col>
        <Col span={20}>
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
      <Row>
        <Col span={4}>Keluhan Utama :</Col>
        <Col span={20}>
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
      <Row>
        <Col span={4}>Diagnosis Sekunder :</Col>
        <Col span={20}>
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
      <Row>
        <Col span={4}>Keterangan :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={keterangan} />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              // console.log(data);
              // postResource(data, "Encounter", "102");
              klikPost();
            }}
            style={{ float: "right", width: "150px" }}
          >
            Post Cara Keluar
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            onClick={() => {
              klikRefresh("106");
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
          dataSource={listKeluar}
          pagination={false}
          size="small"
        />
      </Row>
    </div>
  );
};

export default CaraKeluarRS;
