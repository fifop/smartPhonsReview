import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { API_URL, TOKEN_KEY,doApiMethod,doApiGet } from '../../services/apiService';
import { Link, useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function UsersAddAdmin() {
  const{register , handleSubmit ,watch,  formState: { errors } } = useForm();
  const nav = useNavigate()
  const params = useParams();

  const [user,setUser] = useState({})
  const password = watch("password", "");


  useEffect (()=>{
  fetchData();
  },[])

  const fetchData=async()=>{
    try {
        const id =params.id
        const url = API_URL+`/users/single/${id}`
        const data = await doApiGet(url)
        console.log(data);

        setUser(data)
    } catch (error) {
        console.log(error);
    }
  }


 

  const onSub = async (bodyData) => {
    try {
      const id = params.id;
      const role = params.role;
      const url = API_URL + `/users/changeRole/${id}/${role}`;
      const resp = await doApiMethod(url, "PATCH", bodyData);
      console.log('Response object:', resp);
  
      if (resp.message === 'User role updated and token refreshed.') {
        // Store the new token, replacing the old one
        localStorage.setItem('token', resp.token);
        toast.success(resp.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000
        });
        nav(-1);
      } else {
        // Handle any other messages or errors
        console.error("No user was matched, or there was an issue with the update.");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      // Optionally, display an error toast message
    }
  };
  
  



  return (
    <div className='container p-4'>
      <h1 className='text-center display-4'>Edit User </h1>
   { (user.name)? (

      <form onSubmit={handleSubmit(onSub)} className='col-md-6 mx-auto p-2 shadow'>
      <label>Name:</label>
        <input defaultValue={user.name} {...register("name",{required:true,minLength:2})} type="text" className='form-control'/>
        {errors.name && <div className='text-danger'>* Enter  name (min 2 chars)</div>}
         <label>Role:</label>
            <select defaultValue={user.role} {...register("role", { required: true })} className='form-control'>
                <option value="">Select a role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
        </select>
        {errors.role && <div className='text-danger'>* Role is required</div>}
        <label>Email:</label>
        <input defaultValue={user.email} {...register("email",{required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} type="text" className='form-control'/>
        {errors.email && <div className='text-danger'>* Enter valid email</div>}
        <label>Password:</label>
        <input {...register("password",{required:true,minLength:3})} type="password" className='form-control'/>
        {errors.password && <div className='text-danger'>* Enter valid password (min 3 chars)</div>}
        <label>confirm Password:</label>
        <input {...register("confirmPassword", { 
            required: "Confirm password is required",
        validate: value => value === password || "Passwords do not match"
      })} type="password" className='form-control' />
      {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
        <div className='mt-4 text-center'>
          <button className='btn btn-success col-4 shadow'>Update Admin</button>
        </div>
      </form>
   ) : (<div>loading...</div>)


   }
    </div>
  )
}