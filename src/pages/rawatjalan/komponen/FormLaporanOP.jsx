import React, { useContext, useState } from "react";
import Iframe from "react-iframe";
import { Row, Col, Tree, Typography, Space, Spin } from "antd";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { HasilLabContext } from "../context/HasilLabContext";
const { Text, Title } = Typography;
const { DirectoryTree } = Tree;
const FormViewLaporanOp = () => {
  const norm = sessionStorage.getItem("norm");
  const namaPasien = sessionStorage.getItem("namaPasienRawat");
  const [keySelectedOp, setkeySelectedOp] = useState("");
  const { listOpByPasienId } = useContext(HasilLabContext);
  const { getPrintHasilOp, printHasilOp, loadDelay, setloadDelay } =
    useContext(PrintOutContext);

  return (
    <div>
      <Spin spinning={loadDelay}>
        <Row>
          <Col span={24}>
            {/* <Title level={4}>Data RM 02 Pasien</Title> */}
            <Text keyboard>Data Hasil Operasi Pasien</Text>
          </Col>
          <Col span={3}>
            <Space direction="vertical">
              <Title level={3} style={{ marginBottom: "0", marginTop: "0" }}>
                {" "}
                {namaPasien}
              </Title>
              <Text code style={{ marginBottom: "0", marginTop: "0" }}>
                {norm}
              </Text>
              <DirectoryTree
                // expandedKeys={[keyExpandOp]}
                selectedKeys={[keySelectedOp]}
                // showLine
                // defaultExpandAll
                // switcherIcon={<DownOutlined />}
                onSelect={(e) => {
                  if (e[0].search("OP") > 0) {
                    setloadDelay(true);
                    getPrintHasilOp(norm, e[0]);
                    setkeySelectedOp(e[0]);
                  } else {
                    setloadDelay(true);
                    getPrintHasilOp(
                      norm,
                      listOpByPasienId[
                        listOpByPasienId
                          .map((c) => c.registrasiId)
                          .indexOf(e[0])
                      ].listLink[
                        listOpByPasienId[
                          listOpByPasienId
                            .map((c) => c.registrasiId)
                            .indexOf(e[0])
                        ].listLink.length - 1
                      ].laporanOperasiId
                    );
                    // setkeyExpandOp(e[0]);
                    setkeySelectedOp(
                      listOpByPasienId[
                        listOpByPasienId
                          .map((c) => c.registrasiId)
                          .indexOf(e[0])
                      ].listLink[
                        listOpByPasienId[
                          listOpByPasienId
                            .map((c) => c.registrasiId)
                            .indexOf(e[0])
                        ].listLink.length - 1
                      ].laporanOperasiId
                    );
                  }
                  // e[0].search("OP") > 0 ?
                  //     getPrintHasilOp(curpas.pasienId, e[0]) :
                  //     getPrintHasilOp(curpas.pasienId, listOpByPasienId[listOpByPasienId.map(c => (
                  //         (c.registrasiId)
                  //     )).indexOf(e[0])].listLink[listOpByPasienId[listOpByPasienId.map(c => (
                  //         (c.registrasiId)
                  //     )).indexOf(e[0])].listLink.length - 1].laporanOperasiId)
                }}
                treeData={listOpByPasienId.map((b) => ({
                  title: b.registrasiId,
                  key: b.registrasiId,
                  children: b.listLink.map((c) => ({
                    title: c.laporanOperasiId,
                    key: c.laporanOperasiId,
                  })),
                }))}
              />
            </Space>
          </Col>
          <Col span={21}>
            <Iframe
              onLoad={() => {
                setloadDelay(false);
              }}
              url={printHasilOp}
              width="100%"
              height="750px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          </Col>
        </Row>

        {/* <Select
          value={layanan}
          dataSource={hasilradiologi}
          showSearch
          style={{ width: 250 }}
          placeholder="Pilih layanan..."
          optionFilterProp="children"
          onChange={handleCariSelect}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {hasilradiologi.map((d) => (
            <Option key={d.UrlFoto}>{d.Layanan}</Option>
          ))}
        </Select> */}
      </Spin>
    </div>
  );
};

export default FormViewLaporanOp;
