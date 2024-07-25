import axios from "axios";
import PropTypes from "prop-types";
import React from "react";
import { Modal, ModalBody } from "reactstrap";
import BASE_URL from '../config'
import { token } from "../token";


const DeleteModal = ({
  show,
  data,
  onDeleteClick,
  multiSelect,
  onCloseClick,
  id,
  torf,
  setTorf
}) => {


  let DeleteItem=async(id)=>{
      
       if (id>0) {
        await axios.delete(BASE_URL.api.BASE_URL +`hecras/variable/${id}`,{
          headers:{
            Authorization:"Bearer "+ token,
        }
        })
        .then(function (response) {
          if (response.status==204) {
            onCloseClick()
       setTorf(torf+200)
       console.log(torf);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
       }
  }
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="loop"
            colors="primary:#405189,secondary:#f06548"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
          {multiSelect ? (
            multiSelect?.map((res) => (
              <p className="text-muted mx-4 mb-0" key={res?.id}>
               {res?.file?.filename ?? res?.nomer ?? res?.name??res}
              </p>
            ))
          ) : (
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Вы уверены ?</h4>

              <p className="text-muted mx-4 mb-0">
                {data?.file?.filename ?? data?.nomer ?? data?.name??data}
              </p>
            </div>
          )}
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Закрывать
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger "
            id="delete-record"
            onClick={()=>DeleteItem(id)}
          >
           Да, удалите это!
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

DeleteModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any,
  torf:PropTypes.any,
  setTorf:PropTypes.any,
  id:PropTypes.any,
};

export default DeleteModal;
