import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogdin } from "../redux/auth/authSlice";

export default function useAuthCheck() {
  const disptach = useDispatch();
  const [authCheck, setAuthCheck] = useState(false);
  useEffect(() => {
    const localAuth = localStorage.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user) {
        disptach(
          userLogdin({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
    }
    setAuthCheck(true);
  }, [disptach, authCheck]);
  return authCheck;
}
