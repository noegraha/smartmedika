import React, { useContext } from "react";
import {
  Form,
  Row,
  Col,
  Table,
  DatePicker,
  Divider,
  Empty,
  Space,
  Button,
} from "antd";
import Column from "antd/lib/table/Column";
import { PantuanInfeksiContext } from "../context/PantuanInfeksiContext";
const formItemLayoutFull = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const FormPantuanInfeksi = () => {
  const { pantuaninfeksi, PantuanInfeksiRi } = useContext(
    PantuanInfeksiContext
  );
  const dateFormat = "YYYY-MM-DD";
  // const [tglop, setTglop] = useState(dayjs().format('YYYY-MM-DD'));
  const onTglOp = (date, dateString) => {
    PantuanInfeksiRi(dateString);
    console.log(dateString);
  };

  return (
    <div>
      <Divider orientation="left">Daftar Pasien Terindikasi Infeksi</Divider>
      <Row>
        <Col span={8}>
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
              // defaultValue={dayjs()}
              onChange={onTglOp}
              // onOk={onTglOp}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Divider orientation="left">Data Pantuan Infeksi</Divider>
          <Table
            size="small"
            pagination={true}
            dataSource={pantuaninfeksi}
            locale={{
              emptyText: <Empty description="Tidak Ada Ajuan Jadwal Operasi" />,
            }}
          >
            <Column
              title="No"
              key="No"
              className="bgcolordanger"
              dataIndex=""
            />
            <Column title="Noreg" key="Noreg" dataIndex="noReg" />
            <Column title="Nopasien" key="Nopasien" dataIndex="" />
            <Column title="Nama Pasien" key="Nama Pasien" dataIndex="" />
            <Column title="Bangsal" key="Bangsal" dataIndex="kodeRuang" />
            <Column title="Tindakan" key="Tindakan" dataIndex="namaTindakan" />
            <Column
              title="Keterangan"
              key="Keterangan"
              dataIndex="keterangan"
            />
            <Column title="Jam" key="Jam" dataIndex="jam" />
            <Column title="Status" key="Status" dataIndex="verified" />
            <Column title="Nopmr" key="Nopmr" dataIndex="noPmr" />
          </Table>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Space>
            <Button>Laporan</Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default FormPantuanInfeksi;
