import React from 'react'
import MonitoringSSRajalContextProvider from './context/MonitoringSSRajalContext'
import { Card } from 'antd'
import GrafikSSperBulan from './component/GrafikSSperBulan'

const MonitoringSSRajal = () => {
    return (
        <>
            <MonitoringSSRajalContextProvider>
                <Card
                    title='Monitoring SatuSehat'
                    headStyle={{ backgroundColor: '#36cfc9' }}
                    bodyStyle={{ padding: '5px' }}>
                    <GrafikSSperBulan />
                </Card>
            </MonitoringSSRajalContextProvider>
        </>
    )
}

export default MonitoringSSRajal