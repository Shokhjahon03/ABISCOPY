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
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import List from "list.js";

import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../Components/Common/BreadCrumb";
export default function RolesAndPermissions() {
  const [modal_list, setmodal_list] = useState(false);
  function tog_list() {
    setmodal_list(!modal_list);
  }

  const [modal_delete, setmodal_delete] = useState(false);
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    const attroptions = {
      valueNames: [
        "name",
        "born",
        {
          data: ["id"],
        },
        {
          attr: "src",
          name: "image",
        },
        {
          attr: "href",
          name: "link",
        },
        {
          attr: "data-timestamp",
          name: "timestamp",
        },
      ],
    };

    // Existing List

    const existOptionsList = {
      valueNames: ["contact-name", "contact-message"],
    };

    new List("contact-existing-list", existOptionsList);

    // Fuzzy Search list
    new List("fuzzysearch-list", {
      valueNames: ["name"],
    });

    // pagination list

    new List("pagination-list", {
      valueNames: ["pagi-list"],
      page: 3,
      pagination: true,
    });
  });

  document.title = "Listjs | ABMC SCADA - Kibera Technology";
  return (
    <React.Fragment>
      <div className="page-content">Cкоро будет реализовано</div>

      {/* Add Modal */}
      <Modal
        isOpen={modal_list}
        toggle={() => {
          tog_list();
        }}
        centered
      >
        <ModalHeader className="bg-light p-3">
          Add Customer
          <Button
            type="button"
            onClick={() => {
              setmodal_list(false);
            }}
            className="btn-close"
            aria-label="Close"
          ></Button>
        </ModalHeader>
        <form className="tablelist-form">
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
                Customer Name
              </label>
              <input
                type="text"
                id="customername-field"
                className="form-control"
                placeholder="Enter Name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email-field" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email-field"
                className="form-control"
                placeholder="Enter Email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone-field" className="form-label">
                Phone
              </label>
              <input
                type="text"
                id="phone-field"
                className="form-control"
                placeholder="Enter Phone no."
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="date-field" className="form-label">
                Joining Date
              </label>
              <Flatpickr
                className="form-control"
                options={{
                  dateFormat: "d M, Y",
                }}
                placeholder="Select Date"
              />
            </div>

            <div>
              <label htmlFor="status-field" className="form-label">
                Status
              </label>
              <select
                className="form-control"
                data-trigger
                name="status-field"
                id="status-field"
              >
                <option value="">Status</option>
                <option value="Active">Active</option>
                <option value="Block">Block</option>
              </select>
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
              <button type="submit" className="btn btn-success" id="add-btn">
                Add Customer
              </button>
              {/* <button type="button" className="btn btn-success" id="edit-btn">Update</button> */}
            </div>
          </ModalFooter>
        </form>
      </Modal>

      {/* Remove Modal */}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
        }}
        className="modal fade zoomIn"
        id="deleteRecordModal"
        centered
      >
        <div className="modal-header">
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
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
