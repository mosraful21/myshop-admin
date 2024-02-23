import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdClose, MdOutlineFileDownload } from "react-icons/md";

const color = [
  { name: "Black", code: "#0f0f0f" },
  { name: "Blue", code: "#4169e1" },
  { name: "Golden", code: "#fffa8a" },
  { name: "Gray", code: "#778899" },
  { name: "Silver", code: "#C0C0C0" },
  { name: "White", code: "#f8f9f5" },
];

const AddProduct = () => {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, []);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

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

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
  };

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
  };

  const filteredSubCategory = subCategory.filter(
    (subCate) => subCate.category._id === selectedCategory
  );

  /****************** Variations table data Function Start ***********************/
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    color: "",
    quantity: "",
  });

  const [tableData, setTableData] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [, setTotalQuantity] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddToTable = () => {
    if (formData.color && formData.quantity) {
      const existingRow = tableData.find((row) => row.color === formData.color);
      if (existingRow) {
        setTableData((prevTableData) =>
          prevTableData.map((row) =>
            row.color === formData.color
              ? {
                  ...row,
                  quantity:
                    parseInt(row.quantity) + parseInt(formData.quantity),
                }
              : row
          )
        );
      } else {
        setTableData((prevTableData) => [...prevTableData, formData]);
      }
      setFormData({
        color: "",
        quantity: "",
      });
    }
  };

  useEffect(() => {
    const newTotalQuantity = tableData.reduce(
      (total, item) => total + parseInt(item.quantity),
      0
    );
    setTotalQuantity(newTotalQuantity);
  }, [tableData]);

  useEffect(() => {
    const newDetails = tableData.map((item) => ({
      color: item.color,
      quantity: parseInt(item.quantity),
    }));
    setProductDetails(newDetails);
  }, [tableData]);

  const handleDeleteItem = (index) => {
    setTableData((tableData) => tableData.filter((_, idx) => idx !== index));
  };
  /****************** Variations table data Function End *************************/

  /**************** Stock Keeping Unit (SKU) Function Start **********************/
  const [sku, setSku] = useState("");

  const generateSKU = () => {
    const characters = "0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleGenerateSKU = () => {
    const generatedSKU = generateSKU();
    setSku(generatedSKU);
  };
  /***************** Stock Keeping Unit (SKU) Function End ***********************/

  /****************** Image Upload Function Start *************************/
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    const imageArray = Array.from(fileList).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prevImages) => [...prevImages, ...imageArray]);
  };

  const handleDeleteImage = (index, event) => {
    event.preventDefault();
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  /****************** Image Upload Function End *************************/

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    formData.append("productDetails", JSON.stringify(productDetails));

    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Success :", data);
        alert("Product Added Successfully");
      } else {
        throw new Error("Error uploading file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} onClick={handleAddToTable}>
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
          />
        </div>

        {/* Warranty */}
        <div className="space-y-1">
          <label className="font-semibold">Warranty</label>
          <select
            name="warranty"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
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

      {/* Color and Quantity */}
      <div className="mt-2">
        <div className="flex items-center font-semibold mb-2">
          Variations
          <div className="toggle-switch" onChange={() => setShow(!show)}>
            <label className="switch">
              <input type="checkbox" />
              <span></span>
            </label>
          </div>
          <p className="text-xs font-medium text-gray-500 ml-2 line-clamp-2">
            If your product has color and quantity then click this toggle
          </p>
        </div>

        {show ? (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-x-5 gap-y-4">
            <div className="space-y-0.5">
              <label className="font-semibold flex items-center justify-center bg-gray-400 p-1.5 rounded-t-md">
                Color
              </label>
              <select
                name="color"
                value={formData.color}
                className="w-full p-1.5 border border-gray-400 rounded-b-md focus:outline-blue-400"
                onChange={handleInputChange}
              >
                <option value="">Select Color</option>
                {color.map((color, index) => (
                  <option key={index} value={color.code}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-0.5">
              <label className="font-semibold flex items-center justify-center bg-gray-400 p-1.5 rounded-t-md">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                className="w-full p-1.5 border border-gray-400 rounded-b-md focus:outline-blue-400"
                onChange={handleInputChange}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-400">
                    <th className="p-1.5 border border-gray-600 w-1/3">
                      Color
                    </th>
                    <th className="p-1.5 border border-gray-600 w-1/3">
                      Quantity
                    </th>
                  </tr>
                </thead>

                {tableData.length > 0 ? (
                  <tbody>
                    {tableData.map((data, index) => (
                      <tr key={index} className="bg-gray-100">
                        <td className="p-1.5 border border-gray-600">
                          <span
                            className="inline-block w-4 h-4 ml-2 rounded-sm"
                            style={{ backgroundColor: `${data?.color}` }}
                          ></span>
                        </td>
                        <td className="p-1.5 border border-gray-600">
                          {data?.quantity}
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(index)}
                            className="bg-orange-500 hover:bg-orange-600 text-white rounded-[4px] p-1 float-right cursor-pointer"
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  ""
                )}
              </table>
            </div>
          </div>
        ) : (
          ""
        )}
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
            defaultValue={1}
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            required
          />
        </div>

        {/* Stock Keeping Unit (SKU) */}
        <div className="space-y-1">
          <label className="font-semibold flex items-center">
            Sku
            <span className="text-orange-500">*</span>
            <p
              onClick={handleGenerateSKU}
              className="text-sm ml-1 text-green-600 font-semibold cursor-pointer"
            >
              (Auto Generate)
            </p>
          </label>
          <input
            type="text"
            name="sku"
            placeholder="Click Auto Generate"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            defaultValue={sku}
            readOnly
            required
          />
        </div>

        {/* Active Status */}
        <div className="space-y-1">
          <label className="font-semibold">Active Status</label>
          <select
            name="status"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
          >
            <option value={true}>ON</option>
            <option value={false}>OFF</option>
          </select>
        </div>

        {/* New Product */}
        <div className="space-y-1">
          <label className="font-semibold">New Arrival (Optional)</label>
          <select
            name="newProduct"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
          >
            <option value={false}>Select Option</option>
            <option value={true}>ON</option>
          </select>
        </div>

        {/* Flash Sale */}
        <div className="space-y-1">
          <label className="font-semibold">Flash Sale (Optional)</label>
          <select
            name="flashSale"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
          >
            <option value={false}>Select Option</option>
            <option value={true}>ON</option>
          </select>
        </div>
      </div>

      {/* Upload Images */}
      <div className="w-full mt-2 space-y-1">
        <label className="font-semibold">
          Image<span className="text-orange-500">*</span>
          <span className="text-xs font-medium text-gray-500 ml-1">
            You can upload multiple images
          </span>
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <label className="md:h-36 md:w-40 h-[80px] w-[85px] flex flex-col items-center justify-center cursor-pointer border-2 border-dotted border-gray-500 bg-white rounded-md text-gray-500">
            <MdOutlineFileDownload className="md:h-16 md:w-16 h-8 w-8" />
            <p className="text-center md:text-xl text-base font-semibold">
              Upload
            </p>

            <input
              type="file"
              name="photo"
              className="hidden"
              onChange={handleFileChange}
              multiple
            />
          </label>

          <div className="flex flex-wrap items-center gap-2 md:h-36 h-[80px] overflow-auto">
            {images.map((imageUrl, index) => (
              <div key={index} className="relative">
                <img
                  src={imageUrl}
                  alt="image"
                  className="md:h-36 md:w-40 h-[80px] w-[85px] border-2 border-dotted border-gray-500 rounded-md"
                />
                <button
                  onClick={(event) => handleDeleteImage(index, event)}
                  className="absolute top-0 right-0 text-white bg-orange-600 rounded-full p-0.5"
                >
                  <MdClose />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <input
        type="submit"
        value="Add Product"
        className="bg-blue-500 w-full text-white p-1.5 rounded-md mt-5 cursor-pointer"
      />
    </form>
  );
};

export default AddProduct;
