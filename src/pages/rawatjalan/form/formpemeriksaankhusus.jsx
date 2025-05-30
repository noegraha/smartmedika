import React, { useContext } from "react";
import Polianak from "../pemeriksaankhusus/polianak/polianak";
import PoliTht from "../pemeriksaankhusus/politht/PoliTht";
// import Polijantung from "../pemeriksaankhusus/polijantung/Polijantung";
import Polidalam from "../pemeriksaankhusus/polidalam/Polidalam";
import Polimata from "../pemeriksaankhusus/polimata/Polimata";
import Polisaraf from "../pemeriksaankhusus/polisaraf/Polisaraf";
import { PasienContext } from "../context/PasienContext";
import Poligigi from "../pemeriksaankhusus/poligigi/poligigi";
import { Card, Divider } from "antd";
// import Polikebidanan from "../pemeriksaankhusus/polikebidanan/Polikebidanan";
import FormPemeriksaanLain from "../pemeriksaankhusus/FormPemeriksaanLain";
import PemeriksaanJantung from "../pemeriksaankhusus/polijantung/PemeriksaanJantung";
import ButtonHistoryTindakan from "../pemeriksaankhusus/ButtonHistoryTindakan";

const Formpemeriksaankhusus = () => {
  const { ruangasal } = useContext(PasienContext);
  return (
    <Card
      title="Pemeriksaan Khusus"
      size="small"
      headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
      style={{
        borderWidth: "2px",
        borderColor: "darkgray",
        borderRadius: "4px",
      }}
      extra={<ButtonHistoryTindakan />}
    >
      <FormPemeriksaanLain />
      <Divider />
      {ruangasal === "9110" || ruangasal === "9167" ? <Poligigi /> : <></>}
      {ruangasal === "9107" || ruangasal === "9165" ? <Polianak /> : <></>}
      {ruangasal === "9111" || ruangasal === "9168" ? <PoliTht /> : <></>}
      {ruangasal === "9101" || ruangasal === "9151" ? <Polidalam /> : <></>}
      {ruangasal === "9109" || ruangasal === "9166" ? <Polimata /> : <></>}
      {ruangasal === "9113" || ruangasal === "9170" ? <Polisaraf /> : <></>}
      {ruangasal === "9119" || ruangasal === "9176" || ruangasal === "9146" ? (
        <Polianak />
      ) : (
        <></>
      )}
      {ruangasal === "9114" || ruangasal === "9171" ? (
        <PemeriksaanJantung />
      ) : (
        <></>
      )}
    </Card>
  );
};

export default Formpemeriksaankhusus;
