import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WarehouseListStock from "./WarehouseListStock";
import checkAuth from "../auth/checkAuth";
import Navbar from "../Navbar";

function ListStock() {
  const [allWarehouses, setAllWarehouses] = useState([]); // Store all the fetched warehouses from the API
  const [filteredWarehouses, setFilteredWarehouses] = useState([]); // Store the filtered warehouses based on search term
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || [];
  const warehouse = JSON.parse(localStorage.getItem("warehouse")) || [];
  const emailLog = user.email;

  const matchingWarehouses = warehouse.filter(
    (warehouse) => warehouse.userId === emailLog
  );
  const lengthOfWarehouse = matchingWarehouses.length;

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;

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

  const handleSearchInputChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      setFilteredWarehouses(allWarehouses);
      setCurrentPage(1); // Reset to the first page if search term is empty
    } else {
      const filteredItems = allWarehouses.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredWarehouses(filteredItems);
      setCurrentPage(1); // Reset to the first page on search
    }
  };

  const handleReset = (event) => {
    setFilteredWarehouses(allWarehouses);
    setSearchTerm("");
    setCurrentPage(1); // Reset to the first page on reset
  };

  // Pagination logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredWarehouses.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredWarehouses.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <form>
              <label>Search Warehouse: </label>
              <input
                type="text"
                value={searchTerm}
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
              {searchTerm.trim() === "" ? (
                ""
              ) : (
                <button
                  className="btn btn-small btn-success"
                  type="button"
                  onClick={handleReset}
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
            <h1 className="text-center my-4">Warehouse</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            {lengthOfWarehouse > 4 ? (
              <p>You have reached maximum entries full</p>
            ) : (
              <Link
                className="btn btn-info mb-2"
                to={"/blog/warehouses/create"}
              >
                Add Stock
              </Link>
            )}
            {filteredWarehouses.length === 0 ? (
              <p>No Medicine available found.</p>
            ) : (
              records.map((warehouse) => (
                <WarehouseListStock
                  key={warehouse.id}
                  warehouse={warehouse}
                  refresh={fetchWarehouses}
                />
              ))
            )}
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a href="#" className="page-link" onClick={prePage}>
                    Prev
                  </a>
                </li>
                {numbers.map((n, i) => (
                  <li className="page-item" key={i}>
                    <a
                      href="#"
                      className="page-link"
                      onClick={() => changePage(n)}
                    >
                      {n}
                    </a>
                  </li>
                ))}
                <li className="page-item">
                  <a href="#" className="page-link" onClick={nextPage}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changePage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default checkAuth(ListStock);
