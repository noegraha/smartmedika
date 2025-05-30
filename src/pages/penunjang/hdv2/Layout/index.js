import React from 'react';
import './style.css';

import { Layout, Menu } from 'antd';
const { Content, Footer } = Layout;

const LayoutApp = (props) => {
    return (
        <Layout>
            <Layout className="layout">
                <Menu mode="horizontal"
                    selectedKeys={"formhd"}
                    style={{
                        height: '25px',
                        padding: '0'
                    }}
                >
                    <Menu.Item key="formhd">
                        Form HD
                    </Menu.Item>
                    <Menu.Item key="navtwo">
                        Navigation Two
                    </Menu.Item>
                </Menu>
                <Content style={{ padding: '3px 0' }}>
                    <div className="site-layout-content">{props.children}</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Tester WS Swagger</Footer>
            </Layout>
        </Layout >
    )
}

export default LayoutApp;
