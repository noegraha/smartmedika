import { Table } from "antd";
import React from "react";
import { useContext } from "react";
import { RadioterapiContext } from "../../context/RadioterapiContext";
import dayjs from "dayjs";

const ReportStatusEksterna = () => {
  const { noReg, cetakStatusEksterna, cetakStatusRd, cetaklistVolume } =
    useContext(RadioterapiContext);

  return (
    <>
      <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      <title />
      <meta name="generator" content="LibreOffice 7.2.4.1 (Linux)" />
      <meta name="author" content="HP" />
      <meta name="created" content="2022-02-02T03:20:00" />
      <meta name="changedby" content="HP" />
      <meta name="changed" content="2022-02-02T07:07:00" />
      <meta name="AppVersion" content={16.0} />
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            "\n\t\t@page { size: 8.5in 11in; margin: 0.5in }\n\t\tp { line-height: 115%; text-align: left; orphans: 2; widows: 2; margin-bottom: 0.1in; direction: ltr; background: transparent }\n\t\tp.western { font-size: 12pt }\n\t\tp.cjk { font-size: 12pt }\n\t\tp.ctl { font-size: 11pt }\n\t",
        }}
      />
      <table width={720} cellPadding={7} cellSpacing={0}>
        <colgroup>
          <col width={89} />
          <col width={386} />
        </colgroup>
        <colgroup>
          <col width={201} />
        </colgroup>
        <tbody>
          <tr>
            <td
              width={89}
              height={91}
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "1px solid #000000",
                borderRight: "none",
                paddingTop: "0in",
                paddingBottom: "0in",
                paddingLeft: "0.08in",
                paddingRight: "0in",
              }}
            >
              <p
                className="western"
                align="center"
                style={{ orphans: 2, widows: 2, marginTop: "0.04in" }}
              >
                <img
                  src="data:image/png;base64,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"
                  name="Picture 262"
                  align="bottom"
                  width={81}
                  height={92}
                  border={0}
                />
              </p>
            </td>
            <td
              width={386}
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1px solid #000000",
                borderLeft: "none",
                borderRight: "1px solid #000000",
                paddingTop: "0in",
                paddingBottom: "0in",
                paddingLeft: "0in",
                paddingRight: "0.08in",
              }}
            >
              <p
                className="western"
                align="center"
                style={{
                  orphans: 2,
                  widows: 2,
                  marginBottom: "0in",
                  textAlign: "center",
                }}
              >
                <font face="Calibri, serif">
                  <b>PEMERINTAH PROVINSI JAWA TENGAH</b>
                </font>
              </p>
              <p
                className="western"
                align="center"
                style={{
                  orphans: 2,
                  widows: 2,
                  marginBottom: "0in",
                  textAlign: "center",
                }}
              >
                <font face="Calibri, serif">
                  <b>RSUD. Prof. Dr. MARGONO SOEKARDJO PURWOKERTO</b>
                </font>
              </p>
              <p
                className="western"
                align="center"
                style={{
                  orphans: 2,
                  widows: 2,
                  marginBottom: "0in",
                  textAlign: "center",
                }}
              >
                <font face="Calibri, serif">
                  <font size={2} style={{ fontSize: "10pt" }}>
                    Jl. Dr. Gumbreg No.1 Purwokerto, Telp. (0281) 632708{" "}
                  </font>
                </font>
              </p>
              <p
                className="western"
                align="center"
                style={{
                  orphans: 2,
                  widows: 2,
                  marginBottom: "0in",
                  textAlign: "center",
                }}
              >
                <font face="Calibri, serif">
                  <font size={2} style={{ fontSize: "10pt" }}>
                    Fax. (0281) 631015 Purwokerto 53146
                  </font>
                </font>
              </p>
              <p
                className="western"
                align="center"
                style={{ orphans: 2, widows: 2, textAlign: "center" }}
              >
                <font face="Calibri, serif">
                  <font size={2} style={{ fontSize: "10pt" }}>
                    E-mail : rsmargono@jatengprov.go.id
                  </font>
                </font>
              </p>
            </td>
            <td
              width={201}
              style={{ border: "1px solid #000000", padding: "0in 0.08in" }}
            >
              <p
                className="western"
                align="center"
                style={{
                  orphans: 2,
                  widows: 2,
                  marginBottom: "0in",
                  textAlign: "center",
                }}
              >
                <font face="Calibri, serif">
                  <font size={2} style={{ fontSize: "11pt" }}>
                    <b>INSTALASI RADIOLOGI</b>
                  </font>
                </font>
              </p>
              <p
                className="western"
                align="center"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  <font
                    size={2}
                    style={{ fontSize: "11pt", textAlign: "center" }}
                  >
                    <b>UNIT PELAYANAN RADIOTERAPI</b>
                  </font>
                </font>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p
        className="western"
        style={{ lineHeight: "100%", marginBottom: "0in" }}
      >
        <br />
      </p>
      <table width={719} cellPadding={7} cellSpacing={1}>
        <colgroup>
          <col width={703} />
        </colgroup>
        <tbody>
          <tr>
            <td
              width={703}
              valign="top"
              style={{
                borderTop: "1px solid #000000",
                borderBottom: "1.50pt double #000000",
                borderLeft: "none",
                borderRight: "none",
                padding: "0in",
              }}
            >
              <p
                className="western"
                align="center"
                style={{ orphans: 2, widows: 2, textAlign: "center" }}
              >
                <font face="Calibri, serif">
                  <b>STATUS RADIOTERAPI EKSTERNA</b>
                </font>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p
        className="western"
        style={{ lineHeight: "100%", marginBottom: "0in" }}
      >
        <br />
      </p>
      <table width={720} cellPadding={7} cellSpacing={0}>
        <colgroup>
          <col width={88} />
          <col width={244} />
          <col width={105} />
          <col width={228} />
        </colgroup>
        <tbody>
          <tr valign="top">
            <td width={88} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Nama</font>
              </p>
            </td>
            <td
              colSpan={3}
              width={604}
              style={{ border: "none", padding: "0in" }}
            >
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  : {cetakStatusEksterna.NAMAPASIEN}
                </font>
              </p>
            </td>
          </tr>
          <tr valign="top">
            <td width={88} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Alamat</font>
              </p>
            </td>
            <td
              colSpan={3}
              width={604}
              style={{ border: "none", padding: "0in" }}
            >
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  : {cetakStatusEksterna.ALAMAT}
                </font>
              </p>
            </td>
          </tr>
          <tr valign="top">
            <td width={88} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Umur</font>
              </p>
            </td>
            <td width={244} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  : {cetakStatusEksterna.UMUR} Tahun
                </font>
              </p>
            </td>
            <td width={105} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Jenis Kelamin</font>
              </p>
            </td>
            <td width={228} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  : {cetakStatusEksterna.KELAMIN}
                </font>
              </p>
            </td>
          </tr>
          <tr valign="top">
            <td width={88} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">No. RM</font>
              </p>
            </td>
            <td width={244} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  : {cetakStatusEksterna.NOPASIEN}
                </font>
              </p>
            </td>
            <td width={105} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">No. Registrasi</font>
              </p>
            </td>
            <td width={228} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">: {noReg}</font>
              </p>
            </td>
          </tr>
          <tr valign="top">
            <td
              width={88}
              style={{
                borderTop: "none",
                borderBottom: "1px solid #000000",
                borderLeft: "none",
                borderRight: "none",
                padding: "0in",
              }}
            >
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <br />
              </p>
            </td>
            <td
              width={244}
              style={{
                borderTop: "none",
                borderBottom: "1px solid #000000",
                borderLeft: "none",
                borderRight: "none",
                padding: "0in",
              }}
            >
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <br />
              </p>
            </td>
            <td
              width={105}
              style={{
                borderTop: "none",
                borderBottom: "1px solid #000000",
                borderLeft: "none",
                borderRight: "none",
                padding: "0in",
              }}
            >
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <br />
              </p>
            </td>
            <td
              width={228}
              style={{
                borderTop: "none",
                borderBottom: "1px solid #000000",
                borderLeft: "none",
                borderRight: "none",
                padding: "0in",
              }}
            >
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <br />
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p
        className="western"
        style={{ lineHeight: "100%", marginBottom: "0in" }}
      >
        <br />
      </p>
      <table width={720} cellPadding={7} cellSpacing={0}>
        <colgroup>
          <col width={88} />
          <col width={244} />
          <col width={69} />
          <col width={262} />
        </colgroup>
        <tbody>
          <tr valign="top">
            <td width={88} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Diagnosa</font>
              </p>
            </td>
            <td width={244} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  : {cetakStatusRd ? cetakStatusRd.DIAGNOSA : " "}
                </font>
              </p>
            </td>
            <td width={69} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">PA</font>
              </p>
            </td>
            <td width={262} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  : {cetakStatusRd ? cetakStatusRd.HASIL_PA : " "}
                </font>
              </p>
            </td>
          </tr>
          <tr valign="top">
            <td width={88} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Lokasi Tumor Primer</font>
              </p>
            </td>
            <td width={244} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <a name="_GoBack" />
                <font face="Calibri, serif">
                  : {cetakStatusRd ? cetakStatusRd.LOKASI_TUMOR : " "}
                </font>
              </p>
            </td>
            <td width={69} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Stadium</font>
              </p>
            </td>
            <td width={262} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  : {cetakStatusRd ? cetakStatusRd.STADIUM : " "}
                </font>
              </p>
            </td>
          </tr>
          <tr valign="top">
            <td
              width={88}
              style={{
                borderTop: "none",
                borderBottom: "1px solid #000000",
                borderLeft: "none",
                borderRight: "none",
                padding: "0in",
              }}
            >
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <br />
              </p>
            </td>
            <td
              width={244}
              style={{
                borderTop: "none",
                borderBottom: "1px solid #000000",
                borderLeft: "none",
                borderRight: "none",
                padding: "0in",
              }}
            >
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <br />
              </p>
            </td>
            <td
              width={69}
              style={{
                borderTop: "none",
                borderBottom: "1px solid #000000",
                borderLeft: "none",
                borderRight: "none",
                padding: "0in",
              }}
            >
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <br />
              </p>
            </td>
            <td
              width={262}
              style={{
                borderTop: "none",
                borderBottom: "1px solid #000000",
                borderLeft: "none",
                borderRight: "none",
                padding: "0in",
              }}
            >
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <br />
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p
        className="western"
        style={{ lineHeight: "100%", marginBottom: "0in" }}
      >
        <br />
      </p>
      <table width={720} cellPadding={7} cellSpacing={0}>
        <colgroup>
          <col width={88} />
          <col width={604} />
        </colgroup>
        <tbody>
          <tr valign="top">
            <td width={88} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Data Klinis</font>
              </p>
            </td>
            <td width={604} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  <b>: </b>
                </font>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p
        className="western"
        style={{ lineHeight: "100%", marginBottom: "0in" }}
      >
        <br />
      </p>
      <table width={718} cellPadding={7} cellSpacing={0}>
        <colgroup>
          <col width={123} />
          <col width={132} />
          <col width={133} />
          <col width={133} />
          <col width={123} />
        </colgroup>
        <tbody>
          <tr>
            <td
              width={123}
              style={{ border: "1.50pt solid #000000", padding: "0in 0.08in" }}
            >
              <p
                className="western"
                align="center"
                style={{ orphans: 2, widows: 2, textAlign: "center" }}
              >
                <font face="Calibri, serif">
                  <b>Volume</b>
                </font>
              </p>
            </td>
            <td
              width={132}
              style={{ border: "1.50pt solid #000000", padding: "0in 0.08in" }}
            >
              <p
                className="western"
                align="center"
                style={{ orphans: 2, widows: 2, textAlign: "center" }}
              >
                <font face="Calibri, serif">
                  <b>Dosis Total</b>
                </font>
              </p>
            </td>
            <td
              width={133}
              style={{ border: "1.50pt solid #000000", padding: "0in 0.08in" }}
            >
              <p
                className="western"
                align="center"
                style={{ orphans: 2, widows: 2, textAlign: "center" }}
              >
                <font face="Calibri, serif">
                  <b>Dosis /Mingguan</b>
                </font>
              </p>
            </td>
            <td
              width={133}
              style={{ border: "1.50pt solid #000000", padding: "0in 0.08in" }}
            >
              <p
                className="western"
                align="center"
                style={{ orphans: 2, widows: 2, textAlign: "center" }}
              >
                <font face="Calibri, serif">
                  <b>Jumlah Fraksi /Minggu</b>
                </font>
              </p>
            </td>
            <td
              width={123}
              style={{ border: "1.50pt solid #000000", padding: "0in 0.08in" }}
            >
              <p
                className="western"
                align="center"
                style={{ orphans: 2, widows: 2, textAlign: "center" }}
              >
                <font face="Calibri, serif">
                  <b>Nomor Lapangan Penyinaran</b>
                </font>
              </p>
            </td>
          </tr>

          {/* Data Tabel Volume */}
          {cetaklistVolume.map((list) => (
            <tr>
              <td
                width={123}
                height={23}
                style={{
                  border: "1.50pt solid #000000",
                  padding: "0in 0.08in",
                }}
              >
                <p
                  className="western"
                  align="center"
                  style={{ orphans: 2, widows: 2, textAlign: "center" }}
                >
                  <font face="Calibri, serif">{list.VOLUME}</font>
                </p>
              </td>
              <td
                width={132}
                style={{
                  border: "1.50pt solid #000000",
                  padding: "0in 0.08in",
                }}
              >
                <p
                  className="western"
                  align="center"
                  style={{ orphans: 2, widows: 2, textAlign: "center" }}
                >
                  <font face="Calibri, serif">{list.DOSIS_TOTAL}</font>
                </p>
              </td>
              <td
                width={133}
                style={{
                  border: "1.50pt solid #000000",
                  padding: "0in 0.08in",
                }}
              >
                <p
                  className="western"
                  align="center"
                  style={{ orphans: 2, widows: 2, textAlign: "center" }}
                >
                  <font face="Calibri, serif">{list.DOSIS_MINGGUAN}</font>
                </p>
              </td>
              <td
                width={133}
                style={{
                  border: "1.50pt solid #000000",
                  padding: "0in 0.08in",
                }}
              >
                <p
                  className="western"
                  align="center"
                  style={{ orphans: 2, widows: 2, textAlign: "center" }}
                >
                  <font face="Calibri, serif">{list.JUMLAH_FRAKSI}</font>
                </p>
              </td>
              <td
                width={123}
                style={{
                  border: "1.50pt solid #000000",
                  padding: "0in 0.08in",
                }}
              >
                <p
                  className="western"
                  align="center"
                  style={{ orphans: 2, widows: 2, textAlign: "center" }}
                >
                  <font face="Calibri, serif">{list.NOMOR_PENYINARAN}</font>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        className="western"
        style={{ lineHeight: "100%", marginBottom: "0in" }}
      >
        <br />
      </p>
      <table width={720} cellPadding={7} cellSpacing={0}>
        <colgroup>
          <col width={124} />
          <col width={210} />
          <col width={69} />
          <col width={262} />
        </colgroup>
        <tbody>
          <tr valign="top">
            <td width={124} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Tgl. Simulator</font>
              </p>
            </td>
            <td width={210} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  :{" "}
                  {cetakStatusRd
                    ? dayjs(cetakStatusRd.TGLSIMULATOR).format("DD-MM-YYYY")
                    : " "}
                </font>
              </p>
            </td>
            <td width={69} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Teknis</font>
              </p>
            </td>
            <td width={262} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  : {cetakStatusRd ? cetakStatusRd.TEKNIS : " "}
                </font>
              </p>
            </td>
          </tr>
          <tr valign="top">
            <td width={124} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Radiografer</font>
              </p>
            </td>
            <td width={210} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  : {cetakStatusRd ? cetakStatusRd.namaRadio1 : " "}
                </font>
              </p>
            </td>
            <td width={69} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Dokter</font>
              </p>
            </td>
            <td width={262} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  : {cetakStatusRd ? cetakStatusRd.namaDokter : " "}
                </font>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p
        className="western"
        style={{ lineHeight: "100%", marginBottom: "0in" }}
      >
        <br />
      </p>
      <table width={720} cellPadding={7} cellSpacing={0}>
        <colgroup>
          <col width={123} />
          <col width={208} />
          <col width={167} />
          <col width={166} />
        </colgroup>
        <tbody>
          <tr valign="top">
            <td width={123} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Tgl. CT-Dosimetri</font>
              </p>
            </td>
            <td width={208} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  :{" "}
                  {cetakStatusRd
                    ? dayjs(cetakStatusRd.TGLDOSIMETRI).format("DD-MM-YYYY")
                    : " "}
                </font>
              </p>
            </td>
            <td width={167} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  {cetakStatusRd && cetakStatusRd.KEPALA === 1 ? (
                    <>&#9745; </>
                  ) : (
                    <>&#9744; </>
                  )}
                  Kepala
                </font>
              </p>
            </td>
            <td width={166} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  {cetakStatusRd && cetakStatusRd.THORAX === 1 ? (
                    <>&#9745; </>
                  ) : (
                    <>&#9744; </>
                  )}
                  Thorax
                </font>
              </p>
            </td>
          </tr>
          <tr valign="top">
            <td width={123} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Radiografer</font>
              </p>
            </td>
            <td width={208} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  : {cetakStatusRd ? cetakStatusRd.namaRadio2 : " "}
                </font>
              </p>
            </td>
            <td width={167} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  {cetakStatusRd && cetakStatusRd.PELVIS === 1 ? (
                    <>&#9745; </>
                  ) : (
                    <>&#9744; </>
                  )}
                  Pelvis
                </font>
              </p>
            </td>
            <td width={166} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  {cetakStatusRd && cetakStatusRd.CRANIO === 1 ? (
                    <>&#9745; </>
                  ) : (
                    <>&#9744; </>
                  )}
                  Cranio
                </font>
              </p>
            </td>
          </tr>
          <tr valign="top">
            <td width={123} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <br />
              </p>
            </td>
            <td width={208} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <br />
              </p>
            </td>
            <td width={167} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  {cetakStatusRd && cetakStatusRd.ABDOMEN === 1 ? (
                    <>&#9745; </>
                  ) : (
                    <>&#9744; </>
                  )}
                  Abdomen
                </font>
              </p>
            </td>
            <td width={166} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <br />
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p
        className="western"
        style={{ lineHeight: "100%", marginBottom: "0in" }}
      >
        <br />
      </p>
      <table width={720} cellPadding={7} cellSpacing={0}>
        <colgroup>
          <col width={123} />
          <col width={569} />
        </colgroup>
        <tbody>
          <tr valign="top">
            <td
              width={123}
              height={9}
              style={{ border: "none", padding: "0in" }}
            >
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">Catatan</font>
              </p>
            </td>
            <td width={569} style={{ border: "none", padding: "0in" }}>
              <p
                className="western"
                align="left"
                style={{ orphans: 2, widows: 2 }}
              >
                <font face="Calibri, serif">
                  : {cetakStatusRd ? cetakStatusRd.CATATAN : " "}
                </font>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p
        className="western"
        style={{ lineHeight: "100%", marginBottom: "0in" }}
      >
        <br />
      </p>
    </>
  );
};

export default ReportStatusEksterna;
