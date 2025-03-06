import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function DeleteMeds() {
  const [warehouse, setWarehouses] = useState(
    JSON.parse(localStorage.getItem("warehouse")) || []
  );
  const navigate = useNavigate();
  const { warehouseId } = useParams();//to pass id from user button click
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    const warehouses = JSON.parse(localStorage.getItem("warehouse")) || [];
    const warehouse = warehouses.find(
      (warehouse) => warehouse.id === parseInt(warehouseId)
    );

    if (warehouse) {
      setName(warehouse.name);
      setStock(warehouse.stock);
    }
  }, [warehouseId]);

  function deleteMeds() {
    const updatedWarehouses = warehouse.filter(
      (warehouse) => warehouse.id !== parseInt(warehouseId)
    );
    localStorage.setItem("warehouse", JSON.stringify(updatedWarehouses));

    setWarehouses(updatedWarehouses);

    alert(" Medicine Discarded successfully");

    navigate("/blog/warehouses");
  }

  function cancelDelete() {
    navigate("/blog/warehouses");
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <h1 className="text-center">Delete Warehouse</h1>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Stock:</label>
              <textarea className="form-control" value={stock} disabled />
            </div>
            <div className="form-group">
              <button
                className="btn btn-danger float-right"
                onClick={deleteMeds}
              >
                Delete
              </button>
              <button
                className="btn btn-secondary float-left"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteMeds;
