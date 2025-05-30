import React from 'react'
import SSListOrganization from './component/SSListOrganization'
import SatuSehatOrganizationContextProvider from './context/SatuSehatOrganizationContext'

const SatuSehatOrganization = () => {
    return (
        <>
            <SatuSehatOrganizationContextProvider>
                <SSListOrganization />
            </SatuSehatOrganizationContextProvider>
        </>
    )
}

export default SatuSehatOrganization