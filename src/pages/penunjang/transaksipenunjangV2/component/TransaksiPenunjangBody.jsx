import React, { useContext, useState } from "react";
import {
  Card,
  Select,
  Space,
  Modal,
  Button,
  message,
  Tabs,
  Row,
  Col,
  Spin,
} from "antd";
import { TransaksiPenunjangContext } from "../context/TransaksiPenunjangContext";
import IdentitasTransaksi from "./IdentitasTransaksi";
import LookupOrder from "./LookupOrder";
import TabsPemeriksaan from "./TabsPemeriksaan";
import dayjs from "dayjs";
import "../style/styleLookupOrder.css";

const { Option } = Select;
const { TabPane } = Tabs;

const TransaksiPenunjangBody = () => {
  const {
    penunjang,
    unitId,
    setUnitId,
    stat,
    setStat,
    noTransaksi,
    setNoOrder,
    getListOrder,
    defaultNoTr,
    setNoTransaksi,
    setPasienId,
    setNamaPasien,
    setJenisPasien,
    setJam,
    setDeskUnitAsalId,
    setDeskKelasRawat,
    setNamaDokter,
    setListBillPmr,
    // modal
    mdListOrder,
    setmdListOrder,
    setmdDtTransaksiPmr,
    // disable
    setdisNoTransaksi,
    // spin
    spinAll,
  } = useContext(TransaksiPenunjangContext);

  const klikListOrder = () => {
    getListOrder(unitId, noTransaksi, stat);
    // setmdDtTransaksiPmr(true)
    setNoOrder("");
  };

  const resetNoTr = () => {
    setNoTransaksi(defaultNoTr);
    setPasienId("");
    setNamaPasien("");
    setJenisPasien("");
    setJam(dayjs());
    setDeskUnitAsalId("");
    setDeskKelasRawat("");
    setNamaDokter("");
    setListBillPmr([]);
  };

  const onChangeUnitPelayanan = (e) => {
    // console.log('penunjang : ', penunjang);
    let obj = penunjang.find((o) => o.ruangId === e);
    let obja = obj.deskripsi.split(" ");
    let objb = obja.filter(
      (obj) =>
        obj !== "-" &&
        obj.toLowerCase() !== "rsms" &&
        obj.toLowerCase() !== "abiyasa"
    );
    let objc = objb.join(" ");
    console.log("obja : ", objc);
    setUnitId(e);
    resetNoTr();
  };

  return (
    <div>
      {/* <Card
                    // loading={spinAll}
                    title='Pelayanan Penunjang'
                    size='small'
                    headStyle={{ backgroundColor: '#FFD6A5' }}
                    style={{ marginBottom: '5px' }}>
                    <Space>
                        <span>Unit Pelayanan</span>
                        <Select
                            dataSource={penunjang}
                            value={unitId}
                            onChange={(e) => onChangeUnitPelayanan(e)}
                            showSearch
                            style={{ width: '400px', marginLeft: '7px' }}
                            placeholder="Unit Pelayanan"
                            size='small'
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {penunjang.map((d) => (
                                <Option key={d.ruangId}>{d.deskripsi}</Option>
                            ))}
                        </Select>
                        <Button
                            type='primary'
                            onClick={() =>
                                !unitId ? message.error('Pilih unit pelayanan terlebih dahulu!') :
                                    klikListOrder()

                            }
                            size='small'>
                            List Order
                        </Button>
                    </Space>
                </Card>

                <IdentitasTransaksi />
                <div style={{ marginBottom: '5px' }}></div> */}

      <Card>
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="small"
          style={{ marginBottom: "5px" }}
        >
          <TabPane tab="Pemeriksaan" key="1">
            <TabsPemeriksaan />
          </TabPane>
          <TabPane tab="Bahan Habis Pakai" key="2" disabled>
            Content of card tab 2
          </TabPane>
          <TabPane tab="Menu Gizi" key="3" disabled>
            Content of card tab 3
          </TabPane>
        </Tabs>

        <Row>
          <Col span={12}>
            <Space>
              <Button type="primary" disabled style={{ width: "150px" }}>
                Hitung Asuransi
              </Button>
              <Button type="primary" disabled style={{ width: "150px" }}>
                Cetak Identitas
              </Button>
            </Space>
          </Col>
          <Col span={12}>
            <Space style={{ float: "right" }}>
              <Button type="primary" disabled style={{ width: "100px" }}>
                Prabilling
              </Button>
              <Button type="primary" disabled style={{ width: "100px" }}>
                Tutup
              </Button>
            </Space>
          </Col>
        </Row>
        <Space style={{ marginTop: "5px" }}>
          <Button type="primary" disabled style={{ width: "150px" }}>
            Konsul Ke Dokter Lain
          </Button>
          <Button type="primary" disabled style={{ width: "150px" }}>
            Hitung Jatah Kelas
          </Button>
        </Space>
      </Card>

      <Modal
        title="LookUp Order Pemeriksaan"
        // centered
        visible={mdListOrder}
        // onCancel={() => setmdListOrder(false)}
        closable={false}
        footer={null}
        width={1000}
        className="modal_lookuporder"
        style={{ top: "20px" }}
      >
        <LookupOrder />
      </Modal>
    </div>
  );
};

export default TransaksiPenunjangBody;
