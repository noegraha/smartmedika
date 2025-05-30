import { Button, Input, Table } from "antd";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Antal = () => {
  const [registrasiIdToMove, setRegistrasiIdToMove] = useState(""); // State untuk menyimpan registrasiId yang akan dipindahkan
  const [selectedbedId, setSelectedbedId] = useState(""); // State untuk menyimpan bedId yang dipilih
  const [selectedNoBed, setSelectedNoBed] = useState(""); // State untuk menyimpan noBed yang dipilih
  const [data, setData] = useState([
    {
      bedId: "9306.09",
      noBed: "1",
      registrasiId: "2403060988",
      pasienId: "02278994",
      namaPasien: "SITI SUMARNI, BY NY",
      namaDPJP: "TIARA NURLITA SARI, dr.Sp.A\r",
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.09",
      noBed: "10",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.09",
      noBed: "11",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.09",
      noBed: "12",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.09",
      noBed: "13",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.09",
      noBed: "14",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.09",
      noBed: "15",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.09",
      noBed: "16",
      registrasiId: "2402160014",
      pasienId: "02276404",
      namaPasien: "SUYANTI, BY.NY (B)",
      namaDPJP: "ARIADNE TIARA H,dr,MSi,MED,SPA",
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.09",
      noBed: "17",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.09",
      noBed: "18",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.09",
      noBed: "2",
      registrasiId: "2402231199",
      pasienId: "02277554",
      namaPasien: "NURFIYANTI, BY.NY",
      namaDPJP: "ARIADNE TIARA H,dr,MSi,MED,SPA",
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.09",
      noBed: "3",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.09",
      noBed: "6",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.09",
      noBed: "7",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.09",
      noBed: "8",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.09",
      noBed: "9",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "1",
      registrasiId: "2402121758",
      pasienId: "02274720",
      namaPasien: "GITA SETIANA, BY NY",
      namaDPJP: "WINDY OLIVIANY,dr.M.Sc.,Sp.A",
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.10",
      noBed: "10",
      registrasiId: "2402250074",
      pasienId: "02277741",
      namaPasien: "NUR RAENI, BY, NY",
      namaDPJP: "WINDY OLIVIANY,dr.M.Sc.,Sp.A",
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.10",
      noBed: "11",
      registrasiId: "2402140098",
      pasienId: "02276207",
      namaPasien: "NUR AENI, BY NY",
      namaDPJP: "ARIADNE TIARA H,dr,MSi,MED,SPA",
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.10",
      noBed: "12",
      registrasiId: "2402280055",
      pasienId: "02276653",
      namaPasien: "YUNARNI, BY NY",
      namaDPJP: "AGUS FITRIANTO, Dr. SpA(K)",
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.10",
      noBed: "13",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.10",
      noBed: "14",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.10",
      noBed: "15",
      registrasiId: "2401200764",
      pasienId: "02273363",
      namaPasien: "BAIQ VIRDILIA PUTRI, BY NY",
      namaDPJP: "ARIADNE TIARA H,dr,MSi,MED,SPA",
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.10",
      noBed: "16",
      registrasiId: "2402291946",
      pasienId: "02278389",
      namaPasien: "WIDIANTI, BY.NY (A)",
      namaDPJP: "AGUS FITRIANTO, Dr. SpA(K)",
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.10",
      noBed: "17",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.10",
      noBed: "18",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "19",
      registrasiId: "2403021183",
      pasienId: "02278548",
      namaPasien: "RINA WININGSIH, BY NY",
      namaDPJP: "ARIADNE TIARA H,dr,MSi,MED,SPA",
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "20",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "21",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "22",
      registrasiId: "2402061787",
      pasienId: "02275585",
      namaPasien: "SULASTRI, BY.NY (A)",
      namaDPJP: "ARIADNE TIARA H,dr,MSi,MED,SPA",
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "23",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "24",
      registrasiId: "2402291947",
      pasienId: "02278390",
      namaPasien: "WIDIANTI, BY.NY (B)",
      namaDPJP: "AGUS FITRIANTO, Dr. SpA(K)",
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "25",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "26",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "27",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "28",
      registrasiId: "2402230001",
      pasienId: "02277440",
      namaPasien: "WULANDIKA ARBIYANTI, BY  NY",
      namaDPJP: "WINDY OLIVIANY,dr.M.Sc.,Sp.A",
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "29",
      registrasiId: "2402140108",
      pasienId: "02276211",
      namaPasien: "KUSTINA, BY NY",
      namaDPJP: "ARIADNE TIARA H,dr,MSi,MED,SPA",
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "30",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "31",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "32",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "33",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "34",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: true,
    },
    {
      bedId: "9306.10",
      noBed: "5",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: false,
    },
    {
      bedId: "9306.10",
      noBed: "7",
      registrasiId: null,
      pasienId: null,
      namaPasien: null,
      namaDPJP: null,
      keterangan: null,
      extra: false,
    },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
  };

  const columns = [
    {
      title: "bedId",
      dataIndex: "bedId",
      width: "30%",
      editable: true,
    },
    {
      title: "No. Bed",
      dataIndex: "noBed",
    },
    {
      title: "Registrasi Id",
      dataIndex: "registrasiId",
    },
    {
      title: "Nama Pasien",
      dataIndex: "namaPasien",
    },
    {
      title: "DPJP",
      dataIndex: "namaDPJP",
    },
  ];

  const moveRegistrasiId = () => {
    if (selectedbedId.trim() === "" || selectedNoBed.trim() === "") {
      console.log("Harap pilih bedId dan noBed yang kosong.");
      return;
    }

    const newData = [...data];

    const selectedRegistrasiId = newData.find(
      (bed) => bed.registrasiId === registrasiIdToMove
    );

    const selectedBed = newData.find(
      (bed) => bed.bedId === selectedbedId && bed.noBed === selectedNoBed
    );

    if (selectedRegistrasiId && selectedBed) {
      const tempRegistrasiId = selectedBed.registrasiId;
      const tempPasienId = selectedBed.pasienId;
      const tempNamaPasien = selectedBed.namaPasien;
      const tempNamaDPJP = selectedBed.namaDPJP;
      const tempKeterangan = selectedBed.keterangan;

      selectedBed.registrasiId = selectedRegistrasiId.registrasiId;
      selectedBed.pasienId = selectedRegistrasiId.pasienId;
      selectedBed.namaPasien = selectedRegistrasiId.namaPasien;
      selectedBed.namaDPJP = selectedRegistrasiId.namaDPJP;
      selectedBed.keterangan = selectedRegistrasiId.keterangan;

      selectedRegistrasiId.registrasiId = tempRegistrasiId;
      selectedRegistrasiId.pasienId = tempPasienId;
      selectedRegistrasiId.namaPasien = tempNamaPasien;
      selectedRegistrasiId.namaDPJP = tempNamaDPJP;
      selectedRegistrasiId.keterangan = tempKeterangan;

      setRegistrasiIdToMove("");
      setSelectedbedId("");
      setSelectedNoBed("");

      setData(newData);
    } else {
      console.log(
        "RegistrasiId yang dipilih tidak ditemukan atau bedId dan noBed yang dipilih sudah terisi."
      );
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <Table
              size="small"
              dataSource={data}
              columns={columns}
              pagination={false}
              rowKey={(record) => record.registrasiId}
              {...provided.droppableProps}
              ref={provided.innerRef}
              components={{
                body: {
                  wrapper: DraggableBodyRow,
                  row: DraggableRow,
                },
              }}
            />
          )}
        </Droppable>
      </DragDropContext>
      <Input
        type="text"
        value={registrasiIdToMove}
        onChange={(e) => setRegistrasiIdToMove(e.target.value)}
        placeholder="Masukkan registrasiId yang akan dipindahkan"
      />
      <br />
      <Input
        type="text"
        value={selectedbedId}
        onChange={(e) => setSelectedbedId(e.target.value)}
        placeholder="Masukkan bedId yang akan dipilih"
      />
      <br />
      <Input
        type="text"
        value={selectedNoBed}
        onChange={(e) => setSelectedNoBed(e.target.value)}
        placeholder="Masukkan noBed yang akan dipilih"
      />
      <Button onClick={moveRegistrasiId}>Pindahkan registrasiId</Button>
    </div>
  );
};

// Komponen untuk membuat baris tabel dapat ditarik
const DraggableRow = ({ index, ...restProps }) => {
  return (
    <Draggable draggableId={index.toString()} index={index}>
      {(provided) => (
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          {...restProps}
        />
      )}
    </Draggable>
  );
};

// Komponen untuk membuat seluruh body tabel dapat ditarik
const DraggableBodyRow = ({ ...restProps }) => {
  return <tbody {...restProps} />;
};

export default Antal;
