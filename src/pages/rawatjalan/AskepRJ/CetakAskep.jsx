import React, { useContext } from "react";
import { Spin } from "antd";
import "../../../styleprint.css";
import { AskepContext } from "../../rawatinap/context/AskepContext";

const CetakAskep = () => {
  const {
    printregistrasiId,
    printpasienId,
    printnamaPasien,
    printdeskripsiRuang,
    dataPrint,
    spinCetakAskep,
  } = useContext(AskepContext);
  return (
    <div style={{ height: 500, overflowY: "scroll", color: "black" }}>
      <Spin spinning={spinCetakAskep} tip="Mohon Tunggu...">
        <p className="MsoNormal">
          <span style={{ position: "relative", zIndex: 251658240 }}>
            <span
              style={{
                position: "absolute",
                left: "0px",
                top: "-10px",
                width: "718px",
                height: "134px",
              }}
            ></span>
          </span>
        </p>
        <table cellPadding={0} cellSpacing={0} align="left">
          <tbody>
            <tr>
              <td width={0} height={0} />
              <td width={718} />
            </tr>
            <tr>
              <td height={98} />
              <td align="left" valign="top">
                <img
                  alt="gambar"
                  width={718}
                  height={98}
                  src={require("../../../image1.png")}
                />
              </td>
            </tr>
            <tr>
              <td height={6} />
            </tr>
            <tr>
              <td height={30} />
              <td align="left" valign="top">
                <img
                  alt="gambar"
                  width={718}
                  height={30}
                  src={require("../../../image2.png")}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <table
          className="MsoTableGrid"
          border={0}
          cellSpacing={0}
          cellPadding={0}
          style={{ borderCollapse: "collapse", border: "none" }}
        >
          <tbody>
            <tr>
              <td
                width={239}
                valign="top"
                style={{ width: "300pt", padding: "0in 5.4pt 0in 5.4pt" }}
              >
                <p
                  className="MsoNormal"
                  style={{
                    marginBottom: "0in",
                    marginTop: "0in",
                    lineHeight: "115%",
                  }}
                >
                  <span
                    lang="EN-ID"
                    style={{
                      fontSize: "12.0pt",
                      lineHeight: "115%",
                      color: "black",
                    }}
                  >
                    Nama : {printnamaPasien}
                  </span>
                </p>
              </td>
              <td
                width={239}
                valign="top"
                style={{ width: "179.4pt", padding: "0in 5.4pt 0in 5.4pt" }}
              >
                <p
                  className="MsoNormal"
                  style={{
                    marginBottom: "0in",
                    marginTop: "0in",
                    lineHeight: "115%",
                  }}
                >
                  <span
                    lang="EN-ID"
                    style={{
                      fontSize: "12.0pt",
                      lineHeight: "115%",
                      color: "black",
                    }}
                  >
                    Jenis Kelamin : Laki-Laki
                  </span>
                </p>
              </td>
            </tr>
            <tr>
              <td
                width={239}
                valign="top"
                style={{ width: "179.4pt", padding: "0in 5.4pt 0in 5.4pt" }}
              >
                <p
                  className="MsoNormal"
                  style={{
                    marginBottom: "0in",
                    marginTop: "0in",
                    lineHeight: "115%",
                  }}
                >
                  <span
                    lang="EN-ID"
                    style={{
                      fontSize: "12.0pt",
                      lineHeight: "115%",
                      color: "black",
                    }}
                  >
                    Noreg : {printregistrasiId}
                  </span>
                </p>
              </td>
              <td
                width={239}
                valign="top"
                style={{ width: "179.4pt", padding: "0in 5.4pt 0in 5.4pt" }}
              >
                <p
                  className="MsoNormal"
                  style={{
                    marginBottom: "0in",
                    marginTop: "0in",
                    lineHeight: "115%",
                  }}
                >
                  <span
                    lang="EN-ID"
                    style={{
                      fontSize: "12.0pt",
                      lineHeight: "115%",
                      color: "black",
                    }}
                  >
                    No.Rm : {printpasienId}
                  </span>
                </p>
              </td>
              <td
                width={239}
                valign="top"
                style={{ width: "179.35pt", padding: "0in 5.4pt 0in 5.4pt" }}
              >
                <p
                  className="MsoNormal"
                  style={{
                    marginBottom: "0in",
                    marginTop: "0in",
                    lineHeight: "115%",
                  }}
                >
                  <span
                    lang="EN-ID"
                    style={{
                      fontSize: "12.0pt",
                      lineHeight: "115%",
                      color: "black",
                    }}
                  >
                    Bangsal : {printdeskripsiRuang}
                  </span>
                </p>
              </td>
              {/* <td width={239} valign="top" style={{ width: '179.4pt', padding: '0in 5.4pt 0in 5.4pt' }}>
                            <p className="MsoNormal" style={{ marginBottom: '0in', marginTop: '0in', lineHeight: '115%' }}><span lang="EN-ID" style={{ fontSize: '12.0pt', lineHeight: '115%', color: 'black' }}>Kelas : </span></p>
                        </td>
                        <td width={239} valign="top" style={{ width: '179.4pt', padding: '0in 5.4pt 0in 5.4pt' }}>
                            <p className="MsoNormal" style={{ marginBottom: '0in', marginTop: '0in', lineHeight: '115%' }}><span lang="EN-ID" style={{ fontSize: '12.0pt', lineHeight: '115%', color: 'black' }}>Jaminan: </span></p>
                        </td> */}
            </tr>
          </tbody>
        </table>
        <p
          className="MsoNormal"
          style={{ marginBottom: "0in", marginTop: "0in", lineHeight: "115%" }}
        >
          <span lang="EN-ID" style={{ fontSize: "8.0pt", lineHeight: "115%" }}>
            &nbsp;
          </span>
        </p>
        <table
          className="MsoTableGrid"
          border={1}
          cellSpacing={0}
          cellPadding={0}
          style={{ borderCollapse: "collapse", border: "none" }}
        >
          <tbody>
            <tr>
              <td
                width={151}
                valign="top"
                style={{
                  width: "113.15pt",
                  border: "solid windowtext 1.0pt",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
              >
                <p
                  className="MsoNormal"
                  align="center"
                  style={{
                    marginBottom: "0in",
                    marginTop: "0in",
                    textAlign: "center",
                    lineHeight: "115%",
                  }}
                >
                  <b>
                    <span
                      lang="EN-ID"
                      style={{
                        fontSize: "12.0pt",
                        lineHeight: "115%",
                        color: "black",
                      }}
                    >
                      Hari/Tanggal
                    </span>
                  </b>
                </p>
              </td>
              <td
                width={482}
                valign="top"
                style={{
                  width: "361.5pt",
                  border: "solid windowtext 1.0pt",
                  borderLeft: "none",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
              >
                <p
                  className="MsoNormal"
                  align="center"
                  style={{
                    marginBottom: "0in",
                    marginTop: "0in",
                    textAlign: "center",
                    lineHeight: "115%",
                  }}
                >
                  <b>
                    <span
                      lang="EN-ID"
                      style={{
                        fontSize: "12.0pt",
                        lineHeight: "115%",
                        color: "black",
                      }}
                    >
                      Dokumentasi Asuhan Keperawatan
                    </span>
                  </b>
                </p>
              </td>
              <td
                width={122}
                valign="top"
                style={{
                  width: "91.8pt",
                  border: "solid windowtext 1.0pt",
                  borderLeft: "none",
                  padding: "0in 5.4pt 0in 5.4pt",
                }}
              >
                <p
                  className="MsoNormal"
                  align="center"
                  style={{
                    marginBottom: "0in",
                    marginTop: "0in",
                    textAlign: "center",
                    lineHeight: "115%",
                  }}
                >
                  <b>
                    <span
                      lang="EN-ID"
                      style={{
                        fontSize: "12.0pt",
                        lineHeight: "115%",
                        color: "black",
                      }}
                    >
                      Verifikasi
                    </span>
                  </b>
                </p>
              </td>
            </tr>

            {dataPrint.map((d) => (
              <tr>
                <td
                  width={151}
                  valign="top"
                  style={{
                    width: "113.15pt",
                    border: "solid windowtext 1.0pt",
                    borderTop: "none",
                    padding: "0in 5.4pt 0in 5.4pt",
                  }}
                >
                  <p
                    className="MsoNormal"
                    align="center"
                    style={{
                      marginBottom: "0in",
                      marginTop: "0in",
                      textAlign: "center",
                      lineHeight: "115%",
                    }}
                  >
                    <span
                      lang="EN-ID"
                      style={{
                        fontSize: "12.0pt",
                        lineHeight: "115%",
                        color: "black",
                      }}
                    >
                      {d.tanggal.slice(0, -3)}
                    </span>
                  </p>
                </td>
                <td
                  width={482}
                  valign="top"
                  style={{
                    width: "361.5pt",
                    borderTop: "none",
                    borderLeft: "none",
                    borderBottom: "solid windowtext 1.0pt",
                    borderRight: "solid windowtext 1.0pt",
                    padding: "0in 5.4pt 0in 5.4pt",
                  }}
                >
                  <p
                    className="MsoNormal"
                    style={{
                      marginBottom: "0in",
                      marginTop: "0in",
                      lineHeight: "115%",
                    }}
                  >
                    <b>
                      <span
                        lang="EN-ID"
                        style={{
                          fontSize: "12.0pt",
                          lineHeight: "115%",
                          color: "black",
                        }}
                      >
                        Kajian :
                      </span>
                    </b>
                  </p>
                  <table
                    className="MsoTableGrid"
                    border={0}
                    cellSpacing={0}
                    cellPadding={0}
                    style={{
                      marginLeft: "33.15pt",
                      borderCollapse: "collapse",
                      border: "none",
                    }}
                  >
                    <tbody>
                      {d.nTandaGejala.map((e) => (
                        <tr>
                          <td
                            width={394}
                            valign="top"
                            style={{
                              width: "295.75pt",
                              padding: "0in 5.4pt 0in 5.4pt",
                            }}
                          >
                            <p
                              className="MsoNormal"
                              style={{
                                marginBottom: "0in",
                                marginTop: "0in",
                                lineHeight: "115%",
                              }}
                            >
                              <span
                                lang="EN-ID"
                                style={{
                                  fontSize: "12.0pt",
                                  lineHeight: "115%",
                                  color: "black",
                                }}
                              >
                                {e.deskripsi}
                              </span>
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p
                    className="MsoNormal"
                    style={{
                      marginBottom: "0in",
                      marginTop: "0in",
                      lineHeight: "115%",
                    }}
                  >
                    <b>
                      <span
                        lang="EN-ID"
                        style={{
                          fontSize: "12.0pt",
                          lineHeight: "115%",
                          color: "black",
                        }}
                      >
                        Diagnosa :{" "}
                      </span>
                    </b>
                    <span
                      lang="EN-ID"
                      style={{
                        fontSize: "12.0pt",
                        lineHeight: "115%",
                        color: "black",
                      }}
                    >
                      {d.deskripsiDiagnosa}
                    </span>
                  </p>
                  <p
                    className="MsoNormal"
                    style={{
                      marginBottom: "0in",
                      marginTop: "0in",
                      lineHeight: "115%",
                    }}
                  >
                    <span
                      lang="EN-ID"
                      style={{
                        fontSize: "10.0pt",
                        lineHeight: "115%",
                        fontFamily: '"Segoe UI",sans-serif',
                        color: "black",
                      }}
                    >
                      Setelah dilakukan intervensi selama
                    </span>
                    <span
                      lang="EN-ID"
                      style={{
                        fontFamily: '"Segoe UI",sans-serif',
                        color: "black",
                      }}
                    >
                      {" "}
                      <b>{d.targetWaktu} </b> Maka luarannya {d.deskripsiLuaran}{" "}
                      Dengan Kriteria Hasil {d.nKriteria[0].jenis}
                    </span>
                  </p>
                  {/* <p className="MsoNormal" style={{ marginBottom: '0in', marginTop: '0in', lineHeight: '115%' }}><span lang="EN-ID" style={{ fontFamily: '"Segoe UI",sans-serif', color: 'black' }}></span></p> */}
                  <p
                    className="MsoNormal"
                    style={{
                      marginBottom: "0in",
                      marginTop: "0in",
                      lineHeight: "115%",
                    }}
                  >
                    <b>
                      <span
                        lang="EN-ID"
                        style={{
                          fontFamily: '"Segoe UI",sans-serif',
                          color: "black",
                        }}
                      >
                        Implementasi :
                      </span>
                    </b>
                  </p>
                  <table
                    className="MsoTableGrid"
                    border={0}
                    cellSpacing={0}
                    cellPadding={0}
                    style={{
                      marginLeft: "33.15pt",
                      borderCollapse: "collapse",
                      border: "none",
                    }}
                  >
                    <tbody>
                      {d.nImplementasi.map((f) => (
                        <tr>
                          <td
                            width={150}
                            valign="top"
                            style={{ width: "100pt" }}
                          >
                            <p
                              className="MsoNormal"
                              style={{
                                marginBottom: "0in",
                                marginTop: "0in",
                                lineHeight: "115%",
                              }}
                            >
                              <span
                                lang="EN-ID"
                                style={{
                                  fontSize: "12.0pt",
                                  lineHeight: "115%",
                                  color: "black",
                                }}
                              >
                                {f.tanggal.slice(0, -7)}{" "}
                              </span>
                            </p>
                          </td>
                          <td>
                            <p
                              className="MsoNormal"
                              style={{
                                marginBottom: "0in",
                                marginTop: "0in",
                                lineHeight: "115%",
                              }}
                            >
                              <span
                                lang="EN-ID"
                                style={{
                                  fontSize: "12.0pt",
                                  lineHeight: "115%",
                                  color: "black",
                                }}
                              >
                                {f.deskripsi}
                              </span>
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* <p className="MsoNormal" style={{ marginBottom: '0in', marginTop: '0in', lineHeight: '115%' }}><b><span lang="EN-ID" style={{ fontFamily: '"Segoe UI",sans-serif', color: 'black' }}>Catatan Tambahan :</span></b></p>
                                <table className="MsoTableGrid" border={0} cellSpacing={0} cellPadding={0} style={{ marginLeft: '33.15pt', borderCollapse: 'collapse', border: 'none' }}>
                                    <tbody>
                                        <tr>
                                            <td width={394} valign="top" style={{ width: '295.75pt', padding: '0in 5.4pt 0in 5.4pt' }}>
                                                <p className="MsoNormal" style={{ marginBottom: '0in', marginTop: '0in', lineHeight: '115%' }}>
                                                    <span lang="EN-ID" style={{ fontSize: '12.0pt', lineHeight: '115%', color: 'black' }}>Catatan 1</span></p>
                                            </td>
                                        </tr>
                                    </tbody></table> */}
                  {/* res.data.result[0] === undefined || res.data.result[0].length === 0 */}
                  {d.nEvaluasi.length === 0 || d.nEvaluasi === undefined ? (
                    <div>
                      <p
                        className="MsoNormal"
                        style={{
                          marginBottom: "0in",
                          marginTop: "0in",
                          lineHeight: "115%",
                        }}
                      >
                        <b>
                          <span
                            lang="EN-ID"
                            style={{
                              fontSize: "12.0pt",
                              lineHeight: "115%",
                              color: "black",
                            }}
                          >
                            Evaluasi :{" "}
                          </span>
                        </b>
                        <span
                          lang="EN-ID"
                          style={{
                            fontSize: "12.0pt",
                            lineHeight: "115%",
                            color: "black",
                          }}
                        >
                          {" "}
                        </span>
                      </p>
                      <p
                        className="MsoNormal"
                        style={{
                          marginBottom: "0in",
                          marginTop: "0in",
                          lineHeight: "115%",
                        }}
                      >
                        <b>
                          <span
                            lang="EN-ID"
                            style={{
                              fontSize: "12.0pt",
                              lineHeight: "115%",
                              color: "black",
                            }}
                          >
                            Kesimpulan :{" "}
                          </span>
                        </b>
                        <span
                          lang="EN-ID"
                          style={{
                            fontSize: "12.0pt",
                            lineHeight: "115%",
                            color: "black",
                          }}
                        >
                          {" "}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p
                        className="MsoNormal"
                        style={{
                          marginBottom: "0in",
                          marginTop: "0in",
                          lineHeight: "115%",
                        }}
                      >
                        <b>
                          <span
                            lang="EN-ID"
                            style={{
                              fontSize: "12.0pt",
                              lineHeight: "115%",
                              color: "black",
                            }}
                          >
                            Evaluasi :{" "}
                          </span>
                        </b>
                        <span
                          lang="EN-ID"
                          style={{
                            fontSize: "12.0pt",
                            lineHeight: "115%",
                            color: "black",
                          }}
                        >
                          {d.nEvaluasi[d.nEvaluasi.length - 1].kriteriaHasil}
                        </span>
                      </p>
                      <p
                        className="MsoNormal"
                        style={{
                          marginBottom: "0in",
                          marginTop: "0in",
                          lineHeight: "115%",
                        }}
                      >
                        <b>
                          <span
                            lang="EN-ID"
                            style={{
                              fontSize: "12.0pt",
                              lineHeight: "115%",
                              color: "black",
                            }}
                          >
                            Kesimpulan :{" "}
                          </span>
                        </b>
                        <span
                          lang="EN-ID"
                          style={{
                            fontSize: "12.0pt",
                            lineHeight: "115%",
                            color: "black",
                          }}
                        >
                          {d.nEvaluasi[d.nEvaluasi.length - 1].kesimpulan}
                        </span>
                      </p>
                    </div>
                  )}
                </td>
                <td
                  width={122}
                  valign="top"
                  style={{
                    width: "91.8pt",
                    borderTop: "none",
                    borderLeft: "none",
                    borderBottom: "solid windowtext 1.0pt",
                    borderRight: "solid windowtext 1.0pt",
                    padding: "0in 5.4pt 0in 5.4pt",
                  }}
                >
                  <p
                    className="MsoNormal"
                    align="center"
                    style={{
                      marginBottom: "0in",
                      marginTop: "0in",
                      textAlign: "center",
                      lineHeight: "115%",
                    }}
                  >
                    <span
                      lang="EN-ID"
                      style={{
                        fontSize: "12.0pt",
                        lineHeight: "115%",
                        color: "black",
                      }}
                    >
                      {d.userId}
                    </span>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="MsoNormal">
          <span lang="EN-ID">&nbsp;</span>
        </p>
      </Spin>
    </div>
  );
};

export default CetakAskep;
