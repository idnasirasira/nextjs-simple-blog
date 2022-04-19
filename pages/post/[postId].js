import { useRouter } from "next/router";

export const getStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          postId: "5",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const jsonPost = await post.json();
  console.log(jsonPost);
  return {
    props: {
      post: jsonPost || null,
    },
    revalidate: 3,
  };
};

const PostDetails = ({ post }) => {
  const router = useRouter();

  const { postId } = router.query;

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
};

export default PostDetails;
