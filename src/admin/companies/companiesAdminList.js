import React, { useEffect, useState } from "react";
import {API_URL,TOKEN_KEY,doApiMethod,} from "../../services/apiService";
import axios from "axios";
import "./companiesAdminList.css";
import { Link, useNavigate,useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderAdmin  from "../general/headerAdmin";
import Footer from "../../components/general/footer";
import PagesBtns from "../../components/general/pagesBtns";

export default function CompaniesAdminList() {
  const [ar, setAr] = useState([]);
  const nav = useNavigate();
  const [query] = useSearchParams();


  useEffect(() => {
    doapi();
  }, []);

  const doapi = async () => {
    try {
      const page= query.get("page") || 1
      const token = JSON.parse(localStorage.getItem(TOKEN_KEY)).userToken
      const url = API_URL + `/companies?page=${page}`;
      const response = await axios({
        method: "GET",
        url,
        headers: {
          "x-api-key": token,
        },
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
  };

  const deleteItem = async (id) => {
    try {
      if (window.confirm("are you sure ?")) {
        const url = API_URL + `/companies/${id}`;
        const data = await doApiMethod(url, "DELETE");
        console.log(data);
        if (data.deletedCount == 1) {
          console.log(data);

          toast.success("The item has been successfully deleted", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });

          doapi();
          console.log("delete success");
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
    <HeaderAdmin/>
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Companies List</h2>
      <Link className="btn btn-info mt-6 my-3" to={"/admin-addCompany"}>
        Add Company
      </Link>
      <div className="table-responsive"> {/* עטיפת הטבלה ב-div רספונסיבי */}
        <table className="table table-bordered table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Del/Edit</th>
            </tr>
          </thead>
          <tbody>
            {ar.map((item, i) => {
              const page = query.get("page") || 1;
              const encodedURL = encodeURIComponent(item.img_url);
              return (
                <tr className=" text-center" key={item._id}>
                  <td>{(page-1)*10 + i + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      onClick={() => nav(`/image/${encodedURL}`)}
                      src={item.img_url}
                      style={{ height: "100px", width: "60px" }}
                      alt="Company"
                    />
                  </td>
                  <td>
                    <div className="d-flex justify-content-around"> {/* עיצוב רספונסיבי לכפתורים */}
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="btn btn-danger m-2"
                      >
                        Del
                      </button>
                      <Link
                        to={`/admin-editCompany/${item._id}`}
                        className="btn btn-success"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <PagesBtns cssClass={"btn btn-warning ms-2"} apiUrl={API_URL+"/companies/count"} linkTo={"/admin-companies?page="}/>
      <Footer/>
    </div>
  </>
  
  );
}
