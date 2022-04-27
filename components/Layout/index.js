import Header from "../Header";
import Link from "next/Link";
import { useEffect } from "react";
import { useStore } from "../../client/context";
import { getValue } from "../../utils/common";
import { getSession } from "next-auth/react";
import { authConstants } from "../../client/context/constant";

const Layout = ({ children }) => {
  const [state, dispatch] = useStore();
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const authenticated = getValue(state, ["user", "authenticated"], false);
    if (!authenticated) {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const session = await getSession();

      if (session) {
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: session,
        });
      } else {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: session,
        });
      }
    }
  };
  return (
    <div>
      <Header />

      {children}
    </div>
  );
};

export default Layout;
