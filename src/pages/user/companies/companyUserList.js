
import React, { useEffect, useState } from 'react'
import { API_URL, TOKEN_KEY,doApiMethod,doApiGet } from '../../../services/apiService';
import axios from 'axios';
// import "./pages/user/companyUserList.css"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderClient from '../../../components/general/headerClient';
import Footer from '../../../components/general/footer';


export default function CompanyUserList() {
const [ar,setAr] = useState([]);
const nav = useNavigate()
const [isNavCollapsed, setIsNavCollapsed] = useState(true);
const userData = localStorage.getItem(TOKEN_KEY);


const handleLogout = () => {
  localStorage.removeItem(TOKEN_KEY);
  nav("/login");
  setIsNavCollapsed(true); // Close the menu on logout
};

    useEffect (()=>{
      doapi()
},[])

const doapi = async() => {
  try {
    const url = API_URL + '/companies';
    const response = await axios({
      method: "GET",
      url,
      headers: {
        "x-api-key": localStorage.getItem(TOKEN_KEY)
      }
    });

    // Check if the status code is 401 (Unauthorized)
    if (response.status === 401) {
      nav("/loginAdmin");
      return; // Exit the function early
    }

    setAr(response.data);
    console.log(response.data);

  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      nav("/");
    }
  }
}




return (   
   <>

<HeaderClient/>
  
  <div className="container mt-5">
    <h2 className="mb-4 text-center">Companies List</h2>
    <Link className='btn btn-info mt-6 my-3' to={"/user-Add-company"}>Add Company</Link>
    <table className="table table-bordered table-hover table-striped">
      <thead className="thead-dark">
        <tr>
        <th>#</th>
          <th>Name</th>
          <th>image</th>
        </tr>
      </thead>
      <tbody>
        {ar.map((item,i) => {
        const encodedURL = encodeURIComponent(item.img_url);
          return(
          <tr key={item._id}>
            <td>{i+1}</td>
            <td>{item.name}</td>
            <td><img onClick={()=>{
              nav(`/image/${encodedURL}`)
            }} src={item.img_url} style={{highet:"100px",width:"60px"}}></img></td>
          </tr>

          )
})}
      </tbody>
    </table>
  </div>
<Footer/>
</>

);
}