import React, { useContext, useState } from "react";
import { DatePicker, Form, Layout, Radio, Select, Space, Tabs } from "antd";
import { IBSContext } from "./context/IBSContext";
import { ESWLContext } from "./context/ESWLContext";
import TabelAjuanOP from "./TabelAjuanOP";
import TabelLaporanOP from "./TabelLaporanOP";
import dayjs from "dayjs";
import "dayjs/locale/id";
import locale from "antd/es/date-picker/locale/id_ID";
import FormMappingTindakanOP from "./FormMappingTindakanOP";
import TabelOrderESWL from "./TabelOrderESWL";
import TabelHasilESWL from "./TabelHasilESWL";

const { Option } = Select;
const { TabPane } = Tabs;

const BedahSentral = () => {
  const dateFormat = ["DD-MM-YYYY", "DD-MM-YY", "YYYY-MM-DD"];

  const { cariAjuanOP, cariLaporanOP } = useContext(IBSContext);
  const { getEswlOrder, getEswlHasil, getCurrentTime } =
    useContext(ESWLContext);
  const [jenisData, setJenisData] = useState("ajuan");
  const [jenisESWL, setJenisESWL] = useState("order");
  const [tglOP, setTglOP] = useState(dayjs());
  const [tglESWL, setTglESWL] = useState(null);
  const [isCito, setIsCito] = useState(0);

  // const cariAjuan = () => {
  //   cariAjuanOP(dayjs(tglOP).format(dateFormat[2]), isCito);
  // };

  // const cekAjuan = () => {
  //   console.log("PASIENOP", pasienAjuanOP);
  //   console.log("TGLOP", dayjs(tglOP).format(dateFormat[2]));
  //   console.log("JENIS DATA", jenisData);
  //   console.log("CITO", isCito);
  // };

  const pilihCito = (e) => {
    setIsCito(e.target.value);

    jenisData === "ajuan"
      ? cariAjuanOP(dayjs(tglOP).format(dateFormat[2]), e.target.value)
      : cariLaporanOP(dayjs(tglOP).format(dateFormat[2]), e.target.value);

    console.log(
      "pilihCito",
      e.target.value + " - " + dayjs(tglOP).format(dateFormat[2])
    );
  };

  const pilihTgl = (e) => {
    setTglOP(dayjs(e).format(dateFormat[2]));

    jenisData === "ajuan"
      ? cariAjuanOP(dayjs(e).format(dateFormat[2]), isCito)
      : cariLaporanOP(dayjs(e).format(dateFormat[2]), isCito);

    console.log(
      "pilihTgl",
      dayjs(tglOP).format(dateFormat[2]) + " - " + isCito
    );
  };

  const pilihJenisData = (e) => {
    e === "ajuan"
      ? cariAjuanOP(dayjs(tglOP).format(dateFormat[2]), isCito)
      : cariLaporanOP(dayjs(tglOP).format(dateFormat[2]), isCito);

    setJenisData(e);
  };

  const pilihJenisESWL = (e) => {
    e === "order"
      ? getEswlOrder(getCurrentTime())
      : getEswlHasil(getCurrentTime());

    e === "order" ? setJenisESWL(e) : setJenisESWL("hasil");

    setTglESWL(null);
    console.log("ffffff", tglESWL);
  };

  const pilihTglESWL = (e) => {
    // setTglESWL(dayjs(e).format(dateFormat[2]));
    console.log("apa ini", dayjs(e).format(dateFormat[2]));
    console.log("apa ini2", jenisESWL);

    jenisESWL === "order"
      ? getEswlOrder(dayjs(e).format(dateFormat[2]))
      : getEswlHasil(dayjs(e).format(dateFormat[2]));

    jenisESWL === "hasil"
      ? getEswlHasil(dayjs(e).format(dateFormat[2]))
      : getEswlOrder(dayjs(e).format(dateFormat[2]));

    setTglESWL(e);

    // jenisData === "ajuan"
    //   ? cariAjuanOP(dayjs(e).format(dateFormat[2]), isCito)
    //   : cariLaporanOP(dayjs(e).format(dateFormat[2]), isCito);

    // console.log(
    //   "pilihTgl",
    //   dayjs(tglOP).format(dateFormat[2]) + " - " + isCito
    // );
  };
  const callback = (key) => {
    if (key === "2") {
      getEswlOrder(getCurrentTime());
    } else {
      getCurrentTime();
    }
  };

  return (
    <div>
      {/* <button onClick={cariAjuan}>Cari</button>
      <button onClick={cekAjuan}>Cek</button> */}

      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Operasi" key="1">
          <Layout>
            <Space direction="vertical">
              <Form layout="inline" style={{ padding: "15px" }}>
                <Space>
                  <Select
                    defaultValue="ajuan"
                    style={{ width: 120 }}
                    onChange={pilihJenisData}
                  >
                    <Option value="ajuan">Ajuan OP</Option>
                    <Option value="laporan">Laporan OP</Option>
                  </Select>

                  <DatePicker
                    locale={locale}
                    defaultValue={tglOP}
                    format={dateFormat}
                    onChange={pilihTgl}
                  />

                  <Radio.Group onChange={pilihCito} defaultValue={isCito}>
                    <Radio value={1}>Cito</Radio>
                    <Radio value={0}>Regular/ Biasa</Radio>
                  </Radio.Group>
                </Space>
              </Form>

              {jenisData === "ajuan" ? (
                <TabelAjuanOP
                  tglop={dayjs(tglOP).format(dateFormat[2])}
                  cito={isCito}
                />
              ) : (
                <TabelLaporanOP
                  tglop={dayjs(tglOP).format(dateFormat[2])}
                  cito={isCito}
                />
              )}
            </Space>
          </Layout>
        </TabPane>
        <TabPane tab="ESWL" key="2">
          <Layout>
            <Space direction="vertical">
              <Form layout="inline" style={{ padding: "15px" }}>
                <Space>
                  <Select
                    defaultValue="order"
                    style={{ width: 120 }}
                    onChange={pilihJenisESWL}
                  >
                    <Option value="order">Order ESWL</Option>
                    <Option value="hasil">Hasil ESWL</Option>
                  </Select>

                  <DatePicker
                    locale={locale}
                    value={tglESWL}
                    format={dateFormat}
                    onChange={pilihTglESWL}
                  />
                </Space>
              </Form>

              {jenisESWL === "order" ? <TabelOrderESWL /> : <TabelHasilESWL />}
            </Space>
          </Layout>
        </TabPane>
        <TabPane tab="Mapping Tindakan Operasi" key="3">
          <FormMappingTindakanOP />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default BedahSentral;
