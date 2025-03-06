import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PostListItem(props) {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );
  useEffect(() => {
    // Sync posts from localStorage whenever the component mounts or posts change
  }, [deletePost]);
  function deletePost() {
    const updatedPosts = posts.filter((post) => post.id !== props.post.id);

    // Save the updated posts to localStorage
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    // Update the state to trigger re-render
    setPosts(updatedPosts);
    // Dependency array ensures the effect runs when posts change

    // Notify the user
    alert("Post deleted successfully");

    // const storedPosts = localStorage.getItem("posts");

    // Log the number of posts after deleting

    console.log("Number of posts after deleting:", updatedPosts.length);
  }

  return (
    <div className="card">
      <div className="card-body">
        {props.post.title}
        <button className="btn btn-primary float-right" onClick={deletePost}>
          Delete
        </button>
        <Link
          to={"/blog/posts/" + props.post.id + "/edit"}
          className="btn btn-primary float-right"
        >
          Edit
        </Link>
        <Link
          to={"/blog/posts/" + props.post.id}
          className="btn btn-info float-right"
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default PostListItem;
