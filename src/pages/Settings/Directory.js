import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import classnames from "classnames";
import Brand from "../Directories/Brand";
import Manifacturer from "../Directories/Manifacturer";
import CountryOrigin from "../Directories/CountryOrigin";
import SensorType from "../Directories/SensorType";
import Category from "../Directories/Category";
import Region from "../Directories/Region";
import District from "../Directories/District";
import Position from "../Directories/Position";

const Directory = () => {
  const [animationNavTab, setanimationNavTab] = useState("1");
  const animationNavToggle = (tab) => {
    if (animationNavTab !== tab) {
      setanimationNavTab(tab);
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Справочник" pageTitle="Base UI" />
          <Row>
            <Col xxl={12}>
              <h5 className="mb-3">Справочник</h5>
              <Card>
                <CardBody>
                  <Nav
                    pills
                    className="nav nav-pills animation-nav nav-justified gap-2 mb-3"
                  >
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: animationNavTab === "1",
                        })}
                        onClick={() => {
                          animationNavToggle("1");
                        }}
                      >
                        Бренд
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: animationNavTab === "2",
                        })}
                        onClick={() => {
                          animationNavToggle("2");
                        }}
                      >
                        Производитель
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: animationNavTab === "3",
                        })}
                        onClick={() => {
                          animationNavToggle("3");
                        }}
                      >
                        Страна происхождения
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: animationNavTab === "4",
                        })}
                        onClick={() => {
                          animationNavToggle("4");
                        }}
                      >
                        Тип датчика
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: animationNavTab === "5",
                        })}
                        onClick={() => {
                          animationNavToggle("5");
                        }}
                      >
                        Категория
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: animationNavTab === "6",
                        })}
                        onClick={() => {
                          animationNavToggle("6");
                        }}
                      >
                        Область
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: animationNavTab === "7",
                        })}
                        onClick={() => {
                          animationNavToggle("7");
                        }}
                      >
                        Районы
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: animationNavTab === "8",
                        })}
                        onClick={() => {
                          animationNavToggle("8");
                        }}
                      >
                        Должность
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent
                    activeTab={animationNavTab}
                    className="text-muted"
                  >
                    <TabPane tabId="1" id="animation-home">
                      <Brand />
                    </TabPane>

                    <TabPane tabId="2" id="animation-profile">
                      <Manifacturer />
                    </TabPane>

                    <TabPane tabId="3" id="animation-messages">
                     <CountryOrigin />
                    </TabPane>

                    <TabPane tabId="4" id="animation-settings">
                      <SensorType />
                    </TabPane>

                    <TabPane tabId="5" id="animation-settings">
                      <Category />
                    </TabPane>

                    <TabPane tabId="6" id="animation-settings">
                      <Region />
                    </TabPane>

                    <TabPane tabId="7" id="animation-settings">
                      <District />
                    </TabPane>

                    <TabPane tabId="8" id="animation-settings">
                      <Position />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Directory;
