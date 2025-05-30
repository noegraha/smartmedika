import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

const AccessDenied = () => {
  const history = useHistory();

  const handleBackHome = () => {
    history.push("/"); // arahkan ke home atau route lain yang diizinkan
  };

  return (
    <Result
      status="403"
      title="403 - Akses Ditolak"
      subTitle="Maaf, Anda tidak memiliki izin untuk mengakses halaman ini."
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Kembali ke Beranda
        </Button>
      }
    />
  );
};

export default AccessDenied;
