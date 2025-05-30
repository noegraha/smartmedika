import React from "react";
import IBSContextProvider from "../penunjang/ibs/context/IBSContext";
import ESWLContextProvider from "../penunjang/ibs/context/ESWLContext";

const TransaksiIBSProvider = (props) => {
  return (
    <IBSContextProvider>
      <ESWLContextProvider>{props.children}</ESWLContextProvider>
    </IBSContextProvider>
  );
};

export default TransaksiIBSProvider;
