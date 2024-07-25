import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import List from "list.js";

import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  addorganizationAsync,
  deleteorganization,
  deleteorganizationAll,
  editorganizationAsync,
  getorganizationAsync,
} from "../../slices/organization";
import DeleteModal from "../../common/DeleteModal";
import { toast } from "react-toastify";
import { getregionAsync } from "../../slices/region";
import { getdistrictAsync } from "../../slices/district";
import { SketchPicker } from "react-color";
export default function Organizations() {
  const [name, setName] = useState();
  const [checkSelect, setCheckSelect] = useState(true);
  const [multiSelect, setMultiSelect] = useState();
  const regions = useSelector((state) => state.region?.data);
  const districts = useSelector((state) => state.district?.data);
  const [address, setAddress] = useState();
  const [modal_list, setmodal_list] = useState(false);
  const [current, setCurrent] = useState();
  const dispatch = useDispatch();
  const organizations = useSelector((state) => state.organization?.data);
  const [colorRGBA, setcolorRGBA] = useState("rgba(247, 204, 83, 1)");

  const [display_RGBA, setdisplay_RGBA] = useState(false);
  useEffect(() => {
    dispatch(getorganizationAsync(`organization`));
    dispatch(getregionAsync(`region`));
    dispatch(getdistrictAsync(`district`));
  }, []);
  function tog_list() {
    setmodal_list(!modal_list);
  }

  const [modal_delete, setmodal_delete] = useState(false);
  function handleRGBA() {
    setdisplay_RGBA(!display_RGBA);
  }
  const onSwatchHover_RGBA = (color) => {
    const format =
      "rgba(" +
      color.rgb.r +
      "," +
      color.rgb.g +
      "," +
      color.rgb.b +
      "," +
      color.rgb.a +
      ")";
    setcolorRGBA(format);
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    const dataDocument = {
      name: name,
      regionId: document.getElementById("region").value,
      districtId: document.getElementById("district").value,
      address: address,
      color: colorRGBA,
    };
    const response = await addorganizationAsync("organization", dataDocument);

    if (response?.errorCode) {
      toast.error("An error has occurred!");
    } else {
      toast.success("Done successfully!");
      dispatch(getorganizationAsync(`organization`));
      setmodal_list(false);
      setCurrent();
    }
  };
  const onClickEdite = (item) => {
    setmodal_list(true);
    setCurrent(item);
  };
  const handleEdite = async (e) => {
    e.preventDefault();
    const dataDocument = {
      name: document.getElementById("name").value,
      regionId: document.getElementById("region").value,
      districtId: document.getElementById("district").value,
      address: document.getElementById("address").value,
      color: document.getElementById("color").value,
    };

    const response = await editorganizationAsync(`organization`, {
      ...dataDocument,
      id: current?.id,
    });
    if (response?.errorCode) {
      setmodal_list(false);
      toast.error("An error has occurred!");
    } else {
      toast.success("Done successfully!");
      dispatch(getorganizationAsync(`organization`));
      setmodal_list(false);
      setCurrent();
    }
  };

  const onClickTodoDelete = (item) => {
    setMultiSelect();
    setCurrent(item);
    setmodal_delete(true);
  };
  const handleDelete = async () => {
    if (multiSelect) {
      console.log(multiSelect);
      const data = multiSelect?.map((res) => res.id);
      const response = await deleteorganizationAll(
        `organization/multidelete`,
        data
      );
      if (response?.errorCode) {
        toast.error("An error has occurred!");
      } else {
        toast.success("Done successfully!");
        dispatch(getorganizationAsync(`organization`));
        setMultiSelect();
      }
    } else {
      const response = await deleteorganization(`organization/${current?.id}`);
      if (response?.errorCode) {
        toast.error("An error has occurred!");
      } else {
        toast.success("Done successfully!");
        dispatch(getorganizationAsync(`organization`));
      }
    }
    setmodal_delete(false);
  };
  const handleCheck = (e, id) => {
    if (e.target.checked) {
      setCheckSelect(false);
    } else {
      const elementsWithName = document.getElementsByName("check");
      const elementsArray = Array.from(elementsWithName);
      const checkedValues = elementsArray.filter((e) => e.checked);

      if (checkedValues.length < 1) {
        setCheckSelect(true);
        let checkall = document.getElementById("checkAll");
        checkall.checked = false;
      }
    }
  };

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setCheckSelect(false);
    } else setCheckSelect(true);
    let check = document.getElementsByClassName("checkItem");
    let checkall = document.getElementById("checkAll");
    {
      for (var i = 0; i < check.length; i++) {
        check[i].checked = checkall.checked;
      }
    }
  };
  const handleMultiDelete = () => {
    const elementsWithName = document.getElementsByName("check");
    const elementsArray = Array.from(elementsWithName);
    const checkedValues = elementsArray
      .filter((e) => e.checked) // Filter checked elements
      .map((e) => JSON.parse(e.value)); // Map the checked elements to their values
    console.log(checkedValues);
    setMultiSelect(checkedValues);
    setmodal_delete(true);
  };

  document.title = "Organization | ABMC SCADA - Kibera Technology";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Организации" pageTitle="Директория" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="listjs-table" id="customerList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div>
                          <Button
                            color="success"
                            className="add-btn"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
                            Добавить
                          </Button>{" "}
                          <Button
                            className="btn btn-soft-danger"
                            onClick={() => handleMultiDelete()}
                            disabled={checkSelect}
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </Button>
                        </div>
                      </Col>
                      <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Поиск..."
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkAll"
                                  value="option"
                                  onChange={handleCheckAll}
                                />
                              </div>
                            </th>
                            <th>Имя</th>
                            <th>Регионы</th>
                            <th>Районы</th>
                            <th>Адрес</th>
                            <th>Цвет</th>
                            <th className="text-end">
                              Действие
                              <span style={{ marginRight: "70px" }}></span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {organizations?.map((res, i) => (
                            <tr key={res?.id}>
                              <td scope="row">
                                <div className="form-check">
                                  <input
                                    className="checkItem form-check-input"
                                    type="checkbox"
                                    name="check"
                                    value={JSON.stringify(res)}
                                    onChange={(e) => handleCheck(e, res?.id)}
                                  />
                                </div>
                              </td>
                              <td style={{ width: "50%" }}>{res?.name}</td>
                              <td style={{ width: "10%" }}>
                                {res?.regionDTO?.name}
                              </td>
                              <td style={{ width: "10%" }}>
                                {res?.districtDTO?.name}
                              </td>
                              <td style={{ width: "10%" }}>{res?.address}</td>
                              <td style={{ width: "10%" }}>
                                <div
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                    borderRadius: "50%",
                                    backgroundColor: res?.color,
                                  }}
                                ></div>
                              </td>
                              <td>
                                <div className="d-flex gap-2 justify-content-end">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      onClick={() => onClickEdite(res)}
                                    >
                                      Редактировать
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      style={{ marginRight: "30px" }}
                                      onClick={() => onClickTodoDelete(res)}
                                    >
                                      Удалять
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Предыдущий
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Следующий
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
      >
        <ModalHeader className="bg-light p-3">
          {current ? "Редактировать" : "Добавить"}
          <Button
            type="button"
            onClick={() => {
              setmodal_list(false);
            }}
            className="btn-close"
            aria-label="Close"
          ></Button>
        </ModalHeader>
        <form
          className="tablelist-form"
          onSubmit={current ? handleEdite : handleAdd}
        >
          <ModalBody>
            <div className="mb-3" id="modal-id" style={{ display: "none" }}>
              <label htmlFor="id-field" className="form-label">
                ID
              </label>
              <input
                type="text"
                id="id-field"
                className="form-control"
                placeholder="ID"
                readOnly
              />
            </div>

            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Имя
              </label>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Введите имя"
                onChange={(e) => setName(e.target.value)}
                defaultValue={current?.name}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Регионы
              </label>
              <Input
                id="region"
                type="select"
                className="form-control"
                name="region"
                defaultValue={current?.regionDTO?.name}
                required
              >
                {regions?.map((res) => (
                  <option key={res.id} value={res.id}>
                    {res?.name}
                  </option>
                ))}
              </Input>
            </div>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Районы
              </label>
              <Input
                id="district"
                type="select"
                className="form-control"
                name="district"
                defaultValue={current?.districtDTO?.name}
                required
              >
                {districts?.map((res) => (
                  <option key={res.id} value={res.id}>
                    {res?.name}
                  </option>
                ))}
              </Input>
            </div>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Адрес
              </label>
              <input
                id="address"
                type="text"
                className="form-control"
                placeholder="Введите адрес"
                onChange={(e) => setAddress(e.target.value)}
                defaultValue={current?.address}
                required
              />
            </div>
            <div className="mb-3">
              <h5 className="fs-13 text-muted mb-2">Nano Demo</h5>

              <div className="nano-colorpicker" onClick={handleRGBA}>
                <i
                  style={{
                    height: "28px",
                    width: "28px",
                    background: current ? current?.color : colorRGBA,
                    display: "block",
                  }}
                />
              </div>

              {display_RGBA ? (
                <SketchPicker
                  id="color"
                  color={current ? current?.color : "#fff"}
                  value={colorRGBA}
                  width="160px"
                  onChangeComplete={onSwatchHover_RGBA}
                />
              ) : null}
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setmodal_list(false)}
              >
                Закрывать
              </button>
              {current ? (
                <button type="submit" className="btn btn-success" id="add-btn">
                  Сохранять
                </button>
              ) : (
                <button type="submit" className="btn btn-success" id="add-btn">
                  Добавить
                </button>
              )}
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Remove Modal */}
      <DeleteModal
        show={modal_delete}
        data={current?.name}
        onDeleteClick={handleDelete}
        onCloseClick={() => setmodal_delete(false)}
      />
    </React.Fragment>
  );
}
