/** @format */

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

import DashboardEcommerce from "../../DashboardEcommerce";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import SimpleBar from "simplebar-react";
const index = () => {
  document.title = " Landing | ABMC SCADA - Kibera Technology";

  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("gumbazToken")) {
      navigate("/login");
    }
  }, []);
  const scrollFunction = () => {
    const element = document.getElementById("back-to-top");
    if (element) {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  };
  window.onscroll = function () {
    scrollFunction();
  };
  const toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <React.Fragment>
      <div className="costum_section">
        <div className="header_landing">
          <Navbar />
        </div>

        <DashboardEcommerce />
        {/* <Footer /> */}
      </div>
    </React.Fragment>
  );
};

export default index;
