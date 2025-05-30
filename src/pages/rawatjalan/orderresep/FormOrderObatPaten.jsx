import React, { useState } from 'react'
import { Transfer, Table, Tag, InputNumber, Select, Checkbox } from 'antd';
import difference from 'lodash/difference';

const { Option } = Select;

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll={false}>
        {({
            direction,
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
            disabled: listDisabled,
        }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;

            const rowSelection = {
                getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .filter(item => !item.disabled)
                        .map(({ key }) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys, selected);
                },
                onSelect({ key }, selected) {
                    onItemSelect(key, selected);
                },
                selectedRowKeys: listSelectedKeys,
            };

            return (
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredItems}
                    size="small"
                    style={{ pointerEvents: listDisabled ? 'none' : null }}
                // onRow={({ key, disabled: itemDisabled }) => ({
                //     onClick: () => {
                //         if (itemDisabled || listDisabled) return;
                //         onItemSelect(key, !listSelectedKeys.includes(key));
                //     },
                // })}
                />
            );
        }}
    </Transfer>
);

const mockTags = ['Kapsul', 'Tablet', 'PCS', 'Botol'];

const mockData = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        code: `ABC${i + 10}`,
        title: `Barang ${i + 1}`,
        stock: `${i + 10}`,
        gudang: `${i + 1000}`,
        order: `${i + 10}`,
        // disabled: i % 4 === 0,
        tag: mockTags[i % 4],
    });
}

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const leftTableColumns = [
    {
        dataIndex: 'code',
        title: 'Kode',
    },
    {
        dataIndex: 'title',
        title: 'Nama Barang',
    },
    {
        dataIndex: 'tag',
        title: 'Satuan',
        render: tag => <Tag>{tag}</Tag>,
    },
    {
        dataIndex: 'stock',
        title: 'Stock',
    },
    {
        dataIndex: 'gudang',
        title: 'Stock Gudang',
    },
    {
        dataIndex: 'order',
        title: 'Jumlah Order',
    },
];
const rightTableColumns = [
    {
        dataIndex: 'title',
        title: 'Name',
    },
    {
        dataIndex: 'quantity',
        title: 'Quantity',
        render: () => (<div><InputNumber size='small' /></div>)
    },
    {
        dataIndex: 'tag',
        title: 'Satuan',
        render: tag => <Tag>{tag}</Tag>,
    },
    {
        dataIndex: 'aturan',
        title: 'Aturan Pakai',
        render: () => (
            <div>
                <Select size='small' style={{ width: '100%' }}>
                    <Option value="1x">1 x Sehari</Option>
                    <Option value="2x">2 x Sehari</Option>
                    <Option value="3x">3 x Sehari</Option>
                </Select>
            </div>)
    },
    {
        dataIndex: 'standar',
        title: 'Standar',
        render: () => (
            <div>
                <Checkbox />
            </div>
        )
    },
];

const FormOrderObatPaten = () => {
    const [targetKeys, setTargetKeys] = useState([])
    const onChange = (e) => {
        setTargetKeys(e);
    }
    return (
        <>
            <TableTransfer
                titles={['Obat Jadi', 'Order']}
                dataSource={mockData}
                targetKeys={targetKeys}
                showSearch={true}
                onChange={onChange}
                filterOption={(inputValue, item) =>
                    item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
                }
                leftColumns={leftTableColumns}
                rightColumns={rightTableColumns}
            />
        </>
    );
}

export default FormOrderObatPaten;
