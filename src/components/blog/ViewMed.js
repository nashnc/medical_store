import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

function ViewMed() {
  var { warehouseId } = useParams();
  var [warehouse, setWarehouse] = useState({ name: "", stock: "" });
  const warehouses = JSON.parse(localStorage.getItem("warehouse")) || [];

  const foundWarehouse = warehouses.find(
    (warehouse) => warehouse.id === parseInt(warehouseId)
  );
  useEffect(() => {
   

    if (foundWarehouse) {
      setWarehouse(foundWarehouse);
    }
  }, [warehouseId]);
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3>{warehouse.name}</h3>
              </div>
              <div className="card-body">{warehouse.stock}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMed;
