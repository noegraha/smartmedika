import React from 'react'
import SatuSehatEnvironmentContextProvider from './context/SatuSehatEnvironmentContext'
import ListSSEnvironment from './component/ListSSEnvironment'

const SatuSehatEnvironment = () => {
    return (
        <>
            <SatuSehatEnvironmentContextProvider>
                <ListSSEnvironment />
            </SatuSehatEnvironmentContextProvider>
        </>
    )
}

export default SatuSehatEnvironment