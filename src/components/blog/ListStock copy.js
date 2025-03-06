import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import WarehouseListStock from "./WarehouseListStock";

function ListStock() {
  const [allWarehouses, setAllWarehouses] = useState([]); // Store all the fetched warehouses from the API
  const [filteredWarehouses, setFilteredWarehouses] = useState([]); // Store the filtered warehouses based on search term
  const [SearchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || [];

  const warehouse = JSON.parse(localStorage.getItem("warehouse")) || [];
  //
  const emailLog = user.email;

  const matchingWarehouses = warehouse.filter(
    (warehouse) => warehouse.userId === emailLog
  );
  const lengthOfWarehouse = matchingWarehouses.length;
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = matchingWarehouses.slice(firstIndex, lastIndex);

  const npage = Math.ceil(matchingWarehouses.length / recordsPerPage);

  const numbers = [...Array(npage + 1), keys()].slice(1);
  // const handleCreateWarehouseAlert = () => {
  //   // Get the current number of warehouses from local storage
  //   // const warehouses = JSON.parse(localStorage.getItem("warehouses")) || [];

  //   // Check if the number of warehouses exceeds 5
  //   // if (lengthOfWarehouse == true) {
  //   alert("You cannot create more than 5 warehouses.");

  //   return; // Prevent further action
  //   // }

  //   // Continue with the creation logic (if below limit)
  //   // For example, redirect or open the create warehouse page
  // };

  const handleSearchInputChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (SearchTerm.trim() === "") {
      // If the search input is empty, reset the filteredWarehouses state.
      setFilteredWarehouses(allWarehouses);
    } else {
      // Otherwise, filter the warehouses based on the search term.
      var filteredItems = allWarehouses.filter((item) =>
        item.name.toLowerCase().includes(SearchTerm.toLowerCase())
      );
      setFilteredWarehouses(filteredItems);
    }
  };
  const handleRest = (event) => {
    // If the search input is empty, reset the filteredWarehouses state.
    setFilteredWarehouses(allWarehouses);
    setSearchTerm("");
  };
  const fetchWarehouses = () => {
    if (matchingWarehouses.length > 0) {
      setAllWarehouses(matchingWarehouses);
      setFilteredWarehouses(matchingWarehouses); // Initialize filteredWarehouses with all matching warehouses
    } else {
      setAllWarehouses([]);
      setFilteredWarehouses([]); // Set empty state if no warehouses match
    }
  };

  useEffect(() => {
    fetchWarehouses();
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
            <h1 className="text-center my-4">WareHouse</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            {lengthOfWarehouse > 4 ? (
              <p>you have reached maximum entries full</p>
            ) : (
              <Link
                className="btn btn-info mb-2"
                to={"/blog/warehouses/create"}
              >
                Add Stock
              </Link>
            )}
            {/* <Link
              className="btn btn-info mb-2"
              onClick={handleCreateWarehouse}
              to={"/blog/warehouses/create"}
            >
              Create Warehouse
            </Link> */}
            {filteredWarehouses.length === 0 ? (
              <p>No Medicine available found.</p>
            ) : (
              filteredWarehouses.map((warehouse) => (
                <WarehouseListStock
                  key={warehouse.id}
                  warehouse={warehouse}
                  refresh={fetchWarehouses}
                />
              ))
            )}
            <div>
              <ul className="pagination">
                
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default checkAuth(ListStock);
