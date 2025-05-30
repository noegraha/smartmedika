import React, { Fragment, useContext } from "react";
import "./App.css";
import { SuratKeteranganRIContext } from "../../context/SuratKeteranganRIContext";
import { PasienRIContext } from "../../context/PasienRIContext";

import dayjs from "dayjs";

const Formsuratpernyataanisomanfaskes = () => {
  const {
    namapasien,
    umur,
    alamat,
    pekerjaan,
    dokterPenanggungJawab,
    keteranganrawat,
    tanggalmulairawat,
    getCurrentTime,
    tanggalmulaimasuk,
    tanggalselesaikeluar,
    selama,
    srtktrngdetail,
    diagnosarawat,
  } = useContext(SuratKeteranganRIContext);
  const { curpasRI } = useContext(PasienRIContext);

  const NamaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const waktua = dayjs(getCurrentTime()).format("DD");
  const waktub = dayjs(getCurrentTime()).format("M");
  const waktuc = dayjs(getCurrentTime()).format("YYYY");

  const waktud = dayjs(tanggalmulairawat).format("DD");
  const waktue = dayjs(tanggalmulairawat).format("M");
  const waktuf = dayjs(tanggalmulairawat).format("YYYY");

  return (
    <div>
      <>
        <p
          className="western"
          style={{ marginBottom: "0.5in", lineHeight: "100%" }}
        >
          <br />
        </p>
        <p
          className="western"
          style={{
            marginRight: "0.01in",
            marginBottom: "0.1in",
            lineHeight: "100%",
          }}
          align="center"
        >
          <font color="#000000">
            <font face="Arial, serif">
              <font style={{ fontSize: "16pt" }} size={1}>
                SURAT PERNYATAAN BERSEDIA MENJALANKAN ISOLASI MANDIRI
              </font>
            </font>
          </font>
        </p>
        <p
          className="western"
          style={{
            marginRight: "0.01in",
            marginBottom: "0in",
            lineHeight: "100%",
          }}
          align="center"
        >
          <font color="#000000">
            <font face="Arial, serif">
              <font style={{ fontSize: "16pt" }} size={1}>
                DI FASILITAS KESEHATAN
              </font>
            </font>
          </font>
        </p>
        <p
          className="western"
          style={{ marginBottom: "0.10in", lineHeight: "100%" }}
        >
          <br />
        </p>
        {/* Bodi Tabel */}
        <table>
          <tbody>
            <tr style={{ height: "15px" }}>
              <td style={{ width: "40px" }}></td>
              <td>
                <span>
                  <font style={{ fontSize: "9pt" }} size={1}>
                    Yang bertandatangan dibawah ini :
                  </font>
                </span>
              </td>
            </tr>
            <p className="western" style={{ marginBottom: "0.002in" }}>
              <br />
            </p>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr style={{ height: "15px" }}>
              <td style={{ width: "40px" }}></td>
              <td style={{ width: "150px" }}>
                <font style={{ fontSize: "9pt" }} size={1}>
                  Nama
                </font>
              </td>
              <td>
                <font style={{ fontSize: "9pt" }} size={1}>
                  : {namapasien}
                </font>
              </td>
            </tr>
            <tr style={{ height: "15px" }}>
              <td style={{ width: "40px" }}></td>
              <td style={{ width: "150px" }}>
                <font style={{ fontSize: "9pt" }} size={1}>
                  Umur
                </font>
              </td>
              <td>
                <font style={{ fontSize: "9pt" }} size={1}>
                  : {curpasRI.pasienId}
                </font>
              </td>
            </tr>
            <tr style={{ height: "15px" }}>
              <td style={{ width: "40px" }}></td>
              <td style={{ width: "150px" }}>
                <font style={{ fontSize: "9pt" }} size={1}>
                  Alamat
                </font>
              </td>
              <td>
                <font style={{ fontSize: "9pt" }} size={1}>
                  : {curpasRI.tanggalLahir}
                </font>
              </td>
            </tr>
            <tr style={{ height: "15px" }}>
              <td style={{ width: "40px" }}></td>
              <td style={{ width: "150px" }}>
                <font style={{ fontSize: "9pt" }} size={1}>
                  No. HP
                </font>
              </td>
              <td>
                <font style={{ fontSize: "9pt" }} size={1}>
                  : {curpasRI.jenisKelamin}
                </font>
              </td>
            </tr>
          </tbody>
        </table>
        <p
          className="western"
          style={{ marginBottom: "0.04in", lineHeight: "100%" }}
        >
          <br />
        </p>
        <table>
          <tbody>
            <tr style={{ height: "25px" }}>
              <td style={{ width: "40px" }}></td>
              <td>
                <span>
                  <font style={{ fontSize: "9pt" }} size={1}>
                    Dengan ini saya menyatakan bersedia untuk melanjutkan atau
                    menjalankan isolasi
                  </font>
                </span>
              </td>
            </tr>
            <tr style={{ height: "25px" }}>
              <td style={{ width: "40px" }}></td>
              <td>
                <span>
                  <font style={{ fontSize: "9pt" }} size={1}>
                    mandiri difasilitas kesehatan sesuai kurun waktu yang
                    ditetapkan oleh Dinas Kesehatan Setempat.
                  </font>
                </span>
              </td>
            </tr>
            <tr style={{ height: "25px" }}>
              <td style={{ width: "40px" }}></td>
              <td>
                <span>
                  <font style={{ fontSize: "9pt" }} size={1}>
                    saya bersedia mengikuti prosedur dan ketentuan yang berlaku.
                  </font>
                </span>
              </td>
            </tr>
            <tr style={{ height: "25px" }}>
              <td style={{ width: "40px" }}></td>
              <td>
                <span>
                  <font style={{ fontSize: "9pt" }} size={1}>
                    Demikian surat pernyataan ini saya buat dalam kondisi sadar
                    untuk digunakan sebagaimana mestinya.
                  </font>
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <p
          className="western"
          style={{ marginBottom: "0.15in", lineHeight: "100%" }}
        >
          <br />
        </p>
        <table>
          <tbody>
            <tr>
              <td style={{ width: "75%" }}></td>
              <td>
                <font style={{ fontSize: "9pt" }} size={1}>
                  Purwokerto, {waktua} {NamaBulan[waktub - 1]} {waktuc}
                </font>
              </td>
            </tr>
            <br />
            <br />
            <br />
            <br />
            <tr>
              <td style={{ width: "75%" }}></td>
              <td>
                <font style={{ fontSize: "9pt" }} size={1}>
                  (. . . . . . . . . . . . . . . . . . . . . . . . . . . . )
                </font>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    </div>
  );
};

export default Formsuratpernyataanisomanfaskes;
