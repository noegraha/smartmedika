import { Button, Col, DatePicker, Layout, Row, Select, Space, Spin } from 'antd';
import React, { Fragment, useContext, useState } from 'react'
import { PasienContext } from '../../../../rawatjalan/context/PasienContext';
import TabelPasienPelayananBD from './TabelPasienPelayananBD';
import { BankDarahContext } from '../../context/BankDarahContext';
import dayjs from 'dayjs';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { Option } = Select;

const SidebarPelayananBD = () => {
    const {
        ruangIdValid, setruangIdValid,
        tglOrder, settglOrder,
        ktgOrder, setktgOrder,
        // func
        getListOrderbyDate,
    } = useContext(BankDarahContext)

    const { lebar, refresh, penunjang } = useContext(PasienContext);
    const [collapsed, setCollapsed] = useState(false);

    const changeUnitId = (ruang, tgl, ktg) => {
        setruangIdValid(ruang)
        getListOrderbyDate(ruang, tgl, ktg)
    }

    const changeTglOrder = (ruang, tgl, ktg) => {
        console.log('changeTglOrder : ', tgl);
        settglOrder(tgl)
        getListOrderbyDate(ruang, dayjs(tgl).format('YYYY-MM-DD'), ktg)
    }

    const changeKtgOrder = (ruang, tgl, ktg) => {
        setktgOrder(ktg)
        getListOrderbyDate(ruang, dayjs(tgl).format('YYYY-MM-DD'), ktg)
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
                {/* <span
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
                </span> */}

                {/* <Tooltip placement="rightTop" title="Unit Kemoterapi">
        </Tooltip> */}
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: "16px",
                        width: 30,
                        height: 38,
                        position: "absolute",
                        left: collapsed ? "0px" : lebar,
                        top: "15px",
                        backgroundColor: "black",
                        color: "white",
                    }}
                />

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={24}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={ruangIdValid}
                            onSelect={(e) => changeUnitId(e, dayjs(tglOrder).format('YYYY-MM-DD'), ktgOrder)}
                        >
                            <Option key="A" value="9407">BANK DARAH - RSMS</Option>
                            <Option key="B" value="9457">BANK DARAH - ABIYASA</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginBottom: "2px" }}>
                    <Col span={24}>
                        <Space>
                            <span>
                                <b>Tgl.Order :</b>
                            </span>
                            <DatePicker
                                value={tglOrder}
                                onChange={(e) => changeTglOrder(ruangIdValid, e, ktgOrder)}
                                // size='small'
                                disabled={!ruangIdValid}
                                format="DD-MM-YYYY"
                                allowClear={false}
                                inputReadOnly={true}
                                style={{ width: "146%" }}
                            />
                        </Space>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={24}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={ktgOrder}
                            onSelect={(e) => changeKtgOrder(ruangIdValid, dayjs(tglOrder).format('YYYY-MM-DD'), e)}
                        >
                            <Option key={1} value="0">Daftar Order</Option>
                            <Option key={2} value="1">Daftar Tervalidasi</Option>
                            <Option key={3} value="2">Daftar Terlayani</Option>
                        </Select>
                    </Col>
                </Row>

                <TabelPasienPelayananBD />
            </Sider>
        </Fragment>
    )
}

export default SidebarPelayananBD