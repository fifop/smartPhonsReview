import React, { useEffect, useState } from "react";
import { API_URL, TOKEN_KEY, doApiMethod } from "../../services/apiService";
import axios from "axios";
import "./usersAdminList.css";
import { Link, useNavigate,useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderAdmin from "../general/headerAdmin";
import Footer from "../../components/general/footer";
import PagesBtns from "../../components/general/pagesBtns";

export default function UsersAdminList() {
  const [ar, setAr] = useState([]);
  const nav = useNavigate();
  const [query] = useSearchParams();


  // const id = JSON.parse(localStorage.getItem(TOKEN_KEY)).userInfo.

  useEffect(() => {
    doapi();
  }, [query]);

  const doapi = async () => {
    try {
      const page= query.get("page") || 1
      const url = API_URL + `/users/usersList?page=${page}`
      const response = await axios({
        method: "GET",
        url,
        headers: {
          "x-api-key": JSON.parse(localStorage.getItem(TOKEN_KEY)).userToken,
        },
      });

      // Check if the status code is 401 (Unauthorized)
      if (response.status === 401) {
        nav("/loginAdmin");
        toast.error("You Must To Be Admin", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
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
  };

  const deleteItem = async (id) => {
    try {
      if (window.confirm("are you sure ?")) {
        const url = API_URL + `/users/${id}`;
        const data = await doApiMethod(url, "DELETE");
        console.log(data);
        if (data.deletedCount == 1) {
          console.log(data);
          doapi();
          toast.success("The user has been successfully deleted", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <HeaderAdmin />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Users List</h2>
        <Link className="btn btn-info mt-6 my-3" to={'/signup'}>
          Add User
        </Link>
        <table className="table table-bordered table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Del/Edit</th>
            </tr>
          </thead>
          <tbody>
            {ar.map((item, i) => {

            
              const page= query.get("page") || 1

return(


              <tr key={item._id}>
                <td>{(page-1)*10 +i+1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteItem(item._id);
                    }}
                    className="btn btn-danger m-2"
                  >
                    Del
                  </button>
                  <button
                    onClick={() => {
                      nav(`/changeRole/${item._id}/${item.role}`);
                    }}
                    className="btn btn-success"
                  >
                    Edit
                  </button>
                </td>
              </tr>
)
})}
          </tbody>
        </table>
        <PagesBtns  cssClass={"btn btn-warning ms-2"} 
      apiUrl={API_URL+"/users/count"} linkTo= {"/users/usersList?page="} />
        <Footer/>
      </div>
    </>
  );
}
