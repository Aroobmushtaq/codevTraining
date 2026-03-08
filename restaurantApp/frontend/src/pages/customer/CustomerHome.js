import React from "react";
import download from "../../assets/download.png";
import { Truck, MoveRight, Clock, Star, Package} from "lucide-react";
import { Link } from "react-router-dom";
function CustomerHome() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="relative w-full">

        <img src={download} alt="Download" className="w-full h-[600px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/40 to-transparent"></div>

        <div className="absolute top-0 left-0 p-10">
          <p className="text-white bg-[#4A2C1A]/80 px-3 py-1 rounded-xl flex items-center w-fit mb-6">
            <Package size={20} className="mr-2" />
            <span className="text-[#E97229] font-medium text-sm">
              Free delivery on your first order
            </span>
          </p>

          <h1 className="text-white text-5xl font-bold font-serif leading-tight mb-6">
            Extraordinary Food,<br />
            Delivered to Your<br />
            Door
          </h1>

          <p className="text-gray-200 text-lg mb-8 max-w-xl">
            From gourmet burgers to artisan desserts — explore
            curated dishes from the city's finest kitchens.
          </p>

          <div className="flex gap-5">

  <Link
    to="/customer/menu"
    className="bg-[#EF6E2F] text-white px-4 py-2 rounded-3xl text-lg flex items-center hover:bg-[#E97229] transition"
  >
    Explore Menu
    <MoveRight size={20} className="ml-2" />
  </Link>

  <Link
    to="/customer/orders"
    className="border-2 border-white text-white px-4 py-2 rounded-3xl text-lg hover:bg-white hover:text-[#EF6E2F] transition"
  >
    Book a Table
  </Link>

</div>

          <div className="flex items-center gap-6 mt-10 text-gray-300 text-sm">
            <p className="flex items-center gap-2">
              <Clock size={16} />
              30 min delivery
            </p>

            <p className="flex items-center gap-2">
              <Truck size={16} />
              Free shipping
            </p>

            <p className="flex items-center gap-2">
              <Star size={16} />
              4.9 rating
            </p>
          </div>
        </div>

      </div>

      {/* WHITE SECTION BELOW IMAGE */}
      <div className="bg-white py-16 text-center">
        <h2 className="text-3xl font-serif font-bold">
          Browse by Category
        </h2>
        <p className="text-gray-500 text-medium"> Find exactly what you're craving </p>
      </div>
    </>
  );
}

export default CustomerHome;