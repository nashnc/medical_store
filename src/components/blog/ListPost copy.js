import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import PostListItem from "./PostListItem";
import checkAuth from "../auth/checkAuth";

function ListPosts() {
  const [allPosts, setAllPosts] = useState([]); // Store all the fetched posts from the API
  const [filteredPosts, setFilteredPosts] = useState([]); // Store the filtered posts based on search term
  const [SearchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || [];

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  //
  const emailLog = user.email;

  const matchingPosts = posts.filter((post) => post.userId === emailLog);
  const lengthOfPost = matchingPosts.length;
  // const handleCreatePostAlert = () => {
  //   // Get the current number of posts from local storage
  //   // const posts = JSON.parse(localStorage.getItem("posts")) || [];

  //   // Check if the number of posts exceeds 5
  //   // if (lengthOfPost == true) {
  //   alert("You cannot create more than 5 posts.");

  //   return; // Prevent further action
  //   // }

  //   // Continue with the creation logic (if below limit)
  //   // For example, redirect or open the create post page
  // };

  const handleSearchInputChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (SearchTerm.trim() === "") {
      // If the search input is empty, reset the filteredPosts state.
      setFilteredPosts(allPosts);
    } else {
      // Otherwise, filter the posts based on the search term.
      var filteredItems = allPosts.filter((item) =>
        item.title.toLowerCase().includes(SearchTerm.toLowerCase())
      );
      setFilteredPosts(filteredItems);
    }
  };
  const handleRest = (event) => {
    // If the search input is empty, reset the filteredPosts state.
    setFilteredPosts(allPosts);
    setSearchTerm("");
  };
  const fetchPosts = () => {
    if (matchingPosts.length > 0) {
      setAllPosts(matchingPosts);
      setFilteredPosts(matchingPosts); // Initialize filteredPosts with all matching posts
    } else {
      setAllPosts([]);
      setFilteredPosts([]); // Set empty state if no posts match
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <form>
              <label>Search Blog: </label>
              <input
                type="text"
                value={SearchTerm}
                onChange={handleSearchInputChange}
              />{" "}
              &nbsp;
              <button
                className="btn btn-small btn-success"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
              &nbsp;{" "}
              {SearchTerm.trim() === "" ? (
                ""
              ) : (
                <button
                  className="btn btn-small btn-success"
                  type="button"
                  onClick={handleRest}
                >
                  Reset
                </button>
              )}
              &nbsp; &nbsp;
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">Blog</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            {lengthOfPost > 5 ? (
              <p>you have reached maximum entries full</p>
            ) : (
              <Link className="btn btn-info mb-2" to={"/blog/posts/create"}>
                Create Post
              </Link>
            )}
            {/* <Link
              className="btn btn-info mb-2"
              onClick={handleCreatePost}
              to={"/blog/posts/create"}
            >
              Create Post
            </Link> */}
            {filteredPosts.length === 0 ? (
              <p>No matching posts found.</p>
            ) : (
              filteredPosts.map((post) => (
                <PostListItem key={post.id} post={post} refresh={fetchPosts} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ListPosts);
