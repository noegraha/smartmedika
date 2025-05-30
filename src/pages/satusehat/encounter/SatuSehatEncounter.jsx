import React from 'react'
import SatuSehatEncounterContextProvider from './context/SatuSehatEncounterContext'
import { Card } from 'antd'
import SSListEncounter from './component/SSListEncounter'

const SatuSehatEncounter = () => {
    return (
        <>
            <SatuSehatEncounterContextProvider>
                <Card
                    title='Kirim Data SatuSehat'
                    headStyle={{ backgroundColor: '#36cfc9' }}>
                    <SSListEncounter />
                </Card>
            </SatuSehatEncounterContextProvider>
        </>
    )
}

export default SatuSehatEncounter