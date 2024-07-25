import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import DeleteModal from "../../common/DeleteModal";
import {
  addbrandAsync,
  deletebrand,
  editbrandAsync,
  getbrandAsync,
} from "../../slices/brand";

const Brand = () => {
  const [name, setName] = useState();
  const brands = useSelector((state) => state.brand?.data);
  const [modal_list, setmodal_list] = useState(false);
  const [current, setCurrent] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getbrandAsync(`brand`));
  }, []);
  function tog_list() {
    setmodal_list(!modal_list);
  }

  const [modal_delete, setmodal_delete] = useState(false);
  const handleAdd = async (e) => {
    e.preventDefault();
    const dataDocument = {
      name: name,
    };
    const response = await addbrandAsync("brand", dataDocument);
    if (response?.errorCode) {
      toast.error("An error has occurred!");
    } else {
      toast.success("Done successfully!");
      dispatch(getbrandAsync(`brand`));
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
    };
    const response = await editbrandAsync(`brand`, {
      ...dataDocument,
      id: current?.id,
    });
    if (response?.errorCode) {
      setmodal_list(false);
      toast.error("An error has occured!");
    } else {
      toast.success("Done successfully!");
      dispatch(getbrandAsync(`brand`));
      setmodal_list(false);
    }
  };
  const onClickTodoDelete = (item) => {
    setCurrent(item);
    setmodal_delete(true);
  };
  const handleDelete = async () => {
    const response = await deletebrand(`brand/${current?.id}`);
    if (response?.errorCode) {
      toast.error("An error has occured!");
    } else {
      toast.success("Done successfully!");
      dispatch(getbrandAsync(`brand`));
      setmodal_delete(false);
    }
  };
  document.title = "Brands | ABMC SCADA - Kibera Technology";
  return (
    <React.Fragment>
      {/* <div className="page-content"> */}
      {/* <Container fluid> */}
      {/* <BreadCrumb title="Бренд" pageTitle="Директория" /> */}
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
                      {/* <Button className="btn btn-soft-danger"
                                                    // onClick="deleteMultiple()"
                                                    ><i className="ri-delete-bin-2-line"></i></Button> */}
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
                            />
                          </div>
                        </th>
                        <th style={{ width: "65%" }}>Имя</th>
                        <th className="text-end">
                          Действие<span style={{ marginRight: "70px" }}></span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {brands?.map((res, i) => (
                        <tr key={res?.id}>
                          <td scope="row">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="chk_child"
                                value="option1"
                              />
                            </div>
                          </td>

                          <td>{res?.name}</td>
                          <td className="d-flex justify-content-end">
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

                {/* <div className="d-flex justify-content-end">
                                            <div className="pagination-wrap hstack gap-2">
                                                <Link className="page-item pagination-prev disabled" to="#">
                                                  Предыдущий
                                                </Link>
                                                <ul className="pagination listjs-pagination mb-0"></ul>
                                                <Link className="page-item pagination-next" to="#">
                                                    Next
                                                </Link>
                                            </div>
                                        </div> */}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* </Container> */}
      {/* </div> */}

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

export default Brand;
