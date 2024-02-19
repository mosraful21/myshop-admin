import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Categories = () => {
  const loadedData = useLoaderData();
  const [categories, setCategories] = useState(loadedData);
  const photo = "http://localhost:3000/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      const res = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        alert("Category Added Successfully");
        form.reset();
        setCategories([...categories, data]);
      } else {
        throw new Error("Error uploading file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = (_id) => {
    fetch(`http://localhost:3000/api/categories/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Deleted Successfully");
        const remaining = categories.filter((cate) => cate._id !== _id);
        setCategories(remaining);
      });
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="border-2 border-blue-400 md:p-4 p-2"
      >
        <div className="grid md:grid-cols-2 gap-2">
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            required
          />

          <input
            type="file"
            name="photo"
            className="w-full p-1 border bg-white border-gray-400 rounded-md focus:outline-blue-400"
            required
          />
        </div>

        <input
          type="submit"
          value="Add Category"
          className="bg-blue-500 w-full text-white p-1.5 rounded-md mt-2 cursor-pointer"
        />
      </form>

      <br />

      <h1 className="text-2xl font-semibold text-center p-4 text-orange-500">
        All Category
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border">Photo</th>
              <th className="p-2 border">Category Name</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 border">
                  {category.photo ? (
                    <img
                      src={photo + category.photo}
                      alt=""
                      className="w-12 h-12"
                    />
                  ) : (
                    <span className="w-12 h-12 border border-gray-500 px-1">
                      No Photo
                    </span>
                  )}
                </td>
                <td className="p-2 border">{category.name}</td>
                <td className="p-2 border">
                  <div className="flex items-center justify-around gap-3">
                    <button
                      onClick={() => handleDelete(category._id)}
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

export default Categories;
