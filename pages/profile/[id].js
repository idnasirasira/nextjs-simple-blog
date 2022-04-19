export const getServerSideProps = async ({ query }) => {
  const user = await fetch(
    `https://jsonplaceholder.typicode.com/users/${query.id}`
  );
  const userJson = await user.json();

  return {
    props: {
      user: userJson || null,
    },
  };
};

const Profile = ({ user }) => {
  if (!Object.keys(user).length) {
    return <div className="w-screen text-center mt-10">Invalid User</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-16 w-full">
        <div className="flex flex-col items-center">
          <img
            className="rounded-full w-52 h-52"
            src={`https://ui-avatars.com/api/?background=random&name=${user.name}`}
          />
          <div className="flex flex-col items-center ">
            <h1 className="font-bold text-3xl mt-2 text-gray-800">
              {user.name}
            </h1>
            <h5 className="text-lg font-semibold text-gray-600">
              {user.username}
            </h5>
          </div>
        </div>
      </div>

      <div className="w-auto border-t border-gray-600/30 mt-20 py-5">
        <table>
          <tbody>
            <tr>
              <td className="w-20">Email</td>
              <td>{user.email}</td>
            </tr>

            <tr>
              <td className="w-20">Phone</td>
              <td>{user.phone}</td>
            </tr>

            <tr>
              <td className="w-20">Address</td>
              <td>{user.address.street}</td>
            </tr>

            <tr>
              <td className="w-20">Webiste</td>
              <td>
                <a className="text-blue-500" href={user.website}>
                  {user.website}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
