import React, { useContext, useState, useEffect } from 'react';
import { Layout, Table, Typography, Checkbox } from 'antd';
import { IBSContext } from './context/IBSContext';
import { DiagnosaContext } from '../../rawatjalan/context/Diagnosacontext';
import DetailLaporanOP from './DetailLaporanOP';
import { FileTextOutlined } from '@ant-design/icons';

const { Title } = Typography;

const TabelLaporanOP = (props) => {

    const { pasienLaporanOP, cariLaporanOP, detailLaporan, detailLaporanOP } = useContext(IBSContext);
    const { getDiagnosa } = useContext(DiagnosaContext);
    const [showModal, setShowModal] = useState(false);
    const [detail, setDetail] = useState({ noreg: '', ajuan: '' });

    useEffect(() => {
        cariLaporanOP(props.tglop, props.cito);
        console.log('PROPS', props.tglop);
    }, []);

    const showM = (jadwalOperasiId) => {
        setShowModal(true);
        setDetail({ nojadwal: jadwalOperasiId });
        detailLaporanOP(jadwalOperasiId);
        getDiagnosa(' ');
        console.log('INDEXNYA', jadwalOperasiId);
    }

    const setModal = (sts) => {
        setShowModal(sts);
    }

    const columns = [
        {
            title: 'No Jadwal',
            dataIndex: 'jadwalOperasiId',
            key: 'jadwalOperasiId',
        },
        {
            title: 'Noreg',
            dataIndex: 'registrasiId',
            key: 'registrasiId',
            render: text => <b>{text}</b>,
        },
        {
            title: 'No Pasien',
            dataIndex: 'pasienId',
            key: 'pasienId',
            render: text => <b>{text}</b>,
        },
        {
            title: 'Nama',
            dataIndex: 'nama',
            key: 'nama',
            render: text => <b>{text}</b>,
        },
        {
            title: 'Ruang',
            dataIndex: 'deskRuangId',
            key: 'deskRuangId',
        },
        {
            title: 'Dx Pra-Bedah',
            dataIndex: 'deskDxPraBedah',
            key: 'deskDxPraBedah',
        },
        {
            title: 'Tindakan',
            dataIndex: 'tindakan',
            key: 'tindakan',
        },
        {
            title: 'Dokter',
            dataIndex: 'deskDokterId',
            key: 'deskDokterId',
        },
        {
            title: 'Ruang OP',
            dataIndex: 'ruangOperasi',
            key: 'ruangOperasi',
        },
        {
            title: 'No Laporan',
            dataIndex: 'laporanOperasiId',
            key: 'laporanOperasiId',
        },
        {
            title: 'Batal',
            dataIndex: 'batal',
            key: 'batal',
        }
    ];

    return (
        <Layout>
            <Table
                columns={columns}
                dataSource={pasienLaporanOP}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => showM(pasienLaporanOP[rowIndex].jadwalOperasiId)
                    }
                }}
                bordered
                title={() => <Title level={4}><FileTextOutlined /> Daftar Laporan Operasi</Title>}
                rowKey="jadwalOperasiId"
                rowClassName={(record, rowIndex) => {
                    return pasienLaporanOP[rowIndex].laporanOperasiId ? 'bgcolorterisi' : ''
                }}
                scroll={{ x: '100vh' }}
            />

            <Checkbox onChange={(e) => { console.log('CHECKBOX', e.target.checked) }}>Laboratorium Patologi Anatomi</Checkbox>
            <DetailLaporanOP showmodal={showModal} setmodal={setModal} tglop={props.tglop} cito={props.cito} />
        </Layout>
    );
}

export default TabelLaporanOP;