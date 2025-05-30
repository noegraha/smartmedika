import React from "react";
import {
  Card,
  Col,
  Row,
  Space,
  DatePicker,
  Button,
  Input,
  Select,
  Table,
  Modal,
} from "antd";
import { CheckOutlined, SyncOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { DashboardHdContext } from "../context/DashboardHdContext";

const { Option } = Select;

const DataPasienbyUser = () => {
  const {
    bulanUserInput,
    setbulanUserInput,
    listUser,
    setlistUser,
    listPasien,
    setlistPasien,
    getUserInput,
    getPasienbyUser,
  } = useContext(DashboardHdContext);

  const [userId, setuserId] = useState("");

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "No",
      align: "center",
      width: 20,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "No Registrasi",
      dataIndex: "RegistrasiId",
      key: "RegistrasiId",
      align: "center",
      width: 90,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Nama",
      dataIndex: "Nama",
      key: "Nama",
      align: "center",
      width: 200,
      sorter: (a, b) => a.Nama.localeCompare(b.Nama),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "No RM",
      dataIndex: "PasienId",
      key: "PasienId",
      align: "center",
      width: 75,
    },
    {
      title: "Tgl Pelayanan",
      dataIndex: "Tanggal",
      key: "Tanggal",
      align: "center",
      width: 90,
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "UserId",
      dataIndex: "UserId",
      key: "UserId",
      align: "center",
      width: 75,
      // ellipsis: true,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Tgl Input",
      dataIndex: "DateEntry",
      key: "DateEntry",
      align: "center",
      width: 90,
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY")}</div>,
    },
  ];

  const setDefault = () => {
    setlistUser([]);
    setlistPasien([]);
    setuserId([]);
  };

  const changeBulan = (e) => {
    // console.log('changeBulan : ', dayjs(e).format("YYYY-MM"));
    setDefault();
    setbulanUserInput(e);
    getUserInput(dayjs(e).format("YYYY-MM"));
  };

  const changeUserId = (e) => {
    setlistPasien([]);
    setuserId(e);
  };

  const klikRefresh = () => {
    setDefault();
    getUserInput(dayjs(bulanUserInput).format("YYYY-MM"));
  };

  const klikCentang = () => {
    setlistPasien([]);
    if (!userId) {
      Modal.warn({
        title: "Peringatan!",
        content: "User Input belum dipilih",
      });
    } else {
      // console.log("klikCentang : ", dayjs(bulanUserInput).format("YYYY-MM"), userId);
      getPasienbyUser(dayjs(bulanUserInput).format("YYYY-MM"), userId);
    }
  };

  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      key: i,
      userId: "User " + 1,
      jumlah: i + 50,
    });
  }

  const dataa = [];
  for (let i = 0; i < 150; i++) {
    dataa.push({
      key: i,
      No: i + 1,
      RegistrasiId: "220706000" + i,
      Nama: "ABDURRAKHMAN ALHAKIM, SDR",
      PasienId: "02187472",
      TglPelayanan: "02-06-2022",
      UserId: "USERUSER" + i,
      DateEntry: "02-06-2022",
    });
  }

  return (
    <div>
      <Card
        title="Informasi Pasien berdasarkan Petugas"
        // loading={spinAksesVaskuler}
        headStyle={{ backgroundColor: "#ffd166" }}
        style={{ width: "100%", backgroundColor: "#fff1f0" }}
      >
        <Space style={{ width: "100%", marginBottom: 5 }}>
          <span>Pilih Bulan :&nbsp;</span>
          <Input.Group compact style={{ marginLeft: 10 }}>
            <DatePicker
              value={dayjs(bulanUserInput)}
              picker="month"
              format={"MM-YYYY"}
              allowClear={false}
              inputReadOnly={true}
              onChange={(e) => changeBulan(e)}
            />
            <Button
              onClick={() => klikRefresh()}
              icon={<SyncOutlined />}
              type="primary"
            />
            <Select
              dataSource={listUser}
              value={userId}
              showSearch
              style={{ width: 250, marginBottom: "3px" }}
              placeholder="User Input"
              optionFilterProp="children"
              onChange={(e) => changeUserId(e)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {listUser.map((d) => (
                <Option key={d.UserId}>{d.UserId + " - " + d.Jumlah}</Option>
              ))}
            </Select>
            <Button
              onClick={() => klikCentang()}
              disabled={!userId}
              icon={<CheckOutlined />}
              type="text"
              style={{ backgroundColor: "#52c41a", color: "white" }}
            />
          </Input.Group>
        </Space>

        <Table
          dataSource={listPasien}
          columns={columns}
          bordered
          //   loading={spinListJadwal}
          pagination={listPasien.length < 100 ? false : true}
          size="small"
          scroll={{ y: 420 }}
          // style={{ height: 495 }}
        />
      </Card>
    </div>
  );
};

export default DataPasienbyUser;
