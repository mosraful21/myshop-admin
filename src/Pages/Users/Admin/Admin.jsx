import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Admin = () => {
  // Read: get data --------------------
  const LoadedUsers = useLoaderData();
  const [admin, setAdmin] = useState(LoadedUsers);
  const photo = "http://localhost:3000/";

  // Create: post data ----------------
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch("http://localhost:3000/api/admin", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("User Added Successfully");
        form.reset();
        setAdmin([...admin, data]);
      })
      .catch((error) => console.error("Error:", error));
  };

  // Delete: delete data : ----------------
  const handleDelete = (_id) => {
    fetch(`http://localhost:3000/api/admin/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Deleted Successfully");
        const remaining = admin.filter((admin) => admin._id !== _id);
        setAdmin(remaining);
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
            placeholder="Enter Your Name"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            required
          />

          <input
            type="text"
            name="email"
            placeholder="Enter Your Email"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
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
          value="Register"
          className="bg-blue-500 w-full text-white p-1.5 rounded-md mt-2 cursor-pointer"
        />
      </form>

      <br />
      <br />

      <h1 className="text-2xl font-semibold text-center p-4 text-orange-500">
        All Admin
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border">Photo</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Password</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {admin.map((admin, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td>
                  <img src={photo + admin.photo} alt="" className="w-12 h-12" />
                </td>
                <td className="p-2 border">{admin.name}</td>
                <td className="p-2 border">{admin.email}</td>
                <td className="p-2 border">{admin.password}</td>
                <td className="p-2 border">
                  <div className="flex items-center justify-around gap-3">
                    <Link to={`/dashboard/admin/update/${admin._id}`}>
                      <button className="bg-green-500 text-white px-2 font-semibold hover:bg-green-700">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(admin._id)}
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

export default Admin;
