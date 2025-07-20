import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/api/users?email=${user.email}`)
        .then(res => {
          setIsAdmin(res.data.role === "admin");
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setIsAdmin(false);
      setLoading(false);
    }
  }, [user]);

  return [isAdmin, loading];
};

export default useAdmin;
