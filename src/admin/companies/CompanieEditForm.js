import React, { useEffect, useState } from 'react'
import axios from "axios";
import {useForm} from "react-hook-form"
import { API_URL, TOKEN_KEY,doApiMethod } from '../../services/apiService';
import { useNavigate,useParams,Link } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function CompanieEditForm() {
  const{register , handleSubmit ,  formState: { errors } } = useForm();
  const nav = useNavigate();
  const params = useParams();

  const [company,setCompany] = useState({});

  useEffect(()=>{
          fetchData();
  },[params.id])

const fetchData = async()=>{
    try {
        const id = params.id
        const url = `${API_URL}/companies/single/${id}`
        const resp = await axios.get(url)
        setCompany(resp.data)
    } catch (error) {
        console.log(error);

    }
  
}



  const onSub = async(bodyData) => {
    try {
        const id = params.id
          const url = API_URL+`/companies/${id}`;
          const resp = await doApiMethod(url,"PUT",bodyData)
          console.log('Response object:', resp);

          if(resp.modifiedCount){
            toast.success("Company updated", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5000
            });
            nav(-1)
          }
          else {
            console.error("Company was not created, or the response is not in the expected format.");
        }
        } catch (error) {
          console.log(error);
        }

  }


  return (
    <div className='container p-4'>
      <h1 className='text-center display-4'> Edit Company</h1>
     {(company.name)?  (
      <form onSubmit={handleSubmit(onSub)} className='col-md-6 mx-auto p-2 shadow'>
        <label>Name:</label>
        <input defaultValue={company.name}{...register("name",{required:true})} type="text" className='form-control'/>
        {errors.name && <div className='text-danger'>* Enter valid name</div>}
        <label>Company Id:</label>
        <input defaultValue={company.company_id} {...register("company_id",{required:true,minLength:1})} type="number" className='form-control'/>
        {errors.company_id && <div className='text-danger'>* Enter valid number </div>}
        <label> Image Url</label>
        <input defaultValue={company.img_url}{...register("img_url",{required:true})} type="text" className='form-control'/>
        {errors.img_url && <div className='text-danger'>* Enter image url </div>}
        <div className='mt-4 text-center'>
          <button className='btn btn-success col-4 shadow'>Update Company</button>
          </div>
          <div className='mt-4 text-center'>
          <Link to={-1} className='btn btn-success col-4 shadow'>Back </Link>
        </div>
      </form>

     ):( <div> loading...</div>)
      }
    </div>
  )
}
