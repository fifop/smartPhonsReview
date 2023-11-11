import React from 'react';
import { useForm } from 'react-hook-form';
import { API_URL, doApiMethod } from '../../services/apiService';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PasswordResetForm({ token }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const params = useParams();
  const token_params = params.token;
  const nav = useNavigate();

  const onSubmit = async (data) => {
    console.log('Form submission data:', data); // לוג של הנתונים לפני שליחה

    if (data.password !== data.confirmPassword) {
      console.error('Passwords do not match'); // לוג שגיאה אם הסיסמאות לא תואמות
      alert("Passwords do not match");
      return;
    }

    try {
     
        const url = `${API_URL}/passwordReset/${token_params}`;
        const payload = {
          token: token_params,
          newPassword: data.password
        }
        const response = await axios({
          
          method: "POST",
          url,
          data: payload,
          headers:{
            'x-api-key': payload.token
          }
        })
      
        
      console.log('Response received:', response)
      console.log('Response received:', response.data); // לוג של התגובה מהשרת
      if (response.data) {
        toast.success("Password has been reset successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => nav('/') 
        });     
       } else {
        toast.info("Failed to reset password. Please try again.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
       }


    } catch (error) {
      console.error('Error occurred:', error); // לוג של השגיאה
      toast.error("Failed to reset password. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>שחזור סיסמה</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="card card-body">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">סיסמה חדשה</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                {...register("password", { required: "נדרשת סיסמה", minLength: { value: 6, message: "הסיסמה חייבת להיות בת לפחות 6 תווים" } })}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">אימות סיסמה חדשה</label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                id="confirmPassword"
                {...register("confirmPassword", { required: "אנא אשר את הסיסמה", validate: (value) => value === watch('password') || "הסיסמאות אינן תואמות" })}
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary">אפס סיסמה</button>
          </form>
        </div>
      </div>
    </div>
  );
}