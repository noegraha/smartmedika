import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Select,
  Input,
  Row,
  Col,
  Checkbox,
  Button,
  Table,
  Popconfirm,
  InputNumber,
  Modal,
  message,
  Drawer,
  AutoComplete,
  Space,
  Tag,
  Tooltip,
  Spin,
  Radio,
  Popover,
  Typography,
  Alert,
} from "antd";
import { PasienContext } from "../context/PasienContext";
import { useContext } from "react";
import { ResepContext } from "./ResepContext";
// import { PlusOutlined } from "@ant-design/icons";
import { PelayananContext } from "../context/Pelayanancontext";
import Draggable from "react-draggable";
import RiwayatOrder from "./RiwayatOrder";
import { Prompt } from "react-router-dom";
import {
  DeleteFilled,
  EditFilled,
  QuestionCircleTwoTone,
  WarningTwoTone,
} from "@ant-design/icons";
const { Option } = Select;
const { Column } = Table;
const { Text } = Typography;
const { Search } = Input;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const formItemLayout2 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const formItemLayout3 = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};
const draggleRef = React.createRef();

//Form Order Resep
const FormOrderResep = () => {
  const RsLokasiPenunjang = sessionStorage.getItem("RSMana");
  const { curpas, apotikrj, ruangasal } = useContext(PasienContext);
  const { dokterall } = useContext(PelayananContext);
  const {
    getBarangRinci,
    listOrder,
    insertOrder,
    // order,
    setOrder,
    getBarang,
    barang,
    getBarangDetail,
    // patenbarangdetail,
    // patennamabarang,
    // setPatenNamaBarang,
    // patenharga,
    // setPatenHarga,
    // patensatuan,
    // setPatenSatuan,
    // racikbarangdetail,
    // racikharga,
    // setRacikHarga,
    // raciknamabarang,
    // setRacikNamaBarang,
    // raciksatuan,
    // setRacikSatuan,
    kodebarang,
    setKodeBarang,
    aturanpakai,
    getAturanPakai,
    listorder,
    detailOrder,
    items,
    setItems,
    itemspaten,
    setItemsPaten,
    unitorder,
    setUnitOrder,
    masterjnsracikan,
    jumlah,
    // setQuantity,
    aturan,
    // setAturan,
    // retriksi,
    setRetriksi,
    // maxorderobat,
    // kekuatan,
    setMaxOrderObat,
    setKekuatan,
    // patenmarginprofit,
    nomorracik,
    setNomorRacik,
    // getBarangNama,
    // racik,
    // setRacik,
    // itemsracik,
    // setItemsRacik,
    getBarangDetailRacik,
    resepracik,
    setResepRacik,
    noOrder,
    setNoOrder,
    itemracikan,
    setItemRacikan,
    detailracik,
    setDetailracik,
    // racikmarginprofit,
    deleteOrder,
    // retriksijadi,
    barangidracik,
    setBarangIdRacik,
    jenisracikid,
    setJenisRacikId,
    quantityracikan,
    setQuantityRacikan,
    aturanpakaiidracik,
    setAturanPakaiIdRacik,
    loadingOrder,
    loadingResep,
    getBarangZatAktif,
    setKosong,
    riwayatorder,
    getRiwayatOrder,
    detailOrderHistory,
    getJnsRacikan,
  } = useContext(ResepContext);

  useEffect(() => {
    getAturanPakai();
  }, []);

  // Update data saat barang dari context berubah
  useEffect(() => {
    setFilteredBarang(barang || []); // Salin data asli ke filteredBarang
  }, [barang]);

  const inputRef = React.useRef(null);
  const inputRefDr = React.useRef(null);

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const handleFocus = (e) => e.target.select();

  //check apotik reguler abiyasa
  const checkFor = ["9113", "9114", "9105", "91A3", "91A8"];
  const hasSome = checkFor.includes(ruangasal);

  const [disabled, setDisabled] = useState(true);
  const [modalDr, setModalDr] = useState(false);
  const [historyorder, setHistoryOrder] = useState(false);
  const [modalDaftarObat, setModalDaftarObat] = useState(false);
  const [jenis, setJenis] = useState("a");
  const [cito, setCito] = useState(curpas.fastTrack);
  const [pelaksana, setPelaksana] = useState(
    curpas.ruangKonsul !== null ? null : curpas.dokterId
  );
  const [modalorder, setModalOrder] = useState(false);
  const namauser = sessionStorage.getItem("userId");
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const [visible, setVisible] = useState(false);
  const [spanOrder, setSpanOrder] = useState(true);
  const [spanRiwayat, setSpanRiwayat] = useState(true);
  const [warnaRow, setWarnaRow] = useState("");

  //state racik
  const [tampilracikan, setTampilRacikan] = useState(false);
  const [dosisracik, setDosisRacik] = useState(null);
  const [noracikaktif, setNoracikaktif] = useState(1);
  const [indexracik, setIndexRacik] = useState(1);

  useEffect(() => {
    // Set totals on initial render
    const newData = [...itemspaten];
    for (let index = 0; index < itemspaten.length; index++) {
      onTotal(newData, index);
    }
    setItemsPaten(newData);

    const newData2 = [...detailracik];
    for (let index = 0; index < detailracik.length; index++) {
      onTotalRacik(newData2, index);
    }
    setDetailracik(newData2);

    const newData3 = [...itemracikan];
    for (let index = 0; index < itemracikan.length; index++) {
      onTotalRacik(newData3, index);
    }

    // resepracik[noracikaktif].obatracik
    setItemRacikan(newData3);
  }, []);

  const onTotal = (data, index) => {
    data[index]["hargaTotal"] = Number(
      data[index]["quantity"] * data[index]["harga"]
    );
  };

  const onTotalRacik = (data, index) => {
    data[index]["quantity"] = Math.ceil(
      (Number(data[index]["dosis"]) / Number(data[index]["kekuatan"])) *
        Number(quantityracikan)
    );
    data[index]["hargaTotal"] =
      Number(data[index]["harga"]) *
      Math.ceil(
        (Number(data[index]["dosis"]) / Number(data[index]["kekuatan"])) *
          Number(quantityracikan)
      );
  };

  const onTampilRacikan = (e, f) => {
    getBarangZatAktif(" ", " ", e);
    console.log(resepracik[f], e);
    setTampilRacikan(true);
    setNoracikaktif(e);
    setIndexRacik(f);
    setDetailracik(resepracik[f].obatRacik);
    setQuantityRacikan(resepracik[f].quantity);
    setJenisRacikId(
      resepracik[f].jenisRacikId + "-" + resepracik[f].jenisRacikDesk
    );
    setAturanPakaiIdRacik(resepracik[f].aturanPakaiId);
    setRetriksi(null);
    setDosisRacik(null);
    setMaxOrderObat(null);
    setKekuatan(null);
    setWarnaRow(f);
    setBarangIdRacik(
      resepracik[f].obatRacik.map(
        (c) =>
          c.barangId +
          "-" +
          c.namaBarang +
          "_" +
          c.satuanId +
          "+" +
          c.hargaRwj +
          ">" +
          c.kodeSM +
          "!" +
          c.profitMargin +
          "?" +
          c.kekuatan
      )
    );
  };

  const dataorder = {
    orderId: noOrder,
    registrasiId: curpas.registrasiId,
    ruangOrderId: ruangasal,
    ruangTujuanId: unitorder,
    kelasRawatId: "A",
    totalBiaya:
      items
        .map((v) => v.hargaTotal)
        .reduce((sum, current) => sum + current, 0) +
      resepracik
        .map((v) =>
          v.obatRacik
            .map((p) => p.hargaTotal)
            .reduce((sum, current) => sum + current, 0)
        )
        .reduce((sum, current) => sum + current, 0),
    userId: namauser,
    dokterId:
      pelaksana === null
        ? curpas.ruangKonsul !== null
          ? null
          : curpas.dokterId
        : pelaksana,
    isCito: cito,
    clientHost: host,
    clientIP: ip,
    obatPaten: items,
    headerRacik: resepracik,
    isTele: curpas.telemedicine,
  };

  const onTambahRacik = () => {
    setNomorRacik(nomorracik + 1);
    setNoracikaktif("");
    setItemRacikan([]);
    setDetailracik([]);
    setBarangIdRacik([]);
    setResepRacik([
      ...resepracik,
      {
        noRacik: nomorracik.toString(),
        quantity: quantityracikan,
        jenisRacikId: jenisracikid.split("-").shift(),
        jenisRacikDesk: jenisracikid.split("-").pop(),
        aturanPakaiId: aturanpakaiidracik,
        obatRacik: itemracikan,
      },
    ]);
  };
  const [modaleditracik, setModalEditRacik] = useState(false);
  const [jenisracikedit, setJenisRacikEdit] = useState("");
  const [quantityracikedit, setQuantityRacikEdit] = useState("");
  const [aturanpakaiedit, setAturanPakaiEdit] = useState("");
  const [nomorracikedit, setNomorRacikEdit] = useState("");
  const onSetEditRacik = (e, d, f, g, h) => {
    console.log(e, d, f, g, h);
    setModalEditRacik(true);
    setNomorRacikEdit(f);
    setJenisRacikEdit(d);
    setQuantityRacikEdit(g);
    setAturanPakaiEdit(h);
  };
  const onEditRacik = (e) => {
    setModalEditRacik(false);
    setIsBlocking(true);
    const elementsIndex = resepracik.findIndex(
      (element) => element.noRacik === nomorracikedit
    );
    if (elementsIndex === -1) {
      console.log(elementsIndex);
      message.warning(elementsIndex);
    } else {
      let newArray = [...resepracik];

      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        quantity: quantityracikedit,
        jenisRacikId: jenisracikedit,
        aturanPakaiId: aturanpakaiedit,
      };
      setResepRacik(newArray);
      message.success("Berhasil diubah!");
    }
  };
  const onTambahItemRacikan = (e, f) => {
    console.log(dosisracik, quantityracikan);
    const detailRacikArray = [];
    // if (resepracik.some((el) => el.noRacik === e)) {
    for (var i = 0; i < barangidracik.length; i++) {
      const elementsIndex = detailracik.findIndex(
        (element) => element.barangId === barangidracik[i].split("-").shift()
      );
      if (elementsIndex === -1) {
        detailRacikArray.push(
          // ...detailracik,
          {
            noRacik: e,
            namaBarang: barangidracik[i].split("_").shift().split("-").pop(),
            barangId: barangidracik[i].split("-").shift(),
            quantity: Math.ceil(
              (dosisracik /
                barangidracik[i].split("?").pop().split("<").shift()) *
                quantityracikan
            ),
            satuanId: barangidracik[i].split("+").shift().split("_").pop(),
            harga: barangidracik[i].split(">").shift().split("+").pop(),
            hargaTotal:
              barangidracik[i].split(">").shift().split("+").pop() *
              Math.ceil(
                (dosisracik /
                  barangidracik[i].split("?").pop().split("<").shift()) *
                  quantityracikan
              ),
            dosis: dosisracik,
            kekuatan: barangidracik[i].split("?").pop().split("<").shift(),
            kodeSM: barangidracik[i].split("!").shift().split(">").pop(),
            profitMargin: barangidracik[i].split("?").shift().split("!").pop(),
            jenisRacikId: jenisracikid,
          }
        );
        resepracik[f].obatRacik.push(
          // ...itemracikan,
          {
            noRacik: noracikaktif,
            namaBarang: barangidracik[i].split("_").shift().split("-").pop(),
            barangId: barangidracik[i].split("-").shift(),
            quantity: Math.ceil(
              (dosisracik /
                barangidracik[i].split("?").pop().split("<").shift()) *
                quantityracikan
            ),
            satuanId: barangidracik[i].split("!").shift().split(">").pop(),
            harga: barangidracik[i].split(">").shift().split("+").pop(),
            hargaTotal:
              barangidracik[i].split(">").shift().split("+").pop() *
              Math.ceil(
                (dosisracik /
                  barangidracik[i].split("?").pop().split("<").shift()) *
                  quantityracikan
              ),
            dosis: dosisracik,
            kekuatan: barangidracik[i].split("?").pop().split("<").shift(),
            kodeSM: barangidracik[i].split("!").shift().split(">").pop(),
            profitMargin: barangidracik[i].split("?").shift().split("!").pop(),
            jenisRacikId: jenisracikid.split("-").shift(),
            isHantar: barangidracik[i].split("<").pop(),
          }
        );
      } else {
        // console.log(detailracik[i]);
        detailRacikArray.push(
          //   // ...itemracikan,
          {
            noRacik: detailracik[i].noRacik,
            namaBarang: detailracik[i].namaBarang,
            barangId: detailracik[i].barangId,
            // quantity: detailracik[i].quantity,
            quantity: Math.ceil(
              (detailracik[i].dosis / detailracik[i].kekuatan) * quantityracikan
            ),
            satuanId: detailracik[i].satuanId,
            harga: detailracik[i].harga,
            hargaTotal: detailracik[i].hargaTotal,
            dosis: detailracik[i].dosis,
            kekuatan: detailracik[i].kekuatan,
            kodeSM: detailracik[i].kodeSM,
            profitMargin: detailracik[i].profitMargin,
            jenisRacikId: detailracik[i].jenisRacikId,
            isHantar: detailracik[i].isHantar,
          }
        );
        // resepracik[f].obatRacik[elementsIndex].quantity =
        //   detailracik[i].quantity;

        resepracik[f].obatRacik[elementsIndex].quantity = Math.ceil(
          (detailracik[i].dosis / detailracik[i].kekuatan) * quantityracikan
        );
        resepracik[f].obatRacik[elementsIndex].hargaTotal =
          detailracik[i].hargaTotal;
        resepracik[f].obatRacik[elementsIndex].dosis = detailracik[i].dosis;
      }
    }
    setDetailracik(detailRacikArray);
    // setItemRacikan(detailRacikArray);
  };
  const onHapusRacikan = (e) => {
    setResepRacik(resepracik.filter((item) => item.noRacik !== e));
    setBarangIdRacik([]);
    setDetailracik([]);
  };
  const onHapusDetailRacik = (e, f, g) => {
    console.log(f);
    console.log(resepracik[g].obatRacik.filter((item) => item.barangId !== e));
    resepracik[g].obatRacik = resepracik[g].obatRacik.filter(
      (item) => item.barangId !== e
    );

    setDetailracik(detailracik.filter((item) => item.barangId !== e));
    setBarangIdRacik(
      barangidracik.filter((item) => item.split("-").shift() !== e)
    );
  };

  const columnResepRacik = [
    {
      dataIndex: "jenisRacikDesk",
      title: "Jenis Racikan",
      className: "bgcolortunggu",
    },
    {
      dataIndex: "noRacik",
      title: "No Racik",
    },
    {
      dataIndex: "quantity",
      title: "Qty",
    },
    {
      dataIndex: "aturanPakaiId",
      title: "Aturan Pakai",
    },
    {
      title: "Aksi",
      render: (text, record, index) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => onTampilRacikan(record.noRacik, index)}
            style={{ backgroundColor: "#13c2c2", borderColor: "#13c2c2" }}
          >
            Items
          </Button>
          <Popconfirm
            title="Anda Yakin Dihapus ?"
            onConfirm={() => onHapusRacikan(record.noRacik)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Tooltip title="Hapus">
              <Button
                size="small"
                type="text"
                shape="circle"
                danger
                icon={<DeleteFilled />}
              />
            </Tooltip>
          </Popconfirm>
          <Tooltip title="Edit">
            <Button
              size="small"
              type="text"
              shape="circle"
              onClick={() =>
                onSetEditRacik(
                  index,
                  record.jenisRacikId,
                  record.noRacik,
                  record.quantity,
                  record.aturanPakaiId
                )
              }
              icon={<EditFilled />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const columnItemsRacik = [
    {
      dataIndex: "noRacik",
      title: "No Racik",
      className: "bgcolortunggu",
    },
    {
      dataIndex: "barangId",
      title: "Kode Barang",
      className: "bgcolortunggu",
    },
    {
      dataIndex: "namaBarang",
      title: "Nama Barang",
      className: "bgcolortunggu",
    },
    {
      dataIndex: "dosis",
      title: "Dosis",
      render: (text, record, index) => (
        <InputNumber
          size="small"
          step="0.1"
          stringMode
          value={text}
          onChange={onInputChangeRacik("dosis", index, indexracik)}
        />
      ),
    },
    {
      dataIndex: "kekuatan",
      title: "Kekuatan",
    },
    {
      dataIndex: "quantity",
      title: "Qty",
    },
    {
      title: "Aksi",
      render: (text, record, index) => (
        <div>
          <Popconfirm
            title="Anda Yakin Dihapus ?"
            onConfirm={() =>
              onHapusDetailRacik(record.barangId, record.noRacik, indexracik)
            }
            okText="Ya"
            cancelText="Tidak"
          >
            <Tooltip title="Hapus" placement="right">
              <Button
                size="small"
                type="text"
                shape="circle"
                danger
                icon={<DeleteFilled />}
              />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const columnorder = [
    {
      dataIndex: "noOrder",
      title: "No Order",
      className: "bgcolortunggu",
    },
    {
      dataIndex: "unitOrderDesk",
      title: "Unit Order",
    },
    {
      dataIndex: "dokterDesk",
      title: "Nama Dokter",
    },
    {
      dataIndex: "tanggalOrder",
      title: "Tanggal Order",
    },
    {
      dataIndex: "unitTujuanDesk",
      title: "Unit Tujuan",
    },
    {
      title: "Aksi",
      render: (listorder) => (
        <div>
          <Button
            type="primary"
            size="small"
            onClick={() =>
              onDetailOrder(
                listorder.noOrder,
                listorder.unitTujuan,
                listorder.unitOrder
              )
            }
          >
            Ambil
          </Button>
          {ruangasal === listorder.unitOrder ? (
            <Popconfirm
              title="Anda Yakin Dihapus ?"
              onConfirm={() => {
                deleteOrder(listorder.noOrder);
                setKosong();
              }}
              okText="Ya"
              cancelText="Tidak"
            >
              <Button type="primary" size="small" danger>
                Hapus
              </Button>
            </Popconfirm>
          ) : (
            <Button disabled type="primary" size="small" danger>
              Hapus
            </Button>
          )}
        </div>
      ),
    },
  ];

  const onAmbilDetailBarang = (e) => {
    getBarangDetailRacik(e[e.length - 1].split("-").shift());
    setBarangIdRacik(e);
    console.log(e);
  };
  const showDrawer = () => {
    setSpanOrder(!spanOrder);
    setSpanRiwayat(!spanRiwayat);
  };
  const tutupSpan = () => {
    setSpanOrder(false);
    setSpanRiwayat(false);
  };
  const onDetailOrder = (e, f, g) => {
    if (g === ruangasal) {
      getBarangZatAktif(" ", " ", e);
      detailOrder(e);
      setNoOrder(e);
      setUnitOrder(f);
      getBarang(f);
      setModalOrder(false);
      setTampilRacikan(false);
    } else {
      message.warning("Resep berasal dari unit yang berbeda!");
    }
  };

  const onDetailHistoryOrder = (e, f, g) => {
    if (g === ruangasal) {
      getBarangZatAktif(" ", " ", e);
      detailOrderHistory(e);
      setUnitOrder(f);
      getBarang(f);
      setTampilRacikan(false);
      setHistoryOrder(false);
    } else {
      message.warning("Resep berasal dari unit yang berbeda!");
    }
  };
  const onApotik = (e) => {
    setUnitOrder(e);
    // getBarang(e);
    getBarangZatAktif(" ", " ", e);
    getBarangRinci(e);
    setItemsPaten([]);
    setOrder("");
    setDetailracik([]);
    setItemRacikan([]);
    setTampilRacikan(false);
    setNoOrder(null);
    setItems([]);
    setIsBlocking(true);
  };

  const simpanOrder = () => {
    if (pelaksana === null) {
      setModalDr(true);
      message.warning("Isikan Dokter order terlebih dahulu.");
    } else {
      insertOrder(dataorder);
      setIsBlocking(false);
      setModalDr(false);
      console.log(dataorder);
      inputRef.current.focus({
        cursor: "all",
      });
    }
  };

  const onAmbilObat = (e) => {
    getBarangDetail(e[e.length - 1].split("-").shift());
    setKodeBarang(e);
  };

  const addItem = () => {
    const gjlbaruFungsiEndokrin2 = [];
    for (var i = 0; i < kodebarang.length; i++) {
      const elementsIndex = itemspaten.findIndex(
        (element) => element.barangId === kodebarang[i].split("-").shift()
      );

      if (elementsIndex === -1) {
        console.log("ada");

        gjlbaruFungsiEndokrin2.push(
          // ...itemspaten,
          {
            isRacikan: false,
            id: itemspaten.length,
            barangId: kodebarang[i].split("-").shift(),
            namaBarang: kodebarang[i].split("_").shift().split("-").pop(),
            quantity: jumlah,
            harga: kodebarang[i].split("+").pop().split(">").shift(),
            hargaTotal:
              jumlah * kodebarang[i].split("+").pop().split(">").shift(),
            satuanId: kodebarang[i].split(">").pop().split("!").shift(),
            satuanDesk: kodebarang[i].split("_").pop().split("+").shift(),
            aturanPakaiId: aturan,
            profitMargin: kodebarang[i].split("!").pop().split("<").shift(),
            isHantar: kodebarang[i].split("<").pop(),
          }
        );
      } else {
        console.log("tidak");
        gjlbaruFungsiEndokrin2.push(
          // ...itemspaten,
          {
            isRacikan: false,
            id: itemspaten[i].id,
            barangId: itemspaten[i].barangId,
            namaBarang: itemspaten[i].namaBarang,
            quantity: itemspaten[i].quantity,
            harga: itemspaten[i].harga,
            hargaTotal: itemspaten[i].hargaTotal,
            satuanId: itemspaten[i].satuanId,
            satuanDesk: itemspaten[i].satuanDesk,
            aturanPakaiId: itemspaten[i].aturanPakaiId,
            profitMargin: itemspaten[i].profitMargin,
            isHantar: itemspaten[i].isHantar,
          }
        );
      }
    }
    setItems(gjlbaruFungsiEndokrin2);
    setItemsPaten(gjlbaruFungsiEndokrin2);
    setIsBlocking(true);
    console.log(gjlbaruFungsiEndokrin2);
  };

  const handleRemoveItem = (e) => {
    setItems(items.filter((item) => item.barangId !== e));
    setItemsPaten(itemspaten.filter((item) => item.barangId !== e));
    setKodeBarang(kodebarang.filter((item) => item.split("-").shift() !== e));
  };

  const mockData = [];
  // eslint-disable-next-line array-callback-return
  barang.map((b) => {
    mockData.push({
      key: b.KodeBarang,
      KodeBarang: b.KodeBarang,
      NamaBarang: b.NamaBarang,
      StockUnit: b.StockUnit,
      StockGudang: b.StockGudang,
    });
  });

  const simpan = () => console.log("simpan");
  const onModalOrder = () => {
    listOrder(curpas.registrasiId);
    setModalOrder(true);
  };

  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
      left: -targetRect?.left + uiData?.x,
      right: clientWidth - (targetRect?.right - uiData?.x),
      top: -targetRect?.top + uiData?.y,
      bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
  };

  //edit qty item paten
  const onInputChange = (key, index) => (e) => {
    const newData = [...itemspaten];
    const newData2 = [...items];
    newData[index][key] = e;
    newData2[index][key] = e;
    onTotal(newData2, index);
    setItemsPaten(newData);
    setItems(newData2);
    console.log("ini perubahan", newData);
    console.log("ini perubahan 2", newData2);
  };
  //edit aturan item paten
  const onInputChange1 = (key, index) => (e) => {
    const newData = [...itemspaten];
    const newData2 = [...items];
    newData[index][key] = e;
    newData2[index][key] = e;
    setItemsPaten(newData);
    setItems(newData2);
  };
  //edit dosis item racik
  const onInputChangeRacik = (key, index, f) => (e) => {
    const newData = [...detailracik];
    newData[index][key] = Number(e);
    console.log(newData);
    onTotalRacik(newData, index);
    setDetailracik(newData);

    //  console.log(resepracik[Number(f) - 1].obatRacik[index].dosis)

    resepracik[Number(f)].obatRacik[index].dosis = Number(e);
    resepracik[Number(f)].obatRacik[index].quantity = Math.ceil(
      (Number(e) / resepracik[Number(f)].obatRacik[index].kekuatan) *
        resepracik[Number(f)].quantity
    );
    resepracik[Number(f)].obatRacik[index].hargaTotal =
      resepracik[Number(f)].obatRacik[index].harga *
      Math.ceil(
        (Number(e) / resepracik[Number(f)].obatRacik[index].kekuatan) *
          resepracik[Number(f)].quantity
      );

    // resepracik[noracikaktif].obatRacik[index].dosis = Number(e.target.value);
    // itemracikan.push(newData);
  };
  let [isBlocking, setIsBlocking] = useState(false);
  const isItemSelected = (record) => {
    return itemspaten.some((item) => item.barangId === record.KodeBarang);
  };

  const [filteredBarang, setFilteredBarang] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // Untuk menyimpan input pencarian

  // Fungsi pencarian lokal
  const filterBarang = (value, filterType) => {
    if (!value) {
      setFilteredBarang(barang); // Reset data jika input kosong
      return;
    }

    const lowercasedValue = value.toLowerCase();

    const filteredData = barang.filter((item) => {
      if (filterType === "a") {
        return item.NamaBarang?.toLowerCase().includes(lowercasedValue);
      } else if (filterType === "b") {
        return item.ZatAktifDesk?.toLowerCase().includes(lowercasedValue);
      }
      return false;
    });

    setFilteredBarang(filteredData);
  };

  // Handler untuk jenis pencarian
  const handleJenisChange = (value) => {
    setJenis(value);
    filterBarang(searchValue, value); // Filter ulang data berdasarkan jenis baru
  };

  // Handler pencarian input
  const handleSearch = (value) => {
    setSearchValue(value); // Simpan nilai input
    filterBarang(value, jenis); // Filter berdasarkan input dan jenis pencarian
  };

  return (
    <div>
      <Prompt
        when={isBlocking}
        message={() =>
          `Perubahan belum tersimpan, apakah Anda akan meninggalkan halaman ini?`
        }
      />
      <Row gutter={[8, 8]}>
        <Col span={spanOrder ? 14 : 24}>
          <Spin
            spinning={loadingOrder}
            tip="Mohon menunggu data sedang disimpan"
          >
            {/* Header */}
            <Form onFinish={simpanOrder}>
              <Card
                title="Order Resep"
                size="small"
                headStyle={{
                  fontWeight: "bolder",
                  backgroundColor: "aliceblue",
                }}
                style={{
                  borderWidth: "2px",
                  borderColor: "darkgray",
                  borderRadius: "4px",
                  marginBottom: 5,
                }}
                extra={
                  <Space>
                    {/* <Button
                      type="primary"
                      size="small"
                      style={{
                        backgroundColor: "#faad14",
                        borderColor: "transparent",
                      }}
                      onClick={() => {
                        setHistoryOrder(true);
                        getRiwayatOrder(curpas.pasienId);
                      }}
                    >
                      Copy Order Sebelumnya
                    </Button> */}
                    <Button
                      size="small"
                      type="primary"
                      style={{
                        backgroundColor: "#237804",
                        borderColor: "transparent",
                      }}
                      onClick={showDrawer}
                    >
                      Lihat Riwayat
                    </Button>
                  </Space>
                }
              >
                <Form.Item
                  {...formItemLayout}
                  label="Apotik"
                  style={{ marginBottom: 0 }}
                  required
                >
                  <Select
                    dataSource={
                      RsLokasiPenunjang === "RSMS" && hasSome
                        ? apotikrj.sort(
                            (a, b) =>
                              a.deskripsi
                                .split("- ")
                                .pop()
                                .localeCompare(b.deskripsi.split("- ").pop()) ||
                              parseFloat(a.ruangId) - parseFloat(b.ruangId)
                          )
                        : RsLokasiPenunjang === "ABIYASA"
                        ? apotikrj.sort(
                            (a, b) =>
                              a.deskripsi
                                .split("- ")
                                .pop()
                                .localeCompare(b.deskripsi.split("- ").pop()) ||
                              parseFloat(a.ruangId) - parseFloat(b.ruangId)
                          )
                        : apotikrj.sort(
                            (a, b) =>
                              b.deskripsi
                                .split("- ")
                                .pop()
                                .localeCompare(a.deskripsi.split("- ").pop()) ||
                              parseFloat(a.ruangId) - parseFloat(b.ruangId)
                          )
                    }
                    showSearch
                    value={unitorder}
                    placeholder="Pilih ruang..."
                    optionFilterProp="children"
                    onChange={onApotik}
                    filterOption={(input, option) =>
                      option.props.children
                        .toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {apotikrj.map((d) => (
                      <Option
                        key={d.ruangId}
                        className={
                          d.deskripsi.includes("ABIYASA") ? "backgroundaby" : ""
                        }
                      >
                        {d.ruangId} - {d.deskripsi}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Row>
                  <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout2}
                      label="No Order"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={noOrder}
                        style={{ width: "60%" }}
                        ref={inputRef}
                      />
                      <Button
                        type="primary"
                        onClick={onModalOrder}
                        style={{ width: "40%" }}
                      >
                        Lihat Order
                      </Button>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Tgl Order"
                      style={{ marginBottom: 0 }}
                    >
                      <Input value={curpas.tanggalMasuk} />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="No Registrasi"
                      style={{ marginBottom: 0 }}
                    >
                      <Input value={curpas.registrasiId} />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="No Pasien"
                      style={{ marginBottom: 0 }}
                    >
                      <Input value={curpas.pasienId} />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Kelas"
                      style={{ marginBottom: 0 }}
                    >
                      <Input value={curpas.kelasRawat} />
                    </Form.Item>
                  </Col>
                  <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          {...formItemLayout3}
                          label="Cito"
                          style={{ marginBottom: 0 }}
                        >
                          <Checkbox
                            checked={cito}
                            onChange={(e) => setCito(e.target.checked)}
                          >
                            {cito ? "Ya" : "Tidak"}
                          </Checkbox>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...formItemLayout3}
                          label="Status"
                          style={{ marginBottom: 0 }}
                        >
                          <Input defaultValue="Order" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      {...formItemLayout2}
                      label="Bagian"
                      style={{ marginBottom: 0 }}
                    >
                      <Input value={curpas.ruangDeskripsi} />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Nama Pasien"
                      style={{ marginBottom: 0 }}
                    >
                      <Input value={curpas.namaPasien} />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Penjamin"
                      style={{ marginBottom: 0 }}
                    >
                      <Input value={curpas.namaPembayaran} />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Dokter"
                      style={{ marginBottom: 0 }}
                      required
                    >
                      <Select
                        showAction="focus"
                        ref={inputRefDr}
                        dataSource={dokterall}
                        showSearch
                        value={pelaksana}
                        style={{ width: "100%" }}
                        placeholder="Pilih Pelaksana"
                        optionFilterProp="children"
                        onChange={(e) => setPelaksana(e)}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {dokterall.map((p) => (
                          <Option key={p.dokterId}>{p.namaDokter}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Form>

            {/* Obat Paten */}
            <Card
              title="Item Obat Jadi"
              size="small"
              headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
              style={{
                borderWidth: "2px",
                borderColor: "darkgray",
                borderRadius: "4px",
                marginBottom: 5,
              }}
              loading={loadingResep}
              extra={
                namauser === "NUGRAHA" ? (
                  <Button
                    size="small"
                    type="primary"
                    onClick={() =>
                      unitorder === null
                        ? message.warning("Pilih apotik terlebih dahulu!")
                        : setModalDaftarObat(true)
                    }
                  >
                    List Obat
                  </Button>
                ) : (
                  <></>
                )
              }
            >
              <Form
                name="Form Obat resep"
                initialValues={{ remember: true }}
                onFinish={addItem}
              >
                <Row gutter={[8, 2]}>
                  <Col span={22} xs={24} sm={22} md={22} lg={22} xl={22}>
                    Jenis Pencarian :{" "}
                    <Radio.Group
                      defaultValue="a"
                      size="small"
                      // buttonStyle="solid"
                      onChange={(e) => setJenis(e.target.value)}
                      value={jenis}
                    >
                      <Radio value="a">Nama Obat</Radio>
                      <Radio value="b">Generik / Zat Aktif</Radio>
                    </Radio.Group>{" "}
                    <Popover
                      placement="topLeft"
                      title="Pencarian Obat"
                      content={
                        <div>
                          Pencarian obat dapat menggunakan pencarian berdasarkan
                          nama obat / nama generik (zat aktif)
                        </div>
                      }
                      // arrow="center"
                    >
                      <QuestionCircleTwoTone />
                    </Popover>
                    <Row>
                      <Col span={14} style={{ textAlign: "left" }}>
                        <Row>
                          <Col span={13}>Nama Barang :</Col>
                          <Col span={11} style={{ backgroundColor: "beige" }}>
                            Zat Aktif :
                          </Col>
                        </Row>
                      </Col>
                      <Col span={8} style={{ textAlign: "right" }}>
                        <Row>
                          <Col span={14}>
                            <Tooltip title="Stock Unit">
                              <Tag color="cyan">Stock Unit</Tag>
                            </Tooltip>
                          </Col>
                          <Col span={10}>
                            <Tooltip title="Stock Gudang">
                              <Tag color="volcano">Stock Gudang</Tag>
                            </Tooltip>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                      <Col span={22}>
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            onFocus={() => {
                              getBarangZatAktif(" ", " ", unitorder);
                              if (unitorder === null) {
                                message.warning(
                                  "Pilih apotik terlebih dahulu!"
                                );
                              }
                            }}
                            mode="multiple"
                            showSearch
                            value={kodebarang}
                            style={{ width: "100%" }}
                            placeholder={
                              jenis === "b"
                                ? "Cari zat aktif"
                                : "Cari barang obat"
                            }
                            filterOption={false}
                            onChange={(e) => {
                              onAmbilObat(e);
                              console.log(e);
                            }}
                            onSearch={(e) => {
                              jenis === "b"
                                ? getBarangZatAktif(
                                    e === "" ? " " : e,
                                    " ",
                                    unitorder
                                  )
                                : getBarangZatAktif(
                                    " ",
                                    e === "" ? " " : e,
                                    unitorder
                                  );
                            }}
                          >
                            {barang.map((p) => (
                              <Option
                                value={
                                  p.KodeBarang +
                                  "-" +
                                  p.NamaBarang +
                                  "_" +
                                  p.Satuan +
                                  "+" +
                                  p.HargaRwj +
                                  ">" +
                                  p.KodeSm +
                                  "!" +
                                  p.MarginProfit +
                                  "<" +
                                  p.isHantar
                                }
                              >
                                {
                                  <div>
                                    <Row>
                                      <Col
                                        span={16}
                                        style={{ textAlign: "left" }}
                                      >
                                        <Row>
                                          <Col span={12}>
                                            <Text
                                              style={{
                                                width: 200,
                                              }}
                                              ellipsis={{
                                                tooltip: p.NamaBarang,
                                              }}
                                            >
                                              {p.NamaBarang}
                                            </Text>
                                          </Col>
                                          <Col
                                            span={12}
                                            style={{ backgroundColor: "beige" }}
                                          >
                                            <Text
                                              style={{
                                                width: 200,
                                              }}
                                              ellipsis={{
                                                tooltip: p.ZatAktifDesk,
                                              }}
                                            >
                                              {p.ZatAktifDesk}
                                            </Text>
                                          </Col>
                                        </Row>
                                      </Col>
                                      <Col
                                        span={8}
                                        style={{ textAlign: "right" }}
                                      >
                                        <Row>
                                          <Col span={14}>
                                            <Tooltip title="Stock Unit">
                                              <Tag color="cyan">
                                                {p.StockUnit}
                                              </Tag>
                                            </Tooltip>
                                          </Col>
                                          <Col span={10}>
                                            <Tooltip title="Stock Gudang">
                                              <Tag color="volcano">
                                                {p.StockGudang}
                                              </Tag>
                                            </Tooltip>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </div>
                                }
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Button
                          type="primary"
                          onClick={(e) => {
                            console.log(kodebarang);
                            addItem();
                          }}
                        >
                          Ambil
                        </Button>
                      </Col>
                    </Row>
                    {/* {retriksijadi === null || retriksijadi === "" ? null : (
                    <Alert message={retriksijadi} type="info" />
                  )} */}
                  </Col>
                </Row>
              </Form>
              <Table
                rowKey="barangId"
                bordered
                dataSource={itemspaten}
                pagination={false}
                size="small"
                scroll={{ y: 800 }}
              >
                <Column
                  title="No."
                  key="reg"
                  className="bgcolortunggu"
                  width="40px"
                  render={(text, record, index) => <span>{index + 1}</span>}
                />
                <Column
                  title="Kode Barang"
                  key="reg"
                  className="bgcolortunggu"
                  width="100px"
                  render={(items) => <span>{items.barangId}</span>}
                />
                <Column
                  title="Barang"
                  key="reg"
                  className="bgcolortunggu"
                  width="275px"
                  render={(items) => <span>{items.namaBarang}</span>}
                />
                <Column
                  dataIndex="quantity"
                  title="Quantity"
                  width="70px"
                  render={(text, record, index) => (
                    <InputNumber
                      size="small"
                      style={{ width: "100%" }}
                      max={1000}
                      onFocus={(e) => e.target.select()}
                      value={text}
                      onChange={onInputChange("quantity", index)}
                    />
                  )}
                />
                <Column
                  title="Satuan"
                  width="50px"
                  render={(items) => <span>{items.satuanDesk}</span>}
                />
                <Column
                  dataIndex="aturanPakaiId"
                  title="Aturan"
                  width="100px"
                  render={(text, record, index) => (
                    <AutoComplete
                      size="small"
                      maxLength={50}
                      status={text.length === 50 ? "warning" : ""}
                      style={{ width: "100%" }}
                      value={text}
                      options={aturanpakai}
                      onSelect={onInputChange1("aturanPakaiId", index)}
                      onChange={onInputChange1("aturanPakaiId", index)}
                      placeholder="Ketik Aturan Pakai"
                      filterOption={(inputValue, option) =>
                        option.value &&
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                    />
                  )}
                />
                <Column
                  title="Aksi"
                  width="50px"
                  render={(items) => (
                    <span>
                      <Popconfirm
                        title="Anda Yakin Dihapus ?"
                        onConfirm={() => handleRemoveItem(items.barangId)}
                        okText="Ya"
                        cancelText="Tidak"
                      >
                        <Tooltip title="Hapus" placement="right">
                          <Button
                            size="small"
                            type="text"
                            shape="circle"
                            danger
                            icon={<DeleteFilled />}
                          />
                        </Tooltip>
                      </Popconfirm>
                    </span>
                  )}
                />
              </Table>
            </Card>

            {/* Obat Racik */}
            <Card
              title="Item Racikan"
              size="small"
              headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
              style={{
                borderWidth: "2px",
                borderColor: "darkgray",
                borderRadius: "4px",
                marginBottom: 5,
              }}
              loading={loadingResep}
            >
              <Form {...formItemLayout2}>
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Form.Item
                      label="Jenis Racikan"
                      style={{ marginBottom: 0 }}
                    >
                      <Select
                        onFocus={() => getJnsRacikan()}
                        dataSource={masterjnsracikan}
                        showSearch
                        value={jenisracikid}
                        style={{ width: "100%" }}
                        placeholder="Pilih Racikan"
                        optionFilterProp="children"
                        onChange={(e) => setJenisRacikId(e)}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {masterjnsracikan.map((p) => (
                          <Option value={p.JenisRacikId + "-" + p.Deskripsi}>
                            {p.Deskripsi}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Quantity" style={{ marginBottom: 0 }}>
                      <InputNumber
                        step="0.1"
                        min={1}
                        placeholder="Ketik Quantity Racik"
                        value={quantityracikan}
                        style={{ width: "100%" }}
                        onChange={(e) => setQuantityRacikan(e)}
                        onFocus={handleFocus}
                      />
                    </Form.Item>
                    <Form.Item label="Aturan" style={{ marginBottom: 5 }}>
                      <AutoComplete
                        maxLength={50}
                        options={aturanpakai}
                        value={aturanpakaiidracik}
                        onSelect={(e) => setAturanPakaiIdRacik(e)}
                        onChange={(e) => setAturanPakaiIdRacik(e)}
                        placeholder="Ketik Aturan Pakai"
                        filterOption={(inputValue, option) =>
                          option.value &&
                          option.value
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                        }
                      />
                    </Form.Item>
                    <Row>
                      <Col style={{ textAlign: "right" }} span={24}>
                        <Space>
                          <Button
                            type="primary"
                            onClick={() =>
                              unitorder === ""
                                ? message.warning(
                                    "Pilih apotik terlebih dahulu!"
                                  )
                                : aturanpakaiidracik === null ||
                                  jenisracikid === null ||
                                  quantityracikan === null
                                ? message.warning(
                                    "Form Order Racik Belum Lengkap!"
                                  )
                                : onTambahRacik()
                            }
                          >
                            Tambah Racikan
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Table
                      dataSource={resepracik}
                      columns={columnResepRacik}
                      size="small"
                      pagination={false}
                      rowClassName={(record, rowIndex) =>
                        rowIndex === warnaRow ? "colorpilihobat" : null
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  {tampilracikan ? (
                    <Col span={24}>
                      Jenis Pencarian :{" "}
                      <Radio.Group
                        defaultValue="a"
                        size="small"
                        onChange={(e) => setJenis(e.target.value)}
                        value={jenis}
                      >
                        <Radio value="a">Nama Obat</Radio>
                        <Radio value="b">Generik / Zat Aktif</Radio>
                      </Radio.Group>{" "}
                      <Popover
                        placement="topLeft"
                        title="Pencarian Obat"
                        content={
                          <div>
                            Pencarian obat dapat menggunakan pencarian
                            berdasarkan nama obat / nama generik (zat aktif)
                          </div>
                        }
                        // arrow="center"
                      >
                        <QuestionCircleTwoTone />
                      </Popover>
                      <Row>
                        <Col span={12} style={{ textAlign: "left" }}>
                          <Row>
                            <Col span={13}>Nama Barang :</Col>
                            <Col span={11} style={{ backgroundColor: "beige" }}>
                              Zat Aktif :
                            </Col>
                          </Row>
                        </Col>
                        <Col span={10} style={{ textAlign: "right" }}>
                          <Row>
                            <Col span={14}>
                              <Tooltip title="Stock Unit">
                                <Tag color="cyan">Stock Unit</Tag>
                              </Tooltip>
                            </Col>
                            <Col span={10}>
                              <Tooltip title="Stock Gudang">
                                <Tag color="volcano">Stock Gudang</Tag>
                              </Tooltip>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={22}>
                          <Select
                            onFocus={() => {
                              getBarangZatAktif(" ", " ", unitorder);
                              if (unitorder === null) {
                                message.warning(
                                  "Pilih apotik terlebih dahulu!"
                                );
                              }
                            }}
                            mode="multiple"
                            showSearch
                            value={barangidracik}
                            style={{ width: "100%" }}
                            placeholder={
                              jenis === "b"
                                ? "Cari zat aktif"
                                : "Cari barang obat"
                            }
                            filterOption={false}
                            onChange={(e) => onAmbilDetailBarang(e)}
                            onSearch={(e) => {
                              jenis === "b"
                                ? getBarangZatAktif(
                                    e === "" ? " " : e,
                                    " ",
                                    unitorder
                                  )
                                : getBarangZatAktif(
                                    " ",
                                    e === "" ? " " : e,
                                    unitorder
                                  );
                            }}
                          >
                            {barang.map((p) => (
                              <Option
                                value={
                                  p.KodeBarang +
                                  "-" +
                                  p.NamaBarang +
                                  "_" +
                                  p.Satuan +
                                  "+" +
                                  p.HargaRwj +
                                  ">" +
                                  p.KodeSm +
                                  "!" +
                                  p.MarginProfit +
                                  "?" +
                                  p.Kekuatan +
                                  "<" +
                                  p.isHantar
                                }
                              >
                                {
                                  <div>
                                    <Row>
                                      <Col
                                        span={16}
                                        style={{ textAlign: "left" }}
                                      >
                                        <Row>
                                          <Col span={12}>
                                            <Text
                                              style={{
                                                width: 200,
                                              }}
                                              ellipsis={{
                                                tooltip: p.NamaBarang,
                                              }}
                                            >
                                              {p.NamaBarang}
                                            </Text>
                                          </Col>
                                          <Col
                                            span={12}
                                            style={{ backgroundColor: "beige" }}
                                          >
                                            <Text
                                              style={{
                                                width: 200,
                                              }}
                                              ellipsis={{
                                                tooltip: p.ZatAktifDesk,
                                              }}
                                            >
                                              {p.ZatAktifDesk}
                                            </Text>
                                          </Col>
                                        </Row>
                                      </Col>
                                      <Col
                                        span={8}
                                        style={{ textAlign: "right" }}
                                      >
                                        <Row>
                                          <Col span={14}>
                                            <Tooltip title="Stock Unit">
                                              <Tag color="cyan">
                                                {p.StockUnit}
                                              </Tag>
                                            </Tooltip>
                                          </Col>
                                          <Col span={10}>
                                            <Tooltip title="Stock Gudang">
                                              <Tag color="volcano">
                                                {p.StockGudang}
                                              </Tag>
                                            </Tooltip>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </div>
                                }
                              </Option>
                            ))}
                          </Select>
                        </Col>
                        <Col style={{ textAlign: "right" }} span={2}>
                          <Button
                            htmlType="submit"
                            type="primary"
                            onClick={() =>
                              onTambahItemRacikan(noracikaktif, indexracik)
                            }
                          >
                            Ambil
                          </Button>
                        </Col>
                      </Row>
                      <Table
                        rowKey="barangId"
                        dataSource={detailracik}
                        columns={columnItemsRacik}
                        size="small"
                        pagination={false}
                      />
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              </Form>
            </Card>

            <Row>
              <Col style={{ textAlign: "right" }} span={24}>
                <Card
                  size="small"
                  style={{
                    borderWidth: "2px",
                    borderColor: "darkgray",
                    borderRadius: "4px",
                    marginBottom: 25,
                  }}
                >
                  <Button
                    size="large"
                    htmlType="submit"
                    type="primary"
                    onClick={simpanOrder}
                  >
                    Simpan
                  </Button>
                </Card>
              </Col>
            </Row>
          </Spin>
        </Col>
        <Col span={spanRiwayat ? 10 : 0}>
          <Card
            extra={
              <Button size="small" type="primary" danger onClick={tutupSpan}>
                Tutup
              </Button>
            }
            title="Riwayat Obat"
            size="small"
            headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
              marginBottom: 25,
            }}
          >
            <RiwayatOrder />
          </Card>
        </Col>
      </Row>

      {/* Daftar Order */}
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            Daftar Order
          </div>
        }
        open={modalorder}
        onOk={simpan}
        onCancel={() => setModalOrder(false)}
        width="1000px"
        footer={null}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Table
          columns={columnorder}
          dataSource={listorder}
          size="small"
          pagination={false}
        />
      </Modal>

      {/* Edit Racik Header */}
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            Edit Racik
          </div>
        }
        open={modaleditracik}
        onOk={() => onEditRacik()}
        onCancel={() => setModalEditRacik(false)}
        width="450px"
        okText="Simpan"
        cancelText="Batal"
        // footer={null}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Form {...formItemLayout2}>
          <Form.Item label="Jenis Racikan" style={{ marginBottom: 0 }}>
            <Select
              onFocus={() => getJnsRacikan()}
              dataSource={masterjnsracikan}
              showSearch
              value={jenisracikedit}
              style={{ width: "100%" }}
              placeholder="Pilih Racikan"
              optionFilterProp="children"
              onChange={(e) => setJenisRacikEdit(e)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {masterjnsracikan.map((p) => (
                <Option key={p.JenisRacikId}>{p.Deskripsi}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Quantity" style={{ marginBottom: 0 }}>
            <InputNumber
              step="0.1"
              min={1}
              value={quantityracikedit}
              style={{ width: "100%" }}
              onChange={(e) => setQuantityRacikEdit(e)}
              onFocus={handleFocus}
            />
          </Form.Item>
          <Form.Item label="Aturan" style={{ marginBottom: 0 }}>
            <AutoComplete
              maxLength={50}
              options={aturanpakai}
              value={aturanpakaiedit}
              onSelect={(e) => setAturanPakaiEdit(e)}
              onChange={(e) => setAturanPakaiEdit(e)}
              placeholder="Ketik Aturan Pakai"
              filterOption={(inputValue, option) =>
                option.value &&
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                  -1
              }
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Warning - Input belum lengkap"
        open={modalDr}
        onOk={() => simpanOrder()}
        // onCancel={() => setModalDr(false)}
        // cancelText={null}
        cancelButtonProps={{ disabled: true }}
        okText="Simpan"
      >
        Pasien merupakan pasien konsul,silahkan isikan dokter pelaksana/order
        terlebih dahulu agar ORDER RESEP bisa tersimpan.
        <Form.Item
          {...formItemLayout2}
          label="Dokter Order"
          style={{ marginBottom: 0 }}
          required
        >
          <Select
            showAction="focus"
            ref={inputRefDr}
            dataSource={dokterall}
            showSearch
            value={pelaksana}
            style={{ width: "100%" }}
            placeholder="Pilih Pelaksana"
            optionFilterProp="children"
            onChange={(e) => setPelaksana(e)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {dokterall.map((p) => (
              <Option key={p.dokterId}>{p.namaDokter}</Option>
            ))}
          </Select>
        </Form.Item>
      </Modal>

      {/* Order Sebelumnya */}
      <Modal
        title="Riwayat Order Resep"
        open={historyorder}
        onClose={() => setHistoryOrder(false)}
        footer={null}
        onCancel={() => setHistoryOrder(false)}
        width={1000}
      >
        {/* <Alert
          message="Copy resep dalam pengembangan lanjutan, akan dapat digunakan lagi pada update
        selanjutnya. Silahkan order seperti biasa terlebih dahulu. Terima kasih."
          type="info"
          showIcon
        /> */}

        <Table
          rowKey="orderId"
          bordered
          dataSource={riwayatorder}
          pagination={false}
          size="small"
          scroll={{ y: 800 }}
        >
          <Column
            title="No."
            className="bgcolortunggu"
            width="40px"
            render={(text, record, index) => <span>{index + 1}</span>}
          />
          <Column
            title="No. Order"
            width="110px"
            render={(text, record, index) => <span>{record.orderId}</span>}
          />
          <Column
            title="Tanggal Order"
            render={(text, record, index) => <span>{record.tanggalOrder}</span>}
          />
          <Column
            title="Unit Order"
            render={(text, record, index) => (
              <span>{record.unitOrderDesk}</span>
            )}
          />
          <Column
            title="Apotik"
            width="180px"
            render={(text, record, index) => (
              <span>{record.unitTujuanDesk}</span>
            )}
          />
          <Column
            title="Dokter Peresep"
            render={(text, record, index) => <span>{record.dokterDesk}</span>}
          />
          <Column
            title="Aksi"
            render={(text, record, index) => (
              <div>
                <Button
                  type="primary"
                  size="small"
                  onClick={() =>
                    onDetailHistoryOrder(
                      record.orderId,
                      record.ruangTujuanId,
                      record.ruangOrderId
                    )
                  }
                >
                  Ambil
                </Button>
              </div>
            )}
          />
        </Table>
      </Modal>

      {/* Daftar Obat */}
      <Modal
        open={modalDaftarObat}
        onClose={() => setModalDaftarObat(false)}
        onCancel={() => setModalDaftarObat(false)}
        footer={null}
        width={"80%"}
      >
        Jenis Pencarian :{" "}
        <Radio.Group
          defaultValue="a"
          size="small"
          buttonStyle="solid"
          onChange={(e) => handleJenisChange(e.target.value)} // Ubah jenis pencarian
          value={jenis}
        >
          <Radio.Button value="a">Nama Obat</Radio.Button>
          <Radio.Button value="b">Generik / Zat Aktif</Radio.Button>
        </Radio.Group>{" "}
        <Search
          placeholder="Cari Nama Barang..."
          onChange={(e) => handleSearch(e.target.value)} // Pencarian langsung
          onSearch={(e) => {
            jenis === "b"
              ? getBarangZatAktif(e === "" ? " " : e, " ", unitorder)
              : getBarangZatAktif(" ", e === "" ? " " : e, unitorder);
          }}
          enterButton
        />
        <Table
          bordered
          dataSource={filteredBarang}
          // pagination={false}
          // pagination={{ pageSize: [10, 20, 50, 100] }}
          size="small"
          scroll={{ y: 800 }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                const newItems = [...itemspaten];
                const barangId = record.KodeBarang;

                // Cek apakah item sudah ada di itemspaten
                const itemIndex = newItems.findIndex(
                  (item) => item.barangId === barangId
                );

                if (itemIndex === -1) {
                  // Item belum ada, tambahkan item baru
                  newItems.push({
                    isRacikan: false,
                    id: newItems.length,
                    barangId: barangId,
                    namaBarang: record.NamaBarang,
                    quantity: jumlah, // Atur nilai default atau sesuai kebutuhan
                    harga: record.Harga, // Pastikan field sesuai dengan yang ada di record
                    hargaTotal: record.Harga * 1, // Sesuaikan perhitungan total harga
                    satuanId: record.KodeSm,
                    satuanDesk: record.Satuan,
                    aturanPakaiId: aturan, // Default atau sesuaikan
                    profitMargin: record.MarginProfit,
                    isHantar: record.isHantar,
                  });
                  getBarangDetail(record.KodeBarang);
                } else {
                  // Item sudah ada, bisa tambahkan logika jika ingin memperbarui data yang ada
                  message.info("Item sudah diambil");
                }

                // Update state
                setItems(newItems);
                setItemsPaten(newItems);
                setIsBlocking(true);
              },
            };
          }}
          rowClassName={(record) =>
            isItemSelected(record) ? "selected-row" : ""
          } // Tambah kelas jika item dipilih
          style={{ cursor: "pointer" }}
        >
          <Table.Column
            dataIndex="NamaBarang"
            title="Nama Barang"
            render={(text, record) => (
              <span>
                {text} {isItemSelected(record) ? "✔️" : ""}
              </span> // Tambahkan centang jika dipilih
            )}
          />
          <Column
            dataIndex="ZatAktifDesk"
            title="Zat Aktif"
            render={(text, record, index) => <span>{text}</span>}
          />
          <Column
            dataIndex="Retriksi"
            title="Retriksi"
            width="50px"
            align="center"
            render={(text, record, index) => (
              <span>
                {record.Retriksi ? (
                  <Tooltip title={text}>
                    <WarningTwoTone
                      twoToneColor="#faad14"
                      style={{ fontSize: "20px" }}
                    />
                  </Tooltip>
                ) : (
                  ""
                )}
              </span>
            )}
          />
          <Column
            dataIndex="Kekuatan"
            title="Kekuatan"
            width="60px"
            render={(text, record, index) => <span>{record.Kekuatan}</span>}
          />
          <Column
            dataIndex="Satuan"
            title="Satuan"
            width="55px"
            render={(text, record, index) => <span>{text}</span>}
          />
          <Column
            dataIndex="HargaRwj"
            title="HargaRwj"
            width="75px"
            render={(text, record, index) => <span>{record.HargaRwj}</span>}
          />
          <Column
            dataIndex="MarginProfit"
            title="MarginProfit"
            width="78px"
            render={(text, record, index) => <span>{record.MarginProfit}</span>}
          />
          <Column
            dataIndex="Harga"
            title="Harga"
            width="75px"
            render={(text, record, index) => <span>{record.Harga}</span>}
          />
          <Column
            dataIndex="StockUnit"
            title="Stock Unit"
            width="75px"
            render={(text, record, index) => (
              <span>
                {record.StockUnit === 0 ? (
                  <Text type="danger">{record.StockUnit}</Text>
                ) : (
                  record.StockUnit
                )}
              </span>
            )}
          />
          <Column
            dataIndex="StockGudang"
            title="Stock Gudang"
            width="90px"
            render={(text, record, index) => (
              <span>
                {record.StockGudang === 0 ? (
                  <Text type="danger">{record.StockGudang}</Text>
                ) : (
                  record.StockGudang
                )}
              </span>
            )}
          />
          <Column
            dataIndex="MaxOrder"
            title="Max Order"
            width="75px"
            render={(text, record, index) => <span>{record.MaxOrder}</span>}
          />
        </Table>
      </Modal>

      {/* Riwayat Obat */}
      <Drawer
        title="Riwayat Resep Obat"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        width={550}
      >
        <RiwayatOrder />
      </Drawer>

      <style jsx>{`
        .selected-row {
          background-color: #e6f7ff !important; /* Warna khusus untuk baris yang dipilih */
        }
      `}</style>
    </div>
  );
};

export default FormOrderResep;
