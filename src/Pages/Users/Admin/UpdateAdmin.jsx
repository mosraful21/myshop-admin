import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateAdmin = () => {
  const loadedUser = useLoaderData();
  const [admin, setAdmin] = useState(loadedUser);
  const navigate = useNavigate();

  const handleUpdated = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const UpdatedAdmin = { name, email, password };

    fetch(`http://localhost:3000/api/admin/${admin._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(UpdatedAdmin),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Admin Updated Successfully");
        setAdmin(data);
        navigate("/dashboard/admin");
      });
  };

  return (
    <section>
      <form
        onSubmit={handleUpdated}
        className="border-2 border-blue-400 md:p-4 p-2"
      >
        <div className="grid md:grid-cols-2 gap-2">
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            required
            defaultValue={admin?.name}
          />

          <input
            type="text"
            name="email"
            placeholder="Enter Your Email"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            required
            defaultValue={admin?.email}
          />

          <input
            type="text"
            name="password"
            placeholder="Enter Your Password"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            required
            defaultValue={admin?.password}
          />
        </div>

        <input
          type="submit"
          value="Update"
          className="bg-blue-500 w-full text-white p-1.5 rounded-md mt-2 cursor-pointer"
        />
      </form>
    </section>
  );
};

export default UpdateAdmin;
