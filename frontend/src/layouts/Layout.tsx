import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import React from "react";
import Footer from "./Footer";
import { ModalOpenProvider } from "../contexts/ModalOpenContext";

const Layout: React.FC = () => {
  return (
    <div className="layout max-w-[1040px] mx-auto my-32 text-center flex flex-col gap-5">
      <ModalOpenProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </ModalOpenProvider>
    </div>
  )
};

export default Layout;