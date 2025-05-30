import { Button, Card, DatePicker, message, Table } from "antd";
import axios from "axios";
import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id"; // import locale Indonesia
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs.locale("id"); // set locale ke Indonesia

const { Column } = Table;
const PasienTele = () => {
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const [listPasien, setListPasien] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setBackend] = useState(null);

  const cekList = (start, end) => {
    axios
      .get(
        `${apiku}/BridgeROnline/Telemedicine/StartDate/${start}/EndDate/${end}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          // Tambahkan key berurutan
          const dataWithKey = res.data.result.map((item, index) => {
            return {
              key: index + 1, // letakkan key di awal
              ...item,
            };
          });

          setListPasien(dataWithKey);
          console.log(dataWithKey);
        } else {
          setListPasien([]);
          message.warning(
            "Tidak ada data pasien telemedicine pada tanggal tersebut"
          );
          console.log(res);
        }
      })
      .catch((err) => {
        setListPasien([]);
        console.log(err);
      });
  };
  return (
    <div>
      <Card
        size="small"
        title="Pasien Telemedicine"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        Dari :{" "}
        <DatePicker
          format={"YYYY-MM-DD"}
          onChange={(date, dateString) => setStart(dateString)}
        />{" "}
        Sampai :{" "}
        <DatePicker
          format={"YYYY-MM-DD"}
          onChange={(date, dateString) => setBackend(dateString)}
        />
        <Button block type="primary" onClick={() => cekList(start, end)}>
          Cek Pasien Telemedicine
        </Button>
        <Table
          bordered
          pagination={false}
          dataSource={listPasien}
          size="small"
          scroll={{ x: 700 }}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>
                Dokter : {record.displaynameDokter} <br />
                Keluhan : {record.keluhanUtama}
              </p>
            ),
          }}
        >
          <Column
            title="No. RM"
            key="reg"
            className="bgcolortunggu, tabeltabel2"
            width={50}
            render={(text, record) => (
              <span>{record.dataPasien.nomorRekamMedis}</span>
            )}
          />
          <Column
            title="Nama Pasien"
            width={100}
            key="reg"
            className="tabeltabel"
            render={(text, record) => (
              <span>{record.dataPasien.namaPasien}</span>
            )}
          />
          <Column
            title="Tanggal Periksa"
            width={100}
            key="reg"
            className="tabeltabel"
            render={(text, record) => (
              <span>
                {dayjs(record.tglPeriksa).format("dddd, D MMMM YYYY")}
              </span>
            )}
          />
          <Column
            title="Poliklinik"
            width={100}
            key="reg"
            className="tabeltabel"
            ellipsis={true}
            render={(text, record) => <span>{record.realnamePoliklinik}</span>}
          />
        </Table>
      </Card>
    </div>
  );
};

export default PasienTele;
