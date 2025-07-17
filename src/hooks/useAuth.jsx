import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // adjust path if needed

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
