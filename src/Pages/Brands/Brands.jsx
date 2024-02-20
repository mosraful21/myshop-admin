import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Brands = () => {
  const loadedData = useLoaderData();
  const [brands, setBrands] = useState(loadedData);
  const photo = "http://localhost:3000/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      const res = await fetch("http://localhost:3000/api/brands", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        alert("Brand Added Successfully");
        form.reset();
        setBrands([...brands, data]);
      } else {
        throw new Error("Error uploading file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = (_id) => {
    fetch(`http://localhost:3000/api/brands/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Deleted Successfully");
        const remaining = brands.filter((brand) => brand._id !== _id);
        setBrands(remaining);
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
            placeholder="Brand Name"
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
          value="Add Brand"
          className="bg-blue-500 w-full text-white p-1.5 rounded-md mt-2 cursor-pointer"
        />
      </form>

      <br />

      <h1 className="text-2xl font-semibold text-center p-4 text-orange-500">
        All Brand
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border">Photo</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 border">
                  {brand.photo ? (
                    <img
                      src={photo + brand.photo}
                      alt=""
                      className="w-12 h-12"
                    />
                  ) : (
                    <span className="w-12 h-12 border border-gray-500 px-1">
                      No Photo
                    </span>
                  )}
                </td>
                <td className="p-2 border">{brand.name}</td>
                <td className="p-2 border">
                  <div className="flex items-center justify-around gap-3">
                    <button
                      onClick={() => handleDelete(brand._id)}
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

export default Brands;
