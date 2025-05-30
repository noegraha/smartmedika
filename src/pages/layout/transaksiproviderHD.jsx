import React, { createContext } from "react";
import AssessmentHDContextProvider from "../penunjang/hd/context/AssessmentHDContext";
import PasienHDContextProvider from "../penunjang/hd/context/PasienHDContext";
import PelayananHDContextProvider from "../penunjang/hd/context/PelayananHDContext";

export const TransaksiHDContext = createContext();

const TransaksiHDContextProvider = (props) => {
    return (
        <PasienHDContextProvider>
            <PelayananHDContextProvider>
                <AssessmentHDContextProvider>
                    {props.children}
                </AssessmentHDContextProvider>
            </PelayananHDContextProvider>
        </PasienHDContextProvider>
    )
};

export default TransaksiHDContextProvider;
