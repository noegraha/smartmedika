import { Button, Space, Table, Popover, Row, Col, Input } from "antd";
import React, { useContext, useState } from "react";
import { MasterWilayahContext } from "../context/masterwilayah/MasterWilayahContext";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
const { Column } = Table;

const MasterProvinsi = () => {
  const { provinsiList } = useContext(MasterWilayahContext);
  const [page, setPage] = useState(1);
  const [namaEdit, setnamaEdit] = useState("");
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const Popup = () =>
    visible && (
      <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
        <div>
          <Row>
            <Col span={12}>
              <Input
                type="text"
                value={namaEdit}
                style={{ width: "100%" }}
                onChange={(e) => {
                  setnamaEdit(e.target.value);
                }}
              />
            </Col>
            <Col span={12}>
              <Space>
                <Button
                  type="link"
                  // color='green'
                  onClick={() => {
                    console.log({
                      provinsiId: provinsiList.provinsiId,
                      provinsiNama:
                        namaEdit === "" ? provinsiList.provinsiNama : namaEdit,
                      status: true,
                    });
                  }}
                  size="small"
                >
                  <CheckOutlined />
                </Button>
                <Button
                  type="link"
                  onClick={() => setVisible(false)}
                  size="small"
                >
                  <CloseOutlined />
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      </ul>
    );

  return (
    <div>
      <Table
        dataSource={provinsiList}
        bordered
        pagination={true}
        size="small"
        // onRow={(record, rowIndex) => {
        //   return {
        //     onContextMenu: (event) => {
        //       event.preventDefault();
        //       if (!visible) {
        //         document.addEventListener(`click`, function onClickOutside() {
        //           setVisible(false);
        //           document.removeEventListener(`click`, onClickOutside);
        //         });
        //       }
        //       // setDesaId(record.desaId);
        //       // setKecamatanId(record.kecamatan.kecamatanId);
        //       // setNamaDesa(record.desaNama);
        //       setVisible(true);
        //       setX(event.clientX);
        //       setY(event.clientY); // right button click row
        //     },
        //   }
        // }
        // }
        // rowClassName={(record, rowIndex) =>
        //     rowIndex === warnaRow ? "warnacolompilihtable" : null
        // }
      >
        <Column
          title="No"
          key="noorder"
          render={(text, record, index) => (
            <span>{(page - 1) * 10 + index + 1}</span>
          )}
        />
        <Column
          title="Kode Provinsi"
          key="reg"
          className="tabeltabel"
          render={(provinsiList) => (
            <span
              onClick={(event) => {
                event.preventDefault();
                // if (!visible) {
                //   document.addEventListener(`click`, function onClickOutside() {
                //     setVisible(false);
                //     document.removeEventListener(`click`, onClickOutside);
                //   });
                // }
                setVisible(true);
                setX(event.clientX);
                setY(event.clientY); // right button click row
              }}
            >
              {provinsiList.provinsiId}
            </span>
          )}
        />
        <Column
          title="Deskripsi"
          key="reg"
          className="tabeltabel"
          render={(provinsiList) => (
            <Popover
              size="small"
              placement="bottomRight"
              content={
                <div>
                  <Row>
                    <Col span={12}>
                      <Input
                        type="text"
                        value={
                          namaEdit === "" ? provinsiList.provinsiNama : namaEdit
                        }
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          setnamaEdit(e.target.value);
                        }}
                      />
                    </Col>
                    <Col span={12}>
                      <Space>
                        <Button
                          type="link"
                          // color='green'
                          onClick={() => {
                            console.log({
                              provinsiId: provinsiList.provinsiId,
                              provinsiNama:
                                namaEdit === ""
                                  ? provinsiList.provinsiNama
                                  : namaEdit,
                              status: true,
                            });
                          }}
                          size="small"
                        >
                          <CheckOutlined />
                        </Button>
                        {/* <Button
                          type='link'
                          // onClick={() => props.klikDelMonHd(index)}
                          size="small">
                          <CloseOutlined />
                        </Button> */}
                      </Space>
                    </Col>
                  </Row>
                </div>
              }
              trigger="click"
            >
              <span>{provinsiList.provinsiNama}</span>
            </Popover>
          )}
        />
        <Column
          title="Status"
          key="reg"
          className="tabeltabel"
          render={(provinsiList) => (
            <span>{provinsiList.status ? "Y" : "T"}</span>
          )}
        />
      </Table>
      <Popup />
    </div>
  );
};

export default MasterProvinsi;
