import React from "react";
import LayoutApp from './Layout';
import HdContext from './HdContext';
import Dashboard from './pages/Hemodialisa';
import { Button } from "antd";

const {
  PasiensProvider,
} = HdContext;

function Hemodialisa() {
  return (
    <PasiensProvider>
      <Dashboard />
    </PasiensProvider>
  );
}

export default Hemodialisa;
