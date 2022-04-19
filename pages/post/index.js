export const getStaticProps = async () => {
  const post = await fetch("https://jsonplaceholder.typicode.com/posts/5");
  const jsonPost = await post.json();

  return {
    props: {
      post: jsonPost || null,
    },
  };
};

const Post = ({ post }) => {
  return (
    <div className="container mx-auto">
      <h1>{post.title}</h1>
      <h2>{post.body}</h2>
    </div>
  );
};

export default Post;
