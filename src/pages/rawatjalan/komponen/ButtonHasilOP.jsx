import React, { useContext, useState } from "react";
import { Modal, Button } from "antd";

const ButtonHasilOP = () => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const pasienid = sessionStorage.getItem("norm");
  return (
    <div>
      <Button size="small" onClick={() => setModal1Visible(true)}>
        Hasil OP
      </Button>
      <Modal
        closable={false}
        footer={null}
        width="800px"
        centered={true}
        visible={modal1Visible}
        onCancel={() => setModal1Visible(false)}
      >
        {pasienid}
      </Modal>
    </div>
  );
};

export default ButtonHasilOP;
