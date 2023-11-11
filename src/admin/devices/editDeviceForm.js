

import React, { useState,useEffect } from 'react'
import {useForm} from "react-hook-form"
import { API_URL, TOKEN_KEY ,doApiMethod} from '../../services/apiService';
import { Link, useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditDeviceForm() {
  const{register , handleSubmit ,  formState: { errors } } = useForm();
  const nav = useNavigate()
  const params =useParams();
  const id = params.id

  const [device,setDevice] = useState({})

useEffect(()=>{
fetchData();
},[params.id])

const fetchData =async() => {
    try {
        const url =  `${API_URL}/devices/single/${id}`;
        const resp =await axios.get(url);
        console.log(resp.data);
        setDevice(resp.data)
    } catch (error) {
        console.log(error);
        
    }
}


  const onSub = async(bodyData) => {
    try {
        const id = params.id
          const url = API_URL+ `/devices/${id}`;
          const resp = await doApiMethod(url, "PUT", bodyData);
          console.log('Response object:', resp);

          if(resp.modifiedCount){
            alert("device updated")
            nav(-1)
        }
        
        else {
            console.error("Device was not created, or the response is not in the expected format.");
        }
      } catch (error) {
        console.error("Error add device:", error);
    
    
    
        }
  }



  return (
    <div className='container p-4'>
      <h1 className='text-center display-4'>Edit Device : </h1>
   {(device.name) ?
      <form onSubmit={handleSubmit(onSub)} className='col-md-6 mx-auto p-2 shadow'>
      <label>Name:</label>
        <input defaultValue={device.name} {...register("name",{required:true,minLength:2})} type="text" className='form-control'/>
        {errors.name && <div className='text-danger'>* Enter  name (min 2 chars)</div>}
        <label>Company Id:</label>
        <input defaultValue={device.company_id} {...register("company_id",{required:true,minLength:1})} type="number" className='form-control'/>
        {errors.company_id && <div className='text-danger'>* Enter valid number </div>}
        <label>Battery Score:</label>
        <input defaultValue={device.battery_score}{...register("battery_score",{required:true})} type="number" className='form-control'/>
        {errors.battery_score && <div className='text-danger'>* Enter battery_score </div>}
        <label>Camera Score:</label>
        <input defaultValue={device.camera_score}{...register("camera_score",{required:true})} type="number" className='form-control'/>
        {errors.camera_score && <div className='text-danger'>* Enter Camera </div>}
        <label> Price</label>
        <input defaultValue={device.price}{...register("price",{required:true})} type="number" className='form-control'/>
        {errors.price && <div className='text-danger'>* Enter price </div>}
        <label> Image Url</label>
        <input defaultValue={device.img_url}{...register("img_url",{required:true})} type="text" className='form-control'/>
        {errors.img_url && <div className='text-danger'>* Enter image url </div>}
        <div className='mt-4 text-center'>
          <button className='btn btn-success col-4 shadow'>Edit Device</button>
        </div>
        <div className='mt-4 text-center'>
          <Link  to ={-1}className='btn btn-success col-4 shadow'>Back</Link>
        </div>
      </form>
        : <div>loading</div> }

    </div>
  )
}

