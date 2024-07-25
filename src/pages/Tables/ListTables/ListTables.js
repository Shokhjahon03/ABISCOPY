import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import List from "list.js";
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import BASE_URL from "../../../config";

// Import Images
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../../assets/images/users/avatar-5.jpg";
import DeleteModal from "../../../common/DeleteModal";
import axios from "axios";
import { token } from "../../../token";
import { useTranslation } from "react-i18next";

const ListTables = () => {
  let [languagesValue, setLanguagesValue] = useState({});
  let [languages, setLanguages] = useState([]);
  const { t } = useTranslation();
  const [modal_list, setmodal_list] = useState(false);
  function tog_list() {
    setmodal_list(!modal_list);
  }

  const [modal_delete, setmodal_delete] = useState(false);
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }
  let [showdelete, setShow] = useState(false);

  // useEffect(() => {
  //   const attroptions = {
  //     valueNames: [
  //       "name",
  //       "born",
  //       {
  //         data: ["id"],
  //       },
  //       {
  //         attr: "src",
  //         name: "image",
  //       },
  //       {
  //         attr: "href",
  //         name: "link",
  //       },
  //       {
  //         attr: "data-timestamp",
  //         name: "timestamp",
  //       },
  //     ],
  //   };

  //   // Existing List

  //   const existOptionsList = {
  //     valueNames: ["contact-name", "contact-message"],
  //   };

  //   new List("contact-existing-list", existOptionsList);

  //   // Fuzzy Search list
  //   new List("fuzzysearch-list", {
  //     valueNames: ["name"],
  //   });

  //   // pagination list

  //   new List("pagination-list", {
  //     valueNames: ["pagi-list"],
  //     page: 3,
  //     pagination: true,
  //   });
  // }, []);

  document.title = `${t("Languages")} | ABMC SCADA - Kibera Technology`;

  let AddLanguagesList = async (data) => {
    axios
      .post(BASE_URL.api.BASE_URL + "translate/", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.status);
        // setShow(true);
        setmodal_list(!modal_list);
        GetLangugeDataList();
      })
      .catch((error) => console.log(error));
  };

  let HendaleSubmit = (e) => {
    e.preventDefault();
  };

  let GetLangugeDataList = async () => {
    try {
      let res = await axios.get(BASE_URL.api.BASE_URL + "translate/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(res.results);
      setLanguages(res.results);
    } catch (error) {
      console.log(error);
    }
  };
  let DeleteLangugeDataList = async (id) => {
    axios
      .delete(BASE_URL.api.BASE_URL + `translate/${id}/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.status);
        // setShow(true);
        GetLangugeDataList();
      })
      .catch((error) => console.log(error));
  };

  let [edittingData, setEdittingData] = useState({});
  let [editModall, setEditModall] = useState(false);

  let EditingGetValue = async (id) => {
    console.log(id);
    try {
      let res = await axios.get(BASE_URL.api.BASE_URL + `translate/${id}/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setEdittingData(res);
      setEditModall(true);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  let PutwasEdittingData = async (id) => {
    axios
      .put(BASE_URL.api.BASE_URL + `translate/${id}/`, edittingData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setEditModall(false);
        GetLangugeDataList();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    GetLangugeDataList();
  }, []);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Listjs" pageTitle="Tables" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">{t("Languages")}</h4>
                </CardHeader>

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
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add
                          </Button>
                        </div>
                      </Col>
                      {/* <Col className="col-sm">
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
                      </Col> */}
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            {/* <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkAll"
                                  value="option"
                                />
                              </div>
                            </th> */}
                            <th className="sort" data-sort="title_uz">
                              title_uz
                            </th>
                            <th className="sort" data-sort="title_ru">
                              title_ru
                            </th>
                            <th className="sort" data-sort="title_en">
                              title_en
                            </th>
                            <th className="sort" data-sort="key">
                              key
                            </th>
                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {languages.map((e, i) => (
                            <tr key={i}>
                              <td className="id" style={{ display: "none" }}>
                                <Link to="#" className="fw-medium link-primary">
                                  #VZ2101
                                </Link>
                              </td>
                              <td className="customer_name">{e.title_uz}</td>
                              <td className="email">{e.title_ru}</td>
                              <td className="phone">{e.title_en}</td>
                              <td className="date">{e.key}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-success edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => EditingGetValue(e.id)}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() =>
                                        DeleteLangugeDataList(e.id)
                                      }
                                    >
                                      Remove
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
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
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
          Add Language
          <Button
            type="button"
            onClick={() => {
              setmodal_list(false);
            }}
            className="btn-close"
            aria-label="Close"
          ></Button>
        </ModalHeader>
        <form onSubmit={HendaleSubmit} className="tablelist-form">
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                title_uz
              </label>
              <input
                value={languagesValue.title_uz}
                onChange={(e) =>
                  setLanguagesValue({
                    ...languagesValue,
                    title_uz: e.target.value,
                  })
                }
                type="text"
                id="customername-field"
                className="form-control"
                placeholder="uz"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email-field" className="form-label">
                title_ru
              </label>
              <input
                value={languagesValue.title_ru}
                onChange={(e) =>
                  setLanguagesValue({
                    ...languagesValue,
                    title_ru: e.target.value,
                  })
                }
                type="text"
                id="email-field"
                className="form-control"
                placeholder="ru"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone-field" className="form-label">
                title_en
              </label>
              <input
                value={languagesValue.title_en}
                onChange={(e) =>
                  setLanguagesValue({
                    ...languagesValue,
                    title_en: e.target.value,
                  })
                }
                type="text"
                id="phone-field"
                className="form-control"
                placeholder="en"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="key" className="form-label">
                key
              </label>
              <input
                value={languagesValue.key}
                onChange={(e) =>
                  setLanguagesValue({
                    ...languagesValue,
                    key: e.target.value,
                  })
                }
                type="text"
                id="key"
                className="form-control"
                placeholder="key"
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
                Close
              </button>
              <button
                onClick={() => AddLanguagesList(languagesValue)}
                // type="submit"
                className="btn btn-success"
                id="add-btn"
              >
                Add Language
              </button>
              {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Edit Modall */}
      <Modal
        isOpen={editModall}
        toggle={() => {
          setEditModall();
        }}
        centered
      >
        <ModalHeader className="bg-light p-3">
          Edit Language
          <Button
            type="button"
            onClick={() => {
              setmodal_list(false);
            }}
            className="btn-close"
            aria-label="Close"
          ></Button>
        </ModalHeader>
        <form onSubmit={HendaleSubmit} className="tablelist-form">
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="customername-field" className="form-label">
                title_uz
              </label>
              <input
                value={edittingData.title_uz}
                onChange={(e) =>
                  setEdittingData({
                    ...edittingData,
                    title_uz: e.target.value,
                  })
                }
                type="text"
                id="customername-field"
                className="form-control"
                placeholder="uz"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email-field" className="form-label">
                title_ru
              </label>
              <input
                value={edittingData.title_ru}
                onChange={(e) =>
                  setEdittingData({
                    ...edittingData,
                    title_ru: e.target.value,
                  })
                }
                type="text"
                id="email-field"
                className="form-control"
                placeholder="ru"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone-field" className="form-label">
                title_en
              </label>
              <input
                value={edittingData.title_en}
                onChange={(e) =>
                  setEdittingData({
                    ...edittingData,
                    title_en: e.target.value,
                  })
                }
                type="text"
                id="phone-field"
                className="form-control"
                placeholder="en"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="key" className="form-label">
                key
              </label>
              <input
                value={edittingData.key}
                onChange={(e) =>
                  setEdittingData({
                    ...edittingData,
                    key: e.target.value,
                  })
                }
                type="text"
                id="key"
                className="form-control"
                placeholder="key"
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setEditModall(false)}
              >
                Close
              </button>
              <button
                onClick={() => PutwasEdittingData(edittingData.id)}
                // type="submit"
                className="btn btn-success"
                id="add-btn"
              >
                Edit
              </button>
              {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Remove Modal */}
      <Modal
        // isOpen={modal_delete}
        toggle={() => {
          tog_delete();
        }}
        className="modal fade zoomIn"
        id="deleteRecordModal"
        centered
      >
        {/* <div className="modal-header">
          <Button
            type="button"
            onClick={() => setmodal_delete(false)}
            className="btn-close"
            aria-label="Close"
          >
            {" "}
          </Button>
        </div>
        <ModalBody>
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="loop"
              colors="primary:#405189,secondary:#f06548"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you Sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                Are you Sure You want to Remove this Record ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              onClick={() => setmodal_delete(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn w-sm btn-danger "
              id="delete-record"
            >
              Yes, Delete It!
            </button>
          </div>
        </ModalBody> */}
      </Modal>
      <DeleteModal
        // setTorf={setTorf}
        // torf={torf}
        // id={id}
        show={showdelete}
        onCloseClick={() => setShow(!showdelete)}
      />
    </React.Fragment>
  );
};

export default ListTables;
