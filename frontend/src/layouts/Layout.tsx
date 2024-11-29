import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import React from "react";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="layout max-w-[1040px] mx-auto my-32 text-center flex flex-col gap-5">
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
};

export default Layout;