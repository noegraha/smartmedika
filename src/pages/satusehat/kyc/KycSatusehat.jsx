import React from 'react'
import InputHasilVerifikasi from './component/InputHasilVerifikasi'
import DashboardHasilVerifikasi from './component/DashboardHasilVerifikasi'
import { Space } from 'antd'
import KycSatusehatContextProvider from './context/KycSatusehatContext'

const KycSatusehat = () => {
    return (
        <div>
            <KycSatusehatContextProvider>
                <Space
                    direction='vertical'
                    style={{ width: '100%' }}
                >
                    <InputHasilVerifikasi />
                    <DashboardHasilVerifikasi />
                </Space>
            </KycSatusehatContextProvider>
        </div>
    )
}

export default KycSatusehat