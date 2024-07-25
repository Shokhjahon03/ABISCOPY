/** @format */

import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import {
  Col,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Button,
  Modal,
  ModalHeader,
} from "reactstrap";
import classnames from "classnames";
import { getCurrentObject, getobjectAsync } from "../../slices/object";
import side1 from "../../assets/icon/sideOne.svg";
import side2 from "../../assets/icon/sideTwo.svg";
import side3 from "../../assets/icon/sideThree.svg";
import side4 from "../../assets/icon/sideFour.svg";
import red_dron from "../../assets/images/red_dron.png";
import green_dron from "../../assets/images/green_dron.png";
import blue_dron from "../../assets/images/blue_dron.png";
import black_dron from "../../assets/images/black_icon.png";
import OpenLayers from "./OpenlayersMap";
import RecentActivity from "./RecentActivity";
import { useDispatch, useSelector } from "react-redux";
import { DataService } from "../../helpers/dataService/dataService";
import OpenLayersStory from "./OpenlayersMapStory";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import OpenLayersMapLife from "./OpenLayerMapLife";
import "./map.css";
import { getzoom } from "../../slices/controlled";
import {
  getdata,
  getdronAsync,
  getline,
  getlineAsync,
  setOpen,
} from "../../slices/dron";
import { DronIcon } from "./DronIcon";
import SVG from "react-inlinesvg";
import FollowIcon from "../../assets/images/follow.svg";
import dron_yellow from "../../assets/images/selecteddron.jpg";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/l10n/ru.js";

