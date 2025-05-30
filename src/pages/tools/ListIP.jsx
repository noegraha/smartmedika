import {
  Button,
  Card,
  Col,
  Input,
  message,
  Row,
  Select,
  Space,
  Table,
  Tabs,
} from "antd";
import React, { useContext, useState } from "react";
import { UserContext } from "../appsetting/UserContext";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { apiInstance } from "../../api/axios";
const { Column } = Table;

const ListIP = () => {
  const { listIP, getListIP } = useContext(UserContext);
  const [ruangan, setRuangan] = useState([]);
  const [listRuangan, setListRuangan] = useState([]);
  const [listIPreg, setListIPreg] = useState([]);
  const [listIPruang, setListIPRuang] = useState([]);
  const [ippostCORS, setipPostCORS] = useState(null);
  const [ipdeleteCORS, setipDeleteCORS] = useState(null);
  const apiku = sessionStorage.getItem("api");

  const getRuangan = (nama) => {
    apiInstance
      .get(`${apiku}/SisJwt/GetRuangan/${nama}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListRuangan(res.data.result);
        } else {
          setListRuangan([]);
        }
      })
      .catch((err) => {
        setListRuangan([]);
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const getIpAll = () => {
    apiInstance
      .get(`${apiku}/SisJwt/GetIpAll`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListIPreg(res.data.result);
        } else {
          setListIPreg([]);
        }
      })
      .catch((err) => {
        setListIPreg([]);
        console.log(err);
      });
  };

  const getIpRuang = (ruang) => {
    apiInstance
      .get(`${apiku}/SisJwt/GetIpByRuang/${ruang}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListIPRuang(res.data.result);
        } else {
          setListIPRuang([]);
        }
      })
      .catch((err) => {
        setListIPRuang([]);
        console.log(err);
      });
  };

  const postCORS = () => {
    apiInstance
      .post(`${apiku}/SisJwt/PostCors`, { ipComputer: ippostCORS })
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Menambahkan IP");
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        message.error("Gagal Menambahkan IP");
        console.log(err);
      });
  };

  const aktifCORS = () => {
    apiInstance
      .post(`${apiku}/SisJwt/AktivasiCors`, { ipComputer: ippostCORS })
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Menambahkan IP");
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        message.error("Gagal Menambahkan IP");
        console.log(err);
      });
  };

  const inaktifCORS = () => {
    apiInstance
      .post(`${apiku}/SisJwt/InAktivasi`, { ipComputer: ipdeleteCORS })
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Menghapus IP");
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        message.error("Gagal Menambahkan IP");
        console.log(err);
      });
  };

  const items = [
    {
      key: "1",
      label: "Log IP",
      children: (
        <Card
          size="small"
          title="List IP"
          headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
        >
          <Button block type="primary" onClick={() => getListIP()}>
            Cek Log IP
          </Button>
          <Table
            bordered
            dataSource={listIP}
            size="small"
            rowKey="reg"
            scroll={{ x: 700 }}
          >
            <Column
              style={{ verticalAlign: "top" }}
              title="No."
              key="reg"
              className="tabeltabel"
              width={20}
              render={(text, record, index) => <span>{index + 1}</span>}
            />
            <Column
              title="IP Computer"
              key="reg"
              className="bgcolortunggu, tabeltabel2"
              width={40}
              sorter={(a, b) => a.IPComputer.localeCompare(b.IPComputer)}
              render={(listIP) => <span>{listIP.IPComputer}</span>}
            />
            <Column
              title="User ID"
              key="reg"
              className="tabeltabel"
              width={50}
              sorter={(a, b) => a.UserId.localeCompare(b.UserId)}
              render={(listIP) => <span>{listIP.UserId}</span>}
            />
          </Table>
        </Card>
      ),
    },
    {
      key: "2",
      label: "List IP",
      children: (
        <Card
          size="small"
          title="List IP"
          headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
        >
          <Button block type="primary" onClick={() => getIpAll()}>
            Cek List IP
          </Button>
          <Table
            bordered
            dataSource={listIPreg}
            size="small"
            rowKey="reg"
            scroll={{ x: 700 }}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
            }}
          >
            <Column
              style={{ verticalAlign: "top" }}
              title="No."
              key="reg"
              className="tabeltabel"
              width={20}
              render={(text, record, index) => <span>{index + 1}</span>}
            />
            <Column
              title="IP Computer"
              key="reg"
              className="bgcolortunggu, tabeltabel2"
              width={40}
              sorter={(a, b) => a.IPComputer.localeCompare(b.IPComputer)}
              render={(text, record, index) => <span>{record.IPComputer}</span>}
            />
            <Column
              title="MAC Address"
              key="reg"
              className="tabeltabel"
              width={50}
              sorter={(a, b) => a.MacAddress.localeCompare(b.MacAddress)}
              render={(text, record, index) => <span>{record.MacAddress}</span>}
            />
            <Column
              title="Ruang"
              key="reg"
              className="tabeltabel"
              width={50}
              sorter={(a, b) => a.RuangId.localeCompare(b.RuangId)}
              render={(text, record, index) => <span>{record.RuangId}</span>}
            />
            <Column
              title="Ruang"
              key="reg"
              className="tabeltabel"
              width={50}
              sorter={(a, b) => a.RuangDesk.localeCompare(b.RuangDesk)}
              render={(text, record, index) => <span>{record.RuangDesk}</span>}
            />
            <Column
              title="Keterangan"
              key="reg"
              className="tabeltabel"
              width={50}
              sorter={(a, b) => a.Keterangan.localeCompare(b.Keterangan)}
              render={(text, record, index) => <span>{record.Keterangan}</span>}
            />
          </Table>
        </Card>
      ),
    },
    {
      key: "3",
      label: "List IP by Ruang",
      children: (
        <Card
          size="small"
          title="List IP"
          headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
        >
          <Select
            showSearch
            style={{ width: 500 }}
            onFocus={() => getRuangan("%20")}
            placeholder="Pilih Ruangan"
            optionFilterProp="label"
            onSelect={(e) => setRuangan(e)}
            options={listRuangan.map((item) => ({
              value: item.RuangId,
              label: item.RuangDesk,
            }))}
          />
          <Button type="primary" onClick={() => getIpRuang(ruangan)}>
            Cek List IP by Ruang
          </Button>
          <Table
            bordered
            dataSource={listIPruang}
            size="small"
            rowKey="reg"
            scroll={{ x: 700 }}
            pagination={false}
          >
            <Column
              style={{ verticalAlign: "top" }}
              title="No."
              key="reg"
              className="tabeltabel"
              width={20}
              render={(text, record, index) => <span>{index + 1}</span>}
            />
            <Column
              title="IP Computer"
              key="reg"
              className="bgcolortunggu, tabeltabel2"
              width={40}
              sorter={(a, b) => a.IPComputer.localeCompare(b.IPComputer)}
              render={(text, record, index) => <span>{record.IPComputer}</span>}
            />
            <Column
              title="MAC Address"
              key="reg"
              className="tabeltabel"
              width={50}
              sorter={(a, b) => a.MacAddress.localeCompare(b.MacAddress)}
              render={(text, record, index) => <span>{record.MacAddress}</span>}
            />
            <Column
              title="Ruang"
              key="reg"
              className="tabeltabel"
              width={50}
              sorter={(a, b) => a.RuangId.localeCompare(b.RuangId)}
              render={(text, record, index) => <span>{record.RuangId}</span>}
            />
            <Column
              title="Ruang"
              key="reg"
              className="tabeltabel"
              width={50}
              sorter={(a, b) => a.RuangDesk.localeCompare(b.RuangDesk)}
              render={(text, record, index) => <span>{record.RuangDesk}</span>}
            />
            <Column
              title="Keterangan"
              key="reg"
              className="tabeltabel"
              width={50}
              sorter={(a, b) => a.Keterangan.localeCompare(b.Keterangan)}
              render={(text, record, index) => <span>{record.Keterangan}</span>}
            />
          </Table>
        </Card>
      ),
    },
    {
      key: "4",
      label: "Tools CORS",
      children: (
        <Card
          size="small"
          title="Aktivasi CORS"
          headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
        >
          <Row>
            <Col span={4}>Post CORS:</Col>
            <Col span={20}>
              <Space.Compact
                style={{
                  width: "100%",
                }}
              >
                <Input onChange={(e) => setipPostCORS(e.target.value)} />
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={() => postCORS()}
                />
              </Space.Compact>
            </Col>
          </Row>
          <Row>
            <Col span={4}>Aktivasi CORS:</Col>
            <Col span={20}>
              <Space.Compact
                style={{
                  width: "100%",
                }}
              >
                <Input onChange={(e) => setipPostCORS(e.target.value)} />
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={() => aktifCORS()}
                />
              </Space.Compact>
            </Col>
          </Row>

          <Row>
            <Col span={4}>Non Aktivasi CORS:</Col>
            <Col span={20}>
              <Space.Compact
                style={{
                  width: "100%",
                }}
              >
                <Input onChange={(e) => setipDeleteCORS(e.target.value)} />
                <Button
                  icon={<MinusOutlined />}
                  type="primary"
                  danger
                  onClick={() => inaktifCORS()}
                />
              </Space.Compact>
            </Col>
          </Row>
        </Card>
      ),
    },
  ];

  return (
    <div>
      <Tabs onChange={(e) => console.log(e)} items={items} type="card" />
    </div>
  );
};

export default ListIP;
