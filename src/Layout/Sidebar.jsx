import { useState } from "react";
import {
  BsCart3,
  BsXLg,
  BsChevronRight,
  BsFillGridFill,
  BsFillPeopleFill,
  BsBookmarkStarFill,
  BsLayersFill,
} from "react-icons/bs";

import { Link } from "react-router-dom";

const menuItems = [
  { icon: <BsFillGridFill />, title: "Dashboard", link: "/dashboard" },
  {
    icon: <BsFillPeopleFill />,
    title: "Users",
    subMenu: [
      { subTitle: "Admin", subLink: "/dashboard/admin" },
      { subTitle: "Customer", subLink: "/dashboard/customer" },
    ],
  },
  {
    icon: <BsBookmarkStarFill />,
    title: "Banner",
    subMenu: [
      { subTitle: "Banner", subLink: "/dashboard/banner" },
      { subTitle: "Brand", subLink: "/dashboard/brand" },
    ],
  },
  {
    icon: <BsLayersFill />,
    title: "Upload Products",
    subMenu: [
      { subTitle: "Category", subLink: "/dashboard/category" },
      { subTitle: "Sub Category", subLink: "/dashboard/subcategory" },
      { subTitle: "Product", subLink: "/dashboard/product" },
    ],
  },
];

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  const [openSubMenu, setOpenSubMenu] = useState(
    new Array(menuItems.length).fill(false)
  );

  const handleSubMenuToggle = (index) => {
    const newOpenSubMenu = [...openSubMenu];
    newOpenSubMenu[index] = !newOpenSubMenu[index];
    setOpenSubMenu(newOpenSubMenu);
  };

  return (
    <aside
      id="sidebar"
      className={`${openSidebarToggle ? "sidebar-responsive" : ""}`}
    >
      <div className="sidebar-title lg:hidden">
        <div className="flex items-center text-white mt-2 text-xl font-bold gap-1">
          <BsCart3 className="text-2xl" /> SHOP
        </div>
        <span className="text-white ml-20 mt-2 cursor-pointer lg:hidden">
          <BsXLg onClick={OpenSidebar} />
        </span>
      </div>

      <div className="mt-2">
        {menuItems.map((menuItem, index) => (
          <div key={index} className="text-xl text-[#ffffffd8]">
            {menuItem.subMenu ? (
              <div
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#c6c6c62a] transition duration-300 ease"
                onClick={() => handleSubMenuToggle(index)}
              >
                <span className="flex items-center gap-2">
                  {menuItem.icon} {menuItem.title}
                </span>
                <span
                  className={`transition-transform transform ${
                    openSubMenu[index] ? "rotate-90" : "rotate-0"
                  } ease-in-out duration-500`}
                >
                  <BsChevronRight />
                </span>
              </div>
            ) : (
              <Link
                to={menuItem.link}
                className="flex items-center px-4 py-2 gap-2 hover:bg-[#c6c6c62a] transition duration-300 ease"
              >
                {menuItem.icon} {menuItem.title}
              </Link>
            )}

            {openSubMenu[index] && menuItem.subMenu && (
              <div className="bg-[#c6c6c60e] flex flex-col">
                {menuItem.subMenu.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    className="pl-12 leading-10 hover:bg-[#c6c6c62a] transition duration-200 ease-in-out"
                    to={subItem.subLink}
                  >
                    {subItem.subTitle}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
