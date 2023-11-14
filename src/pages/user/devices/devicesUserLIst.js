import React, { useEffect, useState } from 'react'
import { API_URL, TOKEN_KEY,doApiMethod,doApiGet } from '../../../services/apiService';
import axios from 'axios';
import "../devices/devicesUserLIst.css"
import { Link, useNavigate,useSearchParams } from 'react-router-dom';
import PagesBtns from '../../../components/general/pagesBtns'
import Footer from '../../../components/general/footer';
import HeaderClient from '../../../components/general/headerClient';

export default function DevicesUserList() {
const [ar,setAr] = useState([]);
const [query] = useSearchParams();
const nav = useNavigate()

    useEffect (()=>{
      doapi()
},[query])

const doapi = async() => {
  try {
    const page= query.get("page") || 1
    const url = API_URL + `/devices?page=${page}`;


    const response = await doApiGet(url)

    // Check if the status code is 401 (Unauthorized)
    if (response.status === 401) {
      nav("/loginAdmin");
      return; // Exit the function early
    }

    setAr(response);
    console.log(response);

  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      nav("/Admin");
    }
  }
}



return (
  <div>  
        <HeaderClient/>
  <div className="container mt-5">
    <h2 className="mb-4 text-center">Devices List</h2>
    <Link className='btn btn-info mt-6 my-3' to={"/user-AddDeviceForm"}>Add Device</Link>
    <div className="table-responsive">
    <table className="table table-bordered table-hover table-striped">
      <thead className="thead-dark">
        <tr>
        <th>#</th>
        <th>Company ID</th>
          <th>Name</th>
          <th>Battery Score</th>
          <th>Camera Score</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {ar.map((item,i)  => {

          const page= query.get("page") || 1

          return(
            
          <tr  className=" text-center" key={item._id}>
            <td >{ (page-1)*10 +i+1}</td>
            <td>{item.company_id}</td>
            <td>{item.name}</td>
            <td>{item.battery_score}</td>
            <td>{item.camera_score}</td>
            <td>{item.price}</td>
        
          </tr>
          )
            })}
      </tbody>
    </table>
    </div>
    <div>
      <PagesBtns cssClass={"btn btn-warning ms-2"} 
      apiUrl={API_URL+"/devices/count"} linkTo= {"/devices?page="}/>
    </div>
    <Footer/>
  </div>
  </div>
 
);
}