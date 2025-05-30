import { Button } from 'antd';
import React, { useRef } from 'react'
import ReactToPrint from "react-to-print";
import Reporta from './Reporta';

class ComponentToPrintReportHD extends React.PureComponent {
    render() {
        return (
            <div >
                <Reporta />
            </div>
        );
    }
}

const ButtomReport = () => {
    const componentRef = useRef();
    const pageStyless = `
        @page {
            size: 215mm 330mm !important;
            margin: 15mm 10mm 15mm 10mm !important;
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
                trigger={() =>
                    <Button
                        type="primary">
                        Cetak
                    </Button>}
                content={() => componentRef.current}
                pageStyle={pageStyless}
            />

        </div>
    )
}

export default ButtomReport