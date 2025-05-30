// src/pages/farmasi/komponen/DetailPasienFarmasi.jsx
import React, { useContext, useEffect  } from "react";
import { Card,Form, Input, Descriptions, Typography } from "antd";
import { FarmasiContext } from "../context/FarmasiContext";

const DetailPasienFarmasi = () => {
    const { selectedPatient,selectedApotek,setSelectedPatient  } = useContext(FarmasiContext);

    // Mengatur ulang selectedPatient ketika apotek berubah
    useEffect(() => {
        if (!selectedPatient) {
            setSelectedPatient(null); // Reset pasien yang terpilih
        }
    }, [selectedApotek, selectedPatient, setSelectedPatient]);

    return (
        <div style={{padding: 20, background : "#fff"  }}>
          <h3 style={{ background: "#61C0BF", padding: "10px", color: "#000" }}>Data Resep</h3>
          <Card style={{ background: "#FAE3D9", padding: "10px" }}>
            <Form
                layout="horizontal" // Membuat label dan input sejajar (kanan-kiri)
                labelCol={{ span: 6 }} // Lebar label (8/24)
                wrapperCol={{ span: 16 }} // Lebar input (16/24)
                style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr", // Dua kolom (kiri-kanan)
                gap: "1px", // Jarak antar item
                }}
            >
                {/* Kolom Kiri */}
                <Form.Item label="No Resep"
                 style={{ marginBottom: "3px" }} >
                <Input
                    value={selectedPatient ? selectedPatient.noResep : ""}
                    readOnly
                />
                </Form.Item>
                <Form.Item label="No Transaksi"
                style={{ marginBottom: "3px" }}>
                <Input
                    value={selectedPatient ? selectedPatient.noTransaksi : ""}
                    readOnly
                />
                </Form.Item>
                <Form.Item label="Nama Pasien"
                style={{ marginBottom: "3px" }}>
                <Input
                    value={selectedPatient ? selectedPatient.name : ""}
                    readOnly
                />
                </Form.Item>
                <Form.Item label="Alamat Pasien"
                style={{ marginBottom: "3px" }}>
                <Input
                    value={selectedPatient ? selectedPatient.alamat : ""}
                    readOnly
                />
                </Form.Item>
                <Form.Item label="Penjamin"
                style={{ marginBottom: "3px" }}>
                <Input
                    value={selectedPatient ? selectedPatient.penjamin : ""}
                    readOnly
                />
                </Form.Item>

                {/* Kolom Kanan */}
                <Form.Item label="No SEP/SJP"
                style={{ marginBottom: "3px" }}>
                <Input
                    value={selectedPatient ? selectedPatient.noSepSjp : ""}
                    readOnly
                />
                </Form.Item>
                <Form.Item label="Dokter"
                style={{ marginBottom: "3px" }}>
                <Input
                    value={selectedPatient ? selectedPatient.dokter : ""}
                    readOnly
                />
                </Form.Item>
                <Form.Item label="Kode UP"
                style={{ marginBottom: "3px" }}>
                <Input
                    value={selectedPatient ? selectedPatient.kodeUp : ""}
                    readOnly
                />
                </Form.Item>
                <Form.Item label="Status"
                style={{ marginBottom: "3px" }}>
                <Input
                    value={selectedPatient ? selectedPatient.status : ""}
                    readOnly
                />
                </Form.Item>
                <Form.Item label="No Tagihan VA"
                style={{ marginBottom: "3px" }}>
                <Input
                    value={selectedPatient ? selectedPatient.noTagihanVa : ""}
                    readOnly
                />
                </Form.Item>
            </Form>
          </Card>


        </div>
      );
  };
  
  export default DetailPasienFarmasi;
