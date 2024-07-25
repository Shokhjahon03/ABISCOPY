import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import BASE_URL from '../config'
import { token } from "../token";

const EditItem = ({
  show,
  multiSelect,
  onCloseClick,
  id,
  torf,
  setTorf
}) => {
    
    let [edittingData,setEdittingData]=useState({})
    let GetEditIdDatas=async(id)=>{
        
        try {
          
          if (id>0) {
          let res= await  axios.get(BASE_URL.api.BASE_URL +`hecras/variable/${id}`,{
              headers:{
                  Authorization:"Bearer "+ token
              }
          })

          setEdittingData(res)
          console.log(res);
    
         }
          
        } catch (error) {
         console.log(error); 
        }
          
    }
    useEffect(()=>{ 
      GetEditIdDatas(id)
    },[id])

    let EdditngData=async(id)=>{
            axios.put(BASE_URL.api.BASE_URL +`hecras/variable/${id}/`,edittingData,{
                headers:{
                    Authorization:"Bearer "+ token
                }
        }).then(function (response) {
          setTorf(torf+20)
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
              <h4>Редактирование данных</h4>

              <form style={{width:'100%' }}> 
               <div style={{width:'100%', display:'flex',flexDirection:'column', alignItems:'start', marginTop:'10px',borderBottom:'0.5px solid black',paddingBottom:'5px'}}>
               <label>Code :</label>
               <input 
               value={edittingData.code} 
                placeholder="code" 
                style={{width:'100%',border:'1px solid #BFC7CF',borderRadius:'5px' , padding:'5px'}} 
                type='number'
                onChange={(e)=>setEdittingData({code: e.target.value,variable:edittingData.variable,description:edittingData.description})}
                />
               </div>
               <div style={{width:'100%', display:'flex',flexDirection:'column', alignItems:'start', marginTop:'10px',borderBottom:'0.5px solid black',paddingBottom:'5px'}}>
               <label>Variable :</label>
               <input 
               value={edittingData.variable}
               placeholder="variable" style={{width:'100%',border:'1px solid #BFC7CF',borderRadius:'5px' , padding:'5px'}} type='string'
               onChange={(e)=>setEdittingData({code: edittingData.code,variable:e.target.value,edittingData:edittingData.description})}
               />
               </div>
               <div style={{width:'100%', display:'flex',flexDirection:'column', alignItems:'start', marginTop:'10px',borderBottom:'0.5px solid black',paddingBottom:'5px'}}>
               <label>Description :</label>
               <input
               value={edittingData.description}
               placeholder="description" style={{width:'100%',border:'1px solid #BFC7CF',borderRadius:'5px' , padding:'5px'}} type='string'
               onChange={(e)=>setEdittingData({code: edittingData.code,variable:edittingData.variable,description:e.target.value})}
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
            onClick={()=>EdditngData(id)}
          >
           Редактирование
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

EditItem.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
  id: PropTypes.any,
};

export default EditItem
