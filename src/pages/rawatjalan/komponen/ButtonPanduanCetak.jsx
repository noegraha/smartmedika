import { Button, Drawer, Image } from "antd";
import React, { useState } from "react";

const ButtonPanduanCetak = () => {
  const [open, setOpen] = useState(false);
  const binaryImage1 = require("../../../assets/img/Update4.png");
  const binaryImage2 = require("../../../assets/img/Update5.png");

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Panduan Cetak Surat Kontrol</Button>
      <Drawer
        title="Panduan Cetak Surat Kontrol"
        placement="left"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
        key="left"
        width={"30%"}
      >
        <p>
          1. Pasien yang telah dibuat nomor rencana surat kontrol, akan muncul
          tombol cetak.
        </p>
        <p>2. Klik pada tombol cetak.</p>
        <Image src={binaryImage1} />
        <p>
          3. Akan muncul preview cetak pada layar. Atur{" "}
          <b>Destination Printer</b> yang akan digunakan. Pada{" "}
          <b>More Settings</b> yang perlu disesuaikan adalah <b>Paper size</b>{" "}
          menggunakan <b>A4</b> dan untuk Options <b>Header dan Footer</b> untuk
          di un-check. Jangan lupa untuk menyesuaikan printer yang digunakan.
        </p>
        <Image src={binaryImage2} />

        <p>
          4. Setelah setting selesai klik tombol cetak untuk mencetak surat
          kontrol. Setting cukup diperlukan sekali jika tidak ada perubahan.
        </p>
      </Drawer>
    </div>
  );
};

export default ButtonPanduanCetak;
