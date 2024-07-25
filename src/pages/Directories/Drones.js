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
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  adddroneAsync,
  deletedrone,
  deletedroneAll,
  editdroneAsync,
  getdroneAsync,
} from "../../slices/drone";
import { getemployeeAsync } from "../../slices/employee";
import { getorganizationAsync } from "../../slices/organization";
import { getcountryOriginAsync } from "../../slices/countryOrigin";
import { getbrandAsync } from "../../slices/brand";
import { getmanufacturerAsync } from "../../slices/manufacturer";
import { toast } from "react-toastify";
import DeleteModal from "../../common/DeleteModal";
export default function Drones() {
  const [droneID, setDroneID] = useState();
  const [multiSelect, setMultiSelect] = useState();
  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [manufacturer, setManufacturer] = useState();
  const [productionYear, setProductionYear] = useState();
  const [condition, setCondition] = useState();
  const epmloyees = useSelector((state) => state.employee?.data);
  const [checkSelect, setCheckSelect] = useState(true);
  const organizations = useSelector((state) => state.organization?.data);
  const brands = useSelector((state) => state.brand?.data);
  const manufacturers = useSelector((state) => state.manufacturer?.data);
  const countryOrigins = useSelector((state) => state.countryOrigin?.data);
  const [status, setStatus] = useState();
  const [target, setTarget] = useState();
  const [current, setCurrent] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const drones = useSelector((state) => state.drone?.data);

  useEffect(() => {
    dispatch(getdroneAsync(`drone`));
    dispatch(getemployeeAsync(`employee`));
    dispatch(getorganizationAsync(`organization`));
    dispatch(getbrandAsync(`brand`));
    dispatch(getmanufacturerAsync(`manufacturer`));
    dispatch(getcountryOriginAsync(`country-origin`));
  }, []);
  const [modal_list, setmodal_list] = useState(false);
  function tog_list() {
    setmodal_list(!modal_list);
    setCurrent();
  }
  const handleAdd = async (e) => {
    e.preventDefault();
    const dataDocument = {
      drone_id: droneID,
      name: name,
      brandId: document.getElementById("brand").value,
      model: model,
      manufacturerId: document.getElementById("manufacturer").value,
      countryOriginId: document.getElementById("countryOrigin").value,
      productionYear: productionYear,
      condition: document.getElementById("condition").value,
      ownerId: document.getElementById("organization").value,
      operatorId: document.getElementById("employee").value,
      status: document.getElementById("statuss").value,
      target: true,
    };
    const response = await adddroneAsync("drone", dataDocument);
    if (response?.errorCode) {
      //   setError(response?.message);
      toast.error("An error has occurred!");
    } else {
      toast.success("Done successfully!");
      dispatch(getdroneAsync(`drone`));
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
      drone_id: document.getElementById("drone_id").value,
      name: document.getElementById("name").value,
      brandId: document.getElementById("brand").value,
      model: document.getElementById("model").value,
      manufacturerId: document.getElementById("manufacturer").value,
      countryOriginId: document.getElementById("countryOrigin").value,
      productionYear: document.getElementById("productionYear").value,
      condition: document.getElementById("condition").value,
      ownerId: document.getElementById("organization").value,
      operatorId: document.getElementById("employee").value,
      status: document.getElementById("statuss").value,
      target: current?.target,
    };

    const response = await editdroneAsync(`drone`, {
      ...dataDocument,
      id: current?.id,
    });
    if (response?.errorCode) {
      setmodal_list(false);
      //   toast.error(TranslationList("An error has occurred!"));
    } else {
      //   toast.success(TranslationList("Done successfully!"));
      dispatch(getdroneAsync(`drone`));
      setmodal_list(false);
    }
  };

  const [modal_delete, setmodal_delete] = useState(false);
  const onClickTodoDelete = (item) => {
    setMultiSelect();
    setCurrent(item);
    setmodal_delete(true);
  };
  const handleDelete = async () => {
    if (multiSelect) {
      console.log(multiSelect);
      const data = multiSelect?.map((res) => res.id);
      const response = await deletedroneAll(`drone/multidelete`, data);
      if (response?.errorCode) {
        toast.error("An error has occurred!");
      } else {
        toast.success("Done successfully!");
        dispatch(getdroneAsync(`drone`));
        setMultiSelect();
      }
    } else {
      const response = await deletedrone(`drone/${current?.id}`);
      if (response?.errorCode) {
        toast.error("An error has occurred!");
      } else {
        toast.success("Done successfully!");
        dispatch(getdroneAsync(`drone`));
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

  document.title = "Drones | ABMC SCADA - Kibera Technology";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Реестр дронов" pageTitle="Директория" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4">
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
                        <Button color="warning" className="btn me-2">
                          Подбор колонок
                        </Button>
                        <Button color="warning" className="btn me-2">
                          Изменить статус
                        </Button>
                        <Button color="success" className="btn me-2">
                          Экспорт
                        </Button>
                        <Button color="success" className="btn me-2">
                          Импорт
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="customerList">
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
                            <th className="text-center">Идентификатор дрона</th>
                            <th className="text-center">Имя</th>
                            <th className="text-center">Бренд</th>
                            <th className="text-center">Модель</th>
                            <th className="text-center">Производитель</th>
                            <th className="text-center">
                              Страна происхождения
                            </th>
                            <th className="text-center">
                              Производственный год
                            </th>
                            <th className="text-center">Состояние</th>
                            <th className="text-center">Организация</th>
                            <th className="text-center">Сотрудник</th>
                            <th className="text-center">Cтатусы</th>
                            <th className="text-center">Действие</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {drones?.map((res, i) => (
                            <tr
                              key={res?.id}
                              onClick={() =>
                                navigate(`/drone_card?id=${res?.id}`)
                              }
                            >
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
                              <td className="text-center">{res?.drone_id}</td>
                              <td className="text-center">{res?.name}</td>
                              <td className="text-center">
                                {res?.brandDTO?.name}
                              </td>

                              <td className="text-center">{res?.model}</td>
                              <td className="text-center">
                                {res?.manufacturerDTO?.name}
                              </td>
                              <td className="text-center">
                                {res?.countryOriginDTO?.name}
                              </td>
                              <td className="text-center">
                                {res?.productionYear}
                              </td>
                              <td className="text-center">{res?.condition}</td>
                              <td className="text-center">
                                {res?.ownerDTO?.name}
                              </td>
                              <td className="text-center">
                                {res?.operatorDTO?.firstName}
                              </td>
                              <td className="text-center">{res?.status}</td>
                              <td className="text-center">
                                <div className="d-flex gap-2 justify-content-center">
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
                      <div className="noresult" style={{ display: "none" }}>
                        <div className="text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            colors="primary:#121331,secondary:#08a88a"
                            style={{ width: "75px", height: "75px" }}
                          ></lord-icon>
                          <h5 className="mt-2">Sorry! No Result Found</h5>
                          <p className="text-muted mb-0">
                            We've searched more than 150+ Orders We did not find
                            any orders for you search.
                          </p>
                        </div>
                      </div>
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
        size="lg"
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
            <Row>
              <div
                className="mb-3 col-6"
                id="modal-id"
                style={{ display: "none" }}
              >
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

              <div className="mb-3 col-6">
                <label htmlFor="customername-field" className="form-label">
                  Идентификатор дрона
                </label>
                <input
                  id="drone_id"
                  type="text"
                  className="form-control"
                  placeholder="Введите идентификатор дрона"
                  onChange={(e) => setDroneID(e.target.value)}
                  defaultValue={current?.drone_id}
                  required
                />
              </div>
              <div className="mb-3 col-6">
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
              <div className="mb-3 col-6">
                <label htmlFor="customername-field" className="form-label">
                  Бренд
                </label>
                <Input
                  id="brand"
                  type="select"
                  className="form-control"
                  name="brand"
                  defaultValue={current?.brandDTO?.name}
                  required
                >
                  {brands?.map((res) => (
                    <option key={res.id} value={res.id}>
                      {res?.name}
                    </option>
                  ))}
                </Input>
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="customername-field" className="form-label">
                  Модель
                </label>
                <input
                  id="model"
                  type="text"
                  className="form-control"
                  placeholder="Введите модель"
                  onChange={(e) => setModel(e.target.value)}
                  defaultValue={current?.model}
                  required
                />
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="customername-field" className="form-label">
                  Производитель
                </label>
                <Input
                  id="manufacturer"
                  type="select"
                  className="form-control"
                  name="manufacturer"
                  defaultValue={current?.manufacturerDTO?.name}
                  required
                >
                  {manufacturers?.map((res) => (
                    <option key={res.id} value={res.id}>
                      {res?.name}
                    </option>
                  ))}
                </Input>
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="customername-field" className="form-label">
                  Страна происхождения
                </label>
                <Input
                  id="countryOrigin"
                  type="select"
                  className="form-control"
                  name="countryOrigin"
                  defaultValue={current?.countryOriginDTO?.name}
                  required
                >
                  {countryOrigins?.map((res) => (
                    <option key={res.id} value={res.id}>
                      {res?.name}
                    </option>
                  ))}
                </Input>
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="customername-field" className="form-label">
                  Производственный год
                </label>
                <input
                  id="productionYear"
                  type="number"
                  className="form-control"
                  placeholder="Введите год производства"
                  onChange={(e) => setProductionYear(e.target.value)}
                  defaultValue={current?.productionYear}
                  required
                />
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="customername-field" className="form-label">
                  Состояние
                </label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  id="condition"
                  defaultValue={current?.condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="NEW">NEW</option>
                  <option value="AVERAGE">AVERAGE</option>
                  <option value="OLD">OLD</option>
                </select>
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="customername-field" className="form-label">
                  Организация
                </label>
                <Input
                  id="organization"
                  type="select"
                  className="form-control"
                  name="organization"
                  defaultValue={current?.organization?.name}
                  required
                >
                  {organizations?.map((res) => (
                    <option key={res.id} value={res.id}>
                      {res?.name}
                    </option>
                  ))}
                </Input>
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="customername-field" className="form-label">
                  Сотрудник
                </label>
                <Input
                  id="employee"
                  type="select"
                  className="form-control"
                  name="employee"
                  defaultValue={current?.employee?.name}
                  required
                >
                  {epmloyees?.map((res) => (
                    <option key={res.id} value={res.id}>
                      {res?.firstName}
                    </option>
                  ))}
                </Input>
              </div>

              <div className="mb-3 col-6">
                <label htmlFor="status-field" className="form-label">
                  Статус
                </label>
                <select
                  className="form-control"
                  type="select"
                  id="statuss"
                  defaultValue={current?.status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="ACTIVE">ACTIVE</option>
                </select>
              </div>
            </Row>
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
