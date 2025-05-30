import { Tabs } from "antd";
import React from "react";
import ResikoLukaDecubitus from "./ResikoLukaDecubitus";
import Batuk from "./Batuk";
import Gizi from "./Gizi";
import Gastro from "./Gastro";
import KapasitasFungsi from "./KapasitasFungsi";

const Skrining = () => {
  const items = [
    {
      label: "Risiko Luka Decubitus",
      key: "1",
      children: <ResikoLukaDecubitus />,
    },
    {
      label: "Batuk",
      key: "2",
      children: <Batuk />,
    },
    {
      label: "Gizi",
      key: "3",
      children: (
        <>
          <Gizi />
          <Gastro />
          <KapasitasFungsi />
        </>
      ),
    },
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

export default Skrining;
