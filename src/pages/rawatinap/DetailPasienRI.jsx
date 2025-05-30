import React, { useContext } from 'react';
import { Descriptions, Divider } from 'antd';
import { PasienRIContext } from './context/PasienRIContext';

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '4px',
  display: 'block',
  marginBottom: 16,
};
const DetailpasienRI = (props) => {
  const { curpasRI } = useContext(PasienRIContext);
  // class Detailpasien extends Component {  
  // render() {
  return (
    <div>

      <Descriptions size="small" column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
        <Descriptions.Item label="No Registrasi" >{curpasRI.registrasiId}</Descriptions.Item>
        <Descriptions.Item label="No Pasien">{curpasRI.pasienId}</Descriptions.Item>
        <Descriptions.Item label="Nama Pasien" span={2}>{curpasRI.namaPasien}</Descriptions.Item>
        <Descriptions.Item label="Jenis Kelamin">{curpasRI.jenisKelamin}</Descriptions.Item>
        <Descriptions.Item label="Nama Ibu">{curpasRI.namaIbu}</Descriptions.Item>
        <Descriptions.Item label="Tanggal Lahir">{curpasRI.tanggalLahir}</Descriptions.Item>
        <Descriptions.Item label="Umur">{curpasRI.umur}</Descriptions.Item>
        <Descriptions.Item label="Alamat" span={2}>{curpasRI.alamat}</Descriptions.Item>
        <Descriptions.Item label="No Telpon">{curpasRI.noTelephone}</Descriptions.Item>
        <Descriptions.Item label="Tanggal Registrasi">{curpasRI.tanggalMasuk}</Descriptions.Item>
        <Descriptions.Item label="Kelas Rawat">{curpasRI.kelasRawat}</Descriptions.Item>
        <Descriptions.Item label="Pembayaran">{curpasRI.namaPembayaran}</Descriptions.Item>
        <Descriptions.Item label="Nomor Penjamin">{curpasRI.noPolish}</Descriptions.Item>
        <Descriptions.Item label="Nomor Penjamin">{curpasRI.namaDpjp}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <p style={pStyle}>Riwayat Pasien</p>
    </div>
  );
}


export default DetailpasienRI;