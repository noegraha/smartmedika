import React, { useContext, useState } from 'react';
import { Layout, Menu, Select } from 'antd';
import Tabelpasien from './tabelpasien';
import { PasienContext } from '../../components/rawatjalan/context/PasienContext';
import { PelayananContext } from '../../components/rawatjalan/context/Pelayanancontext';
import { DiagnosaContext } from '../../components/rawatjalan/context/Diagnosacontext';

const { Sider } = Layout;
const { Option } = Select;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const { poli, cariPasienPoli, ambilRuang, setCurpas } = useContext(PasienContext);
  const { loadPelayanan, setPelayanan, setKosong } = useContext(PelayananContext);
  const { getDiagnosa } = useContext(DiagnosaContext);

  const handleCari = (e) => {
    setCurpas([]);
    cariPasienPoli(e);
    setKosong([]);
    setPelayanan([])
    loadPelayanan(e);
    getDiagnosa(e)
    ambilRuang(e);
    console.log(e);
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      // width={250}
      // // style={{ background: '#fff', left: 0 }}
      // style={{
      //   background: '#fff',
      //   height: 'auto',
      //   marginTop: '38px',
      //   position: 'sticky', left: 0, top: 0
      // }}
      // collapsible collapsed={collapsed} onCollapse={onCollapse}
      // trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={250}
      style={{
        background: '#fff',
        // overflow: "auto",
        height: "95vh",
        position: "sticky",
        top: 42,
        left: 0,
        zIndex: 2
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        style={{ borderRight: 0 }}
      >
        <Select
          dataSource={poli}
          showSearch
          style={{ width: 250, marginTop: 12 }}
          placeholder="Pilih ruang..."
          optionFilterProp="children"
          onChange={handleCari}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {poli.map(d => (
            <Option key={d.ruangId}>{d.deskripsi}</Option>
          ))}
        </Select>
        <Tabelpasien />
      </Menu>
    </Sider>
  );
}

export default Sidebar;