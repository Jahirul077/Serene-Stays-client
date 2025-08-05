import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/share/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Root;
