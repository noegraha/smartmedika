import {
  Button,
  Col,
  Row,
  Table,
  Modal,
  Space,
  Tooltip,
  Checkbox,
  Form,
  Input,
} from "antd";
import React, { useContext, useState } from "react";
import { CloseCircleTwoTone, EditTwoTone } from "@ant-design/icons";
import { UserContext } from "./UserContext";
const { Search } = Input;

const SetRule = () => {
  const {
    getGrouplistName,
    grouplist,
    readModul,
    getModulList,
    readModulList,
    modul,
    modullist,
    insertRuleModul,
    deleteRuleModul,
    modulAksesFull,
    setModulAksesFull,
    modulAksesUpdate,
    setModulAksesUpdate,
    modulAksesInsert,
    setModulAksesInsert,
    modulAksesDelete,
    setModulAksesDelete,
    modulAksesRead,
    setModulAksesRead,
  } = useContext(UserContext);
  const [menuId, setMenuId] = useState("");
  const [groupId, setGroupId] = useState("");
  const onGroup = (e) => {
    readModulList(e);
    setGroupId(e);
  };
  const onMenuId = (e) => {
    setMenuId(e);
    setModulAksesFull(true);
    setModulAksesUpdate(true);
    setModulAksesInsert(true);
    setModulAksesDelete(true);
    setModulAksesRead(true);
  };
  const tambahmenurule = {
    userGroupId: groupId,
    menuId: menuId,
    aksesFull: modulAksesFull,
    aksesUpdate: modulAksesUpdate,
    aksesInsert: modulAksesInsert,
    aksesDelete: modulAksesDelete,
    aksesRead: modulAksesRead,
  };
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
        <Button
          size="small"
          type={grouplist.userGroupId === groupId ? "primary" : "link"}
          onClick={(e) => onGroup(grouplist.userGroupId)}
        >
          {grouplist.groupDeskripsi}
        </Button>
      ),
    },
  ];

  const columnsrule = [
    {
      title: "No",
      key: "no",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Menu ",
      dataIndex: "MenuDeskripsi",
      key: "menuid",
    },
    {
      title: "Akses Full",
      key: "aksesFull",
      render: (modul) => (
        <span>
          <Checkbox checked={modul.AksesFull} />
        </span>
      ),
    },
    {
      title: "Akses Update",
      key: "aksesUpdate",
      render: (modul) => (
        <span>
          <Checkbox checked={modul.AksesUpdate} />
        </span>
      ),
    },
    {
      title: "Akses Insert",
      key: "aksesInsert",
      render: (modul) => (
        <span>
          <Checkbox checked={modul.AksesInsert} />
        </span>
      ),
    },
    {
      title: "Akses Delete",
      key: "aksesDelete",
      render: (modul) => (
        <span>
          <Checkbox checked={modul.AksesDelete} />
        </span>
      ),
    },
    {
      title: "Akses Read",
      key: "aksesRead",
      render: (modul) => (
        <span>
          <Checkbox checked={modul.AksesRead} />
        </span>
      ),
    },
    {
      title: "Action",
      fixed: "right",
      render: (modul) => (
        <Space>
          <Button
            size="small"
            type="link"
            onClick={(e) => showModal2(modul.UserGroupId, modul.MenuId)}
          >
            <Tooltip title="edit">
              <EditTwoTone twoToneColor="green" />
            </Tooltip>
          </Button>
          <Button
            size="small"
            type="link"
            onClick={(e) => deleteRuleModul(modul.UserGroupId, modul.MenuId)}
          >
            <Tooltip title="hapus">
              <CloseCircleTwoTone twoToneColor="red" />
            </Tooltip>
          </Button>
        </Space>
      ),
    },
  ];
  const columnsmodul = [
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
      key: "deskripsi",
      render: (modullist) => (
        <Button
          size="small"
          type={menuId === modullist.menuId ? "primary" : "link"}
          onClick={(e) => onMenuId(modullist.menuId)}
        >
          {modullist.menuDeskripsi}
        </Button>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    getModulList();
  };

  const handleOk = () => {
    setIsModalVisible(false);
    insertRuleModul(tambahmenurule);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal2 = (e, d) => {
    setIsModalVisible2(true);
    readModul(e, d);
    setMenuId(d);
  };

  const handleOk2 = () => {
    setIsModalVisible2(false);
    insertRuleModul(tambahmenurule);
    console.log(tambahmenurule);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={9}>
          <Search
            placeholder="Cari Menu"
            onChange={(e) =>
              getGrouplistName(e.target.value === "" ? "%20" : e.target.value)
            }
            onSearch={(e) => getGrouplistName(e === "" ? "%20" : e)}
            enterButton
          />
          <Table size="small" dataSource={grouplist} columns={columnsgroup} />
        </Col>
        <Col span={15}>
          <Table size="small" dataSource={modul} columns={columnsrule} />
          <Button type="primary" onClick={showModal} size="small">
            Tambah Modul
          </Button>
          <Modal
            title="Tambah Modul"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Table size="small" dataSource={modullist} columns={columnsmodul} />
          </Modal>

          <Modal
            title="Edit Modul"
            visible={isModalVisible2}
            onOk={handleOk2}
            onCancel={handleCancel2}
            width="600px"
          >
            <Form>
              <Checkbox
                checked={modulAksesFull}
                onChange={(e) => setModulAksesFull(e.target.checked)}
              >
                AksesFull
              </Checkbox>
              <Checkbox
                checked={modulAksesUpdate}
                onChange={(e) => setModulAksesUpdate(e.target.checked)}
              >
                AksesUpdate
              </Checkbox>
              <Checkbox
                checked={modulAksesInsert}
                onChange={(e) => setModulAksesInsert(e.target.checked)}
              >
                AksesInsert
              </Checkbox>
              <Checkbox
                checked={modulAksesDelete}
                onChange={(e) => setModulAksesDelete(e.target.checked)}
              >
                AksesDelete
              </Checkbox>
              <Checkbox
                checked={modulAksesRead}
                onChange={(e) => setModulAksesRead(e.target.checked)}
              >
                AksesRead
              </Checkbox>
            </Form>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default SetRule;
