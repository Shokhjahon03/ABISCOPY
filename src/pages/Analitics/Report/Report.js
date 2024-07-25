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
// import Waterwork from "./Waterwork";
export default function Report() {
  const [customActiveTab, setcustomActiveTab] = useState("waterwork");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.tab) {
      setcustomActiveTab(params.tab);
    }
  }, [params]);
  const onChange = (tab) => {
    navigate(`/analytics/report/${tab}`);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Визуализация" pageTitle="Аналитика" />
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
                      active: customActiveTab === "waterwork",
                    })}
                    onClick={() => {
                      onChange("waterwork");
                    }}
                  >
                    Гидроузлы
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "reservoirs",
                    })}
                    onClick={() => {
                      onChange("reservoirs");
                    }}
                  >
                    Водохранилища
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "pumping-stations",
                    })}
                    onClick={() => {
                      onChange("pumping-stations");
                    }}
                  >
                    Насосные станции
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "general-indicators",
                    })}
                    onClick={() => {
                      onChange("general-indicators");
                    }}
                  >
                    Общие показатели
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={customActiveTab} className="text-muted">
                <TabPane tabId="waterwork" id="waterwork">
                  {/* <Waterwork /> */}
                </TabPane>
                <TabPane tabId="reservoirs">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <i className="ri-checkbox-multiple-blank-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                      When, while the lovely valley teems with vapour around me,
                      and the meridian sun strikes the upper surface of the
                      impenetrable foliage of my trees, and but a few stray
                      gleams steal into the inner sanctuary, I throw myself down
                      among the tall grass by the trickling stream; and, as I
                      lie close to the earth, a thousand unknown.
                      <div className="mt-2">
                        <Link to="#" className="btn btn-sm btn-soft-primary">
                          Read More{" "}
                          <i className="ri-arrow-right-line ms-1 align-middle"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="pumping-stations">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <i className="ri-checkbox-multiple-blank-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                      Etsy mixtape wayfarers, ethical wes anderson tofu before
                      they sold out mcsweeney's organic lomo retro fanny pack
                      lo-fi farm-to-table readymade. Messenger bag gentrify
                      pitchfork tattooed craft beer, iphone skateboard locavore
                      carles etsy salvia banksy hoodie helvetica. DIY synth PBR
                      banksy irony.
                      <div className="mt-2">
                        <Link to="#" className="btn btn-sm btn-soft-primary">
                          Read More{" "}
                          <i className="ri-arrow-right-line ms-1 align-middle"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="general-indicators">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <i className="ri-checkbox-multiple-blank-fill text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-2">
                      when darkness overspreads my eyes, and heaven and earth
                      seem to dwell in my soul and absorb its power, like the
                      form of a beloved mistress, then I often think with
                      longing, Oh, would I could describe these conceptions,
                      could impress upon paper all that is living so full and
                      warm within me, that it might be the.
                      <div className="mt-2">
                        <Link to="#" className="btn btn-sm btn-soft-primary">
                          Read More{" "}
                          <i className="ri-arrow-right-line ms-1 align-middle"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
}
