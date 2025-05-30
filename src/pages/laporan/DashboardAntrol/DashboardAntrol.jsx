import {
  Button,
  Card,
  DatePicker,
  Image,
  Radio,
  Select,
  Space,
  Table,
  Tabs,
  Typography,
} from "antd";
import React, { useContext, useState } from "react";
import { VClaimContext } from "../../rawatjalan/context/VClaimContext";
import { Excel } from "antd-table-saveas-excel";
import { FileExcelOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Paragraph, Text } = Typography;
const { Option } = Select;

const DashboardAntrol = () => {
  const {
    getDashboardByBln,
    getDashboardByTgl,
    getDashboardByPoli,
    getDashboardRatarata,
    dashboardbulan,
    dashboardtanggal,
    dashboardpoli,
    dashboardrata,
    poliall,
    getPoliBPJS,
    loading,
    loadingpoli,
  } = useContext(VClaimContext);
  const [bulan, setBulan] = useState(null);
  const [bulanpoli, setBulanPoli] = useState(null);
  const [tahun, setTahun] = useState(null);
  const [tahunpoli, setTahunPoli] = useState(null);
  const [tanggal, setTanggal] = useState(null);
  const [poli, setPoli] = useState(null);
  const [waktu, setWaktu] = useState(false);
  const dalamwaktu = waktu ? "Detik" : "Menit";

  const formatToHoursMinutesSeconds = (seconds) => {
    const jam = Math.floor(seconds / 3600);
    const menit = Math.floor((seconds % 3600) / 60);
    const detik = Math.floor(seconds % 60);
    return `${jam} jam ${menit} menit ${detik} detik`;
  };
  const formatToMinutesSeconds = (seconds) => {
    const menit = Math.floor(seconds / 60);
    const detik = Math.floor(seconds % 60);
    return `${menit} menit ${detik} detik`;
  };

  const columnbulan = [
    {
      title: "Nama Poli",
      dataIndex: "namapoli",
      key: "namapoli",
      fixed: "left",
      width: 200,
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
    },
    // {
    //   title: "Tanggal Insert",
    //   dataIndex: "insertdate",
    // },
    {
      title: "Jumlah",
      dataIndex: "jumlahAntrean",
    },
    {
      title: `Waktu Task (dalam ${dalamwaktu})`,
      children: [1, 2, 3, 4, 5, 6].map((i) => ({
        title: `Waktu Task ${i}`,
        dataIndex: `waktuTask${i}`,
        render(text, record) {
          return {
            props: {
              style: {
                background: "#e6fffb",
                cursor: "default",
              },
            },
            children: waktu ? text : formatToHoursMinutesSeconds(text),
          };
        },
      })),
    },
    {
      title: `Rata-rata Waktu Task (dalam ${dalamwaktu})`,
      children: [1, 2, 3, 4, 5, 6].map((i) => ({
        title: `Waktu Avg Task ${i}`,
        dataIndex: `avgWaktuTask${i}`,
        render(text, record) {
          return {
            props: {
              style: {
                background: "#feffe6",
                cursor: "default",
              },
            },
            children: waktu ? text : formatToMinutesSeconds(text),
          };
        },
      })),
    },
  ];

  const columntanggal = [
    {
      title: "Nama Poli",
      dataIndex: "namapoli",
      key: "namapoli",
      fixed: "left",
      width: 200,
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      width: 80,
      render(text) {
        const date = new Date(text);
        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      title: "Tanggal Insert",
      dataIndex: "insertdate",
      width: 80,
      render(text) {
        const date = new Date(Number(text));
        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      title: "Jumlah",
      dataIndex: "jumlahAntrean",
    },
    {
      title: `Waktu Task (dalam ${dalamwaktu})`,
      children: [1, 2, 3, 4, 5, 6].map((i) => ({
        title: `Waktu Task ${i}`,
        dataIndex: `waktuTask${i}`,
        render(text) {
          return {
            props: {
              style: {
                background: "#e6fffb",
                cursor: "default",
              },
            },
            children: waktu ? text : formatToHoursMinutesSeconds(text),
          };
        },
      })),
    },
    {
      title: `Rata-rata Waktu Task (dalam ${dalamwaktu})`,
      children: [1, 2, 3, 4, 5, 6].map((i) => ({
        title: `Waktu Avg Task ${i}`,
        dataIndex: `avgWaktuTask${i}`,
        render(text) {
          return {
            props: {
              style: {
                background: "#feffe6",
                cursor: "default",
              },
            },
            children: waktu ? text : formatToMinutesSeconds(text),
          };
        },
      })),
    },
  ];

  const columnpoli = [
    {
      title: "Nama Poli",
      dataIndex: "namapoli",
      key: "namapoli",
      fixed: "left",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      width: 80,
      render(text) {
        const date = new Date(text);
        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      title: "Tanggal Insert",
      dataIndex: "insertdate",
      width: 80,
      render(text) {
        const date = new Date(Number(text));
        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      title: "Jumlah",
      dataIndex: "jumlahAntrean",
    },
    {
      title: `Waktu Task (dalam ${dalamwaktu})`,
      children: [1, 2, 3, 4, 5, 6].map((i) => ({
        title: `Waktu Task ${i}`,
        dataIndex: `waktuTask${i}`,
        render(text) {
          return {
            props: {
              style: {
                background: "#e6fffb",
                cursor: "default",
              },
            },
            children: waktu ? text : formatToHoursMinutesSeconds(text),
          };
        },
      })),
    },
    {
      title: `Rata-rata Waktu Task (dalam ${dalamwaktu})`,
      children: [1, 2, 3, 4, 5, 6].map((i) => ({
        title: `Waktu Avg Task ${i}`,
        dataIndex: `avgWaktuTask${i}`,
        render(text) {
          return {
            props: {
              style: {
                background: "#feffe6",
                cursor: "default",
              },
            },
            children: waktu ? text : formatToMinutesSeconds(text),
          };
        },
      })),
    },
  ];

  const columnrata = [
    {
      title: "Kode Poli",
      dataIndex: "kodePoli",
      fixed: "left",
      width: 50,
    },
    {
      title: "Nama Poli",
      dataIndex: "namaPoli",
      key: "namaPoli",
      fixed: "left",
      width: 200,
      render(text, record) {
        return {
          props: {
            style: {
              background: "#e6fffb",
              cursor: "default",
            },
          },
          children: text,
        };
      },
    },
    {
      title: `Rata-rata Waktu Task (dalam ${dalamwaktu})`,
      children: [1, 2, 3, 4, 5, 6].map((i) => ({
        title: `Waktu Avg Task ${i}`,
        dataIndex: `avgTask${i}`,
        render(text, record) {
          return {
            props: {
              style: {
                background: "#feffe6",
                cursor: "default",
              },
            },
            children: waktu ? text : formatToMinutesSeconds(text),
          };
        },
      })),
    },
  ];

  function callback(key) {
    if (key === "3") {
      getPoliBPJS();
    }
  }

  const handleClick = () => {
    const excel = new Excel();
    excel
      .addSheet("Rata-rata per bulan")
      .addColumns(columnrata)
      .addDataSource(dashboardrata, {
        str2Percent: true,
      })
      .saveAs("Data Dashboard.xlsx");
  };

  return (
    <div className="backcontent">
      <Card
        title="Dashboard Antrian Online"
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
      >
        <Tabs
          defaultActiveKey="1"
          type="card"
          onChange={callback}
          tabBarExtraContent={
            <Image
              preview={false}
              width={150}
              src="https://upload.wikimedia.org/wikipedia/commons/b/b4/BPJS_Kesehatan_logo.svg"
            />
          }
        >
          <TabPane tab="Dashboard Per Bulan" key="1">
            <Space>
              <DatePicker
                onChange={(date, dateString) => {
                  setTahun(dateString.split("-").shift());
                  setBulan(dateString.split("-").pop());
                }}
                picker="month"
              />
              <Button
                onClick={() => getDashboardByBln(bulan, tahun)}
                type="primary"
              >
                Cari
              </Button>
              <Radio.Group
                onChange={(e) => setWaktu(e.target.value)}
                value={waktu}
              >
                <Radio value={true}>Detik</Radio>
                <Radio value={false}>Menit</Radio>
              </Radio.Group>
            </Space>
            <Table
              loading={loading}
              bordered
              dataSource={dashboardbulan}
              columns={columnbulan}
              size="small"
              scroll={{ x: "calc(700px + 50%)", y: 400 }}
              pagination={false}
              summary={(pageData) => {
                let total = 0;
                pageData.forEach(({ jumlahAntrean }) => {
                  total += jumlahAntrean;
                });
                return (
                  <>
                    <tr>
                      <th></th>
                      <th>Total</th>
                      <td className="column-money, tabeltabel">
                        <Text type="danger">{total}</Text>
                      </td>
                    </tr>
                  </>
                );
              }}
            />
            <Paragraph>
              Catatan:
              <ul>
                <li>a) Waktu Task 1 = Waktu tunggu admisi dalam detik</li>
                <li>b) Waktu Task 2 = Waktu layan admisi dalam detik</li>
                <li>c) Waktu Task 3 = Waktu tunggu poli dalam detik</li>
                <li>d) Waktu Task 4 = Waktu layan poli dalam detik </li>
                <li>e) Waktu Task 5 = Waktu tunggu farmasi dalam detik </li>
                <li>f) Waktu Task 6 = Waktu layan farmasi dalam detik </li>
                <li>
                  g) Insertdate = Waktu pengambilan data, timestamp dalam
                  milisecond
                </li>
                <li>
                  h) Waktu server adalah data waktu (task 1-6) yang dicatat oleh
                  server BPJS Kesehatan setelah RS mengirimkan data, sedangkan
                  waktu rs adalah data waktu (task 1-6) yang dikirimkan oleh RS
                </li>
              </ul>
            </Paragraph>
          </TabPane>
          <TabPane tab="Dashboard Per Tanggal" key="2">
            <Space>
              <DatePicker
                onChange={(date, dateString) => {
                  setTanggal(dateString);
                }}
              />
              <Button onClick={() => getDashboardByTgl(tanggal)} type="primary">
                Cari
              </Button>
              <Radio.Group
                onChange={(e) => setWaktu(e.target.value)}
                value={waktu}
              >
                <Radio value={true}>Detik</Radio>
                <Radio value={false}>Menit</Radio>
              </Radio.Group>
            </Space>
            <Table
              loading={loading}
              bordered
              dataSource={dashboardtanggal}
              columns={columntanggal}
              size="small"
              scroll={{ x: "calc(700px + 50%)", y: 400 }}
              pagination={false}
              summary={(pageData) => {
                let total = 0;
                pageData.forEach(({ jumlahAntrean }) => {
                  total += jumlahAntrean;
                });
                return (
                  <>
                    <tr>
                      <th></th>
                      <th></th>
                      <th>Total</th>
                      <td className="column-money, tabeltabel">
                        <Text type="danger">{total}</Text>
                      </td>
                    </tr>
                  </>
                );
              }}
            />
            <Paragraph>
              Catatan:
              <ul>
                <li>a) Waktu Task 1 = Waktu tunggu admisi dalam detik</li>
                <li>b) Waktu Task 2 = Waktu layan admisi dalam detik</li>
                <li>c) Waktu Task 3 = Waktu tunggu poli dalam detik</li>
                <li>d) Waktu Task 4 = Waktu layan poli dalam detik </li>
                <li>e) Waktu Task 5 = Waktu tunggu farmasi dalam detik </li>
                <li>f) Waktu Task 6 = Waktu layan farmasi dalam detik </li>
                <li>
                  g) Insertdate = Waktu pengambilan data, timestamp dalam
                  milisecond
                </li>
                <li>
                  h) Waktu server adalah data waktu (task 1-6) yang dicatat oleh
                  server BPJS Kesehatan setelah RS mengirimkan data, sedangkan
                  waktu rs adalah data waktu (task 1-6) yang dikirimkan oleh RS
                </li>
              </ul>
            </Paragraph>
          </TabPane>
          <TabPane tab="Dashboard Per Poli" key="3">
            <Space>
              <Select
                loading={loadingpoli}
                dataSource={poliall}
                showSearch
                style={{ width: 300 }}
                placeholder="Pilih Poli"
                optionFilterProp="children"
                onChange={(value) => setPoli(value.split("-").shift())}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {poliall.map((d) => (
                  <Option key={d.kdpoli + "-" + d.kdsubspesialis}>
                    {d.kdpoli +
                      " - " +
                      d.nmpoli +
                      " - " +
                      d.kdsubspesialis +
                      " - " +
                      d.nmsubspesialis}
                  </Option>
                ))}
              </Select>
              <DatePicker
                onChange={(date, dateString) => {
                  setTahunPoli(dateString.split("-").shift());
                  setBulanPoli(dateString.split("-").pop());
                }}
                picker="month"
              />
              <Button
                onClick={() => getDashboardByPoli(poli, bulanpoli, tahunpoli)}
                type="primary"
              >
                Cari
              </Button>
              <Radio.Group
                onChange={(e) => setWaktu(e.target.value)}
                value={waktu}
              >
                <Radio value={true}>Detik</Radio>
                <Radio value={false}>Menit</Radio>
              </Radio.Group>
            </Space>
            <Table
              loading={loading}
              size="small"
              dataSource={dashboardpoli}
              columns={columnpoli}
              scroll={{ x: "calc(700px + 50%)", y: 400 }}
              pagination={false}
              summary={(pageData) => {
                let total = 0;
                pageData.forEach(({ jumlahAntrean }) => {
                  total += jumlahAntrean;
                });
                return (
                  <>
                    <tr>
                      <th></th>
                      <th></th>
                      <th>Total</th>
                      <td className="column-money, tabeltabel">
                        <Text type="danger">{total}</Text>
                      </td>
                    </tr>
                  </>
                );
              }}
            />
            <Paragraph>
              Catatan:
              <ul>
                <li>a) Waktu Task 1 = Waktu tunggu admisi dalam detik</li>
                <li>b) Waktu Task 2 = Waktu layan admisi dalam detik</li>
                <li>c) Waktu Task 3 = Waktu tunggu poli dalam detik</li>
                <li>d) Waktu Task 4 = Waktu layan poli dalam detik </li>
                <li>e) Waktu Task 5 = Waktu tunggu farmasi dalam detik </li>
                <li>f) Waktu Task 6 = Waktu layan farmasi dalam detik </li>
                <li>
                  g) Insertdate = Waktu pengambilan data, timestamp dalam
                  milisecond
                </li>
                <li>
                  h) Waktu server adalah data waktu (task 1-6) yang dicatat oleh
                  server BPJS Kesehatan setelah RS mengirimkan data, sedangkan
                  waktu rs adalah data waktu (task 1-6) yang dikirimkan oleh RS
                </li>
              </ul>
            </Paragraph>
          </TabPane>
          <TabPane tab="Dashboard Rata-rata Per Bulan" key="4">
            <Space>
              <DatePicker
                onChange={(date, dateString) => {
                  setTahunPoli(dateString.split("-").shift());
                  setBulanPoli(dateString.split("-").pop());
                }}
                picker="month"
              />
              <Button
                onClick={() => getDashboardRatarata(bulanpoli, tahunpoli)}
                type="primary"
              >
                Cari
              </Button>
              <Radio.Group
                onChange={(e) => setWaktu(e.target.value)}
                value={waktu}
              >
                <Radio value={true}>Detik</Radio>
                <Radio value={false}>Menit</Radio>
              </Radio.Group>
            </Space>
            <Table
              loading={loading}
              size="small"
              dataSource={dashboardrata}
              columns={columnrata}
              scroll={{ x: "calc(700px + 50%)", y: 400 }}
              pagination={false}
              footer={() => (
                <Button
                  onClick={handleClick}
                  type="primary"
                  style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
                >
                  Export Excel <FileExcelOutlined />
                </Button>
              )}
            />
            <Paragraph>
              Catatan:
              <ul>
                <li>a) Waktu Task 1 = Waktu tunggu admisi dalam detik</li>
                <li>b) Waktu Task 2 = Waktu layan admisi dalam detik</li>
                <li>c) Waktu Task 3 = Waktu tunggu poli dalam detik</li>
                <li>d) Waktu Task 4 = Waktu layan poli dalam detik </li>
                <li>e) Waktu Task 5 = Waktu tunggu farmasi dalam detik </li>
                <li>f) Waktu Task 6 = Waktu layan farmasi dalam detik </li>
                <li>
                  g) Insertdate = Waktu pengambilan data, timestamp dalam
                  milisecond
                </li>
                <li>
                  h) Waktu server adalah data waktu (task 1-6) yang dicatat oleh
                  server BPJS Kesehatan setelah RS mengirimkan data, sedangkan
                  waktu rs adalah data waktu (task 1-6) yang dikirimkan oleh RS
                </li>
              </ul>
            </Paragraph>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default DashboardAntrol;
