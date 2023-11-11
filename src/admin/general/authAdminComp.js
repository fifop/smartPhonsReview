import React, { useEffect } from 'react'
import { doApiGet,API_URL } from '../../services/apiService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


export default function AuthAdminComp() {

    const nav = useNavigate();

    useEffect(()=>{
        doApi();
    },[])

    const doApi =async() =>{

        try {
            const url = API_URL+ "/users/checkToken"
          const data = await doApiGet(url);
          if (data.role !== "admin"){
            toast.error("you must to be admin to be hear!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5000
            });
            nav("/admin")
          }
          console.log(data);
        
        } catch (error) {
          toast.error("error", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000
          });            nav("/admin")     
        }
    }



  return (
       <React.Fragment> </React.Fragment>
  )
}
