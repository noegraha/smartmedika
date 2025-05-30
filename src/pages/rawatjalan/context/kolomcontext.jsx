import React, { createContext, useState } from 'react';

export const KolomContext = createContext();

const KolomContextProvider = (props) => {
    const [kolom, setKolom] = useState('');

    const pilihKolom = (id) => {
        setKolom(id);
    }

    return (
        <KolomContext.Provider value={{kolom, pilihKolom}}>
            { props.children }
        </KolomContext.Provider>
    )
}

export default KolomContextProvider;