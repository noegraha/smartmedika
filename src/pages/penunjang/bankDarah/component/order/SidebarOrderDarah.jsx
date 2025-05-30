import { DatePicker, Layout, Select, Space, Spin } from 'antd';
import React, { Fragment, useContext, useState } from 'react'
import { PasienContext } from '../../../../rawatjalan/context/PasienContext';
import TabelPasienOrderDarah from './TabelPasienOrderDarah';
import { PasienRIContext } from '../../../../rawatinap/context/PasienRIContext';
import { BankDarahContext } from '../../context/BankDarahContext';
import dayjs from 'dayjs';

const { Sider } = Layout;
const { Option } = Select;

const SidebarOrderDarah = () => {
    const { lebar, refresh, penunjang } = useContext(PasienContext);
    const {
        cariPasienRuangRI,
        // spin
        setloadPasien,
    } = useContext(PasienRIContext)
    const {
        ruang, setruang,
        ruangId, setruangId,
        // func
        getRuangUser,
        getPasien,
        getPasienPenunjang,
        // spin
        spTbPasien,
    } = useContext(BankDarahContext)

    const [collapsed, setCollapsed] = useState(false);
    const [grpLayanan, setgrpLayanan] = useState();
    const [tglPmr, settglPmr] = useState(null);


    const groupLayanan = [
        {
            groupId: 1,
            deskripsi: "Rawat Inap",
        },
        {
            groupId: 3,
            deskripsi: "IGD",
        },
        {
            groupId: 4,
            deskripsi: "Penunjang Medis",
        }
        // 2.RawatJalan 
        // 4.PenunjangMedis 
        // 5.PenunjangNonMedis 
        // 6.Struktural 
        // 7.ApotikFarmasi
    ];

    const unitRuang = [
        {
            ruangId: "9333",
            deskripsi: "WIJAYA KUSUMA",
        },
    ];

    const pilihRuang = (e) => {
        setruangId(e);
        if (e !== '9426') {
            getPasien(e);
        }
    }

    return (
        <Fragment>
            <Sider
                breakpoint="lg"
                collapsible
                collapsed={collapsed}
                collapsedWidth={0}
                trigger={null}
                width={lebar}
                theme="light"
                style={{
                    height: "100%",
                    position: "sticky",
                    top: 35,
                    left: 0,
                    zIndex: 2,
                }}
            >
                <span
                    className={
                        "ant-layout-sider-zero-width-trigger ant-layout-sider-zero-width-trigger-left"
                    }
                    style={{ backgroundColor: "#001529", top: "1px", zIndex: 11 }}
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <span role="img" aria-label="bars" className="anticon anticon-bars">
                        <svg
                            viewBox="0 0 1024 1024"
                            focusable="false"
                            data-icon="bars"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                style={{ color: "white" }}
                                d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"
                            ></path>
                        </svg>
                    </span>
                </span>

                {/* <Tooltip placement="rightTop" title="Unit Kemoterapi">
        </Tooltip> */}
                <Select
                    dataSource={groupLayanan}
                    // value={unitId}
                    showSearch
                    style={{ width: "100%", marginBottom: "3px" }}
                    placeholder="Layanan..."
                    optionFilterProp="children"
                    onChange={(e) => {
                        getRuangUser(e);
                        setgrpLayanan(e);
                    }}
                >
                    {groupLayanan.map((d) => (
                        <Option key={d.groupId}>{d.deskripsi}</Option>
                    ))}
                </Select>

                <Spin spinning={spTbPasien}>
                    <Select
                        dataSource={ruang}
                        value={ruangId}
                        showSearch
                        style={{ width: "100%", marginBottom: "3px" }}
                        placeholder="Pilih Unit Ruang..."
                        optionFilterProp="children"
                        onChange={(e) => pilihRuang(e)}
                        disabled={!grpLayanan}
                    // size='small'
                    // filterOption={(input, option) =>
                    //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                    //   0
                    // }
                    >
                        {ruang.map((d) => (
                            <Option key={d.ruangId}>{d.deskripsi}</Option>
                        ))}
                    </Select>

                    {grpLayanan === 4 || grpLayanan === '4' ?
                        <DatePicker
                            onChange={(e) => {
                                settglPmr(e);
                                getPasienPenunjang(ruangId, dayjs(e).format('YYYY-MM-DD'));
                            }}
                            disabled={!ruangId}
                            format={'DD-MM-YYYY'}
                            style={{ width: '100%', marginBottom: "3px" }}
                        /> :
                        null}
                </Spin>

                <TabelPasienOrderDarah />
            </Sider>
        </Fragment>
    )
}

export default SidebarOrderDarah