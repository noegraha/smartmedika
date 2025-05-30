import { Divider, Layout } from 'antd'
import React from 'react'
import SidebarPelayananBD from './component/pelayanan/SidebarPelayananBD'
import { Content } from 'antd/es/layout/layout'
import PageHeadPelayananBD from './component/pelayanan/PageHeadPelayananBD'
import MenuTabBarPelayananBD from './component/pelayanan/MenuTabBarPelayananBD'
import BankDarahContextProvider from './context/BankDarahContext'

const BankDarahPelayanan = () => {
    return (
        <div>
            <BankDarahContextProvider>
                <Layout>
                    <SidebarPelayananBD />
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
                            style={{ backgroundColor: '#b7eb8f', margin: '0px' }}>
                            PELAYANAN UNIT TRANSFUSI DARAH (UTD)
                        </Divider>
                        <PageHeadPelayananBD />
                        <MenuTabBarPelayananBD />
                    </Content>
                </Layout>
            </BankDarahContextProvider>
        </div>
    )
}

export default BankDarahPelayanan