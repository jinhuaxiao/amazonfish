import { useState } from "react";
import "./style.css";

function IndexPopup() {
  const [selector, setSelector] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { selector, newValue });
    });
  };

  return (
    <div className="p-4 popup-container">
      <h1 className="text-lg font-bold text-gray-700 mb-4">Modify Page Element</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="selector" className="block text-sm font-medium text-gray-700 mb-1">
            Selector
          </label>
          <input
            type="text"
            id="selector"
            value={selector}
            onChange={(e) => setSelector(e.target.value)}
            className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder=".my-class, #my-id, etc."
            required
          />
        </div>
        <div>
          <label htmlFor="newValue" className="block text-sm font-medium text-gray-700 mb-1">
            New Value
          </label>
          <input
            type="text"
            id="newValue"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter new value"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors duration-300"
          >
            Update Element
          </button>
        </div>
      </form>
    </div>
  );
}

export default IndexPopup;

