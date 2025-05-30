// src/context/FormContext.js
import React, { createContext, useReducer, useContext } from 'react';
import { formReducer, initialStateAll } from '../reducer/formReducer';
import { LoginContext } from '../../../rawatjalan/context';
import { useState } from 'react';

// Buat Context
const FormContext = createContext();

// Provider untuk form
export function FormProvider({ children }) {
    const { token } = useContext(LoginContext);
    const options = {
        headers: { Authorization: "Bearer " + token },
    };

    const endpoint = sessionStorage.getItem("apiPenunjang");

    const [state, dispatch] = useReducer(formReducer, initialStateAll);
    const [ws, setws] = useState(endpoint);
    const [optToken, setoptToken] = useState(options);

    return (
        <FormContext.Provider
            value={{
                state,
                dispatch,
                ws, setws,
                optToken, setoptToken,
            }}>
            {children}
        </FormContext.Provider>
    );
}

// Custom hook untuk akses form context
export function useForm() {
    return useContext(FormContext);
}