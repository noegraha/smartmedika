import { Button } from "antd";
import React, { useContext, useRef } from "react";
import ReactToPrint from "react-to-print";
import FormPemeriksaanFisik from "./FormPemeriksaanFisik";
import Iframe from "react-iframe";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";

const ButtomCetakPemFisik = () => {
  const { getPrintPmrFisik, printPmrFisik, modalPmrFisik, setmodalPmrFisik
  } = useContext(PrintOutContext)

  return (
    <div>

      <Iframe
        // url={URL}
        width="100%"
        height="750px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
    </div>
  );
};

export default ButtomCetakPemFisik;
