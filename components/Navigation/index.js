import Link from "next/Link";

const Navigation = (props) => {
  return (
    <div>
      <Link href={`/`}>
        <a>Home</a>
      </Link>
      <Link href={`/user`}>
        <a>User</a>
      </Link>
      <Link href={`/post`}>
        <a>Post</a>
      </Link>

      {/* Styled Components */}
      <style>
        {`
        a {
          display: inline-block;
          color: blue;
          margin: 10px;
        }
      `}
      </style>
    </div>
  );
};

export default Navigation;
