import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addregionAsync,
  deleteregion,
  editregionAsync,
  getregionAsync,
} from "../../slices/region";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "feather-icons-react/build/IconComponents";
import DeleteModal from "../../common/DeleteModal";
import {
  adddistrictAsync,
  deletedistrict,
  editdistrictAsync,
  getdistrict,
  getdistrictAsync,
} from "../../slices/district";
import { categories } from "../../common/data/jobLanding";
import { getcategory, getcategoryAsync } from "../../slices/category";
import {
  addobjectAsync,
  deleteobject,
  deleteobjectAll,
  editobjectAsync,
  getobjectAsync,
} from "../../slices/object";

const Objects = () => {
  const Decimal = require("decimal.js");

  const [name, setName] = useState();
  const categories = useSelector((state) => state.category?.data);
  const districts = useSelector((state) => state.district?.data);
  const [level, setLevel] = useState();
  const [checkSelect, setCheckSelect] = useState(true);
  const [multiSelect, setMultiSelect] = useState();
  const [address, setAddress] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [modal_list, setmodal_list] = useState(false);
  const [current, setCurrent] = useState();
  const dispatch = useDispatch();
  const regions = useSelector((state) => state.region?.data);
  const objects = useSelector((state) => state.object?.data);

  useEffect(() => {
    dispatch(getregionAsync(`region`));
    dispatch(getdistrictAsync(`district`));
    dispatch(getcategoryAsync(`category`));
    dispatch(getobjectAsync(`object`));
  }, []);
  function tog_list() {
    setmodal_list(!modal_list);
  }

  const [modal_delete, setmodal_delete] = useState(false);
  const handleAdd = async (e) => {
    e.preventDefault();
    const dataDocument = {
      name: name,
      level: level,
      address: address,
      longitude: new Decimal(longitude),
      latitude: new Decimal(latitude),
      regionId: document.getElementById("regionId").value,
      districtId: document.getElementById("districtId").value,
      categoryId: document.getElementById("categoryId").value,
    };

    const response = await addobjectAsync("object", dataDocument);
    if (response?.errorCode) {
      toast.error("An error has occurred!");
    } else {
      toast.success("Done successfully!");
      dispatch(getobjectAsync(`object`));
      setmodal_list(false);
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
      level: document.getElementById("level").value,
      address: document.getElementById("address").value,
      longitude: new Decimal(document.getElementById("longitude").value),
      latitude: new Decimal(document.getElementById("latitude").value),
      regionId: document.getElementById("regionId").value,
      districtId: document.getElementById("districtId").value,
      categoryId: document.getElementById("categoryId").value,
    };
    const response = await editobjectAsync(`object`, {
      ...dataDocument,
      id: current?.id,
    });
    if (response?.errorCode) {
      setmodal_list(false);
      toast.error("An error has occured!");
    } else {
      toast.success("Done successfully!");
      dispatch(getobjectAsync(`object`));
      setmodal_list(false);
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
      const response = await deleteobjectAll(`object/multidelete`, data);
      if (response?.errorCode) {
        toast.error("An error has occurred!");
      } else {
        toast.success("Done successfully!");
        dispatch(getobjectAsync(`object`));
        setMultiSelect();
      }
    } else {
      const response = await deleteobject(`object/${current?.id}`);
      if (response?.errorCode) {
        toast.error("An error has occurred!");
      } else {
        toast.success("Done successfully!");
        dispatch(getobjectAsync(`object`));
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
  document.title = "Objects | ABMC SCADA - Kibera Technology";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Объекты" pageTitle="Директория" />
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

                            <th className="text-center">Имя</th>
                            <th className="text-center">Категория</th>
                            <th className="text-center">Уровень</th>
                            <th className="text-center">Регионы</th>
                            <th className="text-center">Районы</th>
                            <th className="text-center">Адрес</th>
                            <th className="text-center">Широта</th>
                            <th className="text-center">Долгота</th>
                            <th className="text-center">Действие</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {objects?.map((res, i) => (
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
                              <td className="text-center">{res?.name}</td>
                              <td className="text-center">
                                {res?.categoryDTO?.name}
                              </td>
                              <td className="text-center">{res?.level}</td>
                              <td className="text-center">
                                {res?.regionDTO?.name}
                              </td>
                              <td className="text-center">
                                {res?.districtDTO?.name}
                              </td>
                              <td className="text-center">{res?.address}</td>
                              <td className="text-center">{res?.latitude}</td>
                              <td className="text-center">{res?.longitude}</td>
                              <td className="d-flex justify-content-center">
                                <div className="d-flex gap-2">
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
        id="myModal"
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
                Категория
              </label>
              <Input
                id="categoryId"
                type="select"
                className="form-control"
                name="categoryId"
                defaultValue={current?.categoryDTO?.name}
                required
              >
                {categories?.map((res) => (
                  <option key={res.id} value={res.id}>
                    {res?.name}
                  </option>
                ))}
              </Input>
            </div>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Уровень
              </label>
              <select
                className="form-control"
                type="select"
                id="level"
                defaultValue={current?.level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="Republican">Republican</option>
                <option value="Regional">Regional</option>
                <option value="District">District</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Регионы
              </label>
              <Input
                id="regionId"
                type="select"
                className="form-control"
                name="categoryId"
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
                id="districtId"
                type="select"
                className="form-control"
                name="districtId"
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
                placeholder="Введите Адрес"
                onChange={(e) => setAddress(e.target.value)}
                defaultValue={current?.address}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Широта
              </label>
              <input
                id="latitude"
                type="text"
                className="form-control"
                placeholder="Введите Широта"
                onChange={(e) => setLatitude(e.target.value)}
                defaultValue={current?.latitude}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Долгота
              </label>
              <input
                id="longitude"
                type="text"
                className="form-control"
                placeholder="Введите Долгота"
                onChange={(e) => setLongitude(e.target.value)}
                defaultValue={current?.longitude}
                required
              />
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
};

export default Objects;
