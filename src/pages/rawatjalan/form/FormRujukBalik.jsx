import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Table,
} from "antd";
import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import { VClaimContext } from "../context/VClaimContext";
const { Option } = Select;
const { Column } = Table;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const FormRujukBalik = () => {
  const { listDiagnosaProgram, getObatPrbBPJS, listObatPrb } =
    useContext(VClaimContext);
  const [tabelObatPrb, setTabelObatPRB] = useState([]);
  const [kodeObat, setKodeObat] = useState(null);
  const [namaObat, setNamaObat] = useState(null);
  const [signa1, setSigna1] = useState(null);
  const [signa2, setSigna2] = useState(null);
  const [jumlahObat, setJumlahObat] = useState(null);

  const tabelobat = {
    kdObat: kodeObat,
    namaObat: namaObat,
    signa1: signa1,
    signa2: signa2,
    jmlObat: jumlahObat,
  };
  const insertObat = () => {
    setTabelObatPRB([...tabelObatPrb, tabelobat]);
  };

  return (
    <div>
      <Card
        title="Rujuk Balik (PRB)"
        size="small"
        headStyle={{ fontWeight: "bolder", backgroundColor: "lightblue" }}
        style={{
          marginTop: 10,
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Form {...formItemLayout}>
          <Form.Item label="Tanggal Rujuk Balik" style={{ marginBottom: 0 }}>
            <DatePicker value={dayjs()} format="DD-MM-YYYY" disabled />
          </Form.Item>
          <Form.Item
            label="Alamat Peserta"
            style={{ marginBottom: 0 }}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Kontak/Email Peserta/Keluarga"
            style={{ marginBottom: 0 }}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item label="Program PRB" style={{ marginBottom: 0 }} required>
            <Select
              dataSource={listDiagnosaProgram}
              showSearch
              style={{ width: "100%" }}
              placeholder="Pilih Program"
              optionFilterProp="children"
              onChange={(e) => console.log(e)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {listDiagnosaProgram.map((p) => (
                <Option key={p.kode}>{p.kode + "- " + p.nama}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="DPJP Pemberi Pelayanan"
            style={{ marginBottom: 0 }}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item label="Keterangan" style={{ marginBottom: 0 }}>
            <Input />
          </Form.Item>
          <Form.Item label="Saran" style={{ marginBottom: 0 }}>
            <Input />
          </Form.Item>
          <Divider orientation="left">Obat </Divider>
          <Form.Item label="Nama Obat" style={{ marginBottom: 0 }} required>
            <Select
              dataSource={listObatPrb}
              showSearch
              style={{ width: "100%" }}
              placeholder="Ketik Nama Obat"
              optionFilterProp="children"
              onChange={(e) => {
                setKodeObat(e.split("-").shift());
                setNamaObat(e.split("-").pop());
              }}
              onSearch={(e) => getObatPrbBPJS(e)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {listObatPrb.map((p) => (
                <Option key={p.kode + "-" + p.nama}>
                  {p.kode + " - " + p.nama}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Signa" style={{ marginBottom: 0 }} required>
            <Input.Group compact>
              <InputNumber
                style={{ width: "20%" }}
                onChange={(e) => setSigna1(e)}
              />
              <Input value="X" style={{ width: "2%" }} disabled />
              <InputNumber
                style={{ width: "20%" }}
                onChange={(e) => setSigna2(e)}
              />
            </Input.Group>
          </Form.Item>
          <Form.Item label="Jumlah" style={{ marginBottom: 0 }} required>
            <Input.Group compact>
              <InputNumber
                style={{ width: "20%" }}
                onChange={(e) => setJumlahObat(e)}
              />
              <Button
                type="primary"
                style={{ width: "7%" }}
                onClick={insertObat}
              >
                Tambah
              </Button>
            </Input.Group>
          </Form.Item>
          <Form.Item label="Obat">
            <Table
              dataSource={tabelObatPrb}
              size="small"
              pagination={false}
              bordered
            >
              <Column
                style={{ verticalAlign: "top" }}
                title="#"
                className="bgcolortunggu, tabeltabel2"
                width={25}
                render={(tabelObatPrb) => <span>{tabelObatPrb.kdObat}</span>}
              />
              <Column
                style={{ verticalAlign: "top" }}
                title="Nama Obat"
                render={(tabelObatPrb) => <span>{tabelObatPrb.namaObat}</span>}
              />
              <Column
                style={{ verticalAlign: "top" }}
                title="S1"
                render={(tabelObatPrb) => <span>{tabelObatPrb.signa1}</span>}
              />
              <Column
                style={{ verticalAlign: "top" }}
                title="S2"
                render={(tabelObatPrb) => <span>{tabelObatPrb.signa2}</span>}
              />
              <Column
                style={{ verticalAlign: "top" }}
                title="Jumlah"
                render={(tabelObatPrb) => <span>{tabelObatPrb.jmlObat}</span>}
              />
            </Table>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default FormRujukBalik;
