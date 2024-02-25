import { IoStar } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLoaderData } from "react-router-dom";

function ProgressBar({ percentage }) {
  const getColor = (percentage) => {
    if (percentage >= 80) {
      return "#52A356";
    } else if (percentage >= 60) {
      return "#A2D230";
    } else if (percentage >= 40) {
      return "#F5E73C";
    } else if (percentage >= 20) {
      return "#F2A837";
    } else {
      return "#F33E21";
    }
  };

  const containerStyles = {
    height: 12,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    margin: 5,
  };

  const fillerStyles = {
    height: "100%",
    width: `${percentage}%`,
    backgroundColor: getColor(percentage),
    borderRadius: "inherit",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
}

const ViewProduct = () => {
  const data = useLoaderData();
  const photo = "http://localhost:3000/";

  const slider = data.photos;

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section>
      <div className="box-shadow bg-gray-100 rounded-md md:p-5 p-2">
        {/* Image and Progress Bar */}
        <h1 className="text-2xl font-semibold mb-5">{data?.name}</h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex md:items-start md:justify-start items-center justify-center md:gap-4 gap-2">
            <img
              src={photo + data.photos[0]}
              className="box-shadow rounded-md photo"
              alt=""
            />
            <div className="md:space-y-2">
              <p>Stock: {data?.totalQuantity}</p>
              <p>
                Price: {data?.price}
                <span className="font-serif">৳</span>
              </p>
              <p>
                Discount: {data?.discount}
                <span className="font-serif">৳</span>
              </p>
              <p className="font-semibold">
                Total Price: {data?.price - data?.discount}
                <span className="font-serif">৳</span>
              </p>
            </div>
          </div>

          <div className="font-semibold">
            <div className="flex items-center">
              5<IoStar />
              <ProgressBar percentage={90} />9
            </div>
            <div className="flex items-center">
              4<IoStar />
              <ProgressBar percentage={70} />7
            </div>
            <div className="flex items-center">
              3<IoStar />
              <ProgressBar percentage={40} />4
            </div>
            <div className="flex items-center">
              2<IoStar />
              <ProgressBar percentage={20} />2
            </div>
            <div className="flex items-center">
              1<IoStar />
              <ProgressBar percentage={10} />1
            </div>
          </div>
        </div>

        {/* Color and Slider */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-12">
          <div className="col-span-2 space-y-2">
            <div className="font-medium text-xl flex items-center gap-2">
              Available Color:
              {data.length !== 0 ? (
                <p>
                  {data.productDetails?.map((color, i) => (
                    <span
                      key={i}
                      className="inline-block w-6 h-6 ml-2 mt-2"
                      style={{ backgroundColor: `${color.color}` }}
                    >
                      {}
                    </span>
                  ))}
                </p>
              ) : (
                <p>Color not avaiable</p>
              )}
            </div>
            <div>
              <p className="font-medium">Product Image</p>
              {slider.length !== 0 ? (
                <Slider {...settings} className="md:w-[95%] w-[90%] mx-auto">
                  {slider?.map((image, i) => (
                    <img
                      key={i}
                      src={photo + image}
                      alt=""
                      className="photo slide-shadow"
                    />
                  ))}
                </Slider>
              ) : (
                <div className="flex items-center justify-center text-lg font-bold">
                  <p>Image Not Avaiable</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewProduct;
