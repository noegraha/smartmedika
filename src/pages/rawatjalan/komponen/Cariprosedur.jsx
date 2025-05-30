import React, { Fragment, useContext } from 'react';
import { Table, Input } from 'antd';
import { DiagnosaContext } from '../context/Diagnosacontext';
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
const Cariprosedur = () => {
    const { prosedur, cariProsedur } = useContext(DiagnosaContext);
    const handleCari = (e) => {
        cariProsedur(e);
    }
    return (
        <div>
            <Fragment>
                
                <Search placeholder="Cari Prosedur..." onChange={(e) => handleCari(e.target.value)} />
                <Table dataSource={prosedur}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    size="small" rowKey="reg" scroll={{ y: 240 }} >
                    <Column title="Kode Diagnosa" key="reg" className="bgcolortunggu" width="90px"
                        render={(prosedur) => (
                            <span>
                                {prosedur.proceduresId}
                            </span>
                        )} />
                    {/* <Column title="PasienId" dataIndex="pasienId" key="pasienId" className="bgcolor" /> */}
                    <Column
                        title="Nama Pelayanan"
                        key="nama"
                        className="bgcolordanger1"
                        render={(prosedur) => (
                            <span>
                                {prosedur.deskripsi}
                            </span>
                        )} />
                </Table>
            </Fragment>
        </div>
    );
}

export default Cariprosedur;