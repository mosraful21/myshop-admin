import { useState } from "react";
import "./Products.css";
import ReactPaginate from "react-paginate";
import { Link, useLoaderData } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete, MdEdit, MdOutlineRemoveRedEye } from "react-icons/md";

const Products = () => {
  const loadedData = useLoaderData();
  const [products, setProducts] = useState(loadedData);
  const photo = "http://localhost:3000/";

  const handleDelete = (_id) => {
    fetch(`http://localhost:3000/api/products/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Deleted Successfully");
        const remaining = products.filter((product) => product._id !== _id);
        setProducts(remaining);
      });
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productData = products?.slice(startIndex, endIndex);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <section>
      <p className="flex items-center text-2xl font-semibold gap-1">
        All Products
        <span>({products.length})</span>
      </p>

      {/* Header section */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 bg-white p-2 rounded-t-lg box-shadow">
        <div className="flex border border-[#5709BB] rounded-lg">
          <input
            type="search"
            name="search"
            className="w-full max-w-[180px] bg-white outline-0 rounded-lg px-1"
            placeholder="Search by Product ID"
          />
          <input
            type="button"
            value="Search"
            className="bg-blue-700 px-2 py-1 rounded-tr-md rounded-br-md text-white cursor-pointer"
          />
        </div>

        <Link
          to="/dashboard/product/addproduct"
          className="flex items-center gap-1 font-semibold bg-blue-700 hover:bg-blue-900 text-white px-3 py-1.5 rounded-lg"
        >
          <FaPlusCircle className="h-5 w-5" />
          <span className="md:flex hidden">Add New Product</span>
        </Link>
      </div>

      {/* Product data Table */}
      <div className="overflow-x-auto mt-1 bg-white box-shadow rounded-b-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="text-center">
              <th className="border">SL</th>
              <th className="border">ID(Skuy)</th>
              <th className="border">Photo_&_Name</th>
              <th className="border">Category</th>
              <th className="border">Brand</th>
              <th className="border">Price</th>
              <th className="border">Discount</th>
              <th className="border">Selling_Price</th>
              <th className="border">Quantity</th>
              <th className="border">Status</th>
              <th className="border">New</th>
              <th className="border">FlashSale</th>
              <th className="border">Action</th>
            </tr>
          </thead>

          <tbody>
            {productData?.map((product, index) => (
              <tr key={index} className="text-center capitalize">
                <td className="p-1 border">
                  {currentPage * itemsPerPage + index + 1}
                </td>
                <td className="p-1 border uppercase">{product.sku}</td>
                <td className="p-1 border flex flex-wrap gap-1">
                  <img
                    src={photo + product.photos[0]}
                    alt=""
                    className="w-12 h-12"
                  />
                  <span className="line-clamp-2">{product.name}</span>
                </td>
                <td className="p-1 border">{product.category.name}</td>
                <td className="p-1 border">{product.brand.name}</td>
                <td className="p-1 border">
                  {product.price}
                  <span className="font-serif ml-1">৳</span>
                </td>
                <td className="p-1 border">
                  {product.discount ? product.discount : "00"}
                  <span className="font-serif ml-1">৳</span>
                </td>
                <td className="p-1 border font-semibold">
                  {product.price - product.discount}
                  <span className="font-serif ml-1">৳</span>
                </td>
                <td className="p-1 border">{product.totalQuantity}</td>
                <td className="p-1 border">
                  {product.status === true ? "ON" : "OFF"}
                </td>
                <td className="p-1 border">
                  {product.newProduct === true ? "ON" : "OFF"}
                </td>
                <td className="p-1 border">
                  {product.flashSale === true ? "ON" : "OFF"}
                </td>
                <td className="p-1 border">
                  <div className="flex items-center justify-center gap-1">
                    <Link to={`/dashboard/product/view/${product._id}`}>
                      <MdOutlineRemoveRedEye className="border text-blue-500 border-blue-500 hover:text-blue-700 cursor-pointer rounded w-6 h-6" />
                    </Link>
                    <Link to={`/dashboard/product/update/${product._id}`}>
                      <MdEdit className="border text-green-500 border-green-500 hover:text-green-700 cursor-pointer rounded w-6 h-6" />
                    </Link>
                    <MdDelete
                      onClick={() => handleDelete(product._id)}
                      className="border text-orange-500 border-orange-500 hover:text-orange-700 cursor-pointer rounded w-6 h-6"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ReactPaginate
          pageCount={Math.ceil(products.length / itemsPerPage)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLinkClassName={"previous-link"}
          nextLinkClassName={"next-link"}
          nextLabel=">"
          previousLabel="<"
        />
      </div>
    </section>
  );
};

export default Products;
