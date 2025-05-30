import { Tabs } from "antd";
import React from "react";
import InsertBill from "./InsertBill";
import DeleteBilling from "./DeleteBilling";

const Billing = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Tambah Billing",
      children: <InsertBill />,
    },
    {
      key: "2",
      label: "Hapus Billing",
      children: <DeleteBilling />,
    },
  ];
  return (
    <div>
      <Tabs
        type="card"
        size="small"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default Billing;
