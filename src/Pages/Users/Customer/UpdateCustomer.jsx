import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateCustomer = () => {
  const loadedData = useLoaderData();
  const [customer, setCustomer] = useState(loadedData);
  const navigate = useNavigate();

  const handleUpdated = (event) => {
    event.preventDefault();
    const form = event.target;
    const fname = form.fname.value;
    const lname = form.lname.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const password = form.password.value;
    const UpdatedCustomers = { fname, lname, phone, email, password };

    fetch(`http://localhost:3000/api/customer/${customer._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(UpdatedCustomers),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("User Updated Successfully");
        setCustomer(data);
        navigate("/dashboard/customer");
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
            name="fname"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            placeholder="First Name"
            defaultValue={customer?.fname}
          />

          <input
            type="text"
            name="lname"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            placeholder="Last Name"
            defaultValue={customer?.lname}
          />

          <input
            type="text"
            name="phone"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            placeholder="Phone Number"
            defaultValue={customer?.phone}
          />

          <input
            type="email"
            name="email"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            placeholder="Email"
            defaultValue={customer?.email}
          />

          <input
            type="password"
            name="password"
            className="w-full p-1.5 border border-gray-400 rounded-md focus:outline-blue-400"
            placeholder="Password"
            defaultValue={customer?.password}
          />
        </div>

        <input
          type="submit"
          value="Updated"
          className="bg-blue-500 w-full text-white p-1.5 rounded-md mt-2 cursor-pointer"
        />
      </form>
    </section>
  );
};

export default UpdateCustomer;
