import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const loadedData = useLoaderData();
  const [product, setProduct] = useState(loadedData);
  const navigate = useNavigate();

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    product.category || ""
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    product.subCategory || ""
  );
  const [selectedBrands, setSelectedBrands] = useState(product.brand || "");

  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/subCategories")
      .then((res) => res.json())
      .then((data) => setSubCategory(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
  };

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
  };

  const handleBrandChange = (event) => {
    setSelectedBrands(event.target.value);
  };

  const filteredSubCategory = subCategory.filter(
    (subCate) => subCate.category._id === selectedCategory
  );

  const handleUpdated = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const details = form.details.value;
    const category = form.category.value;
    const subCategory = form.subCategory.value;
    const brand = form.brand.value;
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
      category,
      subCategory,
      brand,
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
        {/* Category  */}
        <div className="space-y-1">
          <label className="font-semibold">
            Category<span className="text-orange-500">*</span>
          </label>
          <select
            name="category"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select Category</option>
            {category.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sub Category */}
        <div className="space-y-1">
          <label className="font-semibold">Sub Category</label>
          <select
            name="subCategory"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
          >
            <option value="">Select Sub Category</option>
            {filteredSubCategory.map((subCate, index) => (
              <option key={index} value={subCate._id}>
                {subCate.name}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div className="space-y-1">
          <label className="font-semibold">
            Brand<span className="text-orange-500">*</span>
          </label>
          <select
            name="brand"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            value={selectedBrands}
            onChange={handleBrandChange}
            required
          >
            {brands.map((brand, index) => (
              <option key={index} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

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
            <option value={false}>OFF</option>
            <option value={true}>ON</option>
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
            <option value={false}>OFF</option>
            <option value={true}>ON</option>
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
