import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";

const ProfileDropdown = () => {
  const { user } = useSelector((state) => ({
    user: state.Profile.user,
  }));

  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item "
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={user?.profile ? user?.profile : avatar1}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {user?.last_name} {user?.first_name}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                {/* {user?.roles[0]?.name} */}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">
            Welcome {user?.first_name + "  " + user?.last_name}!
          </h6>
          <DropdownItem className="p-0">
            <Link
              to={process.env.PUBLIC_URL + `/profile?id=${user?.id}`}
              className="dropdown-item"
            >
              <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
              <span className="align-middle">{"Profile"}</span>
            </Link>
          </DropdownItem>

          <DropdownItem className="p-0">
            <Link
              to={process.env.PUBLIC_URL + "/logout"}
              className="dropdown-item"
            >
              <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle" data-key="t-logout">
                {"Logout"}
              </span>
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
