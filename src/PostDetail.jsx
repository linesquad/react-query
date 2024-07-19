import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation, updateMutation }) {
  // we are using use query to get data and other functions
  const { data, isLoading, isError, error } = useQuery({
    // we have key of the data
    queryKey: ["comments", post.id],
    // here we need to callBack cuz we need to pass post id
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) return <h1>Loading comments...</h1>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      {/* on calling mutation we also make as anonymous and pass argument */}
      {/* in this dic we just show if its working and test multiple mutate properties */}
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>{" "}
        {deleteMutation.isPending && <p className="loading">Deleting post</p>}
        {deleteMutation.isError && (
          <p className="error">
            Error while deleting post: {deleteMutation.error.toString()}
          </p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">Post was deleted</p>
        )}
      </div>
      <div>
        <button onClick={() => updateMutation.mutate(post.id)}>
          Update title
        </button>

        {updateMutation.isPending && <p className="loading">Is updating</p>}
        {updateMutation.isError && (
          <p>Error on update: {updateMutation.error.toString()}</p>
        )}
        {updateMutation.isSuccess && (
          <p className="success">Post was succesfully updated!</p>
        )}
      </div>
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
