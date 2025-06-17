import React, { useContext, useState } from "react";
import {
  Result,
  Card,
  Row,
  Col,
  Select,
  DatePicker,
  message,
  Modal,
  Tabs,
} from "antd";
import Iframe from "react-iframe";
import { PasienRIContext } from "../context/PasienRIContext";
import dayjs from "dayjs";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import Antal from "../../tools/Antal";
import ListAntal from "../../tools/ListAntal";
const { TabPane } = Tabs;
const { Option } = Select;

const DahBoardRuangRI = () => {
  const [pasienPilih, setpasienPilih] = useState([]);
  const [tglPilih, settglPilih] = useState("");

  const { pasienRI, ruangRi } = useContext(PasienRIContext);
  const {
    modalSbar,
    setmodalSbar,
    printSBar,
    setprintSBar,
    getPrintSBAR,
    loadDelay,
    setloadDelay,
  } = useContext(PrintOutContext);
  return (
    <div>
      <Card size="small">
        <Tabs
          // activeKey={props.tabAktif}
          type="card"
          size="small"
          onChange={(e) => {}}
          style={{ marginTop: "5px" }}
        >
          <TabPane
            // style={{ backgroundColor: "red", color: "brown", display: "block" }}
            tab="SBAR"
            key="2"
          >
            <Row>
              <Col span={12}>
                <Select
                  value={pasienPilih}
                  dataSource={pasienRI}
                  // tokenSeparators={["-"]}
                  mode="multiple"
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih pasien..."
                  optionFilterProp="children"
                  onChange={(e) => {
                    settglPilih("");
                    setprintSBar("");
                    e.length < 6
                      ? setpasienPilih(e)
                      : Modal.success({
                          content:
                            "Maksimal Pemilihan 5 Pasien, Lakukan Pemilihan Pasien Lain Secara Begantian!",
                        });
                  }}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {pasienRI.map((d) => (
                    <Option key={d.registrasiId}>{d.namaPasien}</Option>
                  ))}
                </Select>
              </Col>
              <Col span={12}>
                <DatePicker
                  value={tglPilih}
                  placeholder="Pilih tanggal..."
                  onChange={(e) => {
                    setloadDelay(true);
                    settglPilih(e);
                    console.log(
                      pasienPilih.toString(),
                      dayjs(e).format("YYYY-MM-DD")
                    );
                    getPrintSBAR(
                      pasienPilih.toString(),
                      dayjs(e).format("YYYY-MM-DD")
                    );
                  }}
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Iframe
                  loading={loadDelay}
                  onLoad={() => {
                    setloadDelay(false);
                  }}
                  url={printSBar}
                  width="100%"
                  height="750px"
                  id="myId"
                  // className="myClassname"
                  display="initial"
                  position="relative"
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                  wordWrap="break-word"
                  overflowWrap="break-word"
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane
            // tabbar={{
            //   backgroundColor: "blanchedalmond",
            //   color: "brown",
            //   display: "block",
            // }}
            tab="ANTAL"
            key="1"
          >
            <ListAntal />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default DahBoardRuangRI;
