import React, { createContext } from "react";
import GiziAsuhanContextProvider from "../penunjang/gizi/context/AsuhanGiziContext";
import PrintOutContextProvider from "../PrintOutDokumen/PrintOutContext";
import {
  AnamnesaRIContextProvider,
  HasilRadiologiContextProvider,
  PantuanInfeksiContextProvider,
  MorfologiContextProvider,
  RM13ContextProvider,
  RM14ContextProvider,
  JenisTenagaKesehatanContextProvider,
  DischargePlanningContextProvider,
  AskepContextProvider,
  DiagnosaRIContextProvider,
  ProsedurRIContextProvider,
  KonsulRIContextProvider,
  PasienRIContextProvider,
  TransferPasienRIContextProvider,
  JadwalOperasiRIContextProvider,
  SuratKeteranganRIContextProvider,
  PerkembanganPasienRIContextProvider,
  AssesmentRIContextProvider,
  PelayananRIContextProvider,
  BillingRIContextProvider,
  OrderPenunjangRIContextProvider,
  ResepRIContextProvider,
  TTVRIContextProvider,
  EwsRIContextProvider,
  InsidenContextProvider,
} from "../rawatinap/context";
import InformRIContextProvider from "../rawatinap/context/InformConcernRIContext";
import CatatanAskepContextProvider from "../rawatinap/context/CatatanAskepContext";
import PemeriksaanFisikRIContextProvider from "../rawatinap/context/PemeriksaanFisikRIContext";
import BankDarahContextProvider from "../penunjang/bankDarah/context/BankDarahContext";
import KemoterapiContextProvider from "../penunjang/kemoterapi/context/KemoterapiContext";
import PengkajianContextProvider from "../rawatinap/context/PengkajianContext";

export const TransaksiRIContext = createContext();

const TransaksiRIContextProvider = (props) => {
  return (
    <PasienRIContextProvider>
      <PrintOutContextProvider>
        <TransferPasienRIContextProvider>
          <AnamnesaRIContextProvider>
            <KonsulRIContextProvider>
              <DiagnosaRIContextProvider>
                <ProsedurRIContextProvider>
                  <JadwalOperasiRIContextProvider>
                    <RM13ContextProvider>
                      <RM14ContextProvider>
                        <PantuanInfeksiContextProvider>
                          <MorfologiContextProvider>
                            <DischargePlanningContextProvider>
                              <AskepContextProvider>
                                <HasilRadiologiContextProvider>
                                  <JenisTenagaKesehatanContextProvider>
                                    <SuratKeteranganRIContextProvider>
                                      <PerkembanganPasienRIContextProvider>
                                        <PelayananRIContextProvider>
                                          <BillingRIContextProvider>
                                            <OrderPenunjangRIContextProvider>
                                              <ResepRIContextProvider>
                                                <AssesmentRIContextProvider>
                                                  <TTVRIContextProvider>
                                                    <EwsRIContextProvider>
                                                      <InsidenContextProvider>
                                                        <GiziAsuhanContextProvider>
                                                          <InformRIContextProvider>
                                                            <CatatanAskepContextProvider>
                                                              <PemeriksaanFisikRIContextProvider>
                                                                <BankDarahContextProvider>
                                                                  <KemoterapiContextProvider>
                                                                    <PengkajianContextProvider>
                                                                      {
                                                                        props.children
                                                                      }
                                                                    </PengkajianContextProvider>
                                                                  </KemoterapiContextProvider>
                                                                </BankDarahContextProvider>
                                                              </PemeriksaanFisikRIContextProvider>
                                                            </CatatanAskepContextProvider>
                                                          </InformRIContextProvider>
                                                        </GiziAsuhanContextProvider>
                                                      </InsidenContextProvider>
                                                    </EwsRIContextProvider>
                                                  </TTVRIContextProvider>
                                                </AssesmentRIContextProvider>
                                              </ResepRIContextProvider>
                                            </OrderPenunjangRIContextProvider>
                                          </BillingRIContextProvider>
                                        </PelayananRIContextProvider>
                                      </PerkembanganPasienRIContextProvider>
                                    </SuratKeteranganRIContextProvider>
                                  </JenisTenagaKesehatanContextProvider>
                                </HasilRadiologiContextProvider>
                              </AskepContextProvider>
                            </DischargePlanningContextProvider>
                          </MorfologiContextProvider>
                        </PantuanInfeksiContextProvider>
                      </RM14ContextProvider>
                    </RM13ContextProvider>
                  </JadwalOperasiRIContextProvider>
                </ProsedurRIContextProvider>
              </DiagnosaRIContextProvider>
            </KonsulRIContextProvider>
          </AnamnesaRIContextProvider>
        </TransferPasienRIContextProvider>
      </PrintOutContextProvider>
    </PasienRIContextProvider>
  );
};

export default TransaksiRIContextProvider;
