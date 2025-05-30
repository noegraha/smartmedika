import React from 'react'
import SatuSehatLocationContextProvider from './context/SatuSehatLocationContext'
import SSListLocation from './component/SSListLocation'

const SatuSehatLocation = () => {
    return (
        <div>
            <SatuSehatLocationContextProvider>
                <SSListLocation />
            </SatuSehatLocationContextProvider>
        </div>
    )
}

export default SatuSehatLocation