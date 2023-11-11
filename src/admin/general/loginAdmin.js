import React from 'react'
import axios from "axios";
import {useForm} from "react-hook-form"
import { API_URL, TOKEN_KEY } from './../../services/apiService';
import { useNavigate,Link } from 'react-router-dom';

export default function LoginAdmin() {
  const{register , handleSubmit ,  formState: { errors } } = useForm();
  const nav = useNavigate()

  const onSub = (bodyData) => {
    console.log(bodyData)
    doApiPost(bodyData);
  }

  const doApiPost = async(bodyData) => {
    try {
      const url = API_URL+"/users/login";
      const resp = await axios({
        method:"POST",
        url:url,
        data:bodyData
      })
      if(resp.data.role != "admin"){
        return alert("You must be admin to login")
      }
      localStorage.setItem(TOKEN_KEY,JSON.stringify (resp.data))
      console.log(resp.data);
      nav("/admin/users")

    } catch (error) {
      alert("Password or email is worng")
      console.log(error);
    }
  } 

  return (
    <div className='container p-4'>
      <h1 className='text-center display-4'>Login to the Admin panel</h1>
   
      <form onSubmit={handleSubmit(onSub)} className='col-md-6 mx-auto p-2 shadow'>
        <label>Email:</label>
        <input {...register("email",{required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} type="text" className='form-control'/>
        {errors.email && <div className='text-danger'>* Enter valid email</div>}
        <label>Password:</label>
        <input {...register("password",{required:true,minLength:3})} type="text" className='form-control'/>
        {errors.password && <div className='text-danger'>* Enter valid password (min 3 chars)</div>}
        <div className='mt-4 text-center'>
          <button className='btn btn-success col-4 shadow'>Log in</button>
        </div>
      </form>
      <div className='text-center my-3'>
      <Link to="/password-reset-request">Forgot Password?</Link>

      </div>

    </div>
  )
}
