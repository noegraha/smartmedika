import React, { Fragment, useContext } from 'react';
import { Table, Input, Button, Tag, Tooltip, Empty } from 'antd';
import { PasienContext } from '../../components/rawatjalan/context/PasienContext';
import { BillingContext } from '../../components/rawatjalan/context/BillingContext';
import { DiagnosaContext } from '../../components/rawatjalan/context/Diagnosacontext';
import { ProsedurContext } from '../../components/rawatjalan/context/ProsedurContext';
import { AnamnesaContext } from '../../components/rawatjalan/context/AnamnesaContext';
import { KonsulContext } from '../../components/rawatjalan/context/KonsulContext';
import { AlergiContext } from '../../components/rawatjalan/context/AlergiContext';
import { CatatanmedisContext } from '../../components/rawatjalan/context/CatatanmedisContext';
import { RJumumContext } from '../../components/rawatjalan/context/RJumumContext';
import { PoliGigiContext } from '../../components/rawatjalan/context/pemeriksaancontext/PoliGigiContext';
import { ReminderContext } from '../../components/rawatjalan/context/ReminderContext';
import { PoliTHTContext } from '../../components/rawatjalan/context/pemeriksaancontext/PoliTHTContext';
import { PoliMataContext } from '../../components/rawatjalan/context/pemeriksaancontext/PoliMataContext';
import { PoliSarafContext } from '../../components/rawatjalan/context/pemeriksaancontext/PoliSarafContext';
import { ImunisasiContext } from '../../components/rawatjalan/context/pemeriksaancontext/ImunisasiContext';
// import { PelayananContext } from '../rawatjalan/context/Pelayanancontext';

const { Column } = Table;
const { Search } = Input;

const Tabelpasien = () => {
  const { pasien, cariPasien, ruangasal, detailPasien, setCurpas, detailRiwayatPenyakit, detailRiwayatPemeriksaan } = useContext(PasienContext);
  const { detailBilling } = useContext(BillingContext);
  const { detailDiagnosa } = useContext(DiagnosaContext);
  const { detailProsedur } = useContext(ProsedurContext);
  const { detailTandavital } = useContext(AnamnesaContext);
  const { detailKonsul } = useContext(KonsulContext);
  const { detailAllergy } = useContext(AlergiContext);
  const { detailCatatanmedis } = useContext(CatatanmedisContext);
  const { detailRJumum } = useContext(RJumumContext);
  const { detailGigi, detailGigiOrtho } = useContext(PoliGigiContext);
  const { detailRujukan } = useContext(ReminderContext);
  const { detailTHT } = useContext(PoliTHTContext);
  const { detailMata } = useContext(PoliMataContext);
  const { detailSaraf } = useContext(PoliSarafContext);
  const { detailImunisasi } = useContext(ImunisasiContext);
  // const { setTabkey } = useContext(PelayananContext);

  const handleClick = (props, id) => {
    console.log(props);
    setCurpas([]);
    detailPasien(props);
    detailBilling(props);
    detailDiagnosa(props);
    detailProsedur(props);
    detailTandavital(props);
    detailKonsul(props);
    detailCatatanmedis(props);
    detailRJumum(props);
    detailGigi(props);
    detailRiwayatPenyakit(id);
    detailRiwayatPemeriksaan(id);
    detailAllergy(props);
    detailRujukan(props);
    detailGigiOrtho(props);
    detailTHT(props);
    detailMata(props);
    detailSaraf(props);
    detailImunisasi(props);
    // detailPasienLive(props);
    // setTabkey("2");
  }
  const handleCari = (e) => {
    cariPasien(e);
  }
  return (
    <Fragment>
      <Search placeholder="Cari Nama Pasien / No Reg..." onChange={(e) => handleCari(e.target.value)} />
      <Table dataSource={pasien} size="small" rowKey="reg" scroll={{ y: 470 }} bordered locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Silahkan Pilih Ruangan Terlebih Dahulu'} /> }}
      // footer={() => <div>Keterangan Warna : <Tag color="magenta">Perlu Dijawab</Tag><Tag color="green">Sudah Dijawab</Tag><Tag color="orange">Belum Dijawab</Tag></div>}
      >
        <Column title="No" key="no" className="bgcolordanger" width="40px" dataIndex="noAntrianKlinik" />
        <Column title="No Reg" key="reg" width="100px" className="bgcolordanger"
          render={(pasien) => (
            <span className="fontkecil">
              {pasien.ruangKonsul !== null
                ? pasien.ruangKonsul === ruangasal && pasien.ruangId !== ruangasal
                  ? <Tooltip title="Konsultasi perlu dijawab"><Tag color="magenta">{pasien.registrasiId}</Tag></Tooltip>
                  : pasien.ruangKonsul === ruangasal && pasien.ruangId === ruangasal
                    ? <Tooltip title="Konsultasi sudah dijawab"><Tag color="green">{pasien.registrasiId}</Tag></Tooltip>
                    : pasien.ruangKonsul !== ruangasal && pasien.ruangId === ruangasal
                      ? <Tooltip title="Konsultasi belum dijawab"><Tag color="orange">{pasien.registrasiId}</Tag></Tooltip>
                      : <Tag>{pasien.registrasiId}</Tag>
                : <Tag>{pasien.registrasiId}</Tag>}
            </span>
          )} />

        {/* <Column title="Reg" key="reg" width="100px" className="fontkecil"
a          render={(pasien) => (
              <div>{pasien.registrasiId}</div>
          )} /> */}


        {/* {pasien.ruangKonsul !== null
          ? pasien.ruangKonsul === ruangasal && pasien.ruangId !== ruangasal
            ? <Column title="Reg" key="reg" width="100px" dataIndex="registrasiId" className="bgcolor fontkecil" />
            : pasien.ruangKonsul === ruangasal && pasien.ruangId === ruangasal
              ? <Column title="Reg" key="reg" width="100px" dataIndex="registrasiId" className="bgcolor fontkecil" />
              : pasien.ruangKonsul !== ruangasal && pasien.ruangId === ruangasal
                ? <Column title="Reg" key="reg" width="100px" dataIndex="registrasiId" className="bgcolor fontkecil" />
                : <Column title="Reg" key="reg" width="100px" dataIndex="registrasiId" className="fontkecil" />
          : <Column title="Reg" key="reg" width="100px" dataIndex="registrasiId" className="bgcolor fontkecil" />
        } */}


        {/* <Column title="Reg" key="reg" width="100px" dataIndex="registrasiId" className="bgcolor fontkecil" /> */}
        {/* <Column title="PasienId" width="80px" dataIndex="pasienId" key="pasienId" className="bgcolor fontkecil" /> */}

        <Column title="Nama" key="nama" className="bgcolordanger"
          render={(pasien) => (
            <span className="fontkecil">
              <Button style={{ fontSize: 12, padding: 0, textAlign: "left", whiteSpace: "normal" }} type="link" onClick={() => handleClick(pasien.registrasiId, pasien.pasienId)}>
                {pasien.namaPasien}
              </Button>
            </span>
          )} />
      </Table>
    </Fragment>
  );
}

export default Tabelpasien;