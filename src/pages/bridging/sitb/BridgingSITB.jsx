import { Divider } from 'antd'
import React from 'react'
import FormInputSitb from './component/FormInputSitb'
import ListPasienTb from './component/ListPasienTb'
import BridgingSITBContextProvider from './context/BridgingSITBContext'

const BridgingSITB = () => {
    return (
        <div>
            <BridgingSITBContextProvider>
                <Divider
                    orientation='left'
                    style={{ backgroundColor: '#1677ff', margin: '0px', color: 'white' }}>
                    Bridging SITB
                </Divider>
                <ListPasienTb />
                {/* <FormInputSitb /> */}
            </BridgingSITBContextProvider>
        </div>
    )
}

export default BridgingSITB