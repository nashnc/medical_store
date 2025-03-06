import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function EditStock() {
  const navigate = useNavigate();
  const { warehouseId } = useParams();
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

  function updateStock() {
    const warehouse = JSON.parse(localStorage.getItem("warehouse")) || [];
    const updatedWarehouses = warehouse.map((warehouse) =>
      warehouse.id === parseInt(warehouseId)
        ? { ...warehouse, name: name, stock: stock }
        : warehouse
    );

    if (stock.length == 0) {
      alert(` enter stock`);
    } else {
      localStorage.setItem("warehouse", JSON.stringify(updatedWarehouses));

      alert("Stock updated successfully!");
      navigate("/blog/warehouses");
    }

  }
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <h1 className="text-center">Edit Stock</h1>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                disabled
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Stock:</label>
              <textarea
                className="form-control"
                value={stock}
                onChange={(event) => {
                  setStock(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary float-right"
                onClick={updateStock}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditStock;
