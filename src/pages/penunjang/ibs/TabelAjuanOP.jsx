import React, { useContext, useState, useEffect } from 'react';
import { Layout, Table, Typography } from 'antd';
import { IBSContext } from './context/IBSContext';
import DetailAjuanOP from './DetailAjuanOP';
import { SnippetsOutlined } from '@ant-design/icons';

const { Title } = Typography;

const TabelAjuanOP = (props) => {
    const { pasienAjuanOP, cariAjuanOP, detailAjuanOP, detailAjuan, cariTindakan, cariTindakanPenyerta, cariDokterSpesialis, spin } = useContext(IBSContext);
    const [showModal, setShowModal] = useState(false);
    const [detail, setDetail] = useState({ noreg: '', ajuan: '' });

    useEffect(() => {
        cariAjuanOP(props.tglop, props.cito);
        console.log('PROPS', props.tglop);
    }, []);

    const showM = (registrasiId, ajuanId) => {
        setShowModal(true);
        setDetail({ noreg: registrasiId, ajuan: ajuanId });
        detailAjuanOP(registrasiId, ajuanId);
        console.log('INDEXNYA', registrasiId, ajuanId);
        console.log('NOREG DAN AJUAN', registrasiId, ajuanId);
        cariTindakan();
        cariTindakanPenyerta();
        cariDokterSpesialis();
    }

    const cekDetail = () => {
        console.log('NOREG', detail.noreg);
        console.log('AJUAN', detail.ajuan);
        console.log(detailAjuan)
        setShowModal(false);
    }

    const setModal = (sts) => {
        setShowModal(sts);
    }

    const columns = [
        {
            title: 'No Ajuan',
            dataIndex: 'ajuanId',
            key: 'ajuanId',
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
            title: 'Tindakan',
            dataIndex: 'deskPelId',
            key: 'deskPelId',
        },
        {
            title: 'Keterangan',
            dataIndex: 'keterangan',
            key: 'keterangan',
        },
        {
            title: 'Dx Pra-Bedah',
            dataIndex: 'deskDxPraBedah',
            key: 'deskDxPraBedah',
        },
        {
            title: 'Dokter',
            dataIndex: 'deskDokterId',
            key: 'deskDokterId',
        },
        {
            title: 'No Jadwal',
            dataIndex: 'jadwalOperasiId',
            key: 'jadwalOperasiId',
        },
        {
            title: 'OP Disetujui',
            dataIndex: 'opDisetujui',
            key: 'opDisetujui',
        },
        {
            title: 'Ruang OP',
            dataIndex: 'ruangOperasi',
            key: 'ruangOperasi',
        },
        {
            title: 'Jam',
            dataIndex: 'jam',
            key: 'jam',
        },
        {
            title: 'Anestesi',
            dataIndex: 'anestesi',
            key: 'anestesi',
        },
        {
            title: 'Acceptable',
            dataIndex: 'acceptable',
            key: 'acceptable',
        }
    ];

    return (
        <Layout>

            <Table
                columns={columns}
                dataSource={pasienAjuanOP}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => showM(pasienAjuanOP[rowIndex].registrasiId, pasienAjuanOP[rowIndex].ajuanId)
                    }
                }}
                bordered
                title={() => <Title level={4}><SnippetsOutlined /> Daftar Ajuan Operasi</Title>}
                rowKey="ajuanId"
                rowClassName={(record, rowIndex) => {
                    return pasienAjuanOP[rowIndex].acceptable == 'Disetujui' ? 'bgcolordisetujui' : (pasienAjuanOP[rowIndex].acceptable == 'Ditolak' ? 'bgcolorditolak' : '')
                }}
                scroll={{ x: '100vh' }}
                loading={spin}
            />

            <DetailAjuanOP showmodal={showModal} setmodal={setModal} tglop={props.tglop} cito={props.cito} />

        </Layout>
    );
}

export default TabelAjuanOP;