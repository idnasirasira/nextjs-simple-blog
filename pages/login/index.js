import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { getValue } from "../../utils/common";
import { authConstants } from "../../client/context/constant";
import { useStore } from "../../client/context";
import Loader from "../../components/Loader";

const User = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const [state] = useStore();
  const user = getValue(state, ["user"], null);

  const loginHandler = async (e) => {
    e.preventDefault();

    const payload = { email, password };
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const result = await signIn("credentials", { ...payload, redirect: false });

    if (!result.error) {
      const session = await getSession();

      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: session });
      router.replace("/");
    } else {
      dispatch({ type: authConstants.LOGIN_FAILURE, payload: result.error });
      setErrorMessage(result.error);
    }
  };

  if (user && user.authenticating) {
    return <Loader />;
  }

  if (user && user.authenticated) {
    router.replace("/");
    return null;
  }

  return (
    <div className="container mx-auto h-screen flex items-center justify-center -mt-5">
      <div className="flex flex-col w-4/12 shadow-md border border-gray-100 p-10">
        <h1 className="text-center text-2xl">Login</h1>
        <form className="flex gap-3 flex-col" onSubmit={loginHandler}>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              className="py-2 px-3 border border-gray-300 rounded-sm"
              type="text"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="py-2 px-3 border border-gray-300 rounded-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-3">
            <button className="w-full border border-gray-500 py-2 hover:bg-gray-500 hover:text-white transition-colors duration-300">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;
