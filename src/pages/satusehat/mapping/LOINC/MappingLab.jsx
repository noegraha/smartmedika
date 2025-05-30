import { Card } from 'antd'
import React from 'react'
import MappingPmr from './component/MappingPmr'
import MapLoincContextProvider from './context/MapLoincContext'
import MdBrowserLoinc from './component/MdBrowserLoinc'
import MdDetailLoinc from './component/MdDetailLoinc'

const MappingLab = () => {
    return (
        <>
            <MapLoincContextProvider>
                <Card
                    title='Mapping Terminologi LOINC'
                    headStyle={{ backgroundColor: '#36cfc9' }}
                    style={{ marginTop: '5px' }}>
                    <MappingPmr />
                </Card>

                <MdDetailLoinc />
                <MdBrowserLoinc />
            </MapLoincContextProvider>
        </>
    )
}

export default MappingLab