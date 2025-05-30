import {
  Button,
  Col,
  Row,
  Table,
  Modal,
  Input,
  Popconfirm,
  Tooltip,
  message,
  Card,
  Checkbox,
  Space,
  Form,
} from "antd";
import React, { useContext, useState } from "react";
import { CloseCircleTwoTone, EditTwoTone } from "@ant-design/icons";
import { UserContext } from "./UserContext";
const { Search } = Input;
const SetGroup = () => {
  const {
    getGrouplistName,
    grouplist,
    readGroupAkses,
    groupakses,
    insertGroupAkses,
    userlist,
    getUserList,
    getUserListName,
    deleteGroupAkses,
    readModulList,

    readModul,
    getModulList,
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
  const [group, setGroup] = useState("");
  const [auth, setAuth] = useState("");
  const [menuId, setMenuId] = useState("");
  const [groupId, setGroupId] = useState("");
  const onGroup = (e) => {
    readGroupAkses(e);
    setGroup(e);
    readModulList(e);
    setGroupId(e);
  };
  const onDelete = (e, d) => {
    deleteGroupAkses(e, d);
  };
  const cancel = () => {
    message.error("Batal Dihapus");
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
          type={group === grouplist.userGroupId ? "primary" : "link"}
          onClick={(e) => onGroup(grouplist.userGroupId)}
        >
          {grouplist.groupDeskripsi}
        </Button>
      ),
    },
  ];
  const columnsakses = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => {
        // To sort alphabetically (case-insensitive), you can use localeCompare
        return a.username.localeCompare(b.username);
      },
    },
    {
      title: "Nama Lengkap",
      fixed: "right",
      dataIndex: "namaLengkap",
    },
    {
      title: "Action",
      fixed: "right",
      render: (groupakses) => (
        <Popconfirm
          title="Anda Yakin Menghapus User ?"
          onConfirm={(e) => onDelete(groupakses.authId, groupakses.userGroupId)}
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
      ),
    },
  ];
  const columnsuser = [
    {
      title: "Auth Id",
      dataIndex: "authID",
      key: "authId",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Nama Lengkap",
      fixed: "right",
      render: (userlist) => (
        <Button
          size="small"
          type={userlist.authID === auth ? "primary" : "link"}
          onClick={(e) => setAuth(userlist.authID)}
        >
          {userlist.namaLengkap}
        </Button>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const datagroupakses = {
    authId: parseInt(auth),
    userGroupId: group,
  };
  const showModal = () => {
    setIsModalVisible(true);
    getUserList();
  };

  const handleOk = () => {
    insertGroupAkses(datagroupakses);
    console.log(datagroupakses);
    setIsModalVisible(false);
    setAuth("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const searchUser = (e) => {
    e === "" ? getUserList() : getUserListName(e);
  };

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

  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisibleTambahMenu, setIsModalTambahMenu] = useState(false);

  const showModalTambahMenu = () => {
    setIsModalTambahMenu(true);
    getModulList();
  };

  const handleOkTambahMenu = () => {
    setIsModalTambahMenu(false);
    insertRuleModul(tambahmenurule);
  };

  const handleCancelTambahMenu = () => {
    setIsModalTambahMenu(false);
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

  const [key, setKey] = useState("tab1");
  const tabList = [
    {
      key: "tab1",
      tab: <span style={{ fontWeight: "bolder" }}>Daftar Anggota</span>,
    },
    {
      key: "tab2",
      tab: <span style={{ fontWeight: "bolder" }}>Akses Menu</span>,
    },
  ];
  const contentList = {
    tab1: (
      <div>
        <Table size="small" dataSource={groupakses} columns={columnsakses} />
        <Button type="primary" onClick={showModal} size="small">
          Tambah User
        </Button>
      </div>
    ),
    tab2: (
      <div>
        <Table size="small" dataSource={modul} columns={columnsrule} />
        <Button type="primary" onClick={showModalTambahMenu} size="small">
          Tambah Modul
        </Button>
      </div>
    ),
  };
  const onTabChange = (key) => {
    setKey(key);
  };
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Card
            title="Set Group"
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
            <Card size="small">
              <Table
                size="small"
                dataSource={grouplist}
                columns={columnsgroup}
              />
            </Card>
          </Card>
        </Col>
        <Col span={16}>
          <Card
            tabProps={{ size: "small" }}
            size="small"
            tabList={tabList}
            activeTabKey={key}
            onTabChange={(key) => onTabChange(key)}
          >
            {contentList[key]}
          </Card>

          <Modal
            title="Tambah User"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Search
              placeholder="Cari Username"
              onChange={(e) => searchUser(e.target.value)}
              onSearch={(e) => searchUser(e.target.value)}
              enterButton
            />
            <Table size="small" dataSource={userlist} columns={columnsuser} />
          </Modal>

          <Modal
            title="Tambah Modul"
            open={isModalVisibleTambahMenu}
            onOk={handleOkTambahMenu}
            onCancel={handleCancelTambahMenu}
          >
            <Table size="small" dataSource={modullist} columns={columnsmodul} />
          </Modal>

          <Modal
            title="Edit Modul"
            open={isModalVisible2}
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

export default SetGroup;
