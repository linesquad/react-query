import { useState } from "react";
// import to use query for fetching data
import { useQuery } from "@tanstack/react-query";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // to get data we need to destructure data from use query
  const { data } = useQuery({
    // first we need to add query key which always is array, it defines this data
    queryKey: ["posts"],

    // second we need to settle query function which will provide fetching
    queryFn: fetchPosts,
  });

  // in case we won't get anything from fetch we need state to return something
  if (!data)
    return (
      <div>
        <h1>There is nothing in data!</h1>
      </div>
    );

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
