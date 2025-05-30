import { Button, Result } from "antd";
import React from "react";

const MainFarmasi = () => {
  const handleBackToHome = () => {
    // Navigasi ke halaman utama atau tindakan lain
    window.location.href = "/";
  };
  return (
    <div>
      <Result
        status="warning"
        title="Halaman Sedang Dalam Pengembangan"
        subTitle="Kami sedang bekerja keras untuk segera menyelesaikannya. Terima kasih atas kesabaran Anda."
        extra={
          <Button type="primary" onClick={handleBackToHome}>
            Kembali ke Beranda
          </Button>
        }
      />
    </div>
  );
};

export default MainFarmasi;
