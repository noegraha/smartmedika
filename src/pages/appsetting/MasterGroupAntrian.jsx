import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Popconfirm,
  Popover,
  Row,
  Select,
  Table,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../chat/Chatcontext";
import { PasienContext } from "../rawatjalan/context/PasienContext";
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const MasterGroupAntrian = () => {
  const {
    insertGroupAntrian,
    ambilUserGroupAntrianDetail,
    usergroupantriandetail,
    usergroupantrian,
    deleteUserGroupAntrian,
    ambilUserGroupAntrian,
  } = useContext(ChatContext);
  const { ruangpoli } = useContext(PasienContext);
  const [namagrup, setNamaGrup] = useState("");
  const [ruangId1, setRuangId1] = useState(null);
  const [ruangId2, setRuangId2] = useState(null);
  const [dual, setDual] = useState(false);
  const ruang2 = dual ? ruangId2 : null;
  const datagrupantrian = {
    userId: namagrup,
    unitId: [ruangId1, ruang2],
  };
  useEffect(() => ambilUserGroupAntrian(), []);
  const insert = () => {
    console.log(datagrupantrian);
    insertGroupAntrian(datagrupantrian);
  };
  const columns = [
    {
      title: "Nama User Group",
      dataIndex: "userId",
    },
    {
      title: "Action",
      render: (usergroupantrian) => (
        <div>
          <Popover
            content={
              <div>
                {usergroupantriandetail.map((d) => (
                  <div>
                    {d.RuangId} - {d.Deskripsi}
                    <br />
                  </div>
                ))}
              </div>
            }
            trigger="click"
          >
            <Button
              size="small"
              type="primary"
              onClick={() => {
                ambilUserGroupAntrianDetail(usergroupantrian.userId);
              }}
            >
              Lihat Poli Display
            </Button>
          </Popover>{" "}
          <Popconfirm
            title="Apa yakin mau dihapus?"
            onConfirm={() => deleteUserGroupAntrian(usergroupantrian.userId)}
            onCancel={() => message.warning("Batal hapus")}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button size="small" type="primary" danger>
              Hapus
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  // function CustomRow(props) {
  //   return (
  //     <Tooltip
  //       title={
  //         <div>
  //           {usergroupantriandetail.map((d) => (
  //             <div>
  //               {d.Deskripsi}
  //               <br />
  //             </div>
  //           ))}
  //         </div>
  //       }
  //     >
  //       <tr {...props} />
  //     </Tooltip>
  //   );
  // }
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Card
            size="small"
            title="Tambah User Group"
            headStyle={{ backgroundColor: "#5cdbd3" }}
            style={{
              width: "100%",
              marginBottom: "8px",
              backgroundColor: "#b5f5ec",
            }}
          >
            <Form.Item
              {...formItemLayout}
              label="Nama Grup"
              labelAlign="left"
              style={{ marginBottom: 0 }}
            >
              <Input onChange={(e) => setNamaGrup(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Dual Antrian?"
              labelAlign="left"
              style={{ marginBottom: 0 }}
              {...formItemLayout}
            >
              <Checkbox onChange={(e) => setDual(e.target.checked)}>
                {dual ? "YA" : "TIDAK"}
              </Checkbox>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Ruang Display 1"
              labelAlign="left"
              style={{ marginBottom: 0 }}
            >
              <Select
                dataSource={ruangpoli}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih ruang..."
                optionFilterProp="children"
                onChange={(e) => setRuangId1(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {ruangpoli.map((d) => (
                  <Option key={d.ruangId}>{d.deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
            {dual ? (
              <Form.Item
                {...formItemLayout}
                label="Ruang Display 2"
                labelAlign="left"
                style={{ marginBottom: 0 }}
              >
                <Select
                  dataSource={ruangpoli}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih ruang..."
                  optionFilterProp="children"
                  onChange={(e) => setRuangId2(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {ruangpoli.map((d) => (
                    <Option key={d.ruangId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
            ) : null}
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button
                  style={{ marginTop: 5 }}
                  type="primary"
                  onClick={() => insert()}
                >
                  Simpan
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            size="small"
            title="Daftar User Group"
            headStyle={{ backgroundColor: "#ffa39e" }}
            style={{
              width: "100%",
              marginBottom: "8px",
              backgroundColor: "#fff1f0",
            }}
          >
            <Table
              onRow={(record, rowIndex) => {
                return {
                  onContextMenu: () => {
                    ambilUserGroupAntrianDetail(record.userId);
                  },
                };
              }}
              bordered
              size="small"
              dataSource={usergroupantrian}
              columns={columns}
              // components={{
              //   body: {
              //     row: CustomRow,
              //   },
              // }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MasterGroupAntrian;
