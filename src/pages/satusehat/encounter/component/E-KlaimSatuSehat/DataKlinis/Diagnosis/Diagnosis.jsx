import { Tabs } from "antd";
import React from "react";
import Primary from "./Primary";
import Secondary from "./Secondary";
import Patch from "./Patch";

const Diagnosis = () => {
  const items = [
    {
      label: "Primary",
      key: "1",
      children: <Primary />,
    },
    {
      label: "Secondary",
      key: "2",
      children: <Secondary />,
    }
    // {
    //   label: "Patch",
    //   key: "3",
    //   children: <Patch />,
    // },
  ];
  return (
    <div>
      <Tabs
        // onChange={onChange}
        type="card"
        items={items}
      />
    </div>
  );
};

export default Diagnosis;
