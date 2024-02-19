import { useEffect, useState } from "react";
import { BsPersonCircle, BsJustify, BsCart3 } from "react-icons/bs";
import { IoHome } from "react-icons/io5";

const Header = ({ OpenSidebar }) => {
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  return (
    <section className="header">
      <div className="text-white">
        <div className="hidden lg:block py-2">
          <span className="flex items-center justify-center gap-1 text-xl font-extrabold ">
            <BsCart3 className="text-2xl" /> SHOP
          </span>
        </div>
        <div>
          <BsJustify
            onClick={OpenSidebar}
            className="text-3xl mt-1 ml-2 lg:hidden"
          />
        </div>
      </div>

      <div className="lg:hidden">
        <span className="flex items-center justify-center gap-1 text-xl font-extrabold text-white">
          <BsCart3 className="text-2xl" /> SHOP
        </span>
      </div>

      <div className="flex items-center justify-between px-3">
        <a
          href="/dashboard"
          className="lg:flex items-center justify-center gap-1 font-semibold text-white hidden"
        >
          <IoHome /> Home
        </a>
        <a href="/" className="flex items-center gap-1 font-semibold text-white">
          {loggedInUser ? `${loggedInUser}` : "Guest"}
          <BsPersonCircle className="text-2xl" />
        </a>
      </div>
    </section>
  );
};

export default Header;
