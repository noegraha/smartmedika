import React, { Fragment, useContext } from 'react'
import { PDFViewer, Document, Page, View, Image, Text } from '@react-pdf/renderer';
import { Table, TableBody, TableHeader, TableCell, DataTableCell } from '@david.kucsai/react-pdf-table';
import LogoJateng from '../../../assets/img/jateng2.png';
import { PasienContext } from '../../rawatjalan/context/PasienContext';
import { HasilRadiologiContext } from '../context/HasilRadiologiContext';

const Formhasillabklinik = () => {
    const { curpasRI } = useContext(PasienContext);
    const { hasillab } = useContext(HasilRadiologiContext);

    return (
        <Fragment>
            <PDFViewer width="100%" height="750px" style={{}}>
                <Document>
                    <Page size="A4">
                        <View style={{ margin: 30, marginBottom: 0 }}>
                            <Table>
                                <TableHeader textAlign={"center"}>
                                    <TableCell weighting={0.15}>
                                        <Image src={LogoJateng} style={{ width: '100%', height: 'auto' }} />
                                    </TableCell>
                                    <TableCell weighting={0.85}>
                                        <Text style={{ fontSize: '14' }}>PEMERINTAH PROVINSI JAWA TENGAH</Text>
                                        <Text style={{ fontSize: '18' }}>RSUD Prof. Dr. Margono Soekarjo Purwokerto</Text>
                                        <Text style={{ fontSize: '18' }}>Instalasi Rawat Jalan</Text>
                                        <Text style={{ fontSize: '8' }}>Jl. Dr. Gumbreg No.1, Kebontebu, Berkoh, Kec. Purwokerto Sel., Kabupaten Banyumas, Jawa Tengah Kode Pos : 53146</Text>
                                        <Text style={{ fontSize: '10', fontWeight: 'bold' }}>Penanggung Jawab : </Text>
                                    </TableCell>
                                </TableHeader>
                            </Table>
                        </View>

                        <View style={{ marginLeft: 30, marginRight: 30, marginTop: 5 }}>
                            <Table>
                                <TableHeader fontSize={'10'}>
                                    <TableCell weighting={0.15} style={{ fontWeight: '900' }}>
                                        <Text>Nama </Text>
                                        <Text>Tanggal Lahir </Text>
                                        <Text>Jns Kelamin </Text>
                                        <Text>No. Pasien </Text>
                                        <Text>No. Transaksi</Text>
                                        <Text>Tgl. Pelaporan</Text>
                                    </TableCell>
                                    <TableCell weighting={0.85}>
                                        <Text>{curpasRI.namaPasien}</Text>
                                        <Text>{curpasRI.tanggalLahir}</Text>
                                        <Text>{curpasRI.jenisKelamin}</Text>
                                        <Text>{curpasRI.pasienId}</Text>
                                        <Text>{curpasRI.registrasiId}</Text>
                                        <Text>{curpasRI.tanggalMasuk}</Text>
                                    </TableCell>
                                </TableHeader>
                            </Table>
                        </View>

                        <View style={{ marginLeft: 30, marginRight: 30, marginTop: 5, marginBottom: 30 }}>
                            <Table
                                data={hasillab}
                            >
                                <TableHeader textAlign={"center"} fontSize={"11"}>
                                    <TableCell weighting={0.25} style={{ backgroundColor: '#f0f0f0' }}>
                                        <Text>PEMERIKSAAN</Text>
                                    </TableCell >
                                    <TableCell weighting={0.3} style={{ backgroundColor: '#f0f0f0' }}>
                                        <Text>HASIL</Text>
                                    </TableCell>
                                    <TableCell weighting={0.15} style={{ backgroundColor: '#f0f0f0' }}>
                                        <Text></Text>
                                    </TableCell>
                                    <TableCell weighting={0.15} style={{ backgroundColor: '#f0f0f0' }}>
                                        <Text>SATUAN</Text>
                                    </TableCell>
                                    <TableCell weighting={0.15} style={{ backgroundColor: '#f0f0f0' }}>
                                        <Text>NILAI NORMAL</Text>
                                    </TableCell>
                                </TableHeader>

                                {/* <TableBody textAlign="center" fontSize={'9'}>
                                    <TableCell weighting={0.3}>
                                        <Text>-</Text>
                                    </TableCell >
                                    <TableCell weighting={0.4}>
                                        <Text>-</Text>
                                    </TableCell>
                                    <TableCell weighting={0.2}>
                                        <Text>-</Text>
                                    </TableCell>
                                    <TableCell weighting={0.3}>
                                        <Text>-</Text>
                                    </TableCell>
                                </TableBody> */}

                                <TableBody fontSize="9">
                                    <DataTableCell weighting={0.25} getContent={(r) => r.labNama} />
                                    <DataTableCell style={{ alignItems: 'center', fontWeight: 'bold' }} weighting={0.3} getContent={(r) => r.labHasil} />
                                    <DataTableCell style={{ alignItems: 'center' }} weighting={0.15} getContent={(r) => r.labMetode} />
                                    <DataTableCell style={{ alignItems: 'center' }} weighting={0.15} getContent={(r) => r.labSatuan} />
                                    <DataTableCell style={{ alignItems: 'center' }} weighting={0.15} getContent={(r) => r.labHargaNorm} />
                                </TableBody>
                            </Table>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </Fragment>
    )
}


export default Formhasillabklinik
