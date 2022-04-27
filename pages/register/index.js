import { useState } from "react";
import { signup } from "../../client/request";
import { useRouter } from "next/router";
import { getValue } from "../../utils/common";
import { useStore } from "../../client/context";
import Loader from "../../components/Loader";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const [state] = useStore();
  const user = getValue(state, ["user"], null);

  const signupHandler = async (e) => {
    e.preventDefault();

    const payload = { name, email, password };
    const result = await signup(payload);

    if (result.hasError) {
      setErrorMessage(result.errorMessage);
    } else {
      setErrorMessage(null);
      setName("");
      setEmail("");
      setPassword("");

      router.replace("/login");
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
        <h1 className="text-center text-2xl">Register</h1>
        <form className="flex gap-3 flex-col" onSubmit={signupHandler}>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <div className="flex flex-col">
            <label htmlFor="fullname" className="mb-2">
              Name
            </label>
            <input
              className="py-2 px-3 border border-gray-300 rounded-sm"
              type="text"
              name="fullname"
              autoComplete="fullname"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="username" className="mb-2">
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
