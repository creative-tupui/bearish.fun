import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import React from "react";
import Footer from "./Footer";
import { ModalOpenProvider } from "../contexts/ModalOpenContext";
import { PoolProvider } from "../contexts/PoolContext";

const Layout: React.FC = () => {
  return (
    <div className="layout max-w-[1040px] mx-auto my-[72px] text-center flex flex-col gap-5">
      <ModalOpenProvider>
        <PoolProvider>
          <Navbar />
          <Outlet />
          <Footer />
        </PoolProvider>
      </ModalOpenProvider>
    </div>
  )
};

export default Layout;