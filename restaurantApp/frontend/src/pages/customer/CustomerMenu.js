import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios";
function CustomerMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const fetchMenu = async()=>{
    const response = await axios.get('http://localhost:5000/api/menu/get');
    setMenuItems(response.data);
  }
  useEffect(() => {
    fetchMenu();
  }, []);
  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Menu</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {menuItems.map((item) => (
          <div key={item._id} className='bg-white rounded-lg shadow-md p-4'>
            <img src={item.imageUrl} alt={item.name} className='w-full h-48 object-cover rounded-md mb-4' />
            <h2 className='text-xl font-semibold mb-2'>{item.name}</h2>
            <p className='text-gray-600 mb-4'>{item.description}</p>
            <p className='text-lg font-bold'>${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomerMenu
