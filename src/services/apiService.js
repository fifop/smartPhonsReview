import axios from "axios";

// Service api
 export  const API_URL = "https://smartphons.onrender.com";
 export const TOKEN_KEY = "smart_token";



 // for Get request only
export const doApiGet = async(_url) => {
    try{
      const token=JSON.parse(localStorage.getItem(TOKEN_KEY)).userToken
      let resp = await axios({
        url:_url,
        method: "GET",
        headers: {
          "x-api-key": token
        }
      })
      
      return resp.data;
    }
    catch(err){
      console.log(err);
      throw err;
    }
  }
  
  // For Delete , put , post , patch request
  export const doApiMethod = async(_url,_method,_body = {}) => {
    try{
      const token=JSON.parse(localStorage.getItem(TOKEN_KEY)).userToken

      let resp = await axios({
        url:_url,
        method: _method,
        data:_body ,
        headers: {
          "x-api-key":token
        }
      })
      return resp.data;
    }
    catch(err){
      console.log(err);
     throw err;
    }
  }