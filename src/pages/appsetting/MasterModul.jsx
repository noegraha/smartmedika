import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Space,
  Table,
  Tooltip,
} from "antd";
import React, { useContext, useState } from "react";
import { CloseCircleTwoTone, EditTwoTone } from "@ant-design/icons";
import { UserContext } from "./UserContext";
const { Search } = Input;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
  marginBottom: 0,
};
const MasterModul = () => {
  const [menuId, setMenuId] = useState("");
  const [menuDeskripsi, setMenuDeskripsi] = useState("");
  const { insertModul, modullist, deleteModul, getModulListName } =
    useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    setMenuId("");
    setMenuDeskripsi("");
  };

  const handleOk = () => {
    insertModul(datamodul);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal2 = (e, n) => {
    setIsModalVisible2(true);
    setMenuId(e);
    setMenuDeskripsi(n);
  };

  const handleOk2 = () => {
    insertModul(datamodul);
    setIsModalVisible2(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  const onDelete = (e) => {
    deleteModul(e);
  };
  const cancel = () => {
    message.error("Batal Dihapus");
  };
  const dataSource = modullist;
  const columns = [
    {
      title: "No",
      key: "no",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Menu Id",
      dataIndex: "menuId",
      key: "menuid",
    },
    {
      title: "Deskripsi",
      dataIndex: "menuDeskripsi",
      key: "deskripsi",
    },
    {
      title: "Action",
      fixed: "right",
      render: (modullist) => (
        <Space>
          <Button
            size="small"
            type="link"
            onClick={(e) =>
              showModal2(modullist.menuId, modullist.menuDeskripsi)
            }
          >
            <Tooltip title="edit">
              <EditTwoTone twoToneColor="green" />
            </Tooltip>
          </Button>
          <Popconfirm
            title="Anda Yakin Menghapus Modul ?"
            onConfirm={(e) => onDelete(modullist.menuId)}
            onCancel={(e) => cancel(e)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button type="link" size="small">
              <Tooltip title="hapus">
                <CloseCircleTwoTone twoToneColor="red" />
              </Tooltip>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const datamodul = {
    menuId: menuId,
    menuDeskripsi: menuDeskripsi,
    status: true,
  };
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Card
            title="Daftar Modul"
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
                getModulListName(e.target.value === "" ? "%20" : e.target.value)
              }
              onSearch={(e) =>
                getModulListName(e.target.value === "" ? "%20" : e.target.value)
              }
              enterButton
            />
            <Table
              size="small"
              dataSource={dataSource}
              columns={columns}
              title={() => (
                <Button type="primary" onClick={showModal} size="small">
                  Tambah Modul
                </Button>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Tambah Modul"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item {...formItemLayout} label="MenuId">
            <Input onChange={(e) => setMenuId(e.target.value)} value={menuId} />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Deskripsi">
            <Input
              onChange={(e) => setMenuDeskripsi(e.target.value)}
              value={menuDeskripsi}
              onPressEnter={handleOk}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Modul"
        visible={isModalVisible2}
        onOk={handleOk2}
        onCancel={handleCancel2}
      >
        <Form>
          <Form.Item {...formItemLayout} label="MenuId">
            <Input onChange={(e) => setMenuId(e.target.value)} value={menuId} />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Deskripsi">
            <Input
              onChange={(e) => setMenuDeskripsi(e.target.value)}
              onPressEnter={handleOk}
              value={menuDeskripsi}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MasterModul;
