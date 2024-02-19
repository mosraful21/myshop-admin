import { useLoaderData } from "react-router-dom";

const ViewProduct = () => {
  const loadedData = useLoaderData();
  const photo = "http://localhost:3000/";

  return (
    <div>
      <img src={photo + loadedData.photos[0]} alt="" className="w-20 h-20" />
    </div>
  );
};

export default ViewProduct;
