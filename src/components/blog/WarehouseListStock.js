import { Link } from "react-router-dom";

function WarehouseListStock(props) {
  return (
    <div className="card">
      <div className="card-body">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Stock</th>
              <th>Time Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">{props.warehouse.name}</td>
              <td>{props.warehouse.stock}</td>
              <td>{props.warehouse.date}</td>
              <td className="d-flex justify-content-end">
                <Link
                  to={"/blog/warehouses/" + props.warehouse.id + "/delete"}
                  className="btn btn-danger mx-1"
                >
                  Delete
                </Link>
                <Link
                  to={"/blog/warehouses/" + props.warehouse.id + "/edit"}
                  className="btn btn-warning mx-1"
                >
                  Edit
                </Link>
                <Link
                  to={"/blog/warehouses/" + props.warehouse.id}
                  className="btn btn-info mx-1"
                >
                  View
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WarehouseListStock;
