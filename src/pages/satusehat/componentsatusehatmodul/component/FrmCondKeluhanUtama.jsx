/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { SatuSehatModulContext } from "../context/SatuSehatModulContext";
import { Button, Col, Input, Modal, Row, Spin, Table, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const FrmCondKeluhanUtama = () => {
  const {
    ihsRS,
    ihsPasien,
    identitasPx,
    paramEncounter,
    setflagMdSnomed,
    keluhanUtama,
    spCvg,
    setmdLookupSnomed,
    setsts04,
    getRiwRscId,
    postResource,
    postResourcev2,
    colTbResource,
  } = useContext(SatuSehatModulContext);

  const [listTable, setlistTable] = useState([]);

  useEffect(() => {
    klikRefresh('1');
    console.log('useEffect kelUtama');
  }, []);

  const tambahKeluhan = () => {
    setmdLookupSnomed(true);
    setflagMdSnomed("1");
  };

  const klikPost = async () => {
    try {
      if (!keluhanUtama || Object.keys(keluhanUtama).length === 0) {
        Modal.warning({
          title: "Peringatan!",
          content: "Keluhan Utama masih kosong.",
        });
      }
      else {
        let data = {};

        data = {
          resourceType: "Condition",
          identifier: [
            {
              system: `http://sys-ids.kemkes.go.id/condition/${ihsRS}`,
              value: identitasPx.RegistrasiId,
            }
          ],
          clinicalStatus: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                code: "active",
                display: "Active"
              }
            ]
          },
          category: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/condition-category",
                  code: "problem-list-item",
                  display: "Problem List Item"
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: keluhanUtama.id,
                display: keluhanUtama.pt.term
              }
            ]
          },
          subject: {
            reference: `Patient/${ihsPasien}`
          },
          encounter: {
            reference: `Encounter/${paramEncounter.ResourceID}`
          },
          recordedDate: dayjs(paramEncounter.JamPelayanan).subtract(7, 'hour').format(),
          recorder: {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP
          }
        };

        // postResource(data, 'Condition', '1');

        const newResponse = await postResourcev2(data, 'Condition', '1');

        if (newResponse === "Sukses") {
          klikRefresh('1');
        }
      }
    } catch (error) {
      Modal.error({
        title: 'Error!',
        content: `Error : ${error}`,
      });
      console.error("Error :", error);
    }
  };

  const klikRefresh = async (codeGrup) => {
    try {
      let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
      console.log('klikRefresh : ', data);

      setlistTable(data);
      if (data && data.length > 0) {
        setsts04(true);
      };
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "Gagal mengambil data!",
      });
    }
  };

  return (
    <div>
      <Spin spinning={spCvg} tip="Loading... 😁">
        {/* <Row style={{ marginBottom: "2px" }}>
          <Col span={22}>
            <Title level={5} italic>
              Id Keluhan Utama : ---
            </Title>
          </Col>
          <Col span={2}>
            <Button
              onClick={() => AmbilData()}
              disabled={!ihsPasien}
              style={{ float: "right" }}
            >
              Ambil Data
            </Button>
          </Col>
        </Row> */}

        <Row style={{ marginBottom: '5px' }}>
          <Col span={12}>
            {/* <Button
              type='primary'
              onClick={() => {
                setmdTambahRiwayat(true);
              }}
              icon={<PlusOutlined />}
            >
              Tambah Riwayat
            </Button> */}
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                klikRefresh('1');
              }}
              style={{ float: 'right' }}
            >
              Refresh
            </Button>
          </Col>
        </Row>

        <Row>
          <Table
            bordered
            loading={spCvg}
            columns={colTbResource}
            dataSource={listTable}
            pagination={false}
            size='small'
          />
        </Row>

        <Row style={{ marginBottom: "2px", marginTop: '5px' }}>
          <Col span={3}>
            <span>SNOMED :</span>
          </Col>
          <Col span={3}>
            <Input
              value={keluhanUtama ? keluhanUtama.id : null}
              readOnly
              placeholder="Code"
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={8}>
            <Input
              value={keluhanUtama ? keluhanUtama.pt.term : null}
              readOnly
              placeholder="Display"
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={8}>
            <Input
              value={keluhanUtama ? keluhanUtama.fsn.term : null}
              readOnly
              placeholder="Keterangan"
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={2} style={{ paddingLeft: "2px" }}>
            <Button
              type="primary"
              onClick={() => tambahKeluhan('1')}
              // disabled={paramCoverage && paramCoverage.ResourceID !== null ? true : false}
              icon={<PlusOutlined />}
              style={{ float: "right", width: "100%" }}
            />
          </Col>
        </Row>

        <hr />
        <Row>
          <Col span={24}>
            <Button
              type="primary"
              onClick={() => klikPost()}
              disabled={listTable.length !== 0 ? true : false}
              style={{ float: "right", width: "150px" }}
            >
              Post
            </Button>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default FrmCondKeluhanUtama;
