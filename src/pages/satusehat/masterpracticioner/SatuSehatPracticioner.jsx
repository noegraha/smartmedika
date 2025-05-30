import React from 'react'
import SatuSehatPracticionerContextProvider from './context/SatuSehatPracticionerContext'
import SSListPracticioner from './component/SSListPracticioner'

const SatuSehatPracticioner = () => {
    return (
        <>
            <SatuSehatPracticionerContextProvider>
                <SSListPracticioner />
            </SatuSehatPracticionerContextProvider>
        </>
    )
}

export default SatuSehatPracticioner