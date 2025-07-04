import axios from "axios";
import { useAuth } from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create a custom axios instance
const myAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const useMyAxios = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth(); // ✅ Correct naming

  useEffect(() => {
    // Add response interceptor
    const interceptor = myAxios.interceptors.response.use(
      (res) => res,
      async (error) => {
        console.log('error caught from our very own interceptor-->', error?.response);

        if (error?.response?.status === 401 || error?.response?.status === 403) {
          await logOut(); // ✅ Properly call logOut
          navigate('/login');
        }

        return Promise.reject(error); // ✅ Don't swallow the error
      }
    );

    // Clean up the interceptor when component unmounts
    return () => {
      myAxios.interceptors.response.eject(interceptor);
    };
  }, [logOut, navigate]);

  return myAxios;
};
