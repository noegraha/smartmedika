import React, { useContext } from "react";
import { Chart, Interval, Tooltip, Legend } from "bizcharts";
import { LaporanAskepContext } from "../laporan/Context/LaporanAskepContext";

const GrafikAskep = () => {
    const { grafikAssesment } = useContext(LaporanAskepContext);
    return (
        <div>
            <Chart
                height={300}
                padding="auto"
                data={grafikAssesment}
                autoFit
                appendPadding={[20, 0]}
            // scale={{ QTY: { max: 150 } }}
            >
                <Interval
                    animate={true}
                    adjust={[
                        {
                            type: "dodge",
                            marginRatio: 0,
                        },
                    ]}
                    label={[
                        "QTY",
                        (val) => {
                            return {
                                content: val,
                                style: {
                                    fill: "black",
                                    fontSize: 12,
                                    //   fontWeight: "bold",
                                },
                            };
                        },
                    ]}
                    color="JENIS"
                    position="Tanggal*QTY"
                />
                <Tooltip shared />
                <Legend position="top" />
            </Chart>
        </div>
    );
};

export default GrafikAskep;
