import React, { Fragment, useContext } from 'react';
import { Table, Input } from 'antd';
import { DiagnosaContext } from '../../context/Diagnosacontext';
const { Column } = Table;
const { Search } = Input;
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};

// const columns = [
//     {
//         title:'Kode Diagnosa',
//         dataIndex:'reg',
//         key:'reg',
//         className:'bgcolortunggu',
//         width:'90px',
//         render: (diagnosa) => (
//             <span>
//                 {diagnosa.diagnosisId}
//             </span>
//         )
//     },
//     {
//         title:'Nama Pelayanan',
//         dataIndex:'nama',
//         key:'nama',
//         className:'bgcolordanger1',
//         render: (diagnosa) => (
//             <span>
//                 {diagnosa.deskripsi}
//             </span>
//         )
//     },
//   ];
const Caridiagnosa = () => {
    const { diagnosa, cariDiagnosa } = useContext(DiagnosaContext);
    const handleCari = (e) => {
        cariDiagnosa(e);
    }
    return (
        <div>
            <Fragment>

                <Search placeholder="Cari Diagnosa..." onChange={(e) => handleCari(e.target.value)} />
                <Table dataSource={diagnosa}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    size="small" scroll={{ y: 240 }}>
                    <Column
                        title="Kode Diagnosa"
                        key="reg"
                        className="bgcolortunggu"
                        width="90px"
                        render={(diagnosa) => (
                            <span>
                                {diagnosa.diagnosisId}
                            </span>
                        )} />
                    <Column
                        title="Nama Pelayanan"
                        key="nama"
                        className="bgcolordanger1"
                        render={(diagnosa) => (
                            <span>
                                {diagnosa.deskripsi}
                            </span>
                        )} />
                </Table>
            </Fragment>
        </div>
    );
}

export default Caridiagnosa;