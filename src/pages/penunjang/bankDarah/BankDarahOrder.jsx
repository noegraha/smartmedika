import React from 'react'
import { Divider, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import PageheadRI from '../../rawatinap/PageheadRI'
import SidebarOrderDarah from './component/order/SidebarOrderDarah'
import PageHeadOrderDarah from './component/order/PageHeadOrderDarah'
import MenuTabBarOrderDarah from './component/order/MenuTabBarOrderDarah'
import BankDarahContextProvider from './context/BankDarahContext'

const BankDarahOrder = () => {
    return (
        <div>
            <BankDarahContextProvider>
                <Layout>
                    <SidebarOrderDarah />
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
                            style={{ backgroundColor: '#ffa39e', margin: '0px' }}>
                            ORDER UNIT TRANSFUSI DARAH (UTD)
                        </Divider>
                        <PageHeadOrderDarah />
                        <MenuTabBarOrderDarah />
                    </Content>
                </Layout>
            </BankDarahContextProvider>
        </div>


        // <div>
        //     <BankDarahContextProvider>
        //         <Title level={3} style={{ marginBottom: '-5px' }}>PELAYANAN BANK DARAH</Title>
        //         <hr />
        //         <FormPermintaanDarah />
        //         <hr />
        //         <PantauanPelayananDarah />
        //         <hr />
        //         <DetailStok />
        //     </BankDarahContextProvider>
        // </div>
    )
}

export default BankDarahOrder