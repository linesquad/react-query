import { useState, useEffect } from "react";
// import to use query for fetching data
// we need to import use query client aswell for pre fetching data
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  // here we should create our client for prefetch
  const queryClient = useQueryClient();

  // we should use in use effect cuz current page is async so it might gives delay
  useEffect(() => {
    // validate when to prefetch
    if (currentPage < maxPostPage) {
      // define next page depending on current one
      const nextPage = currentPage + 1;
      // use prefetchQuery which has same body as use query
      queryClient.prefetchQuery({
        queryKey: ["posts", nextPage],
        queryFn: () => fetchPosts(nextPage),
      });
    }
  }, [currentPage, queryClient]);

  // to get data we need to destructure data from use query,
  // we can add as well more properties to destructure such as isLoading and isError
  const { data, isLoading, error, isError } = useQuery({
    // first we need to add query key which always is array, it defines this data
    // we need to add a query key for pages so each pahe will cache diffrently
    queryKey: ["posts", currentPage],

    // second we need to settle query function which will provide fetching
    queryFn: () => fetchPosts(currentPage),

    // here we can set stale time, which means that how long will live data which is stale
    // stale means its ready to refetch on refocus, refech
    staleTime: 5000, // it means this data will be fresh and after amount time we give it will became stale
  });

  // in case we won't get anything from fetch we need state to return something
  // if we have is Loading then we can use it before data will come
  if (isLoading)
    return (
      <div>
        <h3>Fetching Data...</h3>
      </div>
    );

  // in case we doesn't get data and something is wrong
  if (isError)
    return (
      <div>
        <h3>
          Ooops something went wrong. <p>{error.message}</p>
        </h3>
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
        <button
          disabled={currentPage === 1}
          onClick={() => {
            if (currentPage === 1) return;
            setCurrentPage((cur) => cur - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage === maxPostPage}
          onClick={() => {
            if (currentPage === maxPostPage) return;
            setCurrentPage((cur) => cur + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
