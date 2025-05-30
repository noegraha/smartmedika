import { Layout, Menu, Badge, notification } from 'antd';
import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { ControlOutlined, ExpandOutlined, HomeOutlined, SettingOutlined, IdcardTwoTone, SettingTwoTone, MessageTwoTone, UserSwitchOutlined, TeamOutlined, FileDoneOutlined } from '@ant-design/icons';
import { LoginContext } from '../../components/rawatjalan/context/LoginContext';
const { SubMenu } = Menu;
const { Header } = Layout;

const openNotificationWithIcon = type => {
  notification[type]({
    message: 'Pasien Konsul',
    description:
      'Pasien Konsul : \n Noreg : 1910251651 \n Nama : ABDUL ROCHIM, TN \n Asal Poli : KLINIK JANTUNG - RSMS ',
  });
};

const Menubar = () => {
  const [current, setCurrent] = useState('home');
  const handleClick = (e) => {
    setCurrent(e.key);
  }
  const { signOut } = useContext(LoginContext);
  var elem = document.documentElement;
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
  return (
    <Header className="header" style={{
      height: '33px', padding: '0 0', lineHeight: '32px'
      , position: 'sticky', zIndex: 3, width: '100%', left: 0, top: 0
    }} >
      {/* <div className="logo2" /> */}
      <Menu
        style={{ lineHeight: '32px' }}
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['home']}
        onClick={handleClick} selectedKeys={[current]}>
        <Menu.Item key="home">
          <Link to="/">
            <HomeOutlined />
              Beranda
              </Link>
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <SettingOutlined />
                Transaksi
              </span>
          }
        >
          <Menu.ItemGroup title="Transaksi">
            <Menu.Item key="setting:1"><Link to="/app/form"><TeamOutlined />PoliKlinik Rawat Jalan</Link></Menu.Item>
            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <SettingOutlined />
                Rawat Inap
              </span>
              }
            >
              <Menu.ItemGroup title="Rawat Inap">
                <Menu.Item key="setting:2"><Link to="/pemeriksaanawal"><TeamOutlined />Pemeriksaan Awal</Link></Menu.Item>
                <Menu.Item key="setting:3"><Link to="/pemeriksaanharian"><TeamOutlined />Pemeriksaan Harian</Link></Menu.Item>
                <Menu.Item key="setting:4"><Link to="/pencetakan"><TeamOutlined />Pencetakan</Link></Menu.Item>
                <Menu.Item key="setting:5"><Link to="/previewpenunjang"><TeamOutlined />Preview Penunjang</Link></Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <FileDoneOutlined />
                Penunjang
              </span>
          }
        >
          <Menu.ItemGroup title="Penunjang">
            <Menu.Item key="setting:8"><Link to="/hd"><TeamOutlined />Hemodialisa</Link></Menu.Item>
            <Menu.Item key="setting:9"><Link to="/gizi"><TeamOutlined />Gizi</Link></Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <TeamOutlined />
                Asuhan
              </span>
          }
        >
          <Menu.ItemGroup title="Asuhan">
            <Menu.Item key="setting:10"><Link to="/askep"><TeamOutlined />Asuhan Keperawatan</Link></Menu.Item>
            <Menu.Item key="setting:11"><Link to="/validasiaskep"><TeamOutlined />Validasi Askep</Link></Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>



        <SubMenu style={{ float: 'right' }}
          title={
            <span className="submenu-title-wrapper">
              <SettingTwoTone />
                Setting
              </span>
          }
        >
          <Menu.ItemGroup>
            <Menu.Item key="setting:12"><IdcardTwoTone />Account</Menu.Item>
            <Menu.Item key="setting:13"><Link to="/master"><ControlOutlined />Master</Link></Menu.Item>
            {/* <Menu.Item key="setting:14" onClick={openFullscreen}><ExpandOutlined />FullScreen</Menu.Item> */}
            <Menu.Item key="setting:15" onClick={(e) => signOut(e)} ><UserSwitchOutlined /><Link to="/">Logout</Link></Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="message" onClick={() => openNotificationWithIcon('warning')} style={{ float: 'right' }}>
          <Badge count={5}>
            <MessageTwoTone />
          </Badge>
        </Menu.Item>
        <Menu.Item key="full" onClick={openFullscreen} style={{ float: 'right' }}>
          <ExpandOutlined />FullScreen
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Menubar;