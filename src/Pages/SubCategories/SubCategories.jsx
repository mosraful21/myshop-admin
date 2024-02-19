import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const SubCategories = () => {
  const loadedData = useLoaderData();
  const [subCategories, setSubCategories] = useState(loadedData);
  const photo = "http://localhost:3000/";

  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      const res = await fetch("http://localhost:3000/api/subCategories", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        alert("Sub Category Added Successfully");
        form.reset();
        setSubCategories([...subCategories, data]);
      } else {
        throw new Error("Error uploading file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = (_id) => {
    fetch(`http://localhost:3000/api/subCategories/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Deleted Successfully");
        const remaining = subCategories.filter(
          (subCate) => subCate._id !== _id
        );
        setSubCategories(remaining);
      });
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="border-2 border-blue-400 md:p-4 p-2"
      >
        <div className="grid md:grid-cols-3 gap-2">
          <input
            type="text"
            name="name"
            placeholder="Sub Category Name"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            required
          />

          <select
            name="category"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            required
          >
            <option value="">Select Category</option>
            {category.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            name="photo"
            className="w-full p-1 border bg-white border-gray-400 rounded-md focus:outline-blue-400"
            required
          />
        </div>
        <input
          type="submit"
          value="Add Sub Category"
          className="bg-blue-500 w-full text-white p-1.5 rounded-md mt-2 cursor-pointer"
        />
      </form>

      <br />

      <h1 className="text-2xl font-semibold text-center p-4 text-orange-500">
        All Sub Category
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border">Photo</th>
              <th className="p-2 border">Sub Category</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((subCategory, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 border">
                  {subCategory.photo ? (
                    <img
                      src={photo + subCategory.photo}
                      alt=""
                      className="w-12 h-12"
                    />
                  ) : (
                    <span className="w-12 h-12 border border-gray-500 px-1">
                      No Photo
                    </span>
                  )}
                </td>
                <td className="p-2 border">{subCategory.name}</td>
                <td className="p-2 border">{subCategory.category.name}</td>
                <td className="p-2 border">
                  <div className="flex items-center justify-around gap-3">
                    <button
                      onClick={() => handleDelete(subCategory._id)}
                      className="bg-orange-500 text-white px-2 font-semibold hover:bg-orange-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SubCategories;
