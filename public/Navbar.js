import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="navbar-brand">
        <h4>Todo List</h4>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse mr-auto"
        id="navbarNav"
        style={{ float: "left" }}
      >
        <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
          <li className="nav-item">
            <NavLink
              to={"/"}
              className={
                "nav-link " + ((status) => (status.isActive ? "active" : ""))
              }
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/aboutus"}
              className={
                "nav-link " + ((status) => (status.isActive ? "active" : ""))
              }
            >
              Aboutus
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/list"}
              className={
                "nav-link " + ((status) => (status.isActive ? "active" : ""))
              }
            >
              List Crud
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/blog/posts"}
              className={
                "nav-link " + ((status) => (status.isActive ? "active" : ""))
              }
            >
              blog
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/register"}
              className={
                "nav-link " + ((status) => (status.isActive ? "active" : ""))
              }
            >
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/login"}
              className={
                "nav-link " + ((status) => (status.isActive ? "active" : ""))
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