const DashboardEcommerce = () => {
  document.title = "ABMC SCADA - Kibera Technology";
  const zoomRef = useRef(null);
  const [dronePosition, setDronePosition] = useState([]);
  const [layer, setLayer] = useState(localStorage.getItem("layer"));
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [info, setInfo] = useState("");
  const [infoCard, setInfoCard] = useState(" d-none");
  const [filterr, setFilterr] = useState(" d-none");
  const [dataInfo, setdataInfo] = useState();
  const zoom = useSelector((state) => state.controlled.zoom);
  const mouse = useSelector((state) => state.controlled.mouse);
  const dron = useSelector((state) => state.dron.data);
  const dronline = useSelector((state) => state.dron.line);
  const objectss = useSelector((state) => state.object?.data);
  const [open, setOpens] = useState("1");
  const [droneList, setdroneList] = useState();
  const openInfo = useSelector((state) => state.dron.open);
  const dispatch = useDispatch();
  const [modal_positionTopRight, setmodal_positionTopRight] = useState(false);
  function tog_positionTopRight() {
    setmodal_positionTopRight(!modal_positionTopRight);
  }
  const handleInfoCard = () => {
    if (infoCard === " d-none") {
      dispatch(setOpen(false));
      setInfoCard("");
      setInfo(" d-none");
      setFilterr(" d-none");
    } else {
      dispatch(setOpen(false));
      setInfo(" d-none");
      setInfoCard(" d-none");
      setFilterr(" d-none");
    }
  };
  const handleFilterr = () => {
    if (filterr === " d-none") {
      dispatch(setOpen(false));
      setInfo(" d-none");
      setInfoCard(" d-none");
      setFilterr("");
    } else {
      dispatch(setOpen(false));
      setInfo(" d-none");
      setInfoCard(" d-none");
      setFilterr(" d-none");
    }
  };
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  const toggle = (id) => {
    if (open === id) {
      setOpens();
    } else {
      setOpens(id);
    }
  };
  const handleSearch = (e) => {
    dispatch(getobjectAsync(`object/search?name=${e}`));
  };
  const getData = async () => {
    if (!localStorage.getItem("layer")) {
      localStorage.setItem("layer", "layerosm");
    }
    const inforesponse = await DataService.get("info");
    setdataInfo(inforesponse);
  };
  const handleSelectLayer = (check, id) => {
    localStorage.setItem("layer", id);
    setLayer(id);
  };
  async function initSocket() {
    const socket = new WebSocket("ws://127.0.0.1:8000");
    socket.addEventListener("message", (event) => {
      let response = JSON.parse(event.data);
      console.log("Message from server ", JSON.parse(event.data));
      setDronePosition(JSON.parse(event.data));
    });
    socket.addEventListener("close", (event) => {
      console.log("Connection closed, reconnecting: ", event.data);
      initSocket();
    });

    const response = await DataService.get("drone");
    setdroneList(response);
  }
  const handleZoom = (e) => {
    dispatch(getzoom(e));
  };
  const handleFind = (item) => {
    dispatch(getCurrentObject(item));
  };
  const handleLine = () => {
    if (dronline) {
      dispatch(getline());
    } else {
      tog_positionTopRight();
    }
  };
  const handleLineFilter = async () => {
    let dateFull = document.getElementById("datepicker").value.split(" ");
    let startTimestamp = dateFull[0] + "T" + dateFull[1];
    let endTimestamp = dateFull[3] + "T" + dateFull[4];
    dispatch(
      getlineAsync(
        `tracker-data/filter?droneId=${dron?.drone_id}&startTimestamp=${startTimestamp}&endTimestamp=${endTimestamp}`
      )
    );
    tog_positionTopRight();
  };
  const handleFollow = async () => {
    const response = await DataService.put(`drone/follow/${dron?.id}`, {
      target: !dron?.target,
    });
    dispatch(getdronAsync(`drone/filter?droneId=${dron?.drone_id}`));
    initSocket();
    getData();
  };
  useEffect(() => {
    dispatch(getobjectAsync(`object`));
    dispatch(getCurrentObject());
  }, []);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    initSocket();
    if (dron) {
      setInfo("");
      // dispatch(getlineAsync(`tracker-data/filter?droneId=${dron?.drone_id}`));
    }
  }, [dronePosition]);

  return (
    <React.Fragment>
      <Modal
        id="top-rightmodal"
        isOpen={modal_positionTopRight}
        toggle={() => {
          tog_positionTopRight();
        }}
        className="modal-dialog-right"
      >
        <div className="modal-body ">
          <p className="text-muted fs-4">Выберите временной интервал</p>

          <Flatpickr
            className="form-control "
            id="datepicker"
            options={{
              locale: "ru",
              mode: "range",
              enableTime: true,
              dateFormat: "Y-m-d H:i",
              defaultDate: [
                new Date().setDate(new Date().getDate() - 1),
                new Date(),
              ],
            }}
            onChange={(e) => console.log(e)}
          />
        </div>
        <div className="modal-footer">
          <div className="hstack gap-2 justify-content-center">
            <Link
              to="#"
              className="btn btn-link link-success fw-medium"
              onClick={() => {
                tog_positionTopRight();
              }}
            >
              <i className="ri-close-line me-1 align-middle"></i> Отменить
            </Link>
            <Link to="#" className="btn btn-success" onClick={handleLineFilter}>
              Фильтр
            </Link>
          </div>
        </div>
      </Modal>

      <div className="d-flex">
        <Col xl={12}>
          <OpenLayersMapLife
            dronePosition={dronePosition}
            layer={layer}
            droneList={droneList}
          />
        </Col>
        <div className="left-card">
          <div id="PopoverDismissible" className="cursor-pointer">
            <i className=" ri-stack-line text-white  fs-24 "></i>
          </div>
          <UncontrolledPopover
            placement="right"
            target="PopoverDismissible"
            trigger="legacy"
          >
            {/* <PopoverHeader>Фоновые карты</PopoverHeader> */}
            <PopoverBody>
              <div className="form-check mb-2">
                <Input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="cadastre-satellite"
                  onChange={(e) =>
                    handleSelectLayer(e.target.checked, "cadastre-satellite")
                  }
                  defaultChecked={
                    localStorage.getItem("layer") == "cadastre-satellite"
                  }
                />
                <Label
                  className="form-check-label"
                  htmlFor="cadastre-satellite"
                >
                  Спутник 1{" "}
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="satellite"
                  defaultChecked={localStorage.getItem("layer") == "satellite"}
                  onChange={(e) =>
                    handleSelectLayer(e.target.checked, "satellite")
                  }
                />
                <Label className="form-check-label" htmlFor="satellite">
                  Спутник 2{" "}
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="layerosm"
                  defaultChecked={localStorage.getItem("layer") == "layerosm"}
                  onChange={(e) =>
                    handleSelectLayer(e.target.checked, "layerosm")
                  }
                />
                <Label className="form-check-label" htmlFor="layerosm">
                  OSM{" "}
                </Label>
              </div>
              <div className="form-check">
                <Input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="layerxyz"
                  onChange={(e) =>
                    handleSelectLayer(e.target.checked, "layerxyz")
                  }
                  defaultChecked={localStorage.getItem("layer") == "layerxyz"}
                />
                <Label className="form-check-label" htmlFor="layerxyz">
                  Гибрид{" "}
                </Label>
              </div>
            </PopoverBody>
          </UncontrolledPopover>
          <div id="scaleline"></div>
          <div className="cursor-pointer" onClick={() => handleZoom(zoom + 1)}>
            <i className="  ri-add-circle-line text-white  fs-24 "></i>
          </div>
          <div className="cursor-pointer" onClick={() => handleZoom(zoom - 1)}>
            <i className=" ri-indeterminate-circle-line text-white  fs-24 "></i>
          </div>
        </div>

        <div className={openInfo ? "cardd" : "cardd d-none"}>
          <div className="cardd-header">
            <img src={side3} />
            <p style={{ color: "white", marginLeft: "10px" }}>
              ИНФОРМАЦИЯ ОБ ОБЪЕКТЕ
            </p>
          </div>
          <div className="cardd-body">
            <div className="d-flex row">
              <div className="col-6 mb-1">
                <h6>Категория объекта</h6>
                <p style={{ color: "#27374D" }}>Движущие объекты</p>
              </div>
              <div className="col-6 mb-1">
                <h6>Тип объекта</h6>
                <p style={{ color: "#27374D" }}>Дроны</p>
              </div>
              <div className="col-6 mb-1">
                <h6>Наименование</h6>
                <p style={{ color: "#27374D" }}>{dron?.name}</p>
              </div>
              <div className="col-6 mb-1">
                <h6>ID объекта</h6>
                <p style={{ color: "#27374D" }}>{dronePosition?.dron_id}</p>
              </div>
              <div className="col-6 mb-1">
                <h6>Модель</h6>
                <p style={{ color: "#27374D" }}>{dron?.model}</p>
              </div>
              <div className="col-6 mb-1">
                <h6>Владелец</h6>
                <p style={{ color: "#27374D" }}>{dron?.owner?.name}</p>
              </div>
              <div className="col-6 mb-1">
                <h6>Координаты</h6>
                <p style={{ color: "#27374D" }}>
                  <p className="m-0">X: {dronePosition?.longitude}</p>
                  <p className="m-0">Y: {dronePosition?.latitude}</p>
                  <p className="m-0">Z: {dronePosition?.altitude}</p>
                </p>
              </div>
              <div className="col-6 mb-1">
                <h6>Дистанция</h6>
                <p style={{ color: "#27374D" }}>12555,25 м</p>
              </div>
              <div className="col-6 mb-1">
                <h6>Высота</h6>
                <p style={{ color: "#27374D" }}>{dronePosition?.altitude} м</p>
              </div>

              <div className="col-6 mb-1">
                <h6>Скорость</h6>
                <p style={{ color: "#27374D" }}>{dronePosition?.speed} км/ч</p>
              </div>
              <div className="mt-2 links">
                <Button className="link" onClick={handleFollow}>
                  {!dron?.target ? (
                    <img src={side1} width={35} />
                  ) : (
                    <img src={FollowIcon} width={35} />
                  )}
                </Button>

                <Link className="link">
                  <img src={side2} />
                </Link>
                <Button className="link" onClick={handleLine}>
                  <i
                    className="las la-route fs-36"
                    style={dronline ? { color: "#FF9F0E" } : { color: "white" }}
                  ></i>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className={"right-card" + filterr}>
          <div className="cardd-header">
            <img src={side4} style={{ marginLeft: "20px" }} />
            <p style={{ color: "white", marginLeft: "10px" }}>
              ФИЛЬТР ОБ ОБЪЕКТЕ
            </p>
          </div>
          <Nav tabs className="nav nav-tabs nav-tabs-custom nav-dark  mb-3">
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({
                  active: customActiveTab === "1",
                })}
                onClick={() => {
                  toggleCustom("1");
                }}
              >
                <i className="bx bx-detail fs-18"></i>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({
                  active: customActiveTab === "2",
                })}
                onClick={() => {
                  toggleCustom("2");
                }}
              >
                <i className="bx bx-search fs-18"></i>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ cursor: "pointer" }}
                className={classnames({
                  active: customActiveTab === "3",
                })}
                onClick={() => {
                  toggleCustom("3");
                }}
              >
                <i className="bx bx-filter-alt fs-18"></i>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={customActiveTab} className="text-muted ">
            <TabPane tabId="1">
              <Accordion open={open} toggle={toggle} color="grey ">
                <AccordionItem>
                  <AccordionHeader targetId="1">
                    Административные объекты
                  </AccordionHeader>
                  <AccordionBody accordionId="1">
                    <Input
                      placeholder="Поиск  по названию ГТС ..."
                      onChange={(e) => handleSearch(e.target.value)}
                      className="form-control search mb-2"
                    />
                    {objectss?.map((res) => (
                      <Link key={res?.id} onClick={() => handleFind(res)}>
                        <p
                          style={{
                            color: "black",
                            fontFamily: "Montserrat",
                            fontWeight: "400",
                          }}
                        >
                          {res?.name}
                        </p>
                      </Link>
                    ))}
                  </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader targetId="2">
                    Промышленные объекты
                  </AccordionHeader>
                  <AccordionBody accordionId="2"></AccordionBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader targetId="3">
                    Социальные объекты
                  </AccordionHeader>
                  <AccordionBody accordionId="3"></AccordionBody>
                </AccordionItem>
              </Accordion>
            </TabPane>
            <TabPane tabId="2">
              <div className="d-flex justify-content-center">
                <p style={{ color: "black" }}>Условия поиска</p>
                <Input type="checkbox" />
              </div>
            </TabPane>
          </TabContent>
        </div>
        <div className="buttons">
          <Link className="link" onClick={handleInfoCard}>
            <img src={side3} />
          </Link>
          <Link className="link" onClick={handleFilterr}>
            <img src={side4} />
          </Link>
        </div>
        <div className="foot-card">
          <div className="container">
            <div className="d-flex">
              <div className="d-flex">
                <p>Обозначение:</p>
              </div>
              <div className="d-flex">
                <img src={red_dron} />
                <p>MUV</p>
              </div>

              <div className="d-flex">
                <img src={green_dron} />
                <p>CHQ</p>
              </div>

              <div className="d-flex">
                <img src={black_dron} />
                <p>QXV</p>
              </div>
              <div className="d-flex">
                <img src={dron_yellow} />
                <p>Отслеживаемые</p>
              </div>
            </div>
          </div>
        </div>
        <div className={"info-cardd" + infoCard}>
          <div className="info-cardd-header">
            <img src={side3} />
            <p style={{ color: "white", marginLeft: "10px" }}>
              ИНФОРМАЦИЯ ОБ ОБЪЕКТЕ
            </p>
          </div>
          <div className="info-cardd-body">
            <div className="d-flex row">
              <div className="col-6 mb-3">
                <h6>Кол-во дронов </h6>
                <h1 style={{ color: "#4b5320" }} className="px-4">
                  {dataInfo?.drones}
                </h1>
              </div>
              <div className="col-6 mb-3">
                <h6>Кол-во объектов</h6>
                <h1 style={{ color: "#4b5320" }} className="px-4">
                  {dataInfo?.objects}
                </h1>
              </div>
              <div className="col-6 mb-3">
                <h6> Кол-во отслеживаемых дронов</h6>
                <h1 style={{ color: "#4b5320" }} className="px-4">
                  {dataInfo?.targetDrones}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
