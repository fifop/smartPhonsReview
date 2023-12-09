
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../components/general/features/auth/authActions';

export default function LoginUser() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loading, error, userInfo } = useSelector((state) => state.auth); 

  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === 'admin') {
        navigate('/admin/home');
      } else {
        navigate('/user-profile');
      }
    }
  }, [userInfo, navigate]);
  
  const onSub = (bodyData) => {
    dispatch(loginUser(bodyData));
  };
  


  // useEffect(() => {
  //   console.log(userInfo)
  //   if (userInfo) {
  //     if (userInfo.role === 'admin') {
  //       navigate('/admin/home');
  //     } else {
  //       navigate('/user-profile');
  //     }
  //   }
  // }, [userInfo, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;



  return (
    <div className='container p-4'>
      <h1 className='text-center display-4'>Login</h1>
   
      <form onSubmit={handleSubmit(onSub)} className='col-md-6 mx-auto p-2 shadow'>
        <label>Email:</label>
        <input {...register("email",{required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} type="text" className='form-control'/>
        {errors.email && <div className='text-danger'>* Enter valid email</div>}
        <label>Password:</label>
        <input {...register("password",{required:true,minLength:3})} type="password" className='form-control'/>
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
