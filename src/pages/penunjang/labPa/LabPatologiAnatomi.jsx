import { Divider, Layout } from 'antd';
import React from 'react'
import DetailPmrLabPa from './component/DetailPmrLabPa';
import MenuTabBarLabPa from './component/MenuTabBarLabPa';
import PageHeadLabPa from './component/PageHeadLabPa';
import TombolFungsi from './component/TombolFungsi';
import PenunjangLabPaContextProvider from './context/PenunjangLabPa';

const { Content } = Layout;

const LabPatologiAnatomi = () => {
    return (
        <div>
            <PenunjangLabPaContextProvider>
                <Layout>
                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#1677ff', margin: '0px', color: 'white' }}>
                        RME Laboratorium Patologi Anatomi
                    </Divider>
                    <PageHeadLabPa />
                    <DetailPmrLabPa />
                    <MenuTabBarLabPa />
                    <TombolFungsi />
                    <Content
                        style={{
                            padding: 7,
                            height: "100%",
                            flexDirection: "column",
                            msFlexDirection: "column",
                            display: "flex",
                        }}
                    >

                        {/* <MenuTabBarKemoterapi /> */}
                    </Content>
                </Layout>
            </PenunjangLabPaContextProvider>
        </div>
    )
}

export default LabPatologiAnatomi