import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Input,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import SimpleMap from "../Maps/LeafletMaps/MapsLeaflet/MapWithPopup";
import pen from "../../assets/icon/pen.svg";
import { getdroneFilterAsync } from "../../slices/drone";
import { getsensorAsync } from "../../slices/sensor";
import { useDispatch } from "react-redux";
import { DataService } from "../../helpers/dataService/dataService";
import { toast } from "react-toastify";
const DroneCard = () => {
  let [searchParams] = useSearchParams();
  const [filterDroneID, setFilterDroneID] = useState();
  const [arr, setArr] = useState([]);
  const [steel, setSteel] = useState(" d-none");
  const [activeTab, setActiveTab] = useState("1");
  const dispatch = useDispatch();
  const [current, setCurrent] = useState();
  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const getDroneById = async () => {
    const response = await getdroneFilterAsync(
      `drone/${searchParams.get("id")}`
    );
    setCurrent(response);
  };
  useEffect(() => {
    getDroneById();
  }, [searchParams.get("id")]);
  const getData = async () => {
    const unused = await DataService.get("sensor/filter/unused");
    setArr(unused);
  };
  useEffect(() => {
    getData();
  }, []);
  const putData = async () => {
    const dataDocument = {
      id: document.getElementById("arr").value,
      typeHost: "DRONE",
      hostId: searchParams.get("id"),
    };

    const response = await DataService.put(`sensor/add-host/`, dataDocument);

    if (response?.errorCode) {
      toast.error("An error has occurred!");
    } else {
      toast.success("Done successfully!");
      getFilterData();
      getData();
    }
  };
  const getFilterData = async () => {
    const res = await DataService.get(
      `sensor/filter/drone?droneId=${searchParams.get("id")}`
    );
    setFilterDroneID(res);
  };
  useEffect(() => {
    getFilterData();
  }, []);
  const putNullData = async (ID) => {
    const dataDocument = {
      id: ID,
      typeHost: null,
      hostId: null,
    };

    const response = await DataService.put(`sensor/add-host/`, dataDocument);

    if (response?.errorCode) {
      toast.error("An error has occurred!");
    } else {
      toast.success("Done successfully!");
      getFilterData();
      getData();
    }
  };
  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <div className="col-xl-12 col-lg-12">
            <div>
              <div className="card">
                <div className="d-flex justify-content-between px-5 py-3 align-item-center">
                  <p style={{ fontSize: "18px" }}>
                    <strong>Карточка объекта - Дрон:</strong> Кузнечик
                  </p>
                  <Button color="danger" className="btn px-5">
                    Закрыть
                  </Button>
                </div>
                <div className="card-header border-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <Nav
                        style={{ backgroundColor: "#DDE6ED" }}
                        className="nav justify-content-start nav-tabs-custom rounded card-header-tabs border-bottom-0 py-4"
                        role="tablist"
                      >
                        <NavItem className="ms-4">
                          <div
                            className={
                              "nav-link" +
                              classnames(
                                { active: activeTab === "1" },
                                "fw-semibold"
                              )
                            }
                            style={{ color: "#27374D", cursor: "pointer" }}
                            onClick={() => {
                              toggleTab("1", "all");
                            }}
                          >
                            General information
                          </div>
                        </NavItem>

                        <NavItem className="ms-4">
                          <div
                            className={
                              "nav-link" +
                              classnames(
                                { active: activeTab === "2" },
                                "fw-semibold"
                              )
                            }
                            style={{ color: "#27374D", cursor: "pointer" }}
                            onClick={() => {
                              toggleTab("2", "published");
                            }}
                          >
                            Real-time data
                          </div>
                        </NavItem>

                        <NavItem className="ms-4">
                          <div
                            className={
                              "nav-link" +
                              classnames(
                                { active: activeTab === "3" },
                                "fw-semibold"
                              )
                            }
                            style={{ color: "#27374D", cursor: "pointer" }}
                            onClick={() => {
                              toggleTab("3", "draft");
                            }}
                          >
                            Technological events
                          </div>
                        </NavItem>

                        <NavItem className="ms-4">
                          <div
                            className={
                              "nav-link" +
                              classnames(
                                { active: activeTab === "4" },
                                "fw-semibold"
                              )
                            }
                            style={{ color: "#27374D", cursor: "pointer" }}
                            onClick={() => {
                              toggleTab("4", "map");
                            }}
                          >
                            Photo and video shooting
                          </div>
                        </NavItem>
                        <NavItem className="ms-4">
                          <div
                            className={
                              "nav-link" +
                              classnames(
                                { active: activeTab === "5" },
                                "fw-semibold"
                              )
                            }
                            style={{ color: "#27374D", cursor: "pointer" }}
                            onClick={() => {
                              toggleTab("5", "map");
                            }}
                          >
                            История техобслуживаний
                          </div>
                        </NavItem>
                      </Nav>
                    </div>
                    <div className="col-auto"></div>
                  </div>
                </div>
                <div className="card-body pt-3">
                  <TabContent activeTab={activeTab} className="text-muted ">
                    <TabPane tabId="1" id="home">
                      <Row>
                        <Col xl={4}>
                          <div className="py-2 d-flex justify-content-between square border-bottom">
                            <div></div>
                            Регистрационные данные
                            <img
                              src={pen}
                              alt="pen"
                              className="img-fluid"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <Row>
                            <Col xl={6}>
                              <div className="d-flex flex-column">
                                <strong
                                  className="dark mt-2"
                                  style={{ color: "black" }}
                                >
                                  ID
                                </strong>
                                <strong
                                  className="dark mt-2"
                                  style={{ color: "black" }}
                                >
                                  Название
                                </strong>
                                <strong
                                  className="dark mt-2"
                                  style={{ color: "black" }}
                                >
                                  Бренд
                                </strong>
                                <strong
                                  className="dark mt-2"
                                  style={{ color: "black" }}
                                >
                                  Модель
                                </strong>
                                <strong
                                  className="dark mt-2"
                                  style={{ color: "black" }}
                                >
                                  Производитель
                                </strong>
                                <strong
                                  className="dark mt-2"
                                  style={{ color: "black" }}
                                >
                                  Страна происхождения
                                </strong>
                                <strong
                                  className="dark mt-2"
                                  style={{ color: "black" }}
                                >
                                  Год производства
                                </strong>
                                <strong
                                  className="dark mt-2"
                                  style={{ color: "black" }}
                                >
                                  Состояние
                                </strong>
                                <strong
                                  className="dark mt-2"
                                  style={{ color: "black" }}
                                >
                                  Владелец
                                </strong>
                                <strong
                                  className="dark mt-2"
                                  style={{ color: "black" }}
                                >
                                  Оператор
                                </strong>
                                <strong
                                  className="dark mt-2"
                                  style={{ color: "black" }}
                                >
                                  Статус
                                </strong>
                              </div>
                            </Col>
                            <Col xl={6}>
                              <div className="d-flex flex-column">
                                <span
                                  className="mt-2"
                                  style={{ color: "black" }}
                                >
                                  {current?.drone_id}
                                </span>
                                <span
                                  className="mt-2"
                                  style={{ color: "black" }}
                                >
                                  {current?.name}
                                </span>
                                <span
                                  className="mt-2"
                                  style={{ color: "black" }}
                                >
                                  {current?.brandDTO?.name}
                                </span>
                                <span
                                  className="mt-2"
                                  style={{ color: "black" }}
                                >
                                  {current?.model}
                                </span>
                                <span
                                  className="mt-2"
                                  style={{ color: "black" }}
                                >
                                  {current?.manufacturerDTO?.name}
                                </span>
                                <span
                                  className="mt-2"
                                  style={{ color: "black" }}
                                >
                                  {current?.countryOriginDTO?.name}
                                </span>
                                <span
                                  className="mt-2"
                                  style={{ color: "black" }}
                                >
                                  {current?.productionYear}
                                </span>
                                <span
                                  className="mt-2"
                                  style={{ color: "black" }}
                                >
                                  {current?.condition}
                                </span>
                                <span
                                  className="mt-2"
                                  style={{ color: "black" }}
                                >
                                  {current?.ownerDTO?.name}
                                </span>
                                <span
                                  className="mt-2"
                                  style={{ color: "black" }}
                                >
                                  {current?.operatorDTO?.firstName}
                                </span>
                                <span
                                  className="mt-2"
                                  style={{ color: "black" }}
                                >
                                  {current?.status}
                                </span>
                              </div>
                            </Col>
                          </Row>
                          <div className="py-3 d-flex justify-content-between square border-bottom">
                            <div></div>
                            Регистрационные данные
                            <i
                              className="bx bx-plus"
                              style={{ width: "20px", cursor: "pointer" }}
                              onClick={() => setSteel("")}
                            ></i>
                          </div>
                          <Row className={"mt-3" + steel}>
                            <Col xl={8}>
                              <Input type="select" id="arr">
                                {arr?.map((res) => (
                                  <option key={res.id} value={res.id}>
                                    {res?.name}
                                  </option>
                                ))}
                              </Input>
                            </Col>
                            <Col xl={4}>
                              <Button
                                className="btn btn-success"
                                onClick={putData}
                              >
                                {" "}
                                <i className="bx bx-check"></i>
                              </Button>
                              <Button
                                className="btn btn-danger ms-2"
                                onClick={() => setSteel(" d-none")}
                              >
                                x
                              </Button>
                            </Col>
                          </Row>

                          {filterDroneID?.map((cor) => (
                            <div
                              key={cor?.id}
                              value={cor?.id}
                              className="d-flex row"
                            >
                              <span
                                className="col-6 mt-2"
                                style={{ color: "black" }}
                              >
                                {cor?.name}
                              </span>
                              <span
                                className="col-2 mt-2"
                                style={{ color: "black" }}
                              >
                                {cor?.sensorId}
                              </span>
                              <span
                                className="col-2 mt-2"
                                style={{ color: "black" }}
                              >
                                {cor?.model}
                              </span>
                              <span
                                className="col-2 mt-2"
                                style={{ color: "black", cursor: "pointer" }}
                                onClick={()=>putNullData(cor?.id)}
                              >
                                x
                              </span>
                            </div>
                          ))}
                        </Col>
                        <Col xl={8}>
                          <SimpleMap />
                        </Col>
                      </Row>
                    </TabPane>

                    <TabPane tabId="2" id="product">
                      2222222222222222222
                    </TabPane>

                    <TabPane tabId="3" id="messages">
                      <Container fluid>333333333333333333</Container>
                    </TabPane>
                    <TabPane tabId="4" id="map">
                      <Container fluid>444444444444444444444</Container>
                    </TabPane>
                  </TabContent>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default DroneCard;
