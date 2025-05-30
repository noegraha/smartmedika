import React, { createContext, useState } from "react";

// Membuat context
const FarmasiContext = createContext();

const FarmasiProvider = ({ children }) => {
  // State untuk data pasien
  const [curpas, setCurpas] = useState([
    {
        id: 1,
        name: "Sujono",
        apotek: "Apotek 1",
        detail: { umur: 30, gender: "L", alamat: "Alamat A" },
    },
    { id: 2, name: "Pasien B", apotek: "Apotek 2", data:"Apalah" },
    { id: 3, name: "Pasien C", apotek: "Apotek 1", data:"Apalah" },
    { id: 4, name: "Pasien D", apotek: "Apotek 2", data:"Apalah" },
  ]);

  // State untuk apotek yang dipilih
  const [selectedApotek, setSelectedApotek] = useState("");

   // Tambahkan state untuk menyimpan pasien yang dipilih
   const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <FarmasiContext.Provider
    value={{
      curpas,
      setCurpas,
      selectedApotek,
      setSelectedApotek,
      selectedPatient,
      setSelectedPatient,
    }}
  >
    {children}
  </FarmasiContext.Provider>
  );
};

export { FarmasiContext, FarmasiProvider };
