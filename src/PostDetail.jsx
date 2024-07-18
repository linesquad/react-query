import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post }) {
  // we are using use query to get data and other functions
  const { data, isLoading, isError, error } = useQuery({
    // we have key of the data
    queryKey: [post.id],
    // here we need to callBack cuz we need to pass post id
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) return <h1>Loading comments...</h1>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
