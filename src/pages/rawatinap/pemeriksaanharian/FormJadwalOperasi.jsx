import React, { useContext, useState } from "react";
import {
  Form,
  Row,
  Col,
  Table,
  Select,
  DatePicker,
  Divider,
  Radio,
  Empty,
  Card,
} from "antd";
import dayjs from "dayjs";
import { JadwalOperasiRIContext } from "../context/JadwalOperasiRIContext";
import Column from "antd/lib/table/Column";
import { PasienRIContext } from "../context/PasienRIContext";

const formItemLayoutFull = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;

const FormJadwalOperasi = () => {
  const dateFormat = "YYYY-MM-DD";
  const [tglop, setTglop] = useState(dayjs().format("YYYY-MM-DD"));
  const [bangsal, setBangsal] = useState("");
  const [pilihan, setPilihan] = useState("");
  const { AjuanJadwalOperasiRi, JadwalOperasiRI, ajuanoperasi, jadwaloperasi } =
    useContext(JadwalOperasiRIContext);
  const { ruang, ruangRi } = useContext(PasienRIContext);
  const onAjuanOp = () => {
    AjuanJadwalOperasiRi(tglop, ruangRi);
    console.log(tglop, bangsal);
    console.log(ajuanoperasi);
  };
  const onJadwalOp = () => {
    JadwalOperasiRI(tglop);
    console.log(jadwaloperasi);
  };
  const onTglOp = (date, dateString) => {
    setTglop(dateString);
  };
  const onRuang = (e) => {
    setBangsal(e);
  };
  const pilihJadwal = (e) => {
    setPilihan(e.target.value);
  };
  return (
    <div>
      <Card
        title="Jadwal Operasi Pasien"
        size="small"
        headStyle={{ fontWeight: "bolder", backgroundColor: "beige" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Row>
          <Col span={4}>
            <Form.Item
              {...formItemLayoutFull}
              name="tgl"
              label="Tanggal"
              style={{ marginBottom: 0 }}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="..."
                format={dateFormat}
                defaultValue={dayjs()}
                onChange={onTglOp}
              />
            </Form.Item>
          </Col>
          {/* <Col span={8}>
            <Form.Item
              {...formItemLayoutFull}
              label="Bangsal"
              style={{ marginBottom: 0 }}
            >
              <Select
                dataSource={ruang}
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
                onChange={(e) => onRuang(e)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {ruang.map((d) => (
                  <Option key={d.ruangId}>{d.deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col> */}
          <Col span={8}>
            <Form.Item
              {...formItemLayoutFull}
              label="Pilih"
              style={{ marginBottom: 0 }}
            >
              <Radio.Group onChange={pilihJadwal}>
                <Radio value={1} onClick={onAjuanOp}>
                  Pengajuan Operasi
                </Radio>
                <Radio value={2} onClick={onJadwalOp}>
                  Jadwal Operasi
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        {pilihan === 1 ? (
          <Row>
            <Col span={24}>
              <Divider orientation="left">Ajuan Jadwal Operasi</Divider>
              <Table
                size="small"
                pagination={false}
                dataSource={ajuanoperasi}
                locale={{
                  emptyText: (
                    <Empty description="Tidak Ada Ajuan Jadwal Operasi" />
                  ),
                }}
              >
                <Column
                  title="Noreg"
                  key="noreg"
                  className="bgcolordanger"
                  dataIndex="NoReg"
                />
                <Column title="Nopasien" key="nopasien" dataIndex="PasienId" />
                <Column title="Nama" key="nama" dataIndex="NamaPasien" />
                <Column
                  title="Tindakan"
                  key="tindakan"
                  dataIndex="NamaTindkan"
                />
                <Column title="Kode DX" key="kodedx" dataIndex="DiagnosaDesk" />
                <Column
                  title="Nama Dokter"
                  key="namadokter"
                  dataIndex="NamaDokter"
                />
                <Column title="Keterangan" key="ajuan" dataIndex="Keterangan" />
                <Column title="No Ajuan" key="noajuan" dataIndex="NoAjuan" />
              </Table>
            </Col>
          </Row>
        ) : pilihan === 2 ? (
          <Row>
            <Col span={24}>
              <Divider orientation="left">Jadwal Operasi</Divider>
              <Table
                size="small"
                pagination={false}
                dataSource={jadwaloperasi}
                locale={{
                  emptyText: <Empty description="Tidak Ada Jadwal Operasi" />,
                }}
              >
                "RuangOK": 7, "RegistrasiId": "2309130719", "NamaPasien": "LIA
                PATMA NUGRAHINI, NY", "Bangsal": "FLAMBOYAN ", "DiagnosaId":
                "O13", "DiagnosaDesk": "Gestational [pregnancy-induced]
                hypertension without significant proteinuria", "Tindakan":
                "SECTIO SESAREA", "Operator": "MARTA ISYANA DEWI,Dr. SpOG ",
                "Anestesi": null, "Jam": " ", "Keterangan": ""
                <Column
                  title="Noreg"
                  key="Ruang"
                  className="bgcolordanger"
                  dataIndex="RuangOK"
                />
                <Column
                  title="No. Pasien"
                  key="Noreg"
                  dataIndex="RegistrasiId"
                />
                <Column title="Nama" key="b/lNama" dataIndex="NamaPasien" />
                <Column title="Bangsal" key="Bangsal" dataIndex="Bangsal" />
                <Column
                  title="Diagnosa"
                  key="Bangsal"
                  dataIndex="DiagnosaDesk"
                />
                <Column title="Tindakan" key="Bangsal" dataIndex="Tindakan" />
                <Column title="Operator" key="Bangsal" dataIndex="Operator" />
                <Column title="Anestesi" key="Bangsal" dataIndex="Anestesi" />
                <Column title="Jam" key="Bangsal" dataIndex="Jam" />
                <Column
                  title="Keterangan"
                  key="Bangsal"
                  dataIndex="Keterangan"
                />
              </Table>
            </Col>
          </Row>
        ) : (
          <div>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Silahkan Pilih Terlebih Dahulu"
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default FormJadwalOperasi;
