import { Button, Card, Col, DatePicker, Input, Modal, Row, Select, Space } from 'antd'
import React from 'react'
import { SearchOutlined, CheckOutlined, SaveOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useContext } from 'react';
import dayjs from "dayjs";
import { BridgingSITBContext } from '../context/BridgingSITBContext';

const { Option } = Select;
const { TextArea } = Input;

const FormInputSitb = () => {
    const {
        idEmr,
        idTb03,
        nama,
        nik,
        noRm,
        jenisKelamin,
        alamat,
        idProvFaskes,
        idKabFaskes,
        idProvPx,
        idKabPx,
        idFaskes,
        tglLahir,
        icdx,
        tipeDx,
        lokasiAnatomi,
        riwPengobatan, setriwPengobatan,
        tglPengobatan, settglPengobatan,
        panduanOat, setpanduanOat,
        sblmHasilMikropis, setsblmHasilMikropis,
        sblmHasilTesCepat, setsblmHasilTesCepat,
        sblmHasilBiakan, setsblmHasilBiakan,
        mikropis2, setmikropis2,
        mikropis3, setmikropis3,
        mikropis5, setmikropis5,
        akhirMikropis, setakhirMikropis,
        tglAkhir, settglAkhir,
        hasilAkhir, sethasilAkhir,
        fotoThorak, setfotoThorak,
        ipKomp,
        hostKomp,
        userId,
        // md
        setmdFormInput,
        // sp
        spInputSitb,
        // func
        simpanEmrSitb,
        bridgeSitb,
    } = useContext(BridgingSITBContext)

    const klikSimpan = () => {
        if (!riwPengobatan) {
            Modal.warning({
                title: 'Peringatan!',
                content: 'Riwayat pengobatan belum dipilih!',
            })
        }
        else if (!panduanOat) {
            Modal.warning({
                title: 'Peringatan!',
                content: 'Panduan OAT belum diisi!',
            })
        }
        else if (!sblmHasilMikropis) {
            Modal.warning({
                title: 'Peringatan!',
                content: 'Sebelum pengobatan Hasil Mikropis belum dipilih!',
            })
        }
        else if (!sblmHasilTesCepat) {
            Modal.warning({
                title: 'Peringatan!',
                content: 'Sebelum pengobatan Hasil Tes Cepat belum dipilih!',
            })
        }
        else if (!sblmHasilBiakan) {
            Modal.warning({
                title: 'Peringatan!',
                content: 'Sebelum pengobatan Hasil Biakan belum dipilih!',
            })
        }
        // else if (dayjs(tglAkhir).format('YYYYMMDD') === '20010101') {
        //     Modal.warning({
        //         title: 'Peringatan!',
        //         content: 'Tanggal Hasil Akhir Pengobatan belum dipilih!',
        //     })
        // }
        else {
            let data = {}

            data.id_tb_03 = idTb03 ? idTb03 : '';
            data.kd_pasien = nama;
            data.nik = nik;
            data.jenis_kelamin = jenisKelamin === 'Laki-laki' ? 'L' : 'P';
            data.alamat_lengkap = alamat;
            data.id_propinsi_faskes = idProvFaskes;
            data.kd_kabupaten_faskes = idKabFaskes;
            data.id_propinsi_pasien = idProvPx;
            data.kd_kabupaten_pasien = idKabPx;
            data.kd_fasyankes = idFaskes;
            data.kode_icd_x = icdx;
            data.tipe_diagnosis = tipeDx.toString();
            data.klasifikasi_lokasi_anatomi = lokasiAnatomi.toString();
            data.klasifikasi_riwayat_pengobatan = riwPengobatan.toString();
            data.tanggal_mulai_pengobatan = dayjs(tglPengobatan).format('YYYYMMDD');
            data.paduan_oat = panduanOat;
            // data.kategori_paduan_oat = "Kategori 1";
            data.sebelum_pengobatan_hasil_mikroskopis = sblmHasilMikropis;
            data.sebelum_pengobatan_hasil_tes_cepat = sblmHasilTesCepat;
            data.sebelum_pengobatan_hasil_biakan = sblmHasilBiakan;
            data.hasil_mikroskopis_bulan_2 = mikropis2 ? mikropis2 : "";
            data.hasil_mikroskopis_bulan_3 = mikropis3 ? mikropis3 : "";
            data.hasil_mikroskopis_bulan_5 = mikropis5 ? mikropis5 : "";
            data.akhir_pengobatan_hasil_mikroskopis = akhirMikropis ? akhirMikropis : "";
            data.tanggal_hasil_akhir_pengobatan = dayjs(tglAkhir).format('YYYYMMDD') === '20200101' ? "" : dayjs(tglAkhir).format('YYYYMMDD');
            data.hasil_akhir_pengobatan = hasilAkhir ? hasilAkhir : "";
            data.tgl_lahir = dayjs(tglLahir).format('YYYYMMDD');
            data.foto_toraks = fotoThorak;

            // let data1 = {}
            // data1.tb03Id = idTb03;
            // data1.pasienId = noRm;
            // data1.diagnosisId = icdx;
            // data1.riwayat = riwPengobatan.toString();
            // data1.tglMulai = dayjs(tglPengobatan).format('YYYY-MM-DD');
            // data1.panduanOat = panduanOat;
            // data1.sebelumHasilMikroskopis = sblmHasilMikropis;
            // data1.sebelumHasilTesCepat = sblmHasilTesCepat;
            // data1.sebelumHasilBiakan = sblmHasilBiakan;
            // data1.hasilMikropisBulan2 = mikropis2;
            // data1.hasilMikropisBulan3 = mikropis3;
            // data1.hasilMikropisBulan5 = mikropis5;
            // data1.akhirHasilMikropis = akhirMikropis;
            // data1.tglHasilAkhir = dayjs(tglAkhir).format('YYYYMMDD') === '20010101' ? null : dayjs(tglAkhir).format();
            // data1.hasilAkhir = hasilAkhir;
            // data1.hasilFotoToraks = fotoThorak;
            // data1.userId = userId;
            // data1.clientHost = hostKomp;
            // data1.clientIP = ipKomp;

            bridgeSitb(data)
            // simpanEmrSitb(data1)
            console.log('klikSimpan : ', data);
        }
    }

    const klikBatal = () => {
        setmdFormInput(false)
    }

    return (
        <div>
            <Card
                loading={spInputSitb}
                bodyStyle={{ padding: '5px' }}>
                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                        <span>1.</span>
                    </Col>
                    <Col span={5}>
                        <span>Id TB 03 :</span>
                    </Col>
                    <Col span={6}>
                        <Input
                            value={idTb03}
                            // onChange={(e) => setregId(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            readOnly
                            size='small'
                        // style={{ width: '55%' }}
                        />
                    </Col>

                    {/* ===== */}
                    <Col flex="20px" style={{ marginLeft: 15 }}>
                        <span>15.</span>
                    </Col>
                    <Col span={5}>
                        <span>Sblm. Pengobatan Hasil Mikroskopis :</span>
                    </Col>
                    <Col span={6}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={sblmHasilMikropis}
                            onChange={(e) => setsblmHasilMikropis(e)}
                            allowClear
                            size='small'
                        >
                            <Option key={1} value="Neg">Neg</Option>
                            <Option key={2} value="1-9">1-9</Option>
                            <Option key={3} value="1+">1+</Option>
                            <Option key={4} value="2+">2+</Option>
                            <Option key={5} value="3+">3+</Option>
                            <Option key={6} value="Tidak Dilakukan">Tidak Dilakukan</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                        <span>2.</span>
                    </Col>
                    <Col span={5}>
                        <span>Nama Pasien :</span>
                    </Col>
                    <Col span={6}>
                        <Input
                            value={nama}
                            // onChange={(e) => setregId(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            readOnly
                            size='small'
                        // style={{ width: '55%' }}
                        />
                    </Col>

                    {/* ===== */}
                    <Col flex="20px" style={{ marginLeft: 15 }}>
                    </Col>
                    <Col span={5}>
                        <span>Sblm. Pengobatan Hasil Tes Cepat :</span>
                    </Col>
                    <Col span={6}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={sblmHasilTesCepat}
                            onChange={(e) => setsblmHasilTesCepat(e)}
                            allowClear
                            size='small'
                        >
                            <Option key={1} value="Neg">Neg</Option>
                            <Option key={2} value="Rif Sen">Rif Sen</Option>
                            <Option key={3} value="Rif Ses">Rif Ses</Option>
                            <Option key={4} value="Rif Indet">Rif Indet</Option>
                            <Option key={5} value="INVALID">INVALID</Option>
                            <Option key={6} value="ERROR">ERROR</Option>
                            <Option key={7} value="NO RESULT">NO RESULT</Option>
                            <Option key={8} value="Tidak Dilakukan">Tidak Dilakukan</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                        <span>3.</span>
                    </Col>
                    <Col span={5}>
                        <span>NIK :</span>
                    </Col>
                    <Col span={6}>
                        <Input
                            value={nik}
                            // onChange={(e) => setregId(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            readOnly
                            size='small'
                        // style={{ width: '55%' }}
                        />
                    </Col>

                    {/* ===== */}
                    <Col flex="20px" style={{ marginLeft: 15 }}>
                    </Col>
                    <Col span={5}>
                        <span>Sblm. Pengobatan Hasil Biakan :</span>
                    </Col>
                    <Col span={6}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={sblmHasilBiakan}
                            onChange={(e) => setsblmHasilBiakan(e)}
                            allowClear
                            size='small'
                        >
                            <Option key={1} value="Negatif">Negatif</Option>
                            <Option key={2} value="1-9 BTA">1-9 BTA</Option>
                            <Option key={3} value="1+">1+</Option>
                            <Option key={4} value="2+">2+</Option>
                            <Option key={5} value="3+">3+</Option>
                            <Option key={6} value="4+">4+</Option>
                            <Option key={7} value="NTM">NTM</Option>
                            <Option key={8} value="Kontaminasi">Kontaminasi</Option>
                            <Option key={9} value="Tidak Dilakukan">Tidak Dilakukan</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                        <span>4.</span>
                    </Col>
                    <Col span={5}>
                        <span>Jenis Kelamin :</span>
                    </Col>
                    <Col span={6}>
                        <Input
                            value={jenisKelamin}
                            // onChange={(e) => setregId(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            readOnly
                            size='small'
                        // style={{ width: '55%' }}
                        />
                    </Col>

                    {/* ===== */}
                    <Col flex="20px" style={{ marginLeft: 15 }}>
                        <span>16.</span>
                    </Col>
                    <Col span={5}>
                        <span>Hasil Mikroskopis Bulan 2 :</span>
                    </Col>
                    <Col span={6}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={mikropis2}
                            onChange={(e) => setmikropis2(e)}
                            size='small'
                        >
                            <Option key={1} value="Neg">Neg</Option>
                            <Option key={2} value="1-9">1-9</Option>
                            <Option key={3} value="1+">1+</Option>
                            <Option key={4} value="2+">2+</Option>
                            <Option key={5} value="3+">3+</Option>
                            <Option key={6} value="Tidak Dilakukan">Tidak Dilakukan</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                        <span>5.</span>
                    </Col>
                    <Col span={5}>
                        <span>Alamat Lengkap :</span>
                    </Col>
                    <Col span={6}>
                        <Input
                            value={alamat}
                            // onChange={(e) => setregId(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            readOnly
                            size='small'
                        // style={{ width: '55%' }}
                        />
                    </Col>

                    {/* ===== */}
                    <Col flex="20px" style={{ marginLeft: 15 }}>
                        <span>17.</span>
                    </Col>
                    <Col span={5}>
                        <span>Hasil Mikroskopis Bulan 3 :</span>
                    </Col>
                    <Col span={6}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={mikropis3}
                            onChange={(e) => setmikropis3(e)}
                            size='small'
                        >
                            <Option key={1} value="Neg">Neg</Option>
                            <Option key={2} value="1-9">1-9</Option>
                            <Option key={3} value="1+">1+</Option>
                            <Option key={4} value="2+">2+</Option>
                            <Option key={5} value="3+">3+</Option>
                            <Option key={6} value="Tidak Dilakukan">Tidak Dilakukan</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                        <span>6.</span>
                    </Col>
                    <Col span={5}>
                        <span>Id Provinsi Faskes :</span>
                    </Col>
                    <Col span={6}>
                        <Input
                            value={idProvFaskes}
                            // onChange={(e) => setregId(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            readOnly
                            size='small'
                        // style={{ width: '55%' }}
                        />
                    </Col>

                    {/* ===== */}
                    <Col flex="20px" style={{ marginLeft: 15 }}>
                        <span>18.</span>
                    </Col>
                    <Col span={5}>
                        <span>Hasil Mikroskopis Bulan 5 :</span>
                    </Col>
                    <Col span={6}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={mikropis5}
                            onChange={(e) => setmikropis5(e)}
                            size='small'
                        >
                            <Option key={1} value="Neg">Neg</Option>
                            <Option key={2} value="1-9">1-9</Option>
                            <Option key={3} value="1+">1+</Option>
                            <Option key={4} value="2+">2+</Option>
                            <Option key={5} value="3+">3+</Option>
                            <Option key={6} value="Tidak Dilakukan">Tidak Dilakukan</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                        <span>7.</span>
                    </Col>
                    <Col span={5}>
                        <span>Kode Kabupaten Faskes :</span>
                    </Col>
                    <Col span={6}>
                        <Input
                            value={idKabFaskes}
                            // onChange={(e) => setregId(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            readOnly
                            size='small'
                        // style={{ width: '55%' }}
                        />
                    </Col>

                    {/* ===== */}
                    <Col flex="20px" style={{ marginLeft: 15 }}>
                        <span>19.</span>
                    </Col>
                    <Col span={5}>
                        <span>Akhir Pengobatan Hasil Mikroskopis :</span>
                    </Col>
                    <Col span={6}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={akhirMikropis}
                            onChange={(e) => setakhirMikropis(e)}
                            size='small'
                        >
                            <Option key={1} value="Neg">Neg</Option>
                            <Option key={2} value="1-9">1-9</Option>
                            <Option key={3} value="1+">1+</Option>
                            <Option key={4} value="2+">2+</Option>
                            <Option key={5} value="3+">3+</Option>
                            <Option key={6} value="Tidak Dilakukan">Tidak Dilakukan</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                        <span>8.</span>
                    </Col>
                    <Col span={5}>
                        <span>Id Provinsi Pasien :</span>
                    </Col>
                    <Col span={6}>
                        <Input
                            value={idProvPx}
                            // onChange={(e) => setregId(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            readOnly
                            size='small'
                        // style={{ width: '55%' }}
                        />
                    </Col>

                    {/* ===== */}
                    <Col flex="20px" style={{ marginLeft: 15 }}>
                        <span>20.</span>
                    </Col>
                    <Col span={5}>
                        <span>Tanggal Hasil Akhir Pengobatan :</span>
                    </Col>
                    <Col span={6}>
                        <DatePicker
                            value={dayjs(tglAkhir)}
                            onChange={(e) => settglAkhir(e)}
                            // disabledDate={(current) => {
                            //     let customDate = dayjs().format("YYYY-MM-DD");
                            //     return current && current < dayjs(customDate, "YYYY-MM-DD");
                            // }}
                            size='small'
                            format='DD-MM-YYYY'
                            allowClear={false}
                            inputReadOnly={true}
                            style={{ width: '100%' }} />
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                        <span>9.</span>
                    </Col>
                    <Col span={5}>
                        <span>Kode Kabupaten Pasien :</span>
                    </Col>
                    <Col span={6}>
                        <Input
                            value={idKabPx}
                            // onChange={(e) => setregId(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            readOnly
                            size='small'
                        // style={{ width: '55%' }}
                        />
                    </Col>

                    {/* ===== */}
                    <Col flex="20px" style={{ marginLeft: 15 }}>
                        <span>21.</span>
                    </Col>
                    <Col span={5}>
                        <span>Hasil Akhir Pengobatan :</span>
                    </Col>
                    <Col span={6}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={hasilAkhir}
                            onChange={(e) => sethasilAkhir(e)}
                            size='small'
                        >
                            <Option key={1} value="Sembuh">Sembuh</Option>
                            <Option key={2} value="Pengobatan lengkap">Pengobatan lengkap</Option>
                            <Option key={3} value="Putus berobat">Putus berobat</Option>
                            <Option key={4} value="Meninggal">Meninggal</Option>
                            <Option key={5} value="Gagal">Gagal</Option>
                            <Option key={6} value="Tidak dievaluasi/pindah">Tidak dievaluasi/pindah</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                        <span>10.</span>
                    </Col>
                    <Col span={5}>
                        <span>Kode Fasyankes :</span>
                    </Col>
                    <Col span={6}>
                        <Input
                            value={idFaskes}
                            // onChange={(e) => setregId(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            readOnly
                            size='small'
                        // style={{ width: '55%' }}
                        />
                    </Col>

                    {/* ===== */}
                    <Col flex="20px" style={{ marginLeft: 15 }}>
                        <span>22.</span>
                    </Col>
                    <Col span={5}>
                        <span>Tgl Lahir :</span>
                    </Col>
                    <Col span={6}>
                        <Input
                            value={dayjs(tglLahir).format('DD-MM-YYYY')}
                            // onChange={(e) => setregId(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            readOnly
                            size='small'
                        // style={{ width: '55%' }}
                        />
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                        <span>11.</span>
                    </Col>
                    <Col span={5}>
                        <span>Kode ICD-10 :</span>
                    </Col>
                    <Col span={6}>
                        <Input
                            value={icdx}
                            // onChange={(e) => setregId(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            readOnly
                            size='small'
                        // style={{ width: '55%' }}
                        />
                    </Col>

                    {/* ===== */}
                    <Col flex="20px" style={{ marginLeft: 15 }}>
                        <span>23.</span>
                    </Col>
                    <Col span={5}>
                        <span>Foto Toraks :</span>
                    </Col>
                    <Col span={6}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={fotoThorak}
                            onChange={(e) => setfotoThorak(e)}
                            size='small'
                        >
                            <Option key={1} value="Positif">Positif</Option>
                            <Option key={2} value="Negatif">Negatif</Option>
                            <Option key={3} value="Tidak dilakukan">Tidak dilakukan</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                    </Col>
                    <Col span={5}>
                        <span>Tipe Diagnosis :</span>
                    </Col>
                    <Col span={6}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={tipeDx}
                            // onChange={(e) => setperawat(e)}
                            size='small'
                        >
                            <Option key={1} value={1}>1 - Terkonfirmasi bakteriologis</Option>
                            <Option key={2} value={2}>2 - Terdiagnosis klinis</Option>
                        </Select>
                    </Col>

                    {/* ===== */}

                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                    </Col>
                    <Col span={5}>
                        <span>Klasifikasi Lokasi Anatomi :</span>
                    </Col>
                    <Col span={6}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={lokasiAnatomi}
                            // onChange={(e) => setperawat(e)}
                            size='small'
                        >
                            <Option key={1} value={1}>1 - Paru</Option>
                            <Option key={2} value={2}>2 - Ekstraparu</Option>
                        </Select>
                    </Col>

                    {/* ===== */}

                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                        <span>12.</span>
                    </Col>
                    <Col span={5}>
                        <span>Klasifikasi Riwayat Pengobatan :</span>
                    </Col>
                    <Col span={6}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={riwPengobatan}
                            onChange={(e) => setriwPengobatan(e)}
                            size='small'
                        >
                            <Option key={1} value={1}>1 - Baru</Option>
                            <Option key={2} value={2}>2 - Kambuh</Option>
                            <Option key={3} value={3}>3 - Diobati setelah gagal kategori 1</Option>
                            <Option key={4} value={4}>4 - Diobati setelah gagal kategori 2</Option>
                            <Option key={5} value={5}>5 - Diobati setelah putus berobat</Option>
                            <Option key={6} value={6}>6 - Diobati setelah gagal pengobatan lini 2</Option>
                            <Option key={7} value={7}>7 - Pernah diobati tidak diketahui hasilnya</Option>
                            <Option key={8} value={8}>8 - Tidak diketahui</Option>
                            <Option key={9} value={9}>9 - Lain-lain</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                        <span>13.</span>
                    </Col>
                    <Col span={5}>
                        <span>Tanggal Mulai Pengobatan :</span>
                    </Col>
                    <Col span={6}>
                        <DatePicker
                            value={dayjs(tglPengobatan)}
                            onChange={(e) => settglPengobatan(e)}
                            // disabledDate={(current) => {
                            //     let customDate = dayjs().format("YYYY-MM-DD");
                            //     return current && current < dayjs(customDate, "YYYY-MM-DD");
                            // }}
                            size='small'
                            format='DD-MM-YYYY'
                            allowClear={false}
                            inputReadOnly={true}
                            style={{ width: '100%' }} />
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col flex="20px">
                        <span>14.</span>
                    </Col>
                    <Col span={5}>
                        <span>Paduan Oat :</span>
                    </Col>
                    <Col span={6}>
                        {/* <TextArea
                            value={panduanOat}
                            onChange={(e) => setpanduanOat(e.target.value)}
                            rows={4}
                            showCount
                            placeholder="..."
                            maxLength={4000}
                        /> */}
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={panduanOat}
                            onChange={(e) => setpanduanOat(e)}
                            size='small'
                        >
                            <Option key={1} value={"Kategori 1"}>Kategori 1</Option>
                            <Option key={2} value={"Kategori 2"}>Kategori 2</Option>
                            <Option key={3} value={"Kategori Anak"}>Kategori Anak</Option>
                            <Option key={4} value={"Lepasan"}>Lepasan</Option>
                            <Option key={5} value={"Panduan Jangka Pendek Non Injeksi"}>Panduan Jangka Pendek Non Injeksi</Option>
                            <Option key={6} value={"Panduan Jangka Panjang Non Injeksi"}>Panduan Jangka Panjang Non Injeksi</Option>
                        </Select>
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Col span={24}>
                        <Space
                            style={{ float: 'right' }}>
                            <Button
                                type='primary'
                                onClick={() => klikSimpan()}
                                icon={<SaveOutlined />}
                                // disabled={noReg.length === 0 ? true : false}
                                style={{ width: '150px' }}>
                                Simpan & Kirim
                            </Button>
                            <Button
                                onClick={() => klikBatal()}
                                icon={<CloseCircleOutlined />}
                                // disabled={noReg.length === 0 ? true : false}
                                style={{ width: '150px' }}>
                                Batal
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default FormInputSitb