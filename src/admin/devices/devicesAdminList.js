import React, { useEffect, useState } from 'react'
import { API_URL, TOKEN_KEY,doApiMethod } from '../../services/apiService';
import axios from 'axios';
import "./devicesAdminList.css"
import { Link, useNavigate,useSearchParams } from 'react-router-dom';
import HeaderAdmin from "../general/headerAdmin";
import PagesBtns from '../../components/general/pagesBtns'
import Footer from '../../components/general/footer';

export default function DevicesAdminList() {
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
      nav("/Admin");
    }
  }
}

const deleteItem = async (id) => {
  try {
    if(window.confirm("are you sure ?")){
      const url = API_URL+ `/devices/${id}`
      const data = await doApiMethod(url,"DELETE")
      console.log(data);
    if(data.deletedCount==1){
      console.log(data);
      doapi()
      console.log("delete success");

    }
  }

  } catch (error) {
    console.error("Error deleting device:", error);



    }

}

return (
  <>
 <HeaderAdmin/>
  <div className="container mt-5">
    <h2 className="mb-4 text-center">Devices List</h2>
    <Link className='btn btn-info mt-6 my-3' to={"/admin-addDevice"}>Add Device</Link>
    <table className="table table-bordered table-hover table-striped">
      <thead className="thead-dark">
        <tr>
        <th>#</th>
        <th>Company ID</th>
          <th>Name</th>
          <th>Battery Score</th>
          <th>Camera Score</th>
          <th>Price</th>
          <th>Del/Edit</th>
        </tr>
      </thead>
      <tbody>
        {ar.map((item,i)  => {

          const page= query.get("page") || 1

          return(
          <tr key={item._id}>
            <td>{ (page-1)*10 +i+1}</td>
            <td>{item.company_id}</td>
            <td>{item.name}</td>
            <td>{item.battery_score}</td>
            <td>{item.camera_score}</td>
            <td>{item.price}</td>
            <td>
              <button onClick={()=>{
                deleteItem(item._id)
              }} className='btn btn-danger m-2'>Del</button>
              <Link to={`/admin-editDevice/${item._id}`} 
              className='btn btn-success'>Edit</Link>
            </td>
          </tr>
          )
            })}
      </tbody>
    </table>
    <div>
      <PagesBtns cssClass={"btn btn-warning ms-2"} 
      apiUrl={API_URL+"/devices/count"} linkTo= {"/admin-devices?page="}/>
    </div>
  </div>
  <Footer/>
  </>
);
}