import { Button, Card, message, Select, Table } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";
const { Option } = Select;

const SyncPembayaran = () => {
  const [pembayaran, setPembayaran] = useState([]);
  const [pelayanan, setPelayanan] = useState([]);
  const [ruang, setRuang] = useState(null);
  const [unit, setUnit] = useState([]);
  const [pel, setPel] = useState(null);
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  const syncPembayaran = () => {
    axios
      .get(`${apiku}/MstPembayaran/SyncMstPembayaran`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success(res.data.message);
        } else {
          message.info(res.data.message);
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Sync!");
        console.log(err);
      });
  };

  const syncRuang = () => {
    axios
      .get(`${apiku}/MstRuang/SinkronRuang`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success(res.data.message);
        } else {
          message.info(res.data.message);
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Sync!");
        console.log(err);
      });
  };

  const syncPelayanan = () => {
    axios
      .get(`${apiku}/MstPelayanan/SyncPelayanan`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Data Pelayanan : " + res.data.message);
        } else {
          message.info("Data Pelayanan : " + res.data.message);
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Sync!");
        console.log(err);
      });
  };

  const syncPelayananDetail = () => {
    axios
      .get(`${apiku}/MstPelayananDetail/SyncPelayananDetail`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Data Pelayanan Detail : " + res.data.message);
        } else {
          message.info("Data Pelayanan Detail : " + res.data.message);
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Sync!");
        console.log(err);
      });
  };

  const loadPelayanan = (ruang) => {
    axios
      .get(`${apiku}/MstStandarPelayananRuang/Read/${ruang}/1/200`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPelayanan(res.data.result);
        } else {
          setPelayanan([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setPelayanan([]);
        console.log(err);
        message.error("Gagal mengambil data!");
      });
  };

  const loadRuang = (jenis) => {
    axios
      .get(`${apiku}/MstRuang/Lookup/%20/${jenis}/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUnit(res.data.result);
        } else {
          setUnit([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setUnit([]);
        console.log(err);
        message.error("Gagal mengambil data!");
      });
  };

  const syncStandarPelayananRuang = () => {
    axios
      .get(`${apiku}/MstStandarPelayananRuang/SyncStdPelayananRuang`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Data Standar Pelayanan Ruang : " + res.data.message);
        } else {
          message.info("Data Standar Pelayanan Ruang : " + res.data.message);
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Sync!");
        console.log(err);
      });
  };

  const ambilPembayaran = () => {
    axios
      .get(`${apiku}/MstPembayaran/Lookup/%20/1/100`, options)
      .then((res) => {
        setPembayaran(res.data.result);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tabList = [
    {
      key: "tab1",
      tab: "Pembayaran",
    },
    {
      key: "tab2",
      tab: "Ruang Bagian",
    },
    {
      key: "tab3",
      tab: "Pelayanan",
    },
  ];
  const contentList = {
    tab1: (
      <div>
        <Button onClick={() => ambilPembayaran()} type="default">
          Cek Master Pembayaran Aktif
        </Button>
        {"   "}
        <Button onClick={() => syncPembayaran()} type="primary">
          Sync Pembayaran
        </Button>
        <Table
          columns={[
            {
              title: "No.",
              key: "no",
              render: (text, record, index) => <span>{index + 1}</span>,
            },
            {
              title: "ID",
              dataIndex: "pembayaranId",
              key: "id",
            },
            {
              title: "Pembayaran",
              dataIndex: "deskripsi",
              key: "deskripsi",
            },
            {
              title: "Tanggal Habis",
              dataIndex: "tanggalAkhir",
              key: "tanggalAkhir",
              render: (text, record, index) => (
                <span>{text.substring(0, 10)}</span>
              ),
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (text, record, index) =>
                record.status ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <CloseCircleOutlined twoToneColor="#eb2f96" />
                ),
            },
          ]}
          dataSource={pembayaran}
          size="small"
          pagination={false}
        />
      </div>
    ),
    tab2: (
      <div>
        <Button onClick={() => syncRuang()} type="primary">
          Sync Ruangan
        </Button>
      </div>
    ),
    tab3: (
      <div>
        <Button
          onClick={() => {
            syncPelayanan();
            syncPelayananDetail();
            syncStandarPelayananRuang();
          }}
          type="primary"
        >
          Sync Pelayanan
        </Button>
        <Select
          showSearch
          value={ruang}
          style={{ width: "100%" }}
          placeholder="Pilih Jenis Ruang..."
          optionFilterProp="children"
          onChange={(e) => {
            setRuang(e);
            loadRuang(e);
          }}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          <Option key={"1"}>RawatInap</Option>
          <Option key={"2"}>Rawat Jalan</Option>
          <Option key={"3"}>IGD</Option>
          <Option key={"4"}>PenunjangMedis</Option>
          <Option key={"5"}>PenunjangNonMedis</Option>
          <Option key={"7"}>ApotikFarmasi</Option>
        </Select>
        <Select
          dataSource={unit}
          showSearch
          style={{ width: "100%" }}
          placeholder="Pilih Ruang..."
          optionFilterProp="children"
          onChange={(e) => {
            // setUnit(e);
            loadPelayanan(e);
          }}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {unit.map((d) => (
            <Option
              key={d.ruangId}
              className={d.deskripsi.includes("ABIYASA") ? "backgroundaby" : ""}
            >
              {d.ruangId + " - " + d.deskripsi}
            </Option>
          ))}
        </Select>
        <Select
          dataSource={pelayanan}
          showSearch
          // searchValue={kosong}
          style={{ width: "100%" }}
          placeholder="Pilih Pelayanan..."
          optionFilterProp="children"
          onChange={(e) => setPel(e)}
          value={pel}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {pelayanan.map((d) => (
            <Option key={d.pelayananId}>
              {d.pelayananId + " - " + d.deskripsi}
            </Option>
          ))}
        </Select>
      </div>
    ),
  };
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  return (
    <div>
      <Card
        size="small"
        title="Sync DBRS to Smart"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    </div>
  );
};

export default SyncPembayaran;
