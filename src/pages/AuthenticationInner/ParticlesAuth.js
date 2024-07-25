import React, { useEffect, useRef } from "react";
import withRouter from "../../Components/Common/withRouter";
import "./style.css";
const ParticlesAuth = ({ children }) => {
  return (
    <React.Fragment>
      <div className="auth-page-wrapper">
        {/* <video
          autoPlay
          muted
          loop
          id="myVideo"
          className="overlay"
          ref={vidRef}
          src={Videos}
        /> */}
        {/* <img src={logo} /> */}
        {/* <div className="auth-one-bg-position auth-one-bg" id="auth-particles"> */}
        {/* <div
          className="auth-one-bg-position auth-login-army "
          id="auth-particles"
        >
          <div className="bg-overlay"></div>

          <div className="shape">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1440 120"
            >
              <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
            </svg>
          </div>
        </div> */}

        {/* pass the children */}
        <div className="login_wrap_center">{children}</div>
        {/* <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-12"></div>
            </div>
          </div>
        </footer> */}
      </div>
    </React.Fragment>
  );
};

export default withRouter(ParticlesAuth);
