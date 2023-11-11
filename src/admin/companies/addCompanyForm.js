import React from 'react'
import {useForm} from "react-hook-form"
import { API_URL, TOKEN_KEY ,doApiMethod} from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function AddCompanyForm() {
  const{register , handleSubmit ,  formState: { errors } } = useForm();
  const nav = useNavigate()

  const onSub = async(bodyData) => {
    console.log(bodyData)
    try {
          const url = API_URL+ "/companies";
          const resp = await doApiMethod(url, "POST", bodyData);
          console.log('Response object:', resp);

          
       
        if(resp &&resp._id){
          toast.success("The category has been successfully added", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000
          });
       nav(-1)
        }
        else {
            // Handle the case where data is not in the expected format
            console.error("User was not created, or the response is not in the expected format.");
        }
      } catch (error) {
        console.error("Error add user:", error);
    
    
    
        }
  }



  return (
    <div className='container p-4'>
      <h1 className='text-center display-4'>Add New Company : </h1>
   
      <form onSubmit={handleSubmit(onSub)} className='col-md-6 mx-auto p-2 shadow'>
      <label>Name:</label>
        <input {...register("name",{required:true,minLength:2})} type="text" className='form-control'/>
        {errors.name && <div className='text-danger'>* Enter  name (min 2 chars)</div>}
        <label>Company Id:</label>
        <input {...register("company_id",{required:true,minLength:1})} type="number" className='form-control'/>
        {errors.company_id && <div className='text-danger'>* Enter valid number </div>}
        <label>Image Url:</label>
        <input {...register("img_url",{required:true})} type="text" className='form-control'/>
        {errors.img_url && <div className='text-danger'>* Enter  url </div>}
        <div className='mt-4 text-center'>
          <button className='btn btn-success col-4 shadow'>Add Company</button>
        </div>
      </form>
    </div>
  )
}
