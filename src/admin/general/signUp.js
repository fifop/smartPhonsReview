import React, { useEffect ,useState} from 'react'
import {useForm} from "react-hook-form"
import { API_URL, TOKEN_KEY ,doApiMethod} from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {registerUser } from '../../components/general/features/auth/authActions'

import { toast } from 'react-toastify';
import axios from 'axios';


export default function SignAp() {
  const dispatch = useDispatch()
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )

  const{register , handleSubmit ,watch,  formState: { errors } } = useForm();
  const nav = useNavigate();
  const [signupCompleted, setSignupCompleted] = useState(false);
  const password = watch("password", "");



  useEffect(() => {

    if (signupCompleted&&success){
      nav('/login')
    
    } 
      

  }, [nav,signupCompleted])


  const onSub = async(bodyData) => {
    console.log(bodyData)
    try {


          dispatch(registerUser(bodyData))
          setSignupCompleted(true)

      } catch (error) {
        console.error("Error add user:", error);
    
    
    
        }
  }



  return (
    <div className='container p-4'>
      <h1 className='text-center display-4'>Sign Up </h1>
   
      <form onSubmit={handleSubmit(onSub)} className='col-md-6 mx-auto p-2 shadow'>
      <label>Name:</label>
        <input {...register("name",{required:true,minLength:2})} type="text" className='form-control'/>
        {errors.name && <div className='text-danger'>* Enter  name (min 2 chars)</div>}
        <label>Email:</label>
        <input {...register("email",{required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} type="text" className='form-control'/>
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
          <button className='btn btn-success col-4 shadow'>Sign in</button>
        </div>
      </form>
    </div>
  )
}
