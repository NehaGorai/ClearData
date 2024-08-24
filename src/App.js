import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';


export default function MultiSelectApp() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const apiToken = process.env.REACT_APP_API_TOKEN;
    const spreadsheetId = process.env.REACT_APP_SPREADSHEET_ID;
    const fetchItems = async () => {
      try {
        const response = await axios.get(`https://api.lowcodeapi.com/googlesheets/spreadsheetid/get?spreadsheetId=${spreadsheetId}&gid=0&tab=ph_brand&api_token=${apiToken}`);
        setItems(response.data.result.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items);
    }
    setSelectAll(!selectAll);
  };


  const handleDeleteSelected = () => {
    setItems(items.filter(item => !selectedItems.includes(item)));
    setSelectedItems([]);
    setSelectAll(false);
  };

  return (
    <div className="p-6 mt-20  w-96 mx-auto bg-gray-800 shadow-sm border-[1px] border-black rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-white text-center">Popular Mobile Brands</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded accent-red-500"
          />
          <label className="ml-2 text-white font-medium">Select All</label>
        </div>


        <button
          onClick={handleDeleteSelected}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <FaTrashAlt className="mr-2" /> Delete
        </button>

      </div>

      <ul className="divide-y divide-gray-200">
        {items.map((item, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-2 m-1 rounded-lg ${selectedItems.includes(item) ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600'} `}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => handleItemClick(item)}
                className="h-5 w-5  border-gray-300 accent-red-500 rounded mr-4 text-red-500"
              />
              <span className="text-white">{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
