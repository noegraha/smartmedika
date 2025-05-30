import React, { useContext, useState, useRef } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  Popconfirm,
  message,
  Alert,
  Card,
  Tabs,
  Space,
  DatePicker,
  Empty,
  Modal,
  Table,
  Divider,
  Rate,
  Slider,
  Radio,
  Tooltip,
  Typography,
  Collapse,
} from "antd";
import dayjs from "dayjs";

import Column from "antd/lib/table/Column";
import { AskepContext } from "../context/AskepContext";
import { EwsRIContext } from "../context/EwsContext";
import FormEwsGrafik from "./FormGrafikEWS";

const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;
const { TabPane } = Tabs;
const formItemLayoutFull = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const FormEWS = () => {
  const [form] = Form.useForm();
  const [visibleModal, setvisibleModal] = useState(false);
  const { curpasRI, ipPc, setIpPC, valuecekAssesment } =
    useContext(AskepContext);
  const {
    visibleEWSBerkala,
    setvisibleEWSBerkala,
    tglews,
    setTglews,
    ewsRespirasi,
    setewsRespirasi,
    ewsSatursiOksigen,
    setewsSatursiOksigen,
    ewsSuplemenOksigen,
    setewsSuplemenOksigen,
    ewsSuhu,
    setewsSuhu,
    ewsSistolik,
    setewsSistolik,
    ewsJantung,
    setewsJantung,
    ewsKesadaran,
    setewsKesadaran,
    ewsByredAll,
    setEWSByRegAll,
    insertEWS,
    getEwsAll,
    getEwsByRegDate,
    deleteEwsbydate,
    userEWS,
    setuserEWS,
    visibleEWSBerkalaEdit,
    setvisibleEWSBerkalaEdit,
  } = useContext(EwsRIContext);
  const onAmbilCatatanById = (reg, date) => {
    getEwsByRegDate(reg, dayjs(date).format("YYYY-MM-DD HH:mm"));
    console.log(reg, dayjs(date).format("YYYY-MM-DD HH:mm"));
  };
  const dateFormat = "DD-MM-YYYY HH:mm";
  const [warnaRow, setWarnaRow] = useState([]);
  const ewsTotal =
    parseInt(ewsRespirasi.split("-").pop()) +
    parseInt(ewsSatursiOksigen.split("-").pop()) +
    parseInt(ewsSuplemenOksigen.split("-").pop()) +
    parseInt(ewsSuhu.split("-").pop()) +
    parseInt(ewsSistolik.split("-").pop()) +
    parseInt(ewsJantung.split("-").pop()) +
    parseInt(ewsKesadaran.split("-").pop());

  return (
    <div>
      <Row>
        {/* <Col span={24}>
                    <Button type='primary' onClick={() => {
                        setvisibleEWSBerkala(true);
                    }} style={{ backgroundColor: 'green' }}>Tambah EWS</Button>
                </Col> */}
        <Col span={24}>
          <Card size="small">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Grafik EWS" key="1">
                <FormEwsGrafik />
              </TabPane>
              <TabPane tab="Table EWS" key="2">
                <Table
                  //   onRow={(record, rowIndex) => {
                  //     return {
                  //       onClick: (e) => {
                  //         onAmbilCatatanById(curpasRI.noreg, record.tanggal);
                  //         setWarnaRow(rowIndex);
                  //       },
                  //     };
                  //   }}
                  bordered
                  locale={{
                    emptyText: <Empty description="Data Catatan Kosong" />,
                  }}
                  pagination={{ pageSize: 5 }}
                  dataSource={ewsByredAll}
                  size="small"
                  rowKey="reg"
                  rowClassName={(record, rowIndex) =>
                    rowIndex === warnaRow ? "warnacolompilih" : null
                  }
                >
                  <Column
                    title="Tanggal"
                    width="20%"
                    render={(ewsByredAll) =>
                      dayjs(ewsByredAll.tanggal).format("DD-MM-YYYY HH:mm")
                    }
                  />
                  <Column
                    title="Total EWS"
                    key="reg"
                    width="10%"
                    render={(ewsByredAll) => ewsByredAll.ewsScore}
                  />
                  <Column
                    title="Keteranagn"
                    key="reg"
                    width="10%"
                    render={(ewsByredAll) => ewsByredAll.ewsKategori}
                  />
                </Table>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FormEWS;
