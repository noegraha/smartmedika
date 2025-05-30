import { Button, Card, Divider, Modal, Table } from "antd";
import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
const { Column } = Table;
const DashboardPasienEror = () => {
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  const [listBlmPulang, setlistBlmPulang] = useState([]);
  const [listBatalRI, setlistBatalRI] = useState([]);
  const [listdobeltt, setlistdobeltt] = useState([]);
  const [listbedatt, setlistbedatt] = useState([]);

  const getlistpasien = () => {
    axios
      .get(`${apiku}/MstKamar/Dashboard`, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistBlmPulang(
            res.data.result.pasienpulang.sort((a, b) =>
              a.ruangDesk.localeCompare(b.ruangDesk)
            )
          );
          setlistBatalRI(
            res.data.result.pasienbatal.sort((a, b) =>
              a.ruangDesk.localeCompare(b.ruangDesk)
            )
          );
          setlistdobeltt(res.data.result.lebihdarisatu);
          setlistbedatt(res.data.result.kamarberbeda);
        } else {
          setlistBlmPulang([]);
          setlistBatalRI([]);
          setlistdobeltt([]);
          setlistbedatt([]);
          Modal.warning({
            title: "Data Tidak Di Temukan / DAta Sudah Sesuai!",
            // content: JSON.stringify(res.data),
          });

          // message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setlistBlmPulang([]);
        setlistBatalRI([]);
        setlistdobeltt([]);
        setlistbedatt([]);
      });
  };

  return (
    <div>
      {/* ---- QUERY UPDATE STATUS PASIEN BATAL DI NO TRANS KMR TT --UPDATE A SET
      NOTRANS='', STSTT='O' --from DBRS_MARGONO.dbo.KMRTT A LEFT JOIN
      DBRS_MARGONO.DBO.REGRWI B ON A.NOTRANS=B.NOREG --where ststt='I' AND
      B.STSPULANG!='I' ---- QUERY UPDATE STATUS PASIEN BATAL DI NO TRANS KMR TT
      
      --UPDATE A SET NOTRANS='', STSTT='O' --from DBRS_MARGONO.dbo.KMRTT A LEFT
      JOIN DBRS_MARGONO.DBO.REGRWI B ON A.NOTRANS=B.NOREG --LEFT JOIN
      DBRS_MARGONO.DBO.BTLREGRWI C ON A.NOTRANS=C.NOREG --where ststt='I' AND
      B.NOREG IS NULL AND C.NOREG IS NOT NULL */}
      <Card
        size="small"
        title="Data Pasien Nyantol Di TT"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Button
          block
          //   style={{ width: "10%" }}
          type="primary"
          onClick={() => {
            getlistpasien("");
          }}
        >
          Cek Data Eror
        </Button>
        <Divider orientation="left">
          List Pasien Sudah Pulang Di Sistem Masih Ada
        </Divider>
        <Table
          bordered
          pagination={false}
          dataSource={listBlmPulang}
          size="small"
          rowKey="reg"
          scroll={{ x: 700 }}
        >
          <Column
            title="Ruang"
            key="reg"
            width={100}
            render={(listBlmPulang) => <span>{listBlmPulang.ruangDesk}</span>}
          />
          <Column
            title="No Registrasi"
            width={100}
            key="reg"
            className="tabeltabel"
            render={(listBlmPulang) => (
              <span>{listBlmPulang.registrasiId}</span>
            )}
          />
          <Column
            title="Nama"
            width={100}
            key="reg"
            className="tabeltabel"
            render={(listBlmPulang) => <span>{listBlmPulang.namaPasien}</span>}
          />
          <Column
            title="Tgl Masuk"
            width={100}
            key="reg"
            className="tabeltabel"
            render={(listBlmPulang) => (
              <span>
                {dayjs(listBlmPulang.tanggalMasuk).format("DD-MM-YYYY HH:mm")}
              </span>
            )}
          />
        </Table>
        <Divider orientation="left">List Pasien Batal Transaksi</Divider>
        <Table
          bordered
          pagination={false}
          dataSource={listBatalRI}
          size="small"
          rowKey="reg"
          scroll={{ x: 700 }}
        >
          <Column
            title="Ruang"
            key="reg"
            width={100}
            render={(listBatalRI) => <span>{listBatalRI.ruangDesk}</span>}
          />
          <Column
            title="No Registrasi"
            width={100}
            key="reg"
            className="tabeltabel"
            render={(listBatalRI) => <span>{listBatalRI.registrasiId}</span>}
          />
          <Column
            title="Nama"
            width={100}
            key="reg"
            className="tabeltabel"
            render={(listBatalRI) => <span>{listBatalRI.namaPasien}</span>}
          />
          <Column
            title="Tgl Masuk"
            width={100}
            key="reg"
            className="tabeltabel"
            render={(listBatalRI) => (
              <span>
                {dayjs(listBatalRI.tanggalMasuk).format("DD-MM-YYYY HH:mm")}
              </span>
            )}
          />
        </Table>
        <Divider orientation="left">List Pasien Dengan Dua NO TT</Divider>
        <Table
          bordered
          pagination={false}
          dataSource={listdobeltt}
          size="small"
          rowKey="reg"
          scroll={{ x: 700 }}
        >
          <Column
            title="No. Registrasi"
            key="reg"
            width={100}
            render={(listdobeltt) => <span>{listdobeltt.registrasiId}</span>}
          />
          <Column
            title="Jumlah Data Muncul"
            width={100}
            key="reg"
            className="tabeltabel"
            render={(listdobeltt) => <span>{listdobeltt.namaPasien}</span>}
          />
        </Table>
        <Divider orientation="left">List Pasien Beda No TT</Divider>
        <Table
          bordered
          pagination={false}
          dataSource={listbedatt}
          size="small"
          rowKey="reg"
          scroll={{ x: 700 }}
        >
          <Column
            title="No. Registrasi"
            key="reg"
            width={100}
            render={(listbedatt) => <span>{listbedatt.NOREG}</span>}
          />
          <Column
            title="Jumlah Data Muncul"
            width={100}
            key="reg"
            className="tabeltabel"
            render={(listbedatt) => (
              <span>
                <p>
                  No Kamar : {listbedatt.NOKAMAR} - No TT : {listbedatt.NOTT}
                </p>
              </span>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

export default DashboardPasienEror;
