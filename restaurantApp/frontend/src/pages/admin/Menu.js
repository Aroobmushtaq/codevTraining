import React, { useContext, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { MenuContext } from "../admin/contex/MenuContext";
import axios from "axios";
import { TrashIcon, EditIcon } from "lucide-react";
import Toast from "../../components/Toast";
function Menu() {
  const { isCreateOpen, openCreate, closeCreate } = useContext(MenuContext);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const { search } = useContext(MenuContext);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    isAvailable: true,
  });
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (selectedId) {
        await axios.put(
          `http://localhost:5000/api/menu/update/${selectedId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Toast.success("Menu item updated successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/menu/create",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Toast.success("Menu item added successfully");
      }

      fetchMenuItems();
      closeCreate();
      setSelectedId(null);

    } catch (error) {
      Toast.error("Operation failed");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "menu_upload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/djxmwzaw5/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();

      setFormData((prev) => ({
        ...prev,
        imageUrl: result.secure_url,
      }));

    } catch (error) {
      console.error("Image upload failed:", error);
      Toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };
  const deleteMenuItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/menu/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Toast.success("Menu item deleted successfully");
      fetchMenuItems();
    } catch (error) {
      console.error("Error deleting menu item:", error);
      Toast.error("Failed to delete menu item");
    }
  };
  const fetchMenuItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/menu/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMenuItems(res.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      Toast.error("Failed to fetch menu items");
    }
  };
  const updateMenuItem = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/menu/update/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Toast.success("Menu item updated successfully");
      fetchMenuItems();
    } catch (error) {
      console.error("Error updating menu item:", error);
      Toast.error("Failed to update menu item");
    }
  };
  useEffect(() => {
    fetchMenuItems();
  }, []);
  return (
    <>
      {menuItems.length === 0 ? (
        <p className="text-gray-600">No menu items found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead className=" text-gray-500 border-t ">
              <tr>
                <th className="px-4 py-3 text-left text-sm">Image</th>
                <th className="px-4 py-3 text-left text-sm">Name</th>
                <th className="px-4 py-3 text-left text-sm">Description</th>
                <th className="px-4 py-3 text-left text-sm">Category</th>
                <th className="px-4 py-3 text-left text-sm">Price</th>
                <th className="px-4 py-3 text-left text-sm">Status</th>
                <th className="px-4 py-3 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id} className="border-t ">
                  <td className="px-2 py-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-xl"
                    />
                  </td>
                  <td className="px-3 py-1  text-gray-800 text-sm font-medium">
                    {item.name}
                  </td>
                  <td className="px-3 py-1 text-gray-600 text-sm">
                    {item.description}
                  </td>
                  <td className="px-3 py-1  text-gray-800 text-sm ">
                    <div className="bg-gray-100 rounded-xl px-3 inline-block">
                      {item.category}
                    </div>
                  </td>
                  <td className="px-2 py-1  text-gray-800 text-sm font-medium">
                    {item.price}
                  </td>
                  <td
                    className={`px-2 py-1 text-sm font-medium  ${item.isAvailable ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </td>
                  <td
                    className={`px-2 py-1 font-medium `}
                  >
                    <button
                      className="  px-3 py-1 rounded-lg transition duration-200 text-gray-500 hover:text-red-500"
                      onClick={() => {
                        setSelectedId(item._id);
                        setDeleteOpen(true);
                      }}
                    >
                      <TrashIcon size={16} />
                    </button>
                    <button
                      className="  px-3 py-1 rounded-lg transition duration-200 text-gray-500 hover:text-blue-500"
                      onClick={() => {
                        setSelectedId(item._id);
                        setFormData(item);
                        openCreate();
                      }}
                    >
                      <EditIcon size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isCreateOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

          {/* Modal Box */}
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 relative animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              {selectedId ? "Update Menu Item" : "Add New Menu Item"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="text-sm font-medium text-gray-700">Food Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g.chicken biryani"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                required
              />
              <label className="text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Brief description of the dish..."
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                required
              />
              <label className="text-sm font-medium text-gray-700">Price & Category</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="price"
                  placeholder="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  required
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="appetizer">Starters</option>
                  <option value="main_course">Burgers</option>
                  <option value="dessert">Pizza</option>
                  <option value="dessert">Salads</option>
                  <option value="dessert">Dessert</option>
                  <option value="beverage">Beverage</option>
                </select>
              </div>
              <label className="text-sm font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm"
                required={!selectedId}
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="accent-[#B55D00]"
                />
                Available
              </label>
              <div className="flex gap-3 mt-4">

                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={closeCreate}
                  className="flex-1 bg-white border border-gray-300 hover:bg-[#9A4B00] hover:text-white text-black py-2 rounded-lg transition duration-200"
                >
                  Cancel
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="flex-1 bg-[#B55D00] hover:bg-[#9A4B00] text-white py-2 rounded-lg transition duration-200"
                >
                  {loading ? "Saving..." : selectedId ? "Update Item" : "Add Menu Item"}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
      {
        deleteOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl p-6 relative animate-fadeIn">
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Confirm Deletion
              </h2>

              <p className=" text-gray-600 mb-6">
                Are you sure you want to delete this menu item?
              </p>

              <div className="flex gap-3 mt-4">

                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={() => setDeleteOpen(false)}
                  className="flex-1 bg-white border border-gray-300 hover:bg-[#9A4B00] hover:text-white text-black py-2 rounded-lg transition duration-200"
                >
                  Cancel
                </button>

                {/* Confirm Button */}
                <button
                  type="button"
                  onClick={() => {
                    deleteMenuItem(selectedId);
                    setDeleteOpen(false);
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-200"
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        )
      }

    </>
  );
}

export default Menu;