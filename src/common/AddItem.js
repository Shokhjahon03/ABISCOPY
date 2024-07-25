import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import BASE_URL from '../config'
import { token } from "../token";

const AddItem = ({
  show,
  data,
  multiSelect,
  onCloseClick,
  
}) => {
    let defaultValue={
        code:0,
        variable:'',
        description:''
    }
    let [newData,setNewData]=useState(defaultValue)


    let AddNewData=async()=>{
            console.log(newData);
            axios.post(BASE_URL.api.BASE_URL +'hecras/variable/',newData,{
                headers:{
                    Authorization:"Bearer "+ token
                }
        }).then(function (response) {
            onCloseClick()
          })
          .catch(function (error) {
            console.log(error);
          });
       
      
    }



  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
         
          {multiSelect ? (
            multiSelect?.map((res) => (
              <p className="text-muted mx-4 mb-0" key={res?.id}>
               {res?.file?.filename ?? res?.nomer ?? res?.name??res}
              </p>
            ))
          ) : (
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Добавить новую информацию +</h4>

              <form style={{width:'100%' }}> 
               <div style={{width:'100%', display:'flex',flexDirection:'column', alignItems:'start', marginTop:'10px',borderBottom:'0.5px solid black',paddingBottom:'5px'}}>
               <label>Code :</label>
               <input 
                placeholder="code" 
                style={{width:'100%',border:'1px solid #BFC7CF',borderRadius:'5px' , padding:'5px'}} 
                type='number'
                value={newData.code}
                onChange={(e)=>setNewData({code: e.target.value,variable:newData.variable,description:newData.description})}
                />
               </div>
               <div style={{width:'100%', display:'flex',flexDirection:'column', alignItems:'start', marginTop:'10px',borderBottom:'0.5px solid black',paddingBottom:'5px'}}>
               <label>Variable :</label>
               <input
               value={newData.variable}
               placeholder="variable" style={{width:'100%',border:'1px solid #BFC7CF',borderRadius:'5px' , padding:'5px'}} type='string'
               onChange={(e)=>setNewData({code: newData.code,variable:e.target.value,description:newData.description})}
               />
               </div>
               <div style={{width:'100%', display:'flex',flexDirection:'column', alignItems:'start', marginTop:'10px',borderBottom:'0.5px solid black',paddingBottom:'5px'}}>
               <label>Description :</label>
               <input
               value={newData.description}
               placeholder="description" style={{width:'100%',border:'1px solid #BFC7CF',borderRadius:'5px' , padding:'5px'}} type='string'
               onChange={(e)=>setNewData({code: newData.code,variable:newData.variable,description:e.target.value})}
               />
               </div>
               
              </form>
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
            onClick={()=>AddNewData()}
          >
           Добавить
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

AddItem.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
};

export default AddItem;
