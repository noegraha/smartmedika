import React, { useContext } from 'react'
import { Spin } from 'antd';
import { AskepContext } from './AskepContext';
import { AssesmentRIContext } from './AssesmentRIContext';
import '../../../../../../StyleAssesment.css'
const CetakAssesment = () => {
    const {
        curpasRI } = useContext(AskepContext);
    const {
        spin,
        cetakUserCetak,
        cetakUserTtd,
        cetakregistrasiId,
        cetakpasienId,
        cetaknama,
        cetaktanggal,
        cetaknamaRuang,
        cetakpegawaiId,
        cetakcaraMasuk,
        cetakasalMasuk,
        cetakriwayatAlergi,
        cetakriwayat,
        cetakriwayatGenetik,
        cetakkeluhan,
        cetakskalaNyeri,
        cetakresikoJatuh,
        cetaknutrisi,
        cetakpps,
        cetakews,
        cetaklatchScore,
        cetakscoreDown,
        cetakmeows,
        cetakassesmentDetail,
        cetakassesmentDetailTG,
        cetakTTV,
        cetakTGrespirasi,
        cetakTGsirkulasi,
        cetakTGnutrisi,
        cetakTGeliminasi,
        cetakTGaktifitasDanIstirahat,
        cetakTGproteksiDanPerlindungan,
        cetakTGsensoriPersepsi,
        cetakTGcairanDanElektrolit,
        cetakTGfungsiNeurologis,
        cetakTGfungsiEndokrin,
        cetakTGkonsepDiriDanKognitif,
        cetakTGfungsiPeran,
        cetakTGpolaToleransiKopingStress,
        cetakTGseksualReproduksi,
        cetakTGpolaNilaiKepercayaan,
        spinCetakAssesment, setspinCetakAssesment,
    } = useContext(AssesmentRIContext);
    const coba = () => {
        console.log(cetakkeluhan.map((e) => (
            e.KeluhanId
        )))
    }
    return (
        <div style={{ height: 500, overflowY: 'scroll', color: 'black' }}>
            <Spin spinning={spinCetakAssesment} tip="Mohon Tunggu...">
                <table

                    cellPadding={7}
                    cellSpacing={0}
                    style={{ pageBreakBefore: "always" }}
                >
                    <colgroup>
                        <col width={155} />
                        <col width={77} />
                        <col width={4358} />
                        <col width={4355} />
                        <col width={137} />
                        <col width={4355} />
                        <col width={80} />
                        <col width={4355} />
                        <col width={137} />
                        <col width={4355} />
                        <col width={98} />
                    </colgroup>
                    <tbody>
                        <tr valign="top">
                            <td
                                colSpan={2}
                                width={250}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western" align="center">
                                    <img
                                        src="data:image/png;base64,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"
                                        name="Picture 2"
                                        align="bottom"
                                        width={271}
                                        height={83}
                                        border={0}
                                    />
                                </p>
                            </td>
                            <td
                                colSpan={8}
                                width={383}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Nama : </b>
                                        </font>
                                    </font>
                                    <font >
                                        <font face="Calibri Light, serif">
                                            <font size={2} style={{ fontSize: "12pt" }}>
                                                <b>{cetaknama}</b>
                                            </font>
                                        </font>
                                    </font>
                                </p>
                                <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Jenis Kelamin: </b>
                                        </font>
                                    </font>
                                    <font >
                                        <font face="Calibri Light, serif">
                                            <font size={2} style={{ fontSize: "12pt" }}>
                                                <b>{curpasRI.jnskelamin === "L" ? "Laki-Laki" : "Perempuan"}</b>
                                            </font>
                                        </font>
                                    </font>
                                </p>
                                <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Tanggal Lahir: </b>
                                        </font>
                                    </font>
                                    <font >
                                        <font face="Calibri Light, serif">
                                            <font size={2} style={{ fontSize: "12pt" }}>
                                                <b>{curpasRI.tgllahir}</b>
                                            </font>
                                        </font>
                                    </font>
                                </p>
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>No RM : </b>
                                        </font>
                                    </font>
                                    <font >
                                        <font face="Calibri Light, serif">
                                            <font size={2} style={{ fontSize: "12pt" }}>
                                                <b>{cetakregistrasiId}</b>
                                            </font>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={98}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p
                                    lang="en-US"
                                    className="western"
                                    align="center"
                                    style={{ marginBottom: "0in" }}
                                >
                                    <font face="Calibri Light, serif">
                                        <font size={4} style={{ fontSize: "14pt" }}>
                                            <b>RM.IRNA</b>
                                        </font>
                                    </font>
                                </p>
                                <p
                                    lang="en-US"
                                    className="western"
                                    align="center"
                                    style={{ marginBottom: "0in" }}
                                >
                                    <font face="Calibri Light, serif">
                                        <font size={4} style={{ fontSize: "14pt" }}>
                                            <b>8</b>
                                        </font>
                                    </font>
                                </p>
                                <p lang="en-US" className="western" align="center">
                                    <font face="Calibri Light, serif">
                                        <font size={4} style={{ fontSize: "14pt" }}>
                                            <b>1/5</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr style={{ textAlign: 'center' }}>
                            <td
                                colSpan={11}
                                width={759}
                                valign="top"
                                textAlign="center"
                                style={{ border: "1px solid #000000", padding: "0in 0.08in", textAlign: 'center' }}
                            >
                                <p
                                    lang="en-US"
                                    className="western"
                                    align="center"
                                    style={{ marginBottom: "0in" }}
                                >
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>ASSESMENT AWAL PASIEN</b>
                                        </font>
                                    </font>
                                </p>
                                <p lang="en-US" className="western" align="center">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <i>
                                                <b>DIISI OLEH PERAWAT</b>
                                            </i>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                colSpan={3}
                                width={246}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Ruang : {cetaknamaRuang}</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={3}
                                width={235}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Kelas : {curpasRI.kdgrptrf}</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={6}
                                width={250}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Penjamin : {curpasRI.namaPt}</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={11}
                                width={759}
                                valign="top"
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Tanggal Pengkajian : {cetaktanggal}</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                colSpan={3}
                                width={401}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={4} style={{ fontSize: "12pt" }}>
                                            <b>Cara Masuk : {cetakcaraMasuk}</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={8}
                                width={344}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={8} style={{ fontSize: "12pt" }}>
                                            <b>Asal Masuk : {cetakasalMasuk} </b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={11}
                                width={759}
                                valign="top"
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Riwayat Alergi : {cetakriwayatAlergi} </b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={11}
                                width={759}
                                valign="top"
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p
                                    lang="en-US"
                                    className="western"
                                    align="center"
                                    style={{ marginBottom: "0in" }}
                                >
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>ASSESMENT UTAMA</b>
                                        </font>
                                    </font>
                                </p>
                                <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Keluhan :</b>
                                        </font>
                                    </font>
                                </p>
                                <ul>
                                    {cetakkeluhan.map(e => (
                                        <span>
                                            <li>
                                                <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                    <font face="Calibri, serif">
                                                        <font size={2} style={{ fontSize: "11pt" }}>
                                                            <font face="Calibri Light, serif">
                                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                                    <span lang="en-US">
                                                                        <b>{e.KeluhanId}, {e.Karakteristik}, {e.KeluhanLain}</b>
                                                                    </span>
                                                                </font>
                                                            </font>
                                                        </font>
                                                    </font>
                                                </p>
                                            </li>
                                        </span>
                                    ))}
                                </ul>
                                <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Riwayat Penyakit Terdahulu : {cetakriwayat} </b>
                                        </font>
                                    </font>
                                </p>
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Riwayat Genetik : {cetakriwayatGenetik} </b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={155}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>TD</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={80}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>: {cetakTTV.TekananDarahSistolik}/{cetakTTV.TekananDarahDiastolik} mmHg</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={137}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>RR</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={80}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>: {cetakTTV.FrekuensiNafas} x/mnt</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={137}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Tinggi Badan</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={99}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>: {cetakTTV.TinggiBadan} Cm</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={155}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Nadi</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={80}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>: {cetakTTV.FrekuensiNadi} x/Mnt</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={137}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Satursi Oksigen</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={80}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>: {cetakTTV.SaturasiOksigen} %</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={137}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Berat Badan</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={99}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>: {cetakTTV.BeratBadan} Kg</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={155}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Irama Nadi</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={80}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>: {cetakTTV.IramaNadi}</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={137}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Suhu</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={80}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>: {cetakTTV.SuhuTubuh} °C</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={137}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>IMT</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={99}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>: {((cetakTTV.BeratBadan) / (Math.pow(((cetakTTV.TinggiBadan) / 100), 2))).toFixed(2)}</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={155}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>GCS</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={80}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>: {cetakTTV.GcsTotal} </b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={137}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Skor Nyeri</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={80}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>: {cetakTTV.SkorNyeri}</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={137}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Resiko Jatuh</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={99}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>: {cetakTTV.ResikoJatuh}</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p
                    lang="en-US"
                    className="western"
                    align="center"
                    style={{ marginBottom: "0.11in", lineHeight: "100%" }}
                >
                    <font face="Calibri Light, serif">
                        <font size={3} style={{ fontSize: "12pt" }}>
                            <b>ASSESMENT TAMBAHAN</b>
                        </font>
                    </font>
                </p>
                <table cellPadding={7} cellSpacing={0}>
                    <colgroup>
                        <col width={32} />
                        <col width={232} />
                        <col width={467} />
                    </colgroup>
                    <tbody>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>No</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <br />
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Hasil Pengkajian</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                rowSpan={10}
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>1.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                colSpan={2}
                                width={713}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Assesment Tambahan Wajib</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <ol>
                                    <li>
                                        <p lang="id-ID">
                                            <font face="Calibri, serif">
                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                    <font face="Calibri Light, serif">
                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                            <b>Skala Nyeri</b>
                                                        </font>
                                                    </font>
                                                </font>
                                            </font>
                                        </p>
                                    </li>
                                </ol>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>{cetakskalaNyeri.Metode} : {cetakskalaNyeri.Value} ({cetakskalaNyeri.Kategori}) </b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <ol start={2}>
                                    <li>
                                        <p lang="id-ID">
                                            <font face="Calibri, serif">
                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                    <font face="Calibri Light, serif">
                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                            <span lang="en-US">
                                                                <b>Resiko</b>
                                                            </span>
                                                        </font>
                                                    </font>
                                                    <font face="Calibri Light, serif">
                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                            <b>Jatuh</b>
                                                        </font>
                                                    </font>
                                                </font>
                                            </font>
                                        </p>
                                    </li>
                                </ol>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>{cetakresikoJatuh.Metode} : {cetakresikoJatuh.totalscore} ({cetakresikoJatuh.Kategori}) </b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <ol start={3}>
                                    <li>
                                        <p lang="id-ID">
                                            <font face="Calibri, serif">
                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                    <font face="Calibri Light, serif">
                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                            <span lang="en-US">
                                                                <b>Assesment Nutrisi</b>
                                                            </span>
                                                        </font>
                                                    </font>
                                                </font>
                                            </font>
                                        </p>
                                    </li>
                                </ol>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>{cetaknutrisi.Metode} : {cetaknutrisi.TotalScore} </b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <ol start={4}>
                                    <li>
                                        <p lang="id-ID">
                                            <font face="Calibri, serif">
                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                    <font face="Calibri Light, serif">
                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                            <span lang="en-US">
                                                                <b>EWS</b>
                                                            </span>
                                                        </font>
                                                    </font>
                                                </font>
                                            </font>
                                        </p>
                                    </li>
                                </ol>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>{cetakews.EwsScore} ({cetakews.EwsKategori}) </b>

                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <ol start={5}>
                                    <li>
                                        <p lang="id-ID">
                                            <font face="Calibri, serif">
                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                    <font face="Calibri Light, serif">
                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                            <b>PPS</b>
                                                        </font>
                                                    </font>
                                                </font>
                                            </font>
                                        </p>
                                    </li>
                                </ol>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>{cetakpps.PPSLevel} % </b>

                                        </font>
                                    </font>
                                </p>
                            </td>
                        </tr>
                        <tr valign="top">
                            {
                                cetakmeows === null && cetakscoreDown === null && cetaklatchScore === null ?
                                    <div></div> :
                                    <div>
                                        <td
                                            colSpan={2}
                                            width={713}
                                            style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                                        >
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Assesment Tambahan Tidak Wajib</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </td>
                                    </div>
                            }

                        </tr>
                        <tr valign="top">
                            {
                                cetakmeows === null ?
                                    <div></div> :
                                    <div>
                                        <td
                                            width={232}
                                            style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                                        >
                                            <ol>
                                                <li>
                                                    <p lang="id-ID">
                                                        <font face="Calibri, serif">
                                                            <font size={2} style={{ fontSize: "11pt" }}>
                                                                <font face="Calibri Light, serif">
                                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                                        <b>Skor Meows</b>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </font>
                                                    </p>
                                                </li>
                                            </ol>
                                        </td>
                                        <td
                                            width={467}
                                            style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                                        >
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakmeows.totalScore} ({cetakmeows.kesimpulan}) </b>
                                                    </font>
                                                </font>
                                            </p>

                                        </td>
                                    </div>
                            }
                        </tr>
                        <tr valign="top">
                            {
                                cetakscoreDown === null ?
                                    <div></div> :
                                    <div>
                                        <td
                                            width={232}
                                            style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                                        >
                                            <ol start={2}>
                                                <li>
                                                    <p lang="id-ID">
                                                        <font face="Calibri, serif">
                                                            <font size={2} style={{ fontSize: "11pt" }}>
                                                                <font face="Calibri Light, serif">
                                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                                        <b>Scoredown</b>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </font>
                                                    </p>
                                                </li>
                                            </ol>
                                        </td>
                                        <td
                                            width={467}
                                            style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                                        >
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakscoreDown.TotalScore} ({cetakscoreDown.Kesimpulan}) </b>

                                                    </font>
                                                </font>
                                            </p>
                                        </td>
                                    </div>
                            }
                        </tr>
                        <tr valign="top">
                            {
                                cetaklatchScore === null ?
                                    <div></div> :
                                    <div>
                                        <td
                                            width={232}
                                            style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                                        >
                                            <ol start={3}>
                                                <li>
                                                    <p lang="id-ID">
                                                        <font face="Calibri, serif">
                                                            <font size={2} style={{ fontSize: "11pt" }}>
                                                                <font face="Calibri Light, serif">
                                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                                        <span lang="en-US">
                                                                            <b>Latch</b>
                                                                        </span>
                                                                    </font>
                                                                </font>
                                                                <font face="Calibri Light, serif">
                                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                                        <b>Skor</b>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </font>
                                                    </p>
                                                </li>
                                            </ol>
                                        </td>
                                        <td
                                            width={467}
                                            style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                                        >
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetaklatchScore.TotalScore} ({cetaklatchScore.Kesimpulan}) </b>

                                                    </font>
                                                </font>
                                            </p>

                                        </td>
                                    </div>
                            }
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>2.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Respirasi</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.respirasi === "Perlu Pengkajian Lanjutan" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.respirasi}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGrespirasi.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b>{e.Deskripsi}</b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>
                                                )))
                                                }
                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanRespirasi === null ? '-' : cetakassesmentDetail.pemeriksaanRespirasi}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>
                                }
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>3.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Sirkulasi</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.sirkulasi === "Perlu Pengkajian Lanjutan" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.sirkulasi}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Ekstrimita : {cetakassesmentDetail.ekstremitas === null ? '-' : cetakassesmentDetail.ekstremitas}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGsirkulasi.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b> <b>{e.Deskripsi}</b></b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>

                                                )))}
                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanSirkulasi === null ? '-' : cetakassesmentDetail.pemeriksaanSirkulasi}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>
                                }
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>4.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Nutrisi</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.nutrisi === "Perlu Pengkajian Lanjutan" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.nutrisi}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGnutrisi.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b>{e.Deskripsi}</b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>
                                                )))
                                                }
                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanNutrisi === null ? '-' : cetakassesmentDetail.pemeriksaanNutrisi}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>}
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>5.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Eliminasi</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.eliminasi === "Perlu Pengkajian Lanjutan" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.eliminasi}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Frekuensi BAB : {cetakassesmentDetail.frekuensiBab === null ? '-' : cetakassesmentDetail.frekuensiBab}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Konsistensi : {cetakassesmentDetail.konsistensiBab === null ? '-' : cetakassesmentDetail.konsistensiBab}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Warna : {cetakassesmentDetail.warnaBab === null ? '-' : cetakassesmentDetail.warnaBab}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Keluhan : {cetakassesmentDetail.keluhanBab === null ? '-' : cetakassesmentDetail.keluhanBab}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Peristaltik Usus : {cetakassesmentDetail.peristaltikUsus === null ? '-' : cetakassesmentDetail.peristaltikUsus}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Frekuensi BAK : {cetakassesmentDetail.frekuensiBak === null ? '-' : cetakassesmentDetail.frekuensiBak}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Jumlah Urin : {cetakassesmentDetail.jumlahUrin === null ? '-' : cetakassesmentDetail.jumlahUrin}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Gangguan Eliminasi : {cetakassesmentDetail.gangguanUrin === null ? '-' : cetakassesmentDetail.gangguanUrin}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Terpasang Kateter : {cetakassesmentDetail.kateter === true ? "Ya" : "Tidak"}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Warna Urin : {cetakassesmentDetail.warnaUrin === null ? '-' : cetakassesmentDetail.warnaUrin}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGnutrisi.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b>{e.Deskripsi}</b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>
                                                )))
                                                }

                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanEliminasi === null ? '-' : cetakassesmentDetail.pemeriksaanEliminasi}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>
                                }
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>6.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Aktifitas dan Istirahat</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.aktifitas === "Perlu Pengkajian Lanjutan" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.aktifitas}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tidur Malam : {cetakassesmentDetail.tidurMalam === null ? '-' : cetakassesmentDetail.tidurMalam + 'jam'}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tidur Siang : {cetakassesmentDetail.tidurSiang === null ? '-' : cetakassesmentDetail.tidurSiang + 'jam'}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Gangguan Tidur : {cetakassesmentDetail.gangguanTidur === null ? '-' : cetakassesmentDetail.gangguanTidur}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Konsumsi Obat : {cetakassesmentDetail.obatTidur === true ? "Ya" : "Tidak"}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGaktifitasDanIstirahat.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b>{e.Deskripsi}</b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>

                                                )))
                                                }
                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanAktifitas === null ? '-' : cetakassesmentDetail.pemeriksaanAktifitas}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>
                                }
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>7.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Proteksi Perlindungan</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.proteksi === "Perlu Pengkajian Lanjutan" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.proteksi}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Luka Kulit : {cetakassesmentDetail.lukaKulit === true ? "Ya" : "Tidak"}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Lokasi Luka : {cetakassesmentDetail.lokasiLuka === null ? '-' : cetakassesmentDetail.lokasiLuka}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Penyebab Luka : {cetakassesmentDetail.penyebabLuka === null ? '-' : cetakassesmentDetail.penyebabLuka}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Luas Luka : {cetakassesmentDetail.luasLuka === null ? '-' : cetakassesmentDetail.luasLuka}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGproteksiDanPerlindungan.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b>{e.Deskripsi}</b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>
                                                )))
                                                }
                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanProteksi === null ? '-' : cetakassesmentDetail.pemeriksaanProteksi}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>
                                }
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>8.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Sensori Persepsi</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.sensori === "Perlu Pengkajian Lanjutan" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.sensori}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Kesadaran : {cetakassesmentDetail.kesadaran === null ? '-' : cetakassesmentDetail.kesadaran}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pendengaran : {cetakassesmentDetail.pendengaran === null ? '-' : cetakassesmentDetail.pendengaran}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Penglihatan : {cetakassesmentDetail.penglihatan === null ? '-' : cetakassesmentDetail.penglihatan}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Bicara : {cetakassesmentDetail.bicara === null ? '-' : cetakassesmentDetail.bicara}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Kebiasaan Periksa : {cetakassesmentDetail.kebiasaanPeriksa === null ? '-' : cetakassesmentDetail.kebiasaanPeriksa}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Persepsi Sakitnnya : {cetakassesmentDetail.persepsiSakit === null ? '-' : cetakassesmentDetail.persepsiSakit}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGsensoriPersepsi.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b>{e.Deskripsi}</b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>
                                                )))
                                                }
                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanSensori === null ? '-' : cetakassesmentDetail.pemeriksaanSensori}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>
                                }
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>9.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Cairan Elektrolit</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.cairanElektrolit === "Perlu Pengkajian Lanjutan" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.cairanElektrolit}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>IWL : {cetakassesmentDetail.iwl === null ? '-' : cetakassesmentDetail.iwl}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Derajat Edema : {cetakassesmentDetail.derajatEdema === null ? '-' : cetakassesmentDetail.derajatEdema}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGcairanDanElektrolit.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b>{e.Deskripsi}</b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>
                                                )))
                                                }
                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanCairanElektrolit === null ? '-' : cetakassesmentDetail.pemeriksaanCairanElektrolit}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>
                                }
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>10.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Fungsi Neurologis</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.fungsiNeurologis === "Perlu Pengkajian Lanjutan" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.fungsiNeurologis}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Kesadaran : {cetakassesmentDetail.kesadaran === null ? '-' : cetakassesmentDetail.kesadaran}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pendengaran : {cetakassesmentDetail.pendengaran === null ? '-' : cetakassesmentDetail.pendengaran}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Penglihatan : {cetakassesmentDetail.penglihatan === null ? '-' : cetakassesmentDetail.penglihatan}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Bicara : {cetakassesmentDetail.bicara === null ? '-' : cetakassesmentDetail.bicara}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGfungsiNeurologis.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b>{e.Deskripsi}</b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>
                                                )))
                                                }
                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanNeurologis === null ? '-' : cetakassesmentDetail.pemeriksaanNeurologis}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>
                                }
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>11.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Fungsi Endokrin</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.fungsiEndokrin === "Perlu Pengkajian Lanjutan" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.fungsiEndokrin}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGfungsiEndokrin.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b>{e.Deskripsi}</b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>
                                                )))
                                                }
                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanEndokrin === null ? '-' : cetakassesmentDetail.pemeriksaanEndokrin}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>
                                }
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>12.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Konsep Diri Kognitif</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.konsepDiri === "Perlu Pengkajian Lanjutan" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.konsepDiri}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pengetahuan Penyakit Saat Ini: {cetakassesmentDetail.pengetahuanPenyakit === null ? '-' : cetakassesmentDetail.pengetahuanPenyakit}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pengetahuan Perawatan : {cetakassesmentDetail.pengetahuanPerawatan === null ? '-' : cetakassesmentDetail.pengetahuanPerawatan}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Skor Konsep Diri : {cetakassesmentDetail.scoreKonsepDiri === null ? '-' : cetakassesmentDetail.scoreKonsepDiri}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGkonsepDiriDanKognitif.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b>{e.Deskripsi}</b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>
                                                )))
                                                }
                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanKonsepDiri === null ? '-' : cetakassesmentDetail.pemeriksaanKonsepDiri}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>
                                }
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>13.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Fungsi Peran</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.fungsiPeran === "Perlu Pengkajian Lanjutan" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.fungsiPeran}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Hubungan Peran : {cetakassesmentDetail.hubunganPeran === null ? '-' : cetakassesmentDetail.hubunganPeran}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Peran Keluarga Sebagai : {cetakassesmentDetail.peranKeluarga === null ? '-' : cetakassesmentDetail.peranKeluarga}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGfungsiPeran.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b>{e.Deskripsi}</b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>
                                                )))
                                                }
                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanFungsiPeran === null ? '-' : cetakassesmentDetail.pemeriksaanFungsiPeran}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>
                                }
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>14.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Pola Toleransi Koping Stress</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.polaToleransi === "Perlu Pengkajian Lanjutan" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.polaToleransi}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Koping Terhadap Sakitnya : {cetakassesmentDetail.koping === null ? '-' : cetakassesmentDetail.koping}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Penyelesaian Masalah : {cetakassesmentDetail.penyelesaianMasalah === null ? '-' : cetakassesmentDetail.penyelesaianMasalah}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGpolaToleransiKopingStress.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b>{e.Deskripsi}</b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>
                                                )))
                                                }
                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanPolaToleransi === null ? '-' : cetakassesmentDetail.pemeriksaanPolaToleransi}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>
                                }
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>15.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Seksual Reproduksi</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.seksualReproduksi === "Perlu Pengkajian Lanjutan" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.seksualReproduksi}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Jumlah Anak : {cetakassesmentDetail.jumlahAnak === null ? '-' : cetakassesmentDetail.jumlahAnak}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Umur Menikah : {cetakassesmentDetail.umurMenikah === null ? '-' : cetakassesmentDetail.umurMenikah}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Umur Anak Pertama : {cetakassesmentDetail.umurAnakPertama === null ? '-' : cetakassesmentDetail.umurAnakPertama}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Penyakit Kelamin : {cetakassesmentDetail.penyakitKelamin === true ? "Ya" : "Tidak"}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Jenis Penyakit Kelamin : {cetakassesmentDetail.jenisPenyakit === null ? '-' : cetakassesmentDetail.jenisPenyakit}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Keluhan : {cetakassesmentDetail.keluhanPenyakit === null ? '-' : cetakassesmentDetail.keluhanPenyakit}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGseksualReproduksi.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b>{e.Deskripsi}</b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>
                                                )))
                                                }
                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanSeksual === null ? '-' : cetakassesmentDetail.pemeriksaanSeksual}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>
                                }
                            </td>
                        </tr>
                        <tr valign="top">
                            <td
                                width={32}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>16.</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={232}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                <p lang="en-US" className="western">
                                    <font face="Calibri Light, serif">
                                        <font size={3} style={{ fontSize: "12pt" }}>
                                            <b>Pola Nilai Kepercayaan</b>
                                        </font>
                                    </font>
                                </p>
                            </td>
                            <td
                                width={467}
                                style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
                            >
                                {
                                    cetakassesmentDetail.kebiasaanIbadah === "Tidak Teratur" ?
                                        <div>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>{cetakassesmentDetail.kebiasaanIbadah}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Kepercayaan Terkait Kesehatan : {cetakassesmentDetail.kepercayaanKesehatan === null ? '-' : cetakassesmentDetail.kepercayaanKesehatan}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Lain Lain : {cetakassesmentDetail.lainlain === null ? '-' : cetakassesmentDetail.lainlain}</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Tanda Gejala :</b>
                                                    </font>
                                                </font>
                                            </p>
                                            <ul>
                                                {(cetakTGpolaNilaiKepercayaan.map((e) => (
                                                    <li>
                                                        <p lang="id-ID" style={{ marginBottom: "0in" }}>
                                                            <font face="Calibri, serif">
                                                                <font size={2} style={{ fontSize: "11pt" }}>
                                                                    <font face="Calibri Light, serif">
                                                                        <font size={3} style={{ fontSize: "12pt" }}>
                                                                            <b>{e.Deskripsi}</b>
                                                                        </font>
                                                                    </font>
                                                                </font>
                                                            </font>
                                                        </p>
                                                    </li>
                                                )))
                                                }
                                            </ul>
                                            <p lang="en-US" className="western">
                                                <font face="Calibri Light, serif">
                                                    <font size={3} style={{ fontSize: "12pt" }}>
                                                        <b>Pemeriksaan Lain : {cetakassesmentDetail.pemeriksaanNilaiKepercayaan === null ? '-' : cetakassesmentDetail.pemeriksaanNilaiKepercayaan}</b>
                                                    </font>
                                                </font>
                                            </p>
                                        </div>
                                        :
                                        <p lang="en-US" className="western" style={{ marginBottom: "0in" }}>
                                            <font face="Calibri Light, serif">
                                                <font size={3} style={{ fontSize: "12pt" }}>
                                                    <b>Tidak Ada Keluhan</b>
                                                </font>
                                            </font>
                                        </p>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p></p>
                <p
                    lang="en-US"
                    className="western"
                    style={{
                        marginLeft: "4.5in",
                        textIndent: "0.5in",
                        marginBottom: "0in",
                        lineHeight: "100%"
                    }}
                >
                    <font face="Calibri Light, serif">
                        <font size={3} style={{ fontSize: "12pt" }}>
                            <b>Perawat Yang Mengisi</b>
                        </font>
                    </font>
                </p>
                <p
                    lang="en-US"
                    className="western"
                    style={{ marginBottom: "0in", lineHeight: "100%" }}
                >
                    <br />
                </p>
                <p lang="en-US"
                    className="western"
                    style={{
                        marginLeft: "4.5in",
                        textIndent: "0.5in",
                        marginBottom: "0in",
                        lineHeight: "100%"
                    }}>
                    <img
                        src={cetakUserTtd}
                        name="Picture 2"
                        align="bottom"
                        width={250}
                        height={43}
                        border={0}
                    />
                </p>
                <p
                    lang="en-US"
                    className="western"
                    style={{
                        marginLeft: "4.5in",
                        textIndent: "0.5in",
                        marginBottom: "0in",
                        lineHeight: "100%"
                    }}
                >
                    <a name="_GoBack" />
                    <font face="Calibri Light, serif">
                        <font size={3} style={{ fontSize: "12pt" }}>
                            <b>({cetakUserCetak})</b>
                        </font>
                    </font>
                </p>
            </Spin>
        </div>
    )
}

export default CetakAssesment
