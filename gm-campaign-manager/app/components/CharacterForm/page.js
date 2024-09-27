"use client";
import React, { useState } from 'react';
import '../../globals.css';
import axios from 'axios';

const CharacterForm = ({ campaignId, onCharacterCreated }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [stats, setStats] = useState({
    intelligence: 0,
    reflex: 0,
    dexterity: 0,
    tech: 0,
    cool: 0,
    willpower: 0,
    luck: 0,
    movement: 0,
    body: 0,
    empathy: 0,
  });
  const [health, setHealth] = useState({ max_hp: 0, current_hp: 0 });
  const [cyberware, setCyberware] = useState([]);
  const [inventory, setInventory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const characterData = { name, role, stats, health, cyberware, inventory, campaign_id: campaignId };
    const res = await axios.post('http://localhost:3001/api/character', characterData);
    onCharacterCreated(res.data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-cyberpunk-black p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl text-cyberpunk-orange font-bold mb-4 text-center">Create Your Cyberpunk Character</h2>

      {/* Character Information */}
      <div className="mb-6">
        <div className="flex justify-between">
          <div className="w-1/2 pr-4">
            <label className="block text-cyberpunk-pink mb-1">Character Name</label>
            <input
              type="text"
              placeholder="Character Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-cyberpunk-pink mb-1">Role</label>
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-6">
        <h3 className="text-xl text-cyberpunk-orange font-bold mb-2">Character Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(stats).map((stat) => (
            <div key={stat}>
              <label className="block text-cyberpunk-pink mb-1 capitalize">{stat}</label>
              <input
                type="number"
                value={stats[stat]}
                onChange={(e) => setStats({ ...stats, [stat]: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Health Section */}
      <div className="mb-6">
        <h3 className="text-xl text-cyberpunk-orange font-bold mb-2">Health</h3>
        <div className="flex justify-between">
          <div className="w-1/2 pr-4">
            <label className="block text-cyberpunk-pink mb-1">Max HP</label>
            <input
              type="number"
              placeholder="Max HP"
              value={health.max_hp}
              onChange={(e) => setHealth({ ...health, max_hp: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Cyberware and Inventory */}
      <div className="mb-6">
        <h3 className="text-xl text-cyberpunk-orange font-bold mb-2">Cyberware</h3>
        <textarea
          placeholder="Describe cyberware..."
          value={cyberware.join('\n')}
          onChange={(e) => setCyberware(e.target.value.split('\n'))}
          className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
          rows="3"
        ></textarea>
      </div>

      <div className="mb-6">
        <h3 className="text-xl text-cyberpunk-orange font-bold mb-2">Inventory</h3>
        <textarea
          placeholder="List inventory items..."
          value={inventory.join('\n')}
          onChange={(e) => setInventory(e.target.value.split('\n'))}
          className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
          rows="3"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-6 bg-cyberpunk-orange text-cyberpunk-black font-bold rounded-lg hover:bg-cyberpunk-pink hover:text-cyberpunk-black"
      >
        Create Character
      </button>
    </form>
  );
};

export default CharacterForm;
