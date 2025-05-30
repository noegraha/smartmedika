import { Button } from "antd";
import React, { useContext } from "react";
import { PoliGigiContext } from "../../../context/pemeriksaancontext/PoliGigiContext";
import "./Odontogram.css";
import Teeth from "./Teeth";

const Odontogram = () => {
  const { insertOdontogram } = useContext(PoliGigiContext);
  const gigi = [];
  let odontogramState = {};

  const handleToothUpdate = (id, toothState) => {
    console.log({ gigi: id, toothState });
    odontogramState[id] = toothState;
    gigi.push({ gigi: id.toString(), toothState });
  };
  const data = {
    pasienId: "02189745",
    elemen: "-",
    spesialis: gigi,
    diagnosa: "karies",
    terapi: "cabut",
    isAnak: false,
    clientHost: "MACPC",
    dateEntry: "2022-03-23T06:42:38.669Z",
    clientIP: "182.168.0.235",
  };

  const save = () => {
    console.log("gigi", data);
    insertOdontogram(data);
  };
  return (
    <div>
      <div className="Odontogram">
        <svg version="1.1" height="100%" width="100%">
          <Teeth
            start={18}
            end={11}
            x={0}
            y={0}
            handleChange={handleToothUpdate}
          />
          <Teeth
            start={21}
            end={28}
            x={210}
            y={0}
            handleChange={handleToothUpdate}
          />

          <Teeth
            start={55}
            end={51}
            x={75}
            y={40}
            handleChange={handleToothUpdate}
          />
          <Teeth
            start={61}
            end={65}
            x={210}
            y={40}
            handleChange={handleToothUpdate}
          />

          <Teeth
            start={85}
            end={81}
            x={75}
            y={80}
            handleChange={handleToothUpdate}
          />
          <Teeth
            start={71}
            end={75}
            x={210}
            y={80}
            handleChange={handleToothUpdate}
          />

          <Teeth
            start={48}
            end={41}
            x={0}
            y={120}
            handleChange={handleToothUpdate}
          />
          <Teeth
            start={31}
            end={38}
            x={210}
            y={120}
            handleChange={handleToothUpdate}
          />
        </svg>
      </div>
      <Button onClick={save} type="primary">
        Simpan
      </Button>
    </div>
  );
};

export default Odontogram;
