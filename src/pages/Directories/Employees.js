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
  addemployeeAsync,
  deleteemployee,
  deleteemployeeAll,
  editemployeeAsync,
  getemployeeAsync,
} from "../../slices/employee";
import { getpositionAsync } from "../../slices/position";
import { getorganizationAsync } from "../../slices/organization";
import DeleteModal from "../../common/DeleteModal";
import { toast } from "react-toastify";
import GridTables from "../Tables/GridTables/GridTables";
import dateFormat from "dateformat";
export default function Employees() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [surName, setSurName] = useState();
  const [checkSelect, setCheckSelect] = useState(true);
  const organizations = useSelector((state) => state.organization?.data);
  const [birthday, setBirthday] = useState();
  const [position, setPosition] = useState();
  const [placeOfBirth, setPlaceOfBirth] = useState();
  const [multiSelect, setMultiSelect] = useState();
  const [passportData, setPassportData] = useState();
  const [current, setCurrent] = useState();
  const employees = useSelector((state) => state.employee?.data);
  const positions = useSelector((state) => state.position?.data);
  const dispatch = useDispatch();
  const [modal_list, setmodal_list] = useState(false);
  useEffect(() => {
    dispatch(getemployeeAsync(`employee`));
    dispatch(getorganizationAsync("organization"));
    dispatch(getpositionAsync("position"));
  }, []);
  function tog_list() {
    setmodal_list(!modal_list);
    setCurrent();
  }

  const [modal_delete, setmodal_delete] = useState(false);
  const handleAdd = async (e) => {
    e.preventDefault();
    const dataDocument = {
      firstName: firstName,
      lastName: lastName,
      surname: surName,
      organizationId: document.getElementById("organization").value,
      positionId: document.getElementById("position").value,
      birthday: birthday,
      placeOfBirth: placeOfBirth,
      passportData: passportData,
    };
    const response = await addemployeeAsync("employee", dataDocument);
    if (response?.errorCode) {
      toast.error("An error has occurred!");
    } else {
      toast.success("Done successfully!");
      dispatch(getemployeeAsync(`employee`));
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
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      surname: document.getElementById("surname").value,
      organizationId: document.getElementById("organization").value,
      positionId: document.getElementById("position").value,
      birthday: document.getElementById("birthday").value,
      placeOfBirth: document.getElementById("placeOfBirth").value,
      passportData: document.getElementById("passportData").value,
    };

    const response = await editemployeeAsync(`employee`, {
      ...dataDocument,
      id: current?.id,
    });
    if (response?.errorCode) {
      setmodal_list(false);
      toast.error("An error has occurred!");
    } else {
      toast.success("Done successfully!");
      dispatch(getemployeeAsync(`employee`));
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
      const response = await deleteemployeeAll(`employee/multidelete`, data);
      if (response?.errorCode) {
        toast.error("An error has occurred!");
      } else {
        toast.success("Done successfully!");
        dispatch(getemployeeAsync(`employee`));
        setMultiSelect();
      }
    } else {
      const response = await deleteemployee(`employee/${current?.id}`);
      if (response?.errorCode) {
        toast.error("An error has occurred!");
      } else {
        toast.success("Done successfully!");
        dispatch(getemployeeAsync(`employee`));
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

  document.title = "Employees | ABMC SCADA - Kibera Technology";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Сотрудники" pageTitle="Директория" />
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
                            <th className="text-center">Фамилия</th>
                            <th className="text-center">Отчетсва</th>
                            <th className="text-center">Организация</th>
                            <th className="text-center">День рождения</th>
                            <th className="text-center">Позиция</th>
                            <th className="text-center">Место рождения</th>
                            <th className="text-center">Паспортные данные</th>
                            <th className="text-center">Действие</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {employees?.map((res, i) => (
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
                              <td className="text-center">{res?.firstName}</td>
                              <td className="text-center">{res?.lastName}</td>
                              <td className="text-center">{res?.surname}</td>
                              <td className="text-center">
                                {res?.organizationDTO?.name}
                              </td>
                              <td className="text-center">{res?.birthday}</td>
                              <td className="text-center">
                                {res?.positionDTO?.name}
                              </td>
                              <td className="text-center">
                                {res?.placeOfBirth}
                              </td>
                              <td className="text-center">
                                {res?.passportData}
                              </td>
                              <td>
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
                id="firstName"
                type="text"
                className="form-control"
                placeholder="Введите имя"
                onChange={(e) => setFirstName(e.target.value)}
                defaultValue={current?.firstName}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Фамилия
              </label>
              <input
                id="lastName"
                type="text"
                className="form-control"
                placeholder="Введите Фамилия"
                onChange={(e) => setLastName(e.target.value)}
                defaultValue={current?.lastName}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Отчетсва
              </label>
              <input
                id="surname"
                type="text"
                className="form-control"
                placeholder="Введите Отчетсва"
                onChange={(e) => setSurName(e.target.value)}
                defaultValue={current?.surname}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Организация
              </label>
              <Input
                id="organization"
                type="select"
                className="form-control"
                name="organiation"
                defaultValue={current?.organizationDTO?.name}
              >
                {organizations?.map((res) => (
                  <option key={res.id} value={res.id}>
                    {res?.name}
                  </option>
                ))}
              </Input>
            </div>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Позиция
              </label>
              <Input
                id="position"
                type="select"
                className="form-control"
                name="position"
                defaultValue={current?.positionDTO?.name}
              >
                {positions?.map((res) => (
                  <option key={res.id} value={res.id}>
                    {res?.name}
                  </option>
                ))}
              </Input>
            </div>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                День рождения
              </label>
              <Input
                id="birthday"
                type="date"
                className="form-control"
                defaultValue={dateFormat(current?.birthday, "yyyy-mm-dd")}
                options={{
                  dateFormat: "YYYY-MM-DD",
                }}
                onChange={(data) =>
                  setBirthday(dateFormat(data.target.value, "yyyy-mm-dd"))
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Место рождения
              </label>
              <input
                id="placeOfBirth"
                type="text"
                className="form-control"
                placeholder="Введите место рождения"
                onChange={(e) => setPlaceOfBirth(e.target.value)}
                defaultValue={current?.placeOfBirth}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                Паспортные данные
              </label>
              <input
                id="passportData"
                type="text"
                className="form-control"
                placeholder="Введите паспортные данные"
                onChange={(e) => setPassportData(e.target.value)}
                defaultValue={current?.passportData}
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
}
