import { useEffect, useState } from "react";
import "./App.css";
import { api } from "./assets/api.js";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(api.data);
  }, []);

  const [selected, setSelected] = useState(null);

  const handleClick = (item) => {
    setSelected(item);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4">
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleClick(item)}
            >
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.description}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center"
          onClick={() => {
            setSelected(null);
          }}
        >
          <div
            className="bg-white p-6 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Details</h3>
            <p className="mb-2">
              <strong>Name:</strong> {selected.name}
            </p>
            <p className="mb-2">
              <strong>Description:</strong> {selected.description}
            </p>
            <p className="mb-2">
              <strong>Created By:</strong> {selected.createdBy}
            </p>
            <p className="mb-4">
              <strong>Last Updated:</strong> {selected.lastUpdated}
            </p>
            <button
              className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
              onClick={() => {
                setSelected(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
