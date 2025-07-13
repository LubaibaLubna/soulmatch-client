// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const user = getAuth().currentUser;

  if (!user) {
    Swal.fire("Please login first to add biodatas", "", "warning");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
