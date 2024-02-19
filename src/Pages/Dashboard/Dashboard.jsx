import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
  BsColumnsGap,
} from "react-icons/bs";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <main>
      <div>
        <h3 className="flex items-center gap-2 text-2xl font-bold mb-2">
          <BsColumnsGap />
          Dashboard
        </h3>
      </div>

      <div className="main-cards bg-white gap-4 p-5 rounded-md">
        <div className="card">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Pending Orders</h3>
            <BsFillArchiveFill className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-white py-5">0</h1>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">
              Shipped out Orders
            </h3>
            <BsFillGrid3X3GapFill className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-white py-5">0</h1>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">
              Delivered Orders
            </h3>
            <BsPeopleFill className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-white py-5">0</h1>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">
              Returned Orders
            </h3>
            <BsFillBellFill className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-white py-5">0</h1>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">
              Canceled Orders
            </h3>
            <BsFillBellFill className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-white py-5">0</h1>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
