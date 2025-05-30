import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const PoliMataContext = createContext();

const PoliMataContextProvider = (props) => {
  const [sph1A, setsph1A] = useState("");
  const [sph1B, setsph1B] = useState("");
  const [cyl1A, setcyl1A] = useState("");
  const [cyl1B, setcyl1B] = useState("");
  const [axs1A, setaxs1A] = useState("");
  const [axs1B, setaxs1B] = useState("");
  const [sph2A, setsph2A] = useState("");
  const [sph2B, setsph2B] = useState("");
  const [cyl2A, setcyl2A] = useState("");
  const [cyl2B, setcyl2B] = useState("");
  const [axs2A, setaxs2A] = useState("");
  const [axs2B, setaxs2B] = useState("");
  const [mma, setmma] = useState("");
  const [mmb, setmmb] = useState("");
  const [ad, setad] = useState("");
  const [jh, setjh] = useState("");
  const [dkt, setdkt] = useState("");
  const [bfc, setbfc] = useState("");
  const [optical, setoptical] = useState("");
  const [ribuan, setribuan] = useState("");
  const [tanggal, settanggal] = useState("");
  const [lkp, setlkp] = useState("");
  const [lns, setlns] = useState("");
  const [virusSeblOd, setvirusSeblOd] = useState("");
  const [virusSeblOs, setvirusSeblOs] = useState("");
  const [binokulerSebl, setbinokulerSebl] = useState("");
  const [virusSesdOd, setvirusSesdOd] = useState("");
  const [virusSesdOs, setvirusSesdOs] = useState("");
  const [binokulerSesd, setbinokulerSesd] = useState("");
  const [tonometriOd, settonometriOd] = useState("");
  const [tonometriOs, settonometriOs] = useState("");
  const [jenisTonometri, setjenisTonometri] = useState("");
  const [flouresceinTest, setflouresceinTest] = useState("");
  const [keratometri1Od, setkeratometri1Od] = useState("");
  const [keratometri2Od, setkeratometri2Od] = useState("");
  const [keratometri1Os, setkeratometri1Os] = useState("");
  const [keratometri2Os, setkeratometri2Os] = useState("");
  const [biometriOd, setbiometriOd] = useState("");
  const [biometriOs, setbiometriOs] = useState("");
  const [axialOd, setaxialOd] = useState("");
  const [axialOs, setaxialOs] = useState("");
  const [perimet, setperimet] = useState("");
  const [fundusCmetode, setfundusCmetode] = useState("");
  const [fundusCpnii, setfundusCpnii] = useState("");
  const [fundusCvasa, setfundusCvasa] = useState("");
  const [fundusCretina, setfundusCretina] = useState("");
  const [fundusCmacula, setfundusCmacula] = useState("");
  const [fundusCketeranganOd, setfundusCketeranganOd] = useState("");
  const [fundusCpniios, setfundusCpniios] = useState("");
  const [fundusCvasaOs, setfundusCvasaOs] = useState("");
  const [fundusCretinaOs, setfundusCretinaOs] = useState("");
  const [fundusCmaculaOs, setfundusCmaculaOs] = useState("");
  const [fundusCketeranganOs, setfundusCketeranganOs] = useState("");
  const [resikoJatuh, setresikoJatuh] = useState("");
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailMata = (id) => {
    axios
      .get(`${apiku}/EmrPemeriksaanKhusus/Mata/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setsph1A(res.data.result.sph1A);
          setsph1B(res.data.result.sph1B);
          setcyl1A(res.data.result.cyl1A);
          setcyl1B(res.data.result.cyl1B);
          setaxs1A(res.data.result.axs1A);
          setaxs1B(res.data.result.axs1B);
          setsph2A(res.data.result.sph2A);
          setsph2B(res.data.result.sph2B);
          setcyl2A(res.data.result.cyl2A);
          setcyl2B(res.data.result.cyl2B);
          setaxs2A(res.data.result.axs2A);
          setaxs2B(res.data.result.axs2B);
          setmma(res.data.result.mma);
          setmmb(res.data.result.mmb);
          setad(res.data.result.ad);
          setjh(res.data.result.jh);
          setdkt(res.data.result.dkt);
          setbfc(res.data.result.bfc);
          setoptical(res.data.result.optical);
          setribuan(res.data.result.ribuan);
          settanggal(res.data.result.tanggal);
          setlkp(res.data.result.lkp);
          setlns(res.data.result.lns);
          setvirusSeblOd(res.data.result.virusSeblOd);
          setvirusSeblOs(res.data.result.virusSeblOs);
          setbinokulerSebl(res.data.result.binokulerSebl);
          setvirusSesdOd(res.data.result.virusSesdOd);
          setvirusSesdOs(res.data.result.virusSesdOs);
          setbinokulerSesd(res.data.result.binokulerSesd);
          settonometriOd(res.data.result.tonometriOd);
          settonometriOs(res.data.result.tonometriOs);
          setjenisTonometri(res.data.result.jenisTonometri);
          setflouresceinTest(res.data.result.flouresceinTest);
          setkeratometri1Od(res.data.result.keratometri1Od);
          setkeratometri2Od(res.data.result.keratometri2Od);
          setkeratometri1Os(res.data.result.keratometri1Os);
          setkeratometri2Os(res.data.result.keratometri2Os);
          setbiometriOd(res.data.result.biometriOd);
          setbiometriOs(res.data.result.biometriOs);
          setaxialOd(res.data.result.axialOd);
          setaxialOs(res.data.result.axialOs);
          setperimet(res.data.result.perimet);
          setfundusCmetode(res.data.result.fundusCmetode);
          setfundusCpnii(res.data.result.fundusCpnii);
          setfundusCvasa(res.data.result.fundusCvasa);
          setfundusCretina(res.data.result.fundusCretina);
          setfundusCmacula(res.data.result.fundusCmacula);
          setfundusCketeranganOd(res.data.result.fundusCketeranganOd);
          setfundusCpniios(res.data.result.fundusCpniios);
          setfundusCvasaOs(res.data.result.fundusCvasaOs);
          setfundusCretinaOs(res.data.result.fundusCretinaOs);
          setfundusCmaculaOs(res.data.result.fundusCmaculaOs);
          setfundusCketeranganOs(res.data.result.fundusCketeranganOs);
          setresikoJatuh(res.data.result.resikoJatuh);
        } else {
          setsph1A(null);
          setsph1B(null);
          setcyl1A(null);
          setcyl1B(null);
          setaxs1A(null);
          setaxs1B(null);
          setsph2A(null);
          setsph2B(null);
          setcyl2A(null);
          setcyl2B(null);
          setaxs2A(null);
          setaxs2B(null);
          setmma(null);
          setmmb(null);
          setad(null);
          setjh(false);
          setdkt(false);
          setbfc(false);
          setoptical(null);
          setribuan(0);
          settanggal(null);
          setlkp(null);
          setlns(null);
          setvirusSeblOd(null);
          setvirusSeblOs(null);
          setbinokulerSebl(null);
          setvirusSesdOd(null);
          setvirusSesdOs(null);
          setbinokulerSesd(null);
          settonometriOd(null);
          settonometriOs(null);
          setjenisTonometri(0);
          setflouresceinTest(null);
          setkeratometri1Od(null);
          setkeratometri2Od(null);
          setkeratometri1Os(null);
          setkeratometri2Os(null);
          setbiometriOd(null);
          setbiometriOs(null);
          setaxialOd(null);
          setaxialOs(null);
          setperimet(null);
          setfundusCmetode(null);
          setfundusCpnii(null);
          setfundusCvasa(null);
          setfundusCretina(null);
          setfundusCmacula(null);
          setfundusCketeranganOd(null);
          setfundusCpniios(null);
          setfundusCvasaOs(null);
          setfundusCretinaOs(null);
          setfundusCmaculaOs(null);
          setfundusCketeranganOs(null);
          setresikoJatuh(null);
        }
      })
      .catch((err) => {
        setsph1A(null);
        setsph1B(null);
        setcyl1A(null);
        setcyl1B(null);
        setaxs1A(null);
        setaxs1B(null);
        setsph2A(null);
        setsph2B(null);
        setcyl2A(null);
        setcyl2B(null);
        setaxs2A(null);
        setaxs2B(null);
        setmma(null);
        setmmb(null);
        setad(null);
        setjh(false);
        setdkt(false);
        setbfc(false);
        setoptical(null);
        setribuan(0);
        settanggal(null);
        setlkp(null);
        setlns(null);
        setvirusSeblOd(null);
        setvirusSeblOs(null);
        setbinokulerSebl(null);
        setvirusSesdOd(null);
        setvirusSesdOs(null);
        setbinokulerSesd(null);
        settonometriOd(null);
        settonometriOs(null);
        setjenisTonometri(0);
        setflouresceinTest(null);
        setkeratometri1Od(null);
        setkeratometri2Od(null);
        setkeratometri1Os(null);
        setkeratometri2Os(null);
        setbiometriOd(null);
        setbiometriOs(null);
        setaxialOd(null);
        setaxialOs(null);
        setperimet(null);
        setfundusCmetode(null);
        setfundusCpnii(null);
        setfundusCvasa(null);
        setfundusCretina(null);
        setfundusCmacula(null);
        setfundusCketeranganOd(null);
        setfundusCpniios(null);
        setfundusCvasaOs(null);
        setfundusCretinaOs(null);
        setfundusCmaculaOs(null);
        setfundusCketeranganOs(null);
        setresikoJatuh(null);
      });
  };

  const insertMata = (datamata) => {
    axios
      .post(`${apiku}/EmrPemeriksaanKhusus/Mata`, datamata, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil disimpan!");
        } else {
          console.log(res.data.result);
          message.warning(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal disimpan!");
      });
  };

  return (
    <PoliMataContext.Provider
      value={{
        detailMata,
        insertMata,
        sph1A,
        setsph1A,
        sph1B,
        setsph1B,
        cyl1A,
        setcyl1A,
        cyl1B,
        setcyl1B,
        axs1A,
        setaxs1A,
        axs1B,
        setaxs1B,
        sph2A,
        setsph2A,
        sph2B,
        setsph2B,
        cyl2A,
        setcyl2A,
        cyl2B,
        setcyl2B,
        axs2A,
        setaxs2A,
        axs2B,
        setaxs2B,
        mma,
        setmma,
        mmb,
        setmmb,
        ad,
        setad,
        jh,
        setjh,
        dkt,
        setdkt,
        bfc,
        setbfc,
        optical,
        setoptical,
        ribuan,
        setribuan,
        tanggal,
        settanggal,
        lkp,
        setlkp,
        lns,
        setlns,
        virusSeblOd,
        setvirusSeblOd,
        virusSeblOs,
        setvirusSeblOs,
        binokulerSebl,
        setbinokulerSebl,
        virusSesdOd,
        setvirusSesdOd,
        virusSesdOs,
        setvirusSesdOs,
        binokulerSesd,
        setbinokulerSesd,
        tonometriOd,
        settonometriOd,
        tonometriOs,
        settonometriOs,
        jenisTonometri,
        setjenisTonometri,
        flouresceinTest,
        setflouresceinTest,
        keratometri1Od,
        setkeratometri1Od,
        keratometri2Od,
        setkeratometri2Od,
        keratometri1Os,
        setkeratometri1Os,
        keratometri2Os,
        setkeratometri2Os,
        biometriOd,
        setbiometriOd,
        biometriOs,
        setbiometriOs,
        axialOd,
        setaxialOd,
        axialOs,
        setaxialOs,
        perimet,
        setperimet,
        fundusCmetode,
        setfundusCmetode,
        fundusCpnii,
        setfundusCpnii,
        fundusCvasa,
        setfundusCvasa,
        fundusCretina,
        setfundusCretina,
        fundusCmacula,
        setfundusCmacula,
        fundusCketeranganOd,
        setfundusCketeranganOd,
        fundusCpniios,
        setfundusCpniios,
        fundusCvasaOs,
        setfundusCvasaOs,
        fundusCretinaOs,
        setfundusCretinaOs,
        fundusCmaculaOs,
        setfundusCmaculaOs,
        fundusCketeranganOs,
        setfundusCketeranganOs,
        resikoJatuh,
        setresikoJatuh,
      }}
    >
      {props.children}
    </PoliMataContext.Provider>
  );
};

export default PoliMataContextProvider;
