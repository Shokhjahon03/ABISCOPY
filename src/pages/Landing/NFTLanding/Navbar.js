import React, { useState, useEffect } from "react";
import {
  Collapse,
  Container,
  NavbarToggler,
  NavLink,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import Scrollspy from "react-scrollspy";

//import Images
import landinglogo from "../../../assets/images/landinglogo.svg";
import logolight from "../../../assets/images/logo-light.png";
import LanguageDropdown from "../../../Components/Common/LanguageDropdown";
import NotificationDropdown from "../../../Components/Common/NotificationDropdown";
import ProfileDropdown from "../../../Components/Common/ProfileDropdown";
import logoSm from "../../../assets/images/logo-sm.png";
import OpenImage from "../../../assets/images/open.svg";
import SimpleBar from "simplebar-react";
const Navbar = () => {
  const [isOpenMenu, setisOpenMenu] = useState(false);
  const [navClass, setnavClass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  const scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setnavClass("is-sticky");
    } else {
      setnavClass("");
    }
  };
  const [open, setOpen] = useState(false);

  const toggleDefultCanvas = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <div className=" d-flex justify-content-between px-5" id="navbar" style={{height: "40px"}}>
        <div className="d-flex justify-content-end">
          <div className="horizontal-logo" style={{height: "40px"}}>
            <Link to="/real_time_data" className="logo" style={{lineHeight: "40px"}}>
              <img src={landinglogo} alt="" height="25"/>
            </Link>
          </div>
          <Link
            to="/real_time_data"
            className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger text-white "
            style={{height: "40px"}}
            id="topnav-hamburger-icon"
          >
            <span className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <h5 style={{color: "white", marginTop: "7px", marginLeft: "10px"}}>Центральный аппарат Министерства обороны РУз</h5>
          </Link>
          
        </div>
        <div className="d-flex align-items-center justify-content-end ">
          <LanguageDropdown />
          {/* <NotificationDropdown /> */}
          <ProfileDropdown />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
