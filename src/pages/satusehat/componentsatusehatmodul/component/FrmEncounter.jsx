/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { SatuSehatModulContext } from "../context/SatuSehatModulContext";
import dayjs from "dayjs";
import FrmMdEditJSON from "./FrmMdEditJSON";

const { Title } = Typography;
const { TextArea } = Input;

const FrmEncounter = () => {
  const {
    ihsRS,
    identitasPx,
    ihsPasien,
    paramEncounter,
    setparamEncounter,

    spCvg,

    detailEnc, setdetailEnc,

    getParamEncounter,
    getResourceById,
    getRiwRscId,
    postResource,
    postResourcev2,
    putResource,
  } = useContext(SatuSehatModulContext);



  useEffect(() => {
    const fetchData = async () => {
      const result = await getResourceById(paramEncounter.ResourceID, "Encounter");
      console.log("Fetched data:", result);

      setdetailEnc(result.statusHistory);
    };

    if (paramEncounter && paramEncounter.ResourceID) {
      fetchData();
    }
    else {
      setdetailEnc([]);
    }
  }, [paramEncounter]);

  const klikPost = () => {
    let data = {};

    data = {
      resourceType: "Encounter",
      identifier: [
        {
          system: `http://sys-ids.kemkes.go.id/encounter/${ihsRS}`,
          value: identitasPx.RegistrasiId,
        },
      ],
      status: "arrived",
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
        start: dayjs(paramEncounter.TanggalMasuk).subtract(7, "hour").format(),
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
                        code: "reguler", // untuk rawat jalan ini masih statis
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
                        code: "kelas-tetap", // untuk rawat jalan ini masih statis
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
      statusHistory: [
        {
          status: "arrived",
          period: {
            start: dayjs(paramEncounter.TanggalMasuk)
              .subtract(7, "hour")
              .format(),
          },
        },
      ],
      serviceProvider: {
        reference: `Organization/${ihsRS}`,
      },
    };

    // postResource(data, "Encounter", "5");

    (async () => {
      try {
        let datatemp = await getRiwRscId(identitasPx.RegistrasiId, "5");
        console.log('data : ', data);


        if (datatemp && datatemp.length === 0) {
          const response = await postResourcev2(data, "Encounter", "5");
          console.log('response : ', response);

          if (response === "Sukses") {
            getParamEncounter(identitasPx.RegistrasiId, identitasPx.RuangId);
          }
          else {
            if (response.toLowerCase().includes("duplicate")) {
              const newData = {
                ...data,
                identifier: [
                  {
                    system: `http://sys-ids.kemkes.go.id/encounter/${ihsRS}`,
                    value: `${identitasPx.RegistrasiId}-${Date.now()}`,
                  },
                ],
              };

              console.log('newData : ', newData);
              const newResponse = await postResourcev2(newData, "Encounter", "5");

              if (newResponse === "Sukses") {
                getParamEncounter(identitasPx.RegistrasiId, identitasPx.RuangId);
              } else {
                Modal.error({
                  title: 'Error!',
                  content: `Error in new postResourcev2: ${newResponse}`,
                });
              }
            }
          }
        } else {
          Modal.warning({
            title: 'Peringatan!',
            content: 'Data Encounter sudah ada, refresh kembali pasien.',
          });
        };
      } catch (error) {
        Modal.error({
          title: 'Error!',
          content: `Error in postResourcev2: ${error}`,
        });
        console.error("Error in postResourcev2:", error);
      }
    })();

    console.log("klikPost : ", data);
  };

  const klikPut = () => {
    let data = {};

    data = {
      resourceType: "Encounter",
      id: paramEncounter.ResourceID,
      identifier: [
        {
          system: `http://sys-ids.kemkes.go.id/encounter/${ihsRS}`,
          value: identitasPx.RegistrasiId,
        },
      ],
      status: "in-progress",
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
        start: dayjs(paramEncounter.JamPelayanan).subtract(7, "hour").format(),
      },
      location: [
        {
          location: {
            reference: `Location/${paramEncounter.SatuSehatIdRuang}`,
            display: paramEncounter.RuangDeskripsi,
          },
          period: {
            start: dayjs(paramEncounter.JamPelayanan)
              .subtract(7, "hour")
              .format(),
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
                        code: "reguler", // untuk rawat jalan ini masih statis
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
                        code: "kelas-tetap", // untuk rawat jalan ini masih statis
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
      statusHistory: [
        {
          status: "arrived",
          period: {
            start: dayjs(paramEncounter.TanggalMasuk)
              .subtract(7, "hour")
              .format(),
            end: dayjs(paramEncounter.TanggalMasuk)
              .subtract(7, "hour")
              .format(),
          },
        },
        {
          status: "in-progress",
          period: {
            start: dayjs(paramEncounter.JamPelayanan)
              .subtract(7, "hour")
              .format(),
          },
        },
      ],
      serviceProvider: {
        reference: `Organization/${ihsRS}`,
      },
    };

    console.log("klikPut : ", data);
    putResource(data, "Encounter", paramEncounter.ResourceID);
  };

  return (
    <div>
      <Spin spinning={spCvg} tip="Loading... 😁">
        <Row style={{ marginBottom: "2px" }}>
          <Col span={22}>
            <Title level={5} italic>
              Encounter Id : {paramEncounter ? paramEncounter.ResourceID : null}
            </Title>
          </Col>
          <Col span={2}>
            <Button
              onClick={() =>
                getParamEncounter(identitasPx.RegistrasiId, identitasPx.RuangId)
              }
              style={{ float: "right" }}
            >
              Ambil Data
            </Button>
          </Col>
        </Row>


        <Card title="Pendaftaran Pasien" style={{ marginBottom: "2px" }}>
          <Row>
            <Col span={15}>
              <Row style={{ marginBottom: "2px" }}>
                <Col span={6}>No. Registrasi</Col>
                <Col span={18}>
                  <Space size="small">
                    <span>:</span>
                    <span>{identitasPx ? identitasPx.RegistrasiId : null}</span>
                  </Space>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2px" }}>
                <Col span={6}>Nama Pasien</Col>
                <Col span={18}>
                  <Space size="small">
                    <span>:</span>
                    <span>{identitasPx ? identitasPx.Nama : null}</span>
                  </Space>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2px" }}>
                <Col span={6}>IHS Number Pasien</Col>
                <Col span={18}>
                  <Space size="small">
                    <span>:</span>
                    <span>{ihsPasien}</span>
                  </Space>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2px" }}>
                <Col span={6}>DPJP</Col>
                <Col span={18}>
                  <Space size="small">
                    <span>:</span>
                    <span>{paramEncounter ? paramEncounter.NamaDPJP : null}</span>
                  </Space>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2px" }}>
                <Col span={6}>IHS Practicioner</Col>
                <Col span={18}>
                  <Space size="small">
                    <span>:</span>
                    <span>
                      {paramEncounter ? paramEncounter.IhsPracticioner : null}
                    </span>
                  </Space>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2px" }}>
                <Col span={6}>Asal Ruang</Col>
                <Col span={18}>
                  <Space size="small">
                    <span>:</span>
                    <span>
                      {paramEncounter ? paramEncounter.RuangDeskripsi : null}
                    </span>
                  </Space>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2px" }}>
                <Col span={6}>Id Ruang SatuSehat</Col>
                <Col span={18}>
                  <Space size="small">
                    <span>:</span>
                    <span>
                      {paramEncounter ? paramEncounter.SatuSehatIdRuang : null}
                    </span>
                  </Space>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2px" }}>
                <Col span={6}>Waktu Pendaftaran</Col>
                <Col span={18}>
                  <Space size="small">
                    <span>:</span>
                    {/* <span>{'DD-MM-YYYY HH:mm'}</span> */}
                    <span>
                      {paramEncounter ? dayjs(paramEncounter.TanggalMasuk).format("DD-MM-YYYY HH:mm") : null}
                    </span>
                  </Space>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2px" }}>
                <Col span={6}>Jatah Kelas</Col>
                <Col span={18}>
                  <Space size="small">
                    <span>:</span>
                    <span>{paramEncounter ? paramEncounter.JatahKelas : null}</span>
                  </Space>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2px" }}>
                <Col span={6}>Kelas Rawat</Col>
                <Col span={18}>
                  <Space size="small">
                    <span>:</span>
                    <span>{paramEncounter ? paramEncounter.KelasRawat : null}</span>
                  </Space>
                </Col>
              </Row>
            </Col>
            <Col span={9}>
              {/* <TextArea rows={11} value={detailEnc ? JSON.stringify(detailEnc.statusHistory, null, 2) : null} readOnly /> */}

              <Table
                bordered
                // loading={spCvg}
                columns={[
                  {
                    title: <b>STATUS ENCOUNTER</b>,
                    dataIndex: 'status',
                    key: 'status',
                    align: 'center',
                    render: (text) => <b>{text.toUpperCase()}</b>,
                  }
                ]}
                dataSource={detailEnc}
                pagination={false}
              // size='small'
              />
            </Col>
          </Row>

          <hr />
          <Row>
            <Col span={24}>
              <Button
                type="primary"
                onClick={() => klikPost()}
                disabled={
                  paramEncounter && paramEncounter.ResourceID !== null
                    ? true
                    : false
                }
                style={{ width: "150px", float: "right" }}
              >
                POST Encounter
              </Button>
            </Col>
          </Row>
        </Card>

        <Card title="Masuk Ruang Pelayanan">
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>Waktu Pelayanan</Col>
            <Col span={20}>
              <Space size="small">
                <span>:</span>
                {/* <span>{'DD-MM-YYYY HH:mm'}</span> */}
                <span>
                  {paramEncounter ? dayjs(paramEncounter.JamPelayanan).format("DD-MM-YYYY HH:mm") : null}
                </span>
              </Space>
            </Col>
          </Row>

          <hr />
          <Row>
            <Col span={24}>
              <Button
                type="primary"
                onClick={() => klikPut()}
                disabled={
                  paramEncounter &&
                    paramEncounter.ResourceID !== null &&
                    paramEncounter.JamPelayanan
                    ? false
                    : true
                }
                style={{ width: "150px", float: "right" }}
              >
                PUT Encounter
              </Button>
            </Col>
          </Row>
        </Card>
      </Spin>

      <FrmMdEditJSON />
    </div>
  );
};

export default FrmEncounter;
