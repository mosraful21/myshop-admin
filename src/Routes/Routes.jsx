import { createBrowserRouter } from "react-router-dom";
// import AdminLogin from "../Pages/Users/Admin/AdminLogin";
import AdminLayout from "../Layout/AdminLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Admin from "../Pages/Users/Admin/Admin";
import UpdateAdmin from "../Pages/Users/Admin/UpdateAdmin";
import Customer from "../Pages/Users/Customer/Customer";
import UpdateCustomer from "../Pages/Users/Customer/UpdateCustomer";
import Banner from "../Pages/Banner/Banner";
import Brands from "../Pages/Brands/Brands";
import Categories from "../Pages/Categories/Categories";
import SubCategories from "../Pages/SubCategories/SubCategories";
import Products from "../Pages/Products/Products";
import AddProduct from "../Pages/Products/AddProduct";
import ViewProduct from "../Pages/Products/ViewProduct";
import UpdateProduct from "../Pages/Products/UpdateProduct";

const routes = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <AdminLogin />,
  //   loader: () => fetch("http://localhost:3000/api/admin"),
  // },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      // Admin : -------------------------------------
      {
        path: "/dashboard/admin",
        element: <Admin />,
        loader: () => fetch("http://localhost:3000/api/admin"),
      },
      {
        path: "/dashboard/admin/update/:id",
        element: <UpdateAdmin />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/api/admin/${params.id}`),
      },

      // Customer : ---------------------------------------
      {
        path: "/dashboard/customer",
        element: <Customer />,
        loader: () => fetch("http://localhost:3000/api/customer"),
      },
      {
        path: "/dashboard/customer/update/:id",
        element: <UpdateCustomer />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/api/customer/${params.id}`),
      },

      // Brand and Banner : ----------------------------------
      {
        path: "/dashboard/banner",
        element: <Banner />,
        loader: () => fetch("http://localhost:3000/api/banner"),
      },
      {
        path: "/dashboard/brand",
        element: <Brands />,
        loader: () => fetch("http://localhost:3000/api/brands"),
      },

      // Category and Sub Category : ------------------------------
      {
        path: "/dashboard/category",
        element: <Categories />,
        loader: () => fetch("http://localhost:3000/api/categories"),
      },
      {
        path: "/dashboard/subcategory",
        element: <SubCategories />,
        loader: () => fetch("http://localhost:3000/api/subCategories"),
      },

      // Products : ---------------------------------------
      {
        path: "/dashboard/product",
        element: <Products />,
        loader: () => fetch("http://localhost:3000/api/products"),
      },
      {
        path: "/dashboard/product/addproduct",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/product/view/:id",
        element: <ViewProduct />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/api/products/${params.id}`),
      },
      {
        path: "/dashboard/product/update/:id",
        element: <UpdateProduct />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/api/products/${params.id}`),
      },
    ],
  },
]);

export default routes;
