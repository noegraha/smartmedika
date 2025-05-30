import React from 'react'
import RadioterapiContextProvider from './context/RadioterapiContext'
import { Col, Divider, Layout, Row, Select } from 'antd';
import PageheadRadoterapi from './component/pageheadRadioterapi';
import LookupPasien from './component/StsEksterna/LookupPasien';
import MenuTabStsEksternal from './component/StsEksterna/MenuTabStsEksternal';

const { Content } = Layout;
const { Option } = Select;

const FormRadioterapiStsEksterna = () => {
    return (
        <div>
            <RadioterapiContextProvider>
                <Layout>
                    {/* <SidebarRadioterapi /> */}
                    <Content
                        style={{
                            padding: 7,
                            height: "100%",
                            flexDirection: "column",
                            msFlexDirection: "column",
                            display: "flex",
                        }}
                    >
                        <Divider
                            orientation='left'
                            style={{ backgroundColor: '#FFF3C7', margin: '0px' }}>
                            RME Radioterapi - Status Eksterna
                        </Divider>
                        <PageheadRadoterapi />
                        <LookupPasien />
                        <MenuTabStsEksternal />
                    </Content>
                </Layout>
            </RadioterapiContextProvider>
        </div>
    )
}

export default FormRadioterapiStsEksterna