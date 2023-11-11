import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; 
import { API_URL } from '../../services/apiService';
import { toast } from 'react-toastify';

export default function PasswordResetRequest() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log('Attempting to submit form with data:', data); // לוג לפני שליחת הטופס
    try {
      const response = await axios.post(`${API_URL}/passwordReset`, { email: data.email });
      console.log('Form submitted successfully:', response); // לוג לאחר שליחת הטופס בהצלחה
      toast.info("אם המייל קיים במערכת שלנו, נשלח אליו הודעה עם הוראות לאיפוס הסיסמה.", {
        position: "top-center",
        autoClose: 5000
      });
    } catch (error) {
      console.error('Form submission failed:', error); // לוג במקרה של שגיאה בשליחת הטופס
      toast.info("אם המייל קיים במערכת שלנו, נשלח אליו הודעה עם הוראות לאיפוס הסיסמה.", {
        position: "top-center",
        autoClose: 5000
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header text-center">
              איפוס סיסמה
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">כתובת מייל</label>
                  <input
                    {...register("email", { required: "נדרשת כתובת מייל", pattern: /^\S+@\S+$/i })}
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    placeholder="הכנס את כתובת המייל שלך"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">בקש לאפס סיסמה</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
