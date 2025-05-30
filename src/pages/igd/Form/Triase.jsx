import { Card, ConfigProvider, Form, Select, Table } from "antd";
import { Button, Col, Flex, Input, Row } from "antd/es";
import TextArea from "antd/es/input/TextArea";
import React, { useContext } from "react";
import { MasterIGDContext } from "../Context/MasterIGDContext";
import { TriaseIGDContext } from "../Context/TriaseIGDContext";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const { Option } = Select;
const Triase = () => {
  const {
    getMstKeluhan,
    masterKeluhan,
    getKarakteristikKeluhan,
    masterKarakteristik,
    masterPrioritas,
    masterTriase,
  } = useContext(MasterIGDContext);
  const {
    vaksin,
    setVaksin,
    triase,
    setTriase,
    keluhan,
    setKeluhan,
    prioritas,
    setPrioritas,
    kddokter,
    setKdDokter,
    e,
    setE,
    v,
    setV,
    m,
    setM,
    ketGcs,
    setKetGcs,
    refresh,
  } = useContext(TriaseIGDContext);
  const { dokterall } = useContext(PelayananContext);

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Card: { fontWeightStrong: "bolder", headerBg: "beige" },
            Form: { itemMarginBottom: 0 },
          },
        }}
      >
        <Card
          title="Triase"
          size="small"
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
          loading={refresh}
        >
          <Form {...formItemLayout}>
            <Form.Item label="Vaksinasi Covid-19" labelAlign="left">
              <Select
                style={{ width: "25%" }}
                value={vaksin}
                onChange={(e) => setVaksin(e)}
              >
                <Option key="">BELUM</Option>
                <Option key="VAKSIN 1 KALI">VAKSINASI 1 KALI</Option>
                <Option key="VAKSIN 2 KALI">VAKSINASI 2 KALI</Option>
                <Option key="VAKSIN 3 KALI">VAKSINASI 3 KALI</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Keluhan" labelAlign="left">
              <Select
                dataSource={masterKeluhan}
                showSearch
                style={{ width: "25%" }}
                placeholder="Pilih Keluhan"
                optionFilterProp="children"
                onFocus={() => getMstKeluhan()}
                onChange={(e) => {
                  getKarakteristikKeluhan(e);
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {masterKeluhan.map((p) => (
                  <Option key={p.keluhanId}>
                    {p.keluhanId} - {p.keluhanDeskripsi}
                  </Option>
                ))}
              </Select>
              <Select
                dataSource={masterKarakteristik}
                showSearch
                style={{ width: "25%" }}
                placeholder="Pilih Karakteristik"
                optionFilterProp="children"
                onChange={(e) => {}}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {masterKarakteristik.map((p) => (
                  <Option key={p.karakteristikId}>
                    {p.karakteristikId} - {p.karakteristikDeskripsi}
                  </Option>
                ))}
              </Select>
              <Button type="primary">Pilih</Button>
              <br />
              <Table size="small" />
              <TextArea
                value={keluhan}
                onChange={(e) => setKeluhan(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Dokter" labelAlign="left">
              <Select
                dataSource={dokterall}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Pelaksana"
                optionFilterProp="children"
                onChange={(e) => setKdDokter(e)}
                value={kddokter}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {dokterall.map((p) => (
                  <Option key={p.dokterId}>{p.namaDokter}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="GCS" labelAlign="left">
              E:{" "}
              <Input
                style={{ width: "15%" }}
                value={e}
                onChange={(e) => setE(e.target.value)}
              />{" "}
              V:{" "}
              <Input
                style={{ width: "15%" }}
                value={v}
                onChange={(e) => setV(e.target.value)}
              />{" "}
              M:{" "}
              <Input
                style={{ width: "15%" }}
                value={m}
                onChange={(e) => setM(e.target.value)}
              />{" "}
              Keterangan :{" "}
              <Input
                style={{ width: "15%" }}
                value={ketGcs}
                onChange={(e) => setKetGcs(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Triase (Mode ATS)" labelAlign="left">
              <Select
                style={{ width: "25%" }}
                value={triase}
                onChange={(e) => setTriase(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {masterTriase.map((p) => (
                  <Option key={p.ID}>{p.WARNA}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Pemeriksaan" labelAlign="left">
              <Select
                style={{ width: "25%" }}
                value={prioritas}
                onChange={(e) => setPrioritas(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {masterPrioritas.map((p) => (
                  <Option key={p.ID}>{p.WARNA}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
          <Row>
            <Col span={24}>
              <Flex
                style={{
                  width: "100%",
                }}
                justify={"space-between"}
                align={"center"}
              >
                <Table />
                <Table />
                <Table />
                <Table />
              </Flex>
            </Col>
          </Row>
        </Card>
      </ConfigProvider>
    </div>
  );
};

export default Triase;
