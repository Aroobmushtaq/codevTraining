import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, ShoppingCart, Heart} from "lucide-react";
import CategoryButton from "./components/CategoryButton";
function CustomerMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const fetchMenu = async () => {
    const response = await axios.get("http://localhost:5000/api/menu/get");
    setMenuItems(response.data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Header */}
      <div className=" mb-10">
        <h1 className="text-4xl font-serif font-bold">Our Menu</h1>
        <p className="text-gray-500 ">
          Discover dishes crafted with passion
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search for dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-6 flex-wrap">

        <CategoryButton
          label="All"
          value="all"
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <CategoryButton
          label="Starters"
          value="appetizer"
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <CategoryButton
          label="Burgers"
          value="main_course"
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <CategoryButton
          label="Pizza"
          value="pizza"
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <CategoryButton
          label="Salads"
          value="salads"
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <CategoryButton
          label="Dessert"
          value="dessert"
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <CategoryButton
          label="Beverage"
          value="beverage"
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

      </div>
      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredItems.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No dishes available
          </p>
        ) : (
          filteredItems.map((item) =>
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
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
                    {item.price.toFixed(2)}
                  </span>

                  <button className="flex items-center gap-1 bg-[#EF6E2F] text-white px-3 py-1.5 rounded-full text-sm hover:bg-[#E97229] transition">
                    <ShoppingCart size={16} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

    </div>
  );
}

export default CustomerMenu;