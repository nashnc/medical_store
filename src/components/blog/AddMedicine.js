import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function AddMedicine() {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  var navigate = useNavigate();
  //
  const warehouse = JSON.parse(localStorage.getItem("warehouse")) || []; //
  const user = JSON.parse(localStorage.getItem("user")) || []; // to get user id
  const timeStamp = Date.now();
  const date = format(timeStamp, "PPpp"); // javascript date fs
  const userId = user.email; // us unique key
  function addMeds() {
    const newStock = {
      name: name,
      stock: stock,
      id: Date.now(),
      userId: userId,
      date: date,
    };

    // Retrieve existing warehouse from local storage
    const storedWarehouse = localStorage.getItem("warehouse");
    const warehouse = storedWarehouse ? JSON.parse(storedWarehouse) : [];

    // Log the length of warehouse after adding new
    console.log(
      "Number of Items at the Ware house after adding new:",
      warehouse.length
    );
    // Add the new post to the existing warehouse

    // Save the updated warehouse back to local storage
    if (name.length == 0) {
      alert("name is needed");
    } else if (stock.length == 0) {
      alert(`stock is needed`);
    } else {
      warehouse.push(newStock);

      localStorage.setItem("warehouse", JSON.stringify(warehouse));
      navigate("/blog/warehouses");
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <h1 className="text-center">Create Post</h1>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Stock:</label>
              <input
                type="number"
                className="form-control"
                value={stock}
                onChange={(event) => {
                  setStock(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary float-right" onClick={addMeds}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMedicine;
