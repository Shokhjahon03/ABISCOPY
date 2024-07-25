import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import classnames from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ABMK from "./ABMK";
import Grafik from "../Grafik";
import Canvas from "./FlowScenarios";
// import Waterwork from "./Waterwork";
export default function HidroTabs() {
  let { t } = useTranslation();
  const [customActiveTab, setcustomActiveTab] = useState("page1");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.tab) {
      setcustomActiveTab(params.tab);
    }
  }, [params]);
  const onChange = (tab) => {
    navigate(`/dam/${tab}`);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={t("VISUALIZATION")}
            pageTitle={t("Hydrodynamic modeling")}
          />
          <Card>
            <CardBody>
              <Nav
                tabs
                className="nav nav-tabs nav-tabs-custom  nav-justified mb-3"
              >
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "page1",
                    })}
                    onClick={() => {
                      onChange("page1");
                    }}
                  >
                    {t("Cross sections of gauging stations")}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "page2",
                    })}
                    onClick={() => {
                      onChange("page2");
                    }}
                  >
                    {t("Flow scenarios")}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "page3",
                    })}
                    onClick={() => {
                      onChange("page3");
                    }}
                  >
                    {t("Simulation")}
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={customActiveTab} className="text-muted">
                <TabPane tabId="page1" id="page1">
                  <ABMK />
                </TabPane>
                <TabPane tabId="page2">
                  <Canvas />
                </TabPane>
                <TabPane tabId="page3">
                  <Grafik />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
}
