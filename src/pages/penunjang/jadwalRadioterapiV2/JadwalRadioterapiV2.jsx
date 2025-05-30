import React from 'react';
import { Layout } from "antd";
import SidebarJadwalPenunjang from './component/SidebarJadwalPenunjang';
import JadwalPenunjangContextProvider from './context/JadwalPenunjangContext';
import PageheadJadwalPenunjang from './component/pageheadJadwalPenunjang';

const { Content } = Layout;

const JadwalRadioterapiV2 = () => {
    return <div>
        <JadwalPenunjangContextProvider>
            <Layout>
                <SidebarJadwalPenunjang />
                <Content
                    style={{
                        padding: 7,
                        height: "100%",
                        flexDirection: "column",
                        msFlexDirection: "column",
                        display: "flex",
                    }}
                >
                    <PageheadJadwalPenunjang />
                </Content>
            </Layout>
        </JadwalPenunjangContextProvider>
    </div>
}

export default JadwalRadioterapiV2