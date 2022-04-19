const Register = (props) => {
  return (
    <div className="container mx-auto h-screen flex items-center justify-center -mt-5">
      <div className="flex flex-col w-4/12 shadow-md border border-gray-100 p-10">
        <h1 className="text-center text-2xl">Register</h1>
        <form className="flex gap-3 flex-col">
          <div className="flex flex-col">
            <labe for="username" className="mb-2">
              Username
            </labe>
            <input
              className="py-2 px-3 border border-gray-300 rounded-sm"
              type="text"
              name="email"
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col">
            <labe for="password" className="mb-2">
              Password
            </labe>
            <input
              type="password"
              name="password"
              className="py-2 px-3 border border-gray-300 rounded-sm"
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
