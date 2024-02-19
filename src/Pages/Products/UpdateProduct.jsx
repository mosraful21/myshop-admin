import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const loadedData = useLoaderData();
  const [product, setProduct] = useState(loadedData);
  const navigate = useNavigate();

  const handleUpdated = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const details = form.details.value;
    const price = form.price.value;
    const discount = form.discount.value;
    const warranty = form.warranty.value;
    const totalQuantity = form.totalQuantity.value;
    const minimumOrderQty = form.minimumOrderQty.value;
    const status = form.status.value;
    const newProduct = form.newProduct.value;
    const flashSale = form.flashSale.value;
    const UpdatedProduct = {
      name,
      details,
      price,
      discount,
      warranty,
      totalQuantity,
      minimumOrderQty,
      status,
      newProduct,
      flashSale,
    };

    fetch(`http://localhost:3000/api/products/${product._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(UpdatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Product Updated Successfully");
        setProduct(data);
        navigate("/dashboard/product");
      });
  };

  return (
    <form onSubmit={handleUpdated}>
      {/* Porduct Name */}
      <div className="mb-2 space-y-1">
        <label className="font-semibold">
          Product Name<span className="text-orange-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
          required
          defaultValue={product?.name}
        />
      </div>

      {/* Product Details */}
      <div className="space-y-1">
        <label className="font-semibold">
          Product Details<span className="text-orange-500">*</span>
        </label>
        <textarea
          name="details"
          placeholder="Details"
          className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
          rows="8"
          required
          defaultValue={product?.details}
        ></textarea>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-x-5 gap-y-2">
        {/* Price */}
        <div className="space-y-1">
          <label className="font-semibold">
            Price <span className="font-serif font-normal">(৳)</span>
            <span className="text-orange-500">*</span>
          </label>
          <input
            type="text"
            name="price"
            placeholder="Price"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            required
            defaultValue={product?.price}
          />
        </div>

        {/* Discount Amount */}
        <div className="space-y-1">
          <label className="font-semibold">
            Discount Amount <span className="font-serif font-normal">(৳)</span>
          </label>
          <input
            type="text"
            name="discount"
            placeholder="Discount Amount"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            defaultValue={product?.discount}
          />
        </div>

        {/* Warranty */}
        <div className="space-y-1">
          <label className="font-semibold">Warranty</label>
          <select
            name="warranty"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            defaultValue={product?.warranty}
          >
            <option value="No Warranty">Select Warranty</option>
            <option value="3 Month">3 Month</option>
            <option value="4 Month">4 Month</option>
            <option value="6 Month">6 Month</option>
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
            <option value="5 Years">5 Years</option>
            <option value="10 Years">10 Years</option>
          </select>
        </div>
      </div>

      <div className="mt-2 grid md:grid-cols-3 grid-cols-1 gap-x-5 gap-y-2">
        {/* Total Quantity */}
        <div className="space-y-1">
          <label className="font-semibold">
            Total Quantity
            <span className="text-orange-500">*</span>
          </label>
          <input
            type="number"
            name="totalQuantity"
            placeholder="Total Quantity"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            required
            defaultValue={product?.totalQuantity}
          />
        </div>

        {/* Minimum Order Quantity */}
        <div className="space-y-1">
          <label className="font-semibold">
            Minimum Order Quantity
            <span className="text-orange-500">*</span>
          </label>
          <input
            type="number"
            name="minimumOrderQty"
            placeholder="Minimum Order Quantity (1)"
            defaultValue={product?.minimumOrderQty}
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
          />
        </div>

        {/* Active Status */}
        <div className="space-y-1">
          <label className="font-semibold">Active Status</label>
          <select
            name="status"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            defaultValue={product?.status}
          >
            <option value={true}>ON</option>
            <option value={false}>OFF</option>
          </select>
        </div>

        {/* New Product */}
        <div className="space-y-1">
          <label className="font-semibold">New / Old (Optional)</label>
          <select
            name="newProduct"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            defaultValue={product?.newProduct}
          >
            <option value="">Select Option</option>
            <option value={true}>New</option>
            <option value={false}>Old</option>
          </select>
        </div>

        {/* Flash Sale */}
        <div className="space-y-1">
          <label className="font-semibold">Flash Sale (Optional)</label>
          <select
            name="flashSale"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            defaultValue={product?.flashSale}
          >
            <option value="">Select Option</option>
            <option value={true}>ON</option>
            <option value={false}>OFF</option>
          </select>
        </div>
      </div>

      <input
        type="submit"
        value="Update Product"
        className="bg-blue-500 w-full text-white p-1.5 rounded-md mt-5 cursor-pointer"
      />
    </form>
  );
};

export default UpdateProduct;
