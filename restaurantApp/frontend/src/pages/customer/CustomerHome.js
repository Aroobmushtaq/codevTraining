import React from "react";
import download from "../../assets/download.png";
import { Truck, MoveRight, Clock, Star, Package, Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
function CustomerHome() {
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useContext(CartContext);
  const fetchMenu = async () => {
    const response = await axios.get("http://localhost:5000/api/menu/get");
    setMenuItems(response.data);
  };
  useEffect(() => {
    fetchMenu();
  }, []);
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

      {/* POPULAR MENU */}
      <div className=" py-16 px-10 text-center">
        <h2 className="text-3xl font-serif font-bold">
          Popular Right Now
        </h2>
        <p className="text-gray-500 text-medium mb-16">Our most loved dishes this week</p>
        {/* VIEW MORE BUTTON */}

        <div className="text-right mt-10">
          <Link
            to="/customer/menu"
            className=" text-[#EF6E2F] px-6 py-3 rounded-full text-sm transition hover:underline flex items-center justify-end"
          >
            View All
            <MoveRight size={16} className="inline-block ml-2 text-[#EF6E2F]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No dishes available
            </p>
          ) : (
            menuItems.slice(0, 4).map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden">

                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-52 object-cover"
                  />

                  <Heart
                    size={30}
                    className="absolute top-3 right-3 text-white bg-black/40 p-1 rounded-full"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold">{item.name}</h2>

                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-[#EF6E2F]">
                      {item.price?.toFixed(2)}
                    </span>

                    <button
                      onClick={() => {
                        console.log("Adding item:", item);
                        addToCart(item);
                      }}
                      className="flex items-center gap-1 bg-[#EF6E2F] text-white px-3 py-1.5 rounded-full text-sm hover:bg-[#E97229] transition">
                      <ShoppingCart size={16} />
                      Add
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}

        </div>
      </div>
      {/* POPULAR MENU */}
      {/* READY TO ORDER SECTION (OUTSIDE) */}
      <div className=" bg-[#EE792B] p-10 w-full text-center">
        <h2 className="font-serif font-bold text-3xl text-white">
          Ready to Order?
        </h2>

        <p className="text-white">
          Get 20% off your first order with code FEAST20. Start your
        </p>

        <p className="text-white">
          culinary journey today.
        </p>

        <Link
          to="/customer/menu"
          className="mt-4 inline-block bg-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#e7e6e5] transition"
        >
          Order Now
          <MoveRight size={16} className="inline-block ml-2 font-semibold" />
        </Link>
      </div>
    </>
  );
}

export default CustomerHome;