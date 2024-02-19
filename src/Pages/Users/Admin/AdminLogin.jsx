import { useLoaderData, useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { MdAttachEmail, MdLock } from "react-icons/md";
import { useState } from "react";

const AdminLogin = () => {
  const loadedData = useLoaderData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const matchedAdmin = loadedData.find(
      (admin) => admin.email === email && admin.password === password
    );
    if (matchedAdmin) {
      alert("Login successful");
      localStorage.setItem("loggedInUser", matchedAdmin.name.split(" ")[0]);
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-[#cbd2da96] p-2">
      <form className="form_main" onSubmit={handleLogin}>
        <p className="text-xl text-gray-800 font-bold my-2 z-10">Admin Login</p>
        <div className="w-full relative flex items-center justify-center z-10">
          <MdAttachEmail className="absolute left-1 text-gray-700" />
          <input
            type="email"
            name="email"
            className="inputField"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="w-full relative flex items-center justify-center z-10">
          <MdLock className="absolute left-1 text-gray-700" />
          <input
            type="password"
            name="password"
            className="inputField"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="z-10 relative w-full border-none bg-purple-600 hover:bg-purple-700 h-8 text-white text-sm font-medium tracking-wide px-4 py-1.5 m-2 cursor-pointer"
        >
          Submit
        </button>

        {error && (
          <p className="text-red-600 text-xs font-semibold z-10">{error}</p>
        )}

        <a className="forgotLink" href="">
          Forgot your password?
        </a>
      </form>
    </section>
  );
};

export default AdminLogin;
