// src/hooks/useAxiosSecure.jsx
import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000', // ✅ Your backend base URL
  withCredentials: false,           // ✅ Set to true if you use cookies/auth sessions
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
