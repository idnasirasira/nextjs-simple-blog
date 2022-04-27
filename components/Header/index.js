import Link from "next/Link";
import { useStore } from "../../client/context";
import { getValue } from "../../utils/common";
import { signOut } from "next-auth/react";
import { authConstants } from "../../client/context/constant";

const Header = (props) => {
  const [state, dispatch] = useStore();

  const user = getValue(state, ["user"], null);
  const authenticated = getValue(state, ["user", "authenticated"]);

  const logoutHandler = async () => {
    signOut({
      redirect: false,
    }).then((result) => {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
      });
    });
  };

  return (
    <div className="container mx-auto px-4">
      <header className="py-5 border-b border-gray-200">
        <div className="flex gap-2 justify-between items-center">
          {authenticated ? (
            <div className="w-4/12 ">
              <Link href={`/profile`}>
                <a className="text-md" href="#">
                  {user.name}
                </a>
              </Link>
            </div>
          ) : (
            <div className="w-4/12 ">
              <Link href={`/profile`}>
                <a className="text-md" href="#">
                  Guest
                </a>
              </Link>
            </div>
          )}

          <div className="w-4/12 text-center ">
            <h1 className="text-3xl font-mono">KyooBlog</h1>
          </div>
          <div className="w-4/12 flex justify-end items-center gap-3 ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {authenticated ? (
              <a
                onClick={logoutHandler}
                className="hidden md:inline-block border border-gray-500 py-1 px-3 rounded-md text-center hover:bg-gray-600 hover:text-white transition-all duration-300"
              >
                Logout
              </a>
            ) : (
              <>
                <Link href={`/register`}>
                  <a className="hidden md:inline-block border border-gray-500 py-1 px-3 rounded-md text-center hover:bg-gray-600 hover:text-white transition-all duration-300">
                    Register
                  </a>
                </Link>

                <Link href={`/login`}>
                  <a className="hidden md:inline-block border border-gray-500 py-1 px-3 rounded-md text-center hover:bg-gray-600 hover:text-white transition-all duration-300">
                    Sign In
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
