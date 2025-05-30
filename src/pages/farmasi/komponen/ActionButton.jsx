import React from "react";
import { Button, Select, Space } from "antd";

const { Option } = Select;

const ActionButtons = () => {
    const handleSave = () => {
        console.log("Simpan data");
    };

    const handleCancel = () => {
        console.log("Batal");
    };

    const handlePrint = (value) => {
        console.log("Cetak:", value);
    };

    const handleTagihanVA = () => {
        console.log("Tagihan VA");
    };

    const handleHantaran = () => {
        console.log("Hantaran");
    };

    const handleChangePenjamin = () => {
        console.log("Ubah Penjamin");
    };

    const handlePrintResep = () => {
        console.log("Cetak Resep");
    };

    return (
        <div style={{ marginTop: "5px", padding: 20, background : "#fff"  }}>
        {/* <div style={{ marginTop: "20px", paddding : "20px", background : "#fff", textAlign: "center" }}> */}
            <Space size="middle">
                {/* Tombol Simpan */}
                <Button type="primary" onClick={handleSave}>
                    Simpan
                </Button>

                {/* Tombol Batal */}
                <Button onClick={handleCancel}>
                    Batal
                </Button>

                {/* Pilihan Cetak */}
                <Select
                    placeholder="Pilih Cetak"
                    style={{ width: 180 }}
                    onChange={handlePrint}
                >
                    <Option value="OUDD">Cetak OUDD</Option>
                    <Option value="Non OUDD">Cetak Non OUDD</Option>
                </Select>

                {/* Tombol Tagihan VA */}
                <Button onClick={handleTagihanVA}>
                    Tagihan VA
                </Button>

                {/* Tombol Hantaran */}
                <Button onClick={handleHantaran}>
                    Hantaran
                </Button>

                {/* Tombol Rubah Penjamin */}
                <Button onClick={handleChangePenjamin}>
                    Rubah Penjamin
                </Button>

                {/* Tombol Cetak Resep */}
                <Button type="primary" onClick={handlePrintResep}>
                    Cetak Resep
                </Button>
            </Space>
        </div>
    );
};

export default ActionButtons;
