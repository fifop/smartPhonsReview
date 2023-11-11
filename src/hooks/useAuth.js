import { useState, useEffect } from 'react';
import { doApiGet, API_URL } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function useAuth() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const url = API_URL + "/users/checkToken";
        const data = await doApiGet(url);
        if (data.role) {
          setUserRole(data.role);
        } else {
          // If the role is not found, assume 'user' or redirect as needed
          setUserRole('user');
        }
      } catch (error) {
        toast.error("You must be logged in!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000
        });
      }
    };

    checkUserRole();
  }, []);

  return { userRole };
}
