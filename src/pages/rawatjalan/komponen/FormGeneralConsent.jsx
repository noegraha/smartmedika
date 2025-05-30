import React, { Fragment, useContext } from "react";
import {
  PDFViewer,
  Document,
  Page,
  View,
  Image,
  Text,
} from "@react-pdf/renderer";
import {
  Table,
  TableBody,
  TableHeader,
  TableCell,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
import LogoJateng from "../../../assets/img/jateng2.png";
import { PasienContext } from "../context/PasienContext";
import dayjs from "dayjs";
const FormGeneralConsent = () => {
  const { curpas, tandatangan } = useContext(PasienContext);
  const petugas = sessionStorage.getItem("namapetugas");
  const tanggal = dayjs().format("DD-MM-YYYY");
  const gambar = `data:image/png;base64,${tandatangan}`;
  return (
    <Fragment>
      <PDFViewer width="100%" height="750px" style={{}}>
        <Document>
          <Page size="A4">
            <View style={{ margin: 30, marginBottom: 0 }}>
              <Table>
                <TableHeader
                  textAlign={"center"}
                  // includeBottomBorder={false}
                  // includeRightBorder={false}
                  // includeLeftBorder={false}
                  // includeTopBorder={false}
                >
                  <TableCell weighting={0.15}>
                    <Image
                      src={LogoJateng}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </TableCell>
                  <TableCell weighting={0.7}>
                    <Text style={{ fontSize: "16" }}>
                      PEMERINTAH PROVINSI JAWA TENGAH
                    </Text>
                    <Text style={{ fontSize: "13" }}>
                      RUMAH SAKIT UMUM DAERAH (RSUD)
                    </Text>
                    <Text style={{ fontSize: "13" }}>
                      PROF. Dr. MARGONO SOEKARJO PURWOKERTO
                    </Text>
                    <Text style={{ fontSize: "8" }}>
                      JL. Dr. Gumbreg No. 01 PurwokertoTelp: (0281)632708, Fax:
                      (0281)631015,
                    </Text>
                  </TableCell>
                  <TableCell weighting={0.15}>
                    <Text style={{ fontSize: "8" }}>{curpas.pasienId}</Text>
                    <Text style={{ fontSize: "8" }}>{curpas.namaPasien}</Text>
                    <Text style={{ fontSize: "8" }}>{curpas.tanggalLahir}</Text>
                  </TableCell>
                </TableHeader>
              </Table>
            </View>

            <View style={{ marginLeft: 30, marginRight: 30, marginTop: 5 }}>
              <Text
                style={{
                  fontSize: "12",
                  textAlign: "center",
                  marginBottom: 10,
                  marginTop: 5,
                }}
              >
                PERSETUJUAN UMUM / GENERAL CONSENT
              </Text>
              <Table
                data={[
                  {
                    no: "1",
                    materi: "PERSETUJUAN PELAYANAN KESEHATAN",
                    penjelasan:
                      "Saya menyetujui dan memberikan persetujuan untuk mendapat pelayanan kesehatan di RSUD. Prof Dr Margono Soekarjo dan dengan ini saya meminta dan memberikan kuasa kepada RSUD. Prof Dr. Margono Soekarjo (dokter, perawat, dan tenaga kesehatan lainnya) untuk memberikan pelayanan kesehatan, pemeriksaan fisik, prosedur diagnostik, radiologi, terapi sesuai pertimbangan dokter yang diperlukan atau disarankan pada perawatan saya. Hal ini mencakup seluruh pemeriksaan dan prosedur diagnostik rutin, namun TIDAK TERBATAS pada x-ray, tindakan medis, prosedur invasive (penyuntikan, infuse, NGT, Dower Catheter), prosedur invasive lain, produk farmasi, obat - obatan, pemasangan alat kesehatan (kecuali yang membutuhkan persetujuan khusus/tertulis), pengambilan darah untuk pemeriksaan laboratorium dan pemeriksaan patologi yang dibutuhkan untuk pengobatan dan tindakan yang aman.",
                  },
                  {
                    no: "2",
                    materi: "HASIL PELAYANAN",
                    penjelasan:
                      "Saya memahami bahwa praktek kedokteran bukanlah ilmu pasti dan tidak ada jaminan atas hasil pengobatan atau tindakan yang diberikan. Saya akan mengikuti pengobatan medis sesuai diagnosis dokter dengan standar ilmu kedokteran",
                  },
                  {
                    no: "3",
                    materi: "KEHADIRAN MAHASISWA & PENDIDIKAN",
                    penjelasan:
                      "Saya memahami bahwa RSUD Margono Soekarjo merupakan rumah sakit pendidikan yang menjadi tempat praktek klinik bagi mahasiswa profesi kesehatan. Oleh karena itu, mereka mungkin berpartisipasi dan terlibat dalam perawatan saya. Saya menyetujui bahwa, mahasiswa profesi kesehatan tersebut berpartisipasi dan terlibat dalam perawatan saya sepanjang berada dibawah supervisi PPA dan atau dokter penanggung jawab pelayanan",
                  },
                  {
                    no: "4",
                    materi: "PELEPASAN INFORMASI",
                    penjelasan:
                      "Saya memahami, bahwa informasi yang ada dalam diri saya, termasuk diagnostik, hasil laboratorium dan tes diagnostik yang digunakan untuk perawatan medis saya, akan dijamin kerahasiaanya, - Saya memberikan kewenangan kepada Rumah Sakit untuk memberikan informasi tentang diagnostik, hasil pelayanan dan pengobatan kepada keluarga/teman yang saya tunjuk, keperluan untuk proses klaim asuransi dan atau pelaporan ke lembaga pemerintah yang berwenang",
                  },
                  {
                    no: "5",
                    materi: "KEBUTUHAN PRIVASI",
                    penjelasan:
                      "Saya membutuhkan/tidak membutuhkan privasi khusus (coret salah satu), Sebutkan jika ada permintaan ……………………… ",
                  },
                  {
                    no: "6",
                    materi: "TATA TERTIB DAN KEAMANAN",
                    penjelasan:
                      "Saya bersedia mematuhi tata tertib yang berlaku di RSUD Margono Soekarjo Saya bersedia untuk tidak mengambil gambar, video dan merekam suara di seluruh lingkungan rumah sakit tanpa seijin pihak RSUD Margono Soekarjo.",
                  },
                  {
                    no: "7",
                    materi: "KEAMANAN BARANG BERHARGA",
                    penjelasan:
                      "Saya memahami bahwa Rumah Sakit tidak bertanggungjawab atas kehilangan barang-barang berharga milik saya selama dalam perawatan di Rumah Sakit dan hal tersebut menjadi tanggungjawab saya sepenuhnya,",
                  },
                  {
                    no: "8",
                    materi: "PEMELIHARAAN FASILITAS RUMAH SAKIT",
                    penjelasan:
                      "Saya mengerti dan memahami jika terjadi kerusakan dan kehilangan yang disebabkan oleh pasien maka menjadi tanggungjawab pasien termasuk fasilitas umum dan fasilitas/ alat medis.",
                  },
                  {
                    no: "9",
                    materi: "TANGGUNG JAWAB FINANSIAL",
                    penjelasan:
                      "Saya mengijinkan Rumah Sakit untuk menagih pembayaran saya (termasuk kepada asuransi atau penjamin lain) atas seluruh pelayanan medis, teknis dan fasilitas yang saya terima, lebih lanjut saya mengijinkan Rumah Sakit untuk memberikan informasi dari rekam medis yang diperlukan untuk kepentingan pembayaran. Jika asuransi atau penjamin tidak menanggung sebagian atau keseluruhan tagihan, saya pribadi akan bertanggungjawab untuk biaya yang tidak ditanggung. Saya mengerti bahwa setiap pertanggungan kesehatan terhadap saya sesuai dengan polis asuransi atau benefit yang saya miliki. Jika saya tidak diasuransikan maka saya setuju untuk bertanggungjawab secara penuh atas pembiayaan yang timbul dari pelayanan kesehatan yang saya terima.",
                  },
                ]}
              >
                <TableHeader fontSize={"10"}>
                  <TableCell
                    weighting={0.05}
                    style={{ backgroundColor: "#f0f0f0" }}
                  >
                    <Text style={{ textAlign: "center" }}>NO</Text>
                  </TableCell>
                  <TableCell
                    weighting={0.25}
                    style={{ backgroundColor: "#f0f0f0" }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      MATERI PENJELASAN
                    </Text>
                  </TableCell>
                  <TableCell
                    weighting={0.7}
                    style={{ backgroundColor: "#f0f0f0" }}
                  >
                    <Text style={{ textAlign: "center" }}>ISI MATERI</Text>
                  </TableCell>
                </TableHeader>
                <TableBody fontSize={"9"}>
                  <DataTableCell
                    style={{ textAlign: "center" }}
                    weighting={0.05}
                    getContent={(r) => r.no}
                  />
                  <DataTableCell
                    weighting={0.25}
                    getContent={(r) => r.materi}
                  />
                  <DataTableCell
                    // style={{ margin: 5 }}
                    weighting={0.7}
                    getContent={(r) => r.penjelasan}
                  />
                </TableBody>
              </Table>
              <Table>
                <TableHeader>
                  <TableCell weighting={0.55}>
                    <Text style={{ fontSize: "10" }}>
                      Dengan ini saya menyatakan bahwa saya telah menerangkan
                      hal hal diatas secara benar dan jelas, memberikan
                      kesempatan untuk bertanya dan berdiskusi. Purwokerto,
                      Tanggal : {tanggal}
                    </Text>
                  </TableCell>
                  <TableCell weighting={0.45}>
                    <Text style={{ fontSize: "9", textAlign: "center" }}>
                      Nama dan Tanda Tangan Petugas
                    </Text>
                    {/* <Image src={gambar} /> */}
                    <Text
                      style={{
                        fontSize: "9",
                        textAlign: "center",
                        marginTop: 50,
                      }}
                    >
                      {petugas}
                    </Text>
                  </TableCell>
                </TableHeader>
              </Table>
              <Table>
                <TableHeader>
                  <TableCell weighting={0.55}>
                    <Text style={{ fontSize: "10" }}>
                      Dengan ini saya menyatakan bahwa saya telah memahami dan
                      mengerti hal hal diatas secara benar dan jelas.
                      Purwokerto, Tanggal : {tanggal}
                    </Text>
                  </TableCell>
                  <TableCell weighting={0.45}>
                    <Text style={{ fontSize: "9", textAlign: "center" }}>
                      Nama dan Tanda Tangan Pasien
                    </Text>
                    <Image
                      style={{
                        width: "50%",
                        // height: "200px",
                        // alignItems: "center",
                        margin: "auto",
                      }}
                      src={`data:image/png;base64,${tandatangan}`}
                    />
                    <Text
                      style={{
                        fontSize: "9",
                        textAlign: "center",
                        marginTop: 50,
                      }}
                    >
                      {curpas.namaPasien}
                    </Text>
                  </TableCell>
                </TableHeader>
              </Table>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Fragment>
  );
};

export default FormGeneralConsent;
