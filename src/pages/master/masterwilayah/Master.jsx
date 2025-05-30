import React, { useState, useContext } from "react";
import { Table, Input, Popconfirm, Form, Typography } from "antd";
import { MasterWilayahContext } from "../context/masterwilayah/MasterWilayahContext";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const { provinsiList, insertProvinsi } = useContext(MasterWilayahContext);
  const [form] = Form.useForm();
  const [data, setData] = useState(provinsiList);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.provinsiId === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      // provinsiId: record.provinsiId,
      // provinsiNama: "",
      // status: record.status,
      ...record,
    });
    // console.log(record);
    // console.log(record.provinsiId);
    setEditingKey(record.provinsiId);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (e) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => e === item.provinsiId);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
        // console.log('ini new data sebelum', newData);
      } else {
        insertProvinsi(row);
        // console.log(row);
        setData(newData);
        // console.log('ini new data sesudah', newData);
        // console.log('ini data row', row);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      // title: "Provinsi ID",
      dataIndex: "provinsiId",
      editable: true,
    },
    {
      title: "Nama Provinsi",
      dataIndex: "provinsiNama",
      editable: true,
    },
    {
      // title: "Status",
      dataIndex: "status",
      editable: true,
    },
    {
      title: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => {
                save(record);
                // console.log(record);
              }}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Typography.Link
              onClick={cancel}
            >Cancel</Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        size="small"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={provinsiList}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};

export default EditableTable;
