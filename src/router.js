import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./components/auth/register";
import Login from "./components/auth/Login";
import AddMedicine from "./components/blog/AddMedicine";
import ViewMed from "./components/blog/ViewMed";
import EditStock from "./components/blog/EditStock";
import ListStock from "./components/blog/ListStock";
import DeleteMeds from "./components/blog/DeleteMeds";
// import PaginatedItems from "./components/blog/PaginatedItems";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "blog/warehouses", element: <ListStock /> },
  { path: "blog/warehouses/create", element: <AddMedicine /> },
  { path: "blog/warehouses/:warehouseId", element: <ViewMed /> },
  { path: "/blog/warehouses/:warehouseId/edit", element: <EditStock /> },
  {
    path: "/blog/warehouses/:warehouseId/delete",
    element: <DeleteMeds />,
  },
  { path: "register", element: <Register /> },
  { path: "login", element: <Login /> },
  // { path: "/blog/PaginatedItems", element: <PaginatedItems /> },
]);

export default router;
