import React, { useContext } from "react";
import { Table } from "antd";
import { ResepContext } from "./ResepContext";
const RiwayatOrder = () => {
  const { riwayatobat, loadingresep } = useContext(ResepContext);
  const riwayatobatbaru = [];
  for (var i = 0; i < riwayatobat.length; i++) {
    riwayatobatbaru.push({
      key: i + 1,
      ...riwayatobat[i],
    });
  }
  let fLen = riwayatobat.length;

  for (let i = 1; i < fLen; i++) {
    riwayatobat.map((v) => ({ ...v, key: i }));
  }
  const columns = [
    { title: "No. Reg", dataIndex: "registrasiId", key: "reg", width: "20%" },

    { title: "No. Resep", dataIndex: "noResep", key: "resep", width: "21%" },
    {
      title: "Tgl. Resep",
      width: "20%",
      key: "tgl",
      render: (text, record) => record.tglResep.substring(0, 10),
    },
    {
      title: "Dokter",
      dataIndex: "namaDokter",
      key: "dokter",
      width: "39%",
    },
  ];

  return (
    <Table
      loading={loadingresep}
      scroll={{ y: 700 }}
      size="small"
      pagination={false}
      className="components-table-demo-nested"
      columns={columns}
      dataSource={riwayatobatbaru}
      onRow={(record, rowIndex) => {
        return {
          onContextMenu: (event) => {
            event.preventDefault();
          },
          onClick: (event) => {
            console.log(record);
          },
        };
      }}
      expandable={{
        defaultExpandedRowKeys: [1, 2],
        // defaultExpandAllRows: true,
        expandedRowRender: (record) => (
          <div>
            <table
              style={{
                borderCollapse: "collapse",
                borderColor: "#aaa",
                borderSpacing: 0,
                fontSize: 12,
              }}
              className="tg"
            >
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#f38630",
                      borderColor: "#aaa",
                      borderStyle: "solid",
                      borderWidth: 1,
                      color: "#fff",
                      fontWeight: "normal",
                      overflow: "hidden",
                      padding: "5px 5px",
                      textAlign: "left",
                      verticalAlign: "top",
                      wordBreak: "normal",
                    }}
                  >
                    No.
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f38630",
                      borderColor: "#aaa",
                      borderStyle: "solid",
                      borderWidth: 1,
                      color: "#fff",
                      fontWeight: "normal",
                      overflow: "hidden",
                      padding: "5px 5px",
                      textAlign: "left",
                      verticalAlign: "top",
                      wordBreak: "normal",
                    }}
                  >
                    Keterangan
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f38630",
                      borderColor: "#aaa",
                      borderStyle: "solid",
                      borderWidth: 1,
                      color: "#fff",
                      fontWeight: "normal",
                      overflow: "hidden",
                      padding: "5px 5px",
                      textAlign: "left",
                      verticalAlign: "top",
                      wordBreak: "normal",
                    }}
                  >
                    Nama Barang / Obat
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f38630",
                      borderColor: "#aaa",
                      borderStyle: "solid",
                      borderWidth: 1,
                      color: "#fff",
                      fontWeight: "normal",
                      overflow: "hidden",
                      padding: "5px 5px",
                      textAlign: "left",
                      verticalAlign: "top",
                      wordBreak: "normal",
                    }}
                  >
                    Dosis
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f38630",
                      borderColor: "#aaa",
                      borderStyle: "solid",
                      borderWidth: 1,
                      color: "#fff",
                      fontWeight: "normal",
                      overflow: "hidden",
                      padding: "5px 5px",
                      textAlign: "left",
                      verticalAlign: "top",
                      wordBreak: "normal",
                    }}
                  >
                    Jumlah
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f38630",
                      borderColor: "#aaa",
                      borderStyle: "solid",
                      borderWidth: 1,
                      color: "#fff",
                      fontWeight: "normal",
                      overflow: "hidden",
                      padding: "5px 5px",
                      textAlign: "left",
                      verticalAlign: "top",
                      wordBreak: "normal",
                    }}
                  >
                    Satuan
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f38630",
                      borderColor: "#aaa",
                      borderStyle: "solid",
                      borderWidth: 1,
                      color: "#fff",
                      fontWeight: "normal",
                      overflow: "hidden",
                      padding: "5px 5px",
                      textAlign: "left",
                      verticalAlign: "top",
                      wordBreak: "normal",
                    }}
                  >
                    Aturan Pakai
                  </th>
                </tr>
              </thead>
              <tbody>
                {record.resep.map((d, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      console.log(d); // Cetak data dari row yang di-expand
                    }}
                    style={{ cursor: "pointer" }} // Menambahkan cursor pointer sebagai indikasi bisa diklik
                  >
                    <td
                      className="count"
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#aaa",
                        borderStyle: "solid",
                        borderWidth: 1,
                        color: "#333",
                        overflow: "hidden",
                        padding: "5px 5px",
                        textAlign: "left",
                        verticalAlign: "top",
                        wordBreak: "normal",
                      }}
                    ></td>
                    <td
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#aaa",
                        borderStyle: "solid",
                        borderWidth: 1,
                        color: "#333",
                        overflow: "hidden",
                        padding: "5px 5px",
                        textAlign: "left",
                        verticalAlign: "top",
                        wordBreak: "normal",
                      }}
                    >
                      {d.keterangan}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#aaa",
                        borderStyle: "solid",
                        borderWidth: 1,
                        color: "#333",
                        overflow: "hidden",
                        padding: "5px 5px",
                        textAlign: "left",
                        verticalAlign: "top",
                        wordBreak: "normal",
                      }}
                    >
                      {d.namaBarang}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#aaa",
                        borderStyle: "solid",
                        borderWidth: 1,
                        color: "#333",
                        overflow: "hidden",
                        padding: "5px 5px",
                        textAlign: "left",
                        verticalAlign: "top",
                        wordBreak: "normal",
                      }}
                    >
                      {d.dosis}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#aaa",
                        borderStyle: "solid",
                        borderWidth: 1,
                        color: "#333",
                        overflow: "hidden",
                        padding: "5px 5px",
                        textAlign: "left",
                        verticalAlign: "top",
                        wordBreak: "normal",
                      }}
                    >
                      {d.QtyBarang}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#aaa",
                        borderStyle: "solid",
                        borderWidth: 1,
                        color: "#333",
                        overflow: "hidden",
                        padding: "5px 5px",
                        textAlign: "left",
                        verticalAlign: "top",
                        wordBreak: "normal",
                      }}
                    >
                      {d.namaSM}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#aaa",
                        borderStyle: "solid",
                        borderWidth: 1,
                        color: "#333",
                        overflow: "hidden",
                        padding: "5px 5px",
                        textAlign: "left",
                        verticalAlign: "top",
                        wordBreak: "normal",
                      }}
                    >
                      {d.kodeAturan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      }}
    />
  );
};

export default RiwayatOrder;
