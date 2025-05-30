import React from 'react';
import { Layout } from "antd";
import JadwalRadioterapiContextProvider from './context/JadwalRadioterapiContext';
import SidebarJadwalRadioterapi from './component/SidebarJadwalRadioterapi';
import PageheadJadwalRadioterapi from './component/pageheadJadwalRadioterapi';
import DetailJadwalRadioterapi from './component/DetailJadwalRadioterapi';
import FormCetak_coba1 from './component/FormCetak_coba1';

const { Content } = Layout;

const JadwalRadioterapi = () => {
    return <div>
        <JadwalRadioterapiContextProvider>
            <Layout>
                <SidebarJadwalRadioterapi />
                <Content
                    style={{
                        padding: 7,
                        height: "100%",
                        flexDirection: "column",
                        msFlexDirection: "column",
                        display: "flex",
                    }}
                >
                    <PageheadJadwalRadioterapi />
                    <FormCetak_coba1 />
                    <DetailJadwalRadioterapi />
                </Content>
            </Layout>
        </JadwalRadioterapiContextProvider>
    </div>
};

export default JadwalRadioterapi;