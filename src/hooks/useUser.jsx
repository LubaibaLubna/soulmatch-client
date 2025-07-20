import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const useUser = () => {
  const { user } = useContext(AuthContext);
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/api/users?email=${user.email}`)
        .then(res => {
          setIsUser(res.data.role === "user");
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setIsUser(false);
      setLoading(false);
    }
  }, [user]);

  return [isUser, loading];
};

export default useUser;
