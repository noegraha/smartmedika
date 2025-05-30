import React, { useContext } from "react";
import {
  Chart,
  Axis,
  Tooltip,
  Legend,
  Interval,
  Coordinate,
  Interaction,
  getTheme,
} from "bizcharts";
import { LaporanESWLContext } from "../laporan/Context/LaporanESWLContext";

const GrafikAskep = () => {
  const { doktereswl, kelamineswl } = useContext(LaporanESWLContext);

  // const datacoba = [
  //   {
  //     NamaDokter: "KARINDA TRIHARYU CP, DR. Sp.U ",
  //     JumlahPasien: 20,
  //   },
  //   {
  //     NamaDokter: "TRI BUDIYANTO, DR, SpU.       ",
  //     JumlahPasien: 30,
  //   },
  //   {
  //     NamaDokter: "HAJID RAHMADIANTO, dr.MSC.,SpU",
  //     JumlahPasien: 150,
  //   },
  // ];

  // const datajeniskelamin = [
  //   { item: "Laki-Laki", jumlah: 8, percent: 0.61 },
  //   { item: "Perempuan", jumlah: 5, percent: 0.39 },
  // ];

  const cols = {
    persen: {
      formatter: (val) => {
        val = val + "%";
        return val;
      },
    },
  };

  return (
    <div>
      <h3>
        <center>
          <b>Statistik Jenis Kelamin</b>
        </center>
      </h3>
      <Chart height={400} data={kelamineswl} scale={cols} autoFit>
        <Coordinate type="theta" radius={0.75} />
        <Tooltip showTitle={false} />
        <Axis visible={false} />
        <Interval
          position="persen"
          adjust="stack"
          color="item"
          style={{
            lineWidth: 1,
            stroke: "#fff",
          }}
          label={[
            "jumlah",
            {
              content: (kelamineswl) => {
                return `${
                  kelamineswl.item === "L" ? "LAKI-LAKI" : "PEREMPUAN"
                }: ${kelamineswl.jumlah}`;
              },
            },
          ]}
          state={{
            selected: {
              style: (t) => {
                const res =
                  getTheme().geometries.interval.rect.selected.style(t);
                return { ...res, fill: "red" };
              },
            },
          }}
        />
        <Interaction type="element-single-selected" />
      </Chart>

      <hr style={{ border: "1px solid #000000" }}></hr>
      <h3>
        <center>
          <b>Statistik Dokter</b>
        </center>
      </h3>
      <br />
      <br />
      <Chart
        height={300}
        padding="auto"
        data={doktereswl}
        autoFit
        appendPadding={[20, 0]}
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
            "JumlahPasien",
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
          color="NamaDokter"
          position="NamaDokter*JumlahPasien"
        />
        <Tooltip shared />
        <Legend position="top" />
      </Chart>
    </div>
  );
};

export default GrafikAskep;
