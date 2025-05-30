import { Button, Table, Input, Row, Col, Card } from "antd";
import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { LoginContext } from "../rawatjalan/context";
import MasterUserSync from "../tools/MasterUser";
const { Search } = Input;

const MasterUser = () => {
  const { userlist, getUserList, getUserListName, getMenu } =
    useContext(UserContext);
  const { cekPasswordUser, cekPasswordsaja, setUserSync } =
    useContext(LoginContext);
  const searchUser = (e) => {
    e === "" ? getUserList() : getUserListName(e);
  };
  const [pilih, setPilih] = useState(null);
  const columns = [
    {
      title: "Auth Id",
      dataIndex: "authID",
      key: "authId",
      sorter: (a, b) => a.authID - b.authID,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Nama Lengkap",
      key: "namaLengkap",
      render: (userlist) => (
        <Button size="small" type="link">
          {userlist.namaLengkap}
        </Button>
      ),
      sorter: (a, b) => a.namaLengkap.localeCompare(b.namaLengkap),
    },
  ];
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Card
            title="Daftar User"
            size="small"
            headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
          >
            * User masih mengikuti master di KHS
            <Search
              placeholder="Cari Nama"
              onChange={(e) => searchUser(e.target.value)}
              onSearch={(e) => searchUser(e.target.value)}
              enterButton
            />
            <Table
              size="small"
              dataSource={userlist}
              columns={columns}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    cekPasswordsaja(record.username.toUpperCase());
                    setUserSync(record.username.toUpperCase());
                    cekPasswordUser(record.username.toUpperCase());
                    setPilih(record.username);
                    getMenu(record.authID);
                  },
                };
              }}
              rowClassName={(record, index) =>
                record.username === pilih ? "colorpilih" : "fontkecil"
              }
              style={{ cursor: "pointer" }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <MasterUserSync />
        </Col>
      </Row>
    </div>
  );
};

export default MasterUser;
