import { Button } from "antd";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Formsuratmeninggalcovid from "./FormSuratMeninggalCovid";

class ComponentToPrintReportHD extends React.PureComponent {
  render() {
    return (
      <div>
        <Formsuratmeninggalcovid />
      </div>
    );
  }
}

const ButtonSuratMeninggalCovid = () => {
  const componentRef = useRef();
  const pageStyle = `
        @page {
            size: 215mm 330mm;
            margin: 10mm 10mm 10mm 10mm;
        }
    
        @media all {
            .pagebreak {
            display: none;
            }
        }
    
        @media print {
            html, body {
            height: initial !important;
            overflow: initial !important;
            -webkit-print-color-adjust: exact;
            }
        }
      
        @media print {
            .page-break {
            margin-top: 1rem;
            display: block;
            page-break-before: always;
            }
        }`;

  return (
    <div>
      <ComponentToPrintReportHD ref={componentRef} />

      <ReactToPrint
        trigger={() => <Button type="primary">Cetak</Button>}
        content={() => componentRef.current}
        pageStyle={pageStyle}
      />
    </div>
  );
};

export default ButtonSuratMeninggalCovid;
