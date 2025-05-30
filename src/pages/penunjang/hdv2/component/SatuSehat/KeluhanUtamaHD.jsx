import { Empty, Table } from "antd";
import Column from "antd/es/table/Column";
import React, { useContext } from "react";
import { AssesmentRIContext } from "../../../../rawatinap/context/AssesmentRIContext";

const KeluhanUtamaHD = () => {
  const { tablekeluhan } = useContext(AssesmentRIContext);

  return (
    <div>
      <Table
        bordered
        locale={{
          emptyText: <Empty description="Data Keluhan Kosong" />,
        }}
        pagination={false}
        dataSource={tablekeluhan}
        size="small"
        rowKey="reg"
        style={{ marginBottom: "10px" }}
      >
        <Column
          title="Keluhan"
          key="No"
          render={(tablekeluhan) => <span>{tablekeluhan.keluhan}</span>}
        />
        <Column
          title="Karakterisitik"
          key="tgl"
          render={(tablekeluhan) => <span>{tablekeluhan.karakteristik}</span>}
        />
        <Column
          title="Catatan"
          key="tgl"
          render={(tablekeluhan) => <span>{tablekeluhan.keluhanLain}</span>}
        />
      </Table>
    </div>
  );
};

export default KeluhanUtamaHD;
