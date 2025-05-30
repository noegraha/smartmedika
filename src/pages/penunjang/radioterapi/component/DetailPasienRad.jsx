import { Button, Descriptions, Drawer } from 'antd'
import React, { useContext, useState } from 'react'
import { RadioterapiContext } from '../context/RadioterapiContext';
import dayjs from 'dayjs';

const DetailPasienRad = () => {
    const {
        noReg,
        pasienId,
        umur,
        jenisKelamin,
        penjamin,
        nama,
        tglLahir,
        tglMasuk,
        alamat,
    } = useContext(RadioterapiContext);

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
        // setTampil(false);
        // setRiwayat(true);
    };

    return (
        <div>
            <Button size='small' onClick={() => showDrawer()} type="primary">
                Detail Pasien
            </Button>
            <Drawer
                headerStyle={{
                    paddingLeft: 12,
                    paddingBottom: 6,
                    paddingRight: 12,
                    paddingTop: 6,
                    fontWeight: "bolder",
                    backgroundColor: "papayawhip",
                }}
                bodyStyle={{
                    paddingLeft: 12,
                    paddingBottom: 6,
                    paddingRight: 12,
                    paddingTop: 6,
                }}
                title={<div style={{ fontWeight: "bolder" }}>Detail Pasien</div>}
                width="50%"
                placement="right"
                closable={false}
                onClose={() => onClose()}
                visible={visible}
            >
                <Descriptions
                    size="small"
                    column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}
                    bordered
                >
                    <Descriptions.Item label="No Registrasi" style={{ paddingBottom: 1 }}>
                        {noReg}
                    </Descriptions.Item>
                    <Descriptions.Item label="No Pasien" style={{ paddingBottom: 1 }}>
                        {pasienId}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="Tanggal Registrasi"
                        style={{ paddingBottom: 1 }}
                    >
                        {dayjs(tglMasuk).format('DD-MM-YYYY')}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="Nama Pasien"
                        span={2}
                        style={{ paddingBottom: 1 }}
                    >
                        {nama}
                    </Descriptions.Item>
                    <Descriptions.Item label="Jenis Kelamin" style={{ paddingBottom: 1 }}>
                        {jenisKelamin}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="Alamat"
                        span={2}
                        style={{ paddingBottom: 1 }}
                    >
                        {alamat}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tanggal Lahir" style={{ paddingBottom: 1 }}>
                        {dayjs(tglLahir).format('DD-MM-YYYY')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Umur" style={{ paddingBottom: 1 }}>
                        {umur}
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="No Telpon" style={{ paddingBottom: 1 }}>
                        081914999955
                    </Descriptions.Item> */}
                    <Descriptions.Item label="Nama Ibu" style={{ paddingBottom: 1 }}>
                        {/* {headerPasien.namaIbuKandung} */}
                    </Descriptions.Item>
                    <Descriptions.Item label="Pembayaran" style={{ paddingBottom: 1 }}>
                        {penjamin}
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="No Penjamin" style={{ paddingBottom: 1 }}>
                        0002484796555
                    </Descriptions.Item> */}
                    {/* <Descriptions.Item
                        label="Kelas Perawatan RJ"
                        style={{ paddingBottom: 1 }}
                    >
                        KELAS II
                    </Descriptions.Item> */}
                </Descriptions>
            </Drawer>
        </div>
    )
}

export default DetailPasienRad