"use client";
import React, { useState } from 'react';

const Cyberware = ({ cyberware, setCyberware }) => {
  const [newCyberware, setNewCyberware] = useState({
    type: '',
    description: '',
    humanityLoss: 0,
  });

  const addCyberware = () => {
    setCyberware([...cyberware, newCyberware]);
    setNewCyberware({ type: '', description: '', humanityLoss: 0 });
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl text-cyberpunk-orange font-bold mb-2">Cyberware</h3>

      {/* Form to input new cyberware */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-cyberpunk-pink mb-1">Type</label>
          <input
            type="text"
            value={newCyberware.type}
            onChange={(e) => setNewCyberware({ ...newCyberware, type: e.target.value })}
            placeholder="Cyberarm, Neural Link..."
            className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-cyberpunk-pink mb-1">Description</label>
          <input
            type="text"
            value={newCyberware.description}
            onChange={(e) => setNewCyberware({ ...newCyberware, description: e.target.value })}
            placeholder="Brief description"
            className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-cyberpunk-pink mb-1">Humanity Loss</label>
          <input
            type="number"
            value={newCyberware.humanityLoss}
            onChange={(e) => setNewCyberware({ ...newCyberware, humanityLoss: Number(e.target.value) })}
            placeholder="0"
            className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={addCyberware}
        className="mt-4 px-4 py-2 bg-cyberpunk-orange text-cyberpunk-black font-bold rounded-lg hover:bg-cyberpunk-pink hover:text-cyberpunk-black"
      >
        Add Cyberware
      </button>

      {/* List of added cyberware */}
      <div className="mt-4">
        {cyberware.map((item, index) => (
          <div key={index} className="bg-cyberpunk-blue p-4 mb-2 rounded-lg">
            <h4 className="text-cyberpunk-orange font-bold">{item.type}</h4>
            <p className="text-cyberpunk-pink">{item.description}</p>
            <p className="text-cyberpunk-pink">Humanity Loss: {item.humanityLoss}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cyberware;
