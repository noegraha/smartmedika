import { Button, Table, Input, Row, Col, Card } from "antd";
import React, { useContext } from "react";
import { UserContext } from "./UserContext";
const { Search } = Input;

const MasterGroup = () => {
  const { grouplist, getGrouplistName } = useContext(UserContext);
  const columnsgroup = [
    {
      title: "Group Id",
      dataIndex: "userGroupId",
      key: "menuid",
    },
    {
      title: "Keterangan",
      fixed: "right",
      render: (grouplist) => (
        <Button size="small" type="link">
          {grouplist.groupDeskripsi}
        </Button>
      ),
    },
  ];
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Card
            title="Daftar Group"
            size="small"
            headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
          >
            <Search
              placeholder="Cari Menu"
              onChange={(e) =>
                getGrouplistName(e.target.value === "" ? "%20" : e.target.value)
              }
              onSearch={(e) =>
                getGrouplistName(e.target.value === "" ? "%20" : e.target.value)
              }
              enterButton
            />
            <Table size="small" dataSource={grouplist} columns={columnsgroup} />
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small">* UserGroup masih mengikuti master di KHS</Card>
        </Col>
      </Row>
    </div>
  );
};

export default MasterGroup;
