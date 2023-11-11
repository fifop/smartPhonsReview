import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const doapi = async () => {
      try {
        const url = `${API_URL}/users/userInfo`
        const response = await doApiGet(url)
        console.log(response);
        setUserInfo(response);
      } catch (err) {
        setError('Failed to fetch user info');
        console.error(err);
      }
    };

    doapi();
  }, []); 

  const handleGoBack = () => {
    navigate(-1);
  };

  if (error) {
    return <div className="alert alert-danger" role="alert">Error: {error}</div>;
  }

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">User Info</h1>
          <p className="card-text">Name: {userInfo.name}</p>
          <p className="card-text">Email: {userInfo.email}</p>
          <button onClick={handleGoBack} className="btn btn-primary">Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

