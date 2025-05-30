import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Form, Col } from 'antd';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0, }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};

class TabelIntraHD extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '',
                dataIndex: 'ket',
            },
            {
                title: 'Jam',
                dataIndex: 'jam',
                editable: true,
            },
            {
                title: 'QB',
                dataIndex: 'qb',
                editable: true,
            },
            {
                title: 'VP',
                dataIndex: 'vp',
                editable: true,
            },
            {
                title: 'TMP',
                dataIndex: 'tmp',
                editable: true,
            },
            {
                title: 'UF Rate',
                dataIndex: 'ufrate',
                editable: true,
            },
            {
                title: 'Remv',
                dataIndex: 'remv',
                editable: true,
            },
            {
                title: 'Catatan',
                dataIndex: 'catatan',
                width: '30%',
                editable: true,
            },
            // {
            //     title: 'operation',
            //     dataIndex: 'operation',
            //     render: (_, record) =>
            //         this.state.dataSource.length >= 1 ? (
            //             <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
            //                 <a>Delete</a>
            //             </Popconfirm>
            //         ) : null,
            // },
        ];
        this.state = {
            dataSource: [
                {
                    key: '0',
                    ket: 'Mulai',
                    jam: '',
                    qb: '',
                    vp: '',
                    tmp: '',
                    ufrate: '',
                    remv: '',
                    catatan: '',
                },
                {
                    key: '1',
                    ket: '½ jam',
                    jam: '',
                    qb: '',
                    vp: '',
                    tmp: '',
                    ufrate: '',
                    remv: '',
                    catatan: '',
                },
                {
                    key: '1',
                    ket: '1 jam',
                    jam: '',
                    qb: '',
                    vp: '',
                    tmp: '',
                    ufrate: '',
                    remv: '',
                    catatan: '',
                },
                {
                    key: '1',
                    ket: '2 jam',
                    jam: '',
                    qb: '',
                    vp: '',
                    tmp: '',
                    ufrate: '',
                    remv: '',
                    catatan: '',
                },
                {
                    key: '1',
                    ket: '3 jam',
                    jam: '',
                    qb: '',
                    vp: '',
                    tmp: '',
                    ufrate: '',
                    remv: '',
                    catatan: '',
                },
                {
                    key: '1',
                    ket: '4 jam',
                    jam: '',
                    qb: '',
                    vp: '',
                    tmp: '',
                    ufrate: '',
                    remv: '',
                    catatan: '',
                },
                {
                    key: '1',
                    ket: '5 jam',
                    jam: '',
                    qb: '',
                    vp: '',
                    tmp: '',
                    ufrate: '',
                    remv: '',
                    catatan: '',
                },
            ],
            // count: 2,
        };
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
        });
    };
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: '32',
            address: `London, Park Lane no. ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };
    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    };

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Col span={24}>
                    {/* <Button
                        onClick={this.handleAdd}
                        type="primary"
                        style={{
                            marginBottom: 16,
                            marginTop: 10
                        }}
                    >
                        Add a row
                    </Button> */}
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                    />
                </Col>
            </div>
        );
    }
}

export default TabelIntraHD;

// .editable-cell {
//   position: relative;
// }

// .editable-cell-value-wrap {
//   padding: 5px 12px;
//   cursor: pointer;
// }

// .editable-row:hover .editable-cell-value-wrap {
//   padding: 4px 11px;
//   border: 1px solid #d9d9d9;
//   border-radius: 4px;
// }

// [data-theme='dark'] .editable-row:hover .editable-cell-value-wrap {
//   border: 1px solid #434343;
// }