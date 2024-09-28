"use client";
import React, { useState } from 'react';
import '../../globals.css';
import axios from 'axios';
import Cyberware from '../Cyberware/page';

const CharacterForm = ({ campaignId, onCharacterCreated }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [roleAbility, setRoleAbility] = useState(''); // Role ability state
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

  const rolesData = {
    "Solo": "Combat Sense",
    "Netrunner": "Interface",
    "Tech": "Maker",
    "Media": "Credibility",
    "Fixer": "Streetdeal",
    "Nomad": "Moto",
    "Cop": "Authority",
    "Rockerboy": "Charismatic Impact",
    "Medtech": "Medicine",
    "Exec": "Teamwork",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const characterData = { name, role, roleAbility, stats, health, cyberware, inventory, campaign_id: campaignId };
    const res = await axios.post('http://localhost:3001/api/character', characterData);
    onCharacterCreated(res.data);
  };
  

  const calculateMaxHP = (body, willpower) => {
    const healthTable = [
      [20, 25, 25, 30, 30, 35, 35, 40, 40, 45, 45, 50, 50, 55],
      [25, 25, 30, 30, 35, 35, 40, 40, 45, 45, 50, 50, 55, 55],
      [25, 30, 30, 35, 35, 40, 40, 45, 45, 50, 50, 55, 55, 60],
      [30, 30, 35, 35, 40, 40, 45, 45, 50, 50, 55, 55, 60, 60],
      [30, 35, 35, 40, 40, 45, 45, 50, 50, 55, 55, 60, 60, 65],
      [35, 35, 40, 40, 45, 45, 50, 50, 55, 55, 60, 60, 65, 65],
      [35, 40, 40, 45, 45, 50, 50, 55, 55, 60, 60, 65, 65, 70],
      [40, 40, 45, 45, 50, 50, 55, 55, 60, 60, 65, 65, 70, 70],
      [40, 45, 45, 50, 50, 55, 55, 60, 60, 65, 65, 70, 70, 75],
      [45, 45, 50, 50, 55, 55, 60, 60, 65, 65, 70, 70, 75, 75],
    ];

    const bodyIndex = Math.min(Math.max(body - 2, 0), 13);
    const willIndex = Math.min(Math.max(willpower - 2, 0), 9);

    return healthTable[willIndex][bodyIndex];
  };
  

  const handleStatChange = (stat, value) => {
    const updatedStats = { ...stats, [stat]: Number(value) };

    if (stat === 'body' || stat === 'willpower') {
      const newMaxHP = calculateMaxHP(updatedStats.body, updatedStats.willpower);
      setHealth({ ...health, max_hp: newMaxHP, current_hp: newMaxHP });
    }

    setStats(updatedStats);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-cyberpunk-black p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl text-cyberpunk-orange font-bold mb-4 text-center">Create Your Cyberpunk Character</h2>

      {/* Character Information */}
      <div className="flex mb-6">
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
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setRoleAbility(rolesData[e.target.value]);
            }}
            className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
          >
            <option value="">Select Role</option>
            {Object.keys(rolesData).map((roleName) => (
              <option key={roleName} value={roleName}>
                {roleName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-1/2 mb-6">
        <label className="block text-cyberpunk-pink mb-1">Role Ability</label>
        <input
          type="text"
          readOnly
          value={roleAbility}
          className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
        />
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
                onChange={(e) => handleStatChange(stat, e.target.value)}
                className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Health Section */}
      <div className="mb-6">
        <h3 className="text-xl text-cyberpunk-orange font-bold mb-2">Character Health</h3>
        <div>
          <label className="block text-cyberpunk-pink mb-1">Max HP</label>
          <input
            type="number"
            value={health.max_hp}
            readOnly
            className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
          />
        </div>
      </div>

      {/* Cyberware Section */}
      <div className="mb-6">
        <Cyberware cyberware={cyberware} setCyberware={setCyberware} />
      </div>

      {/* Inventory Section */}
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-cyberpunk-orange text-white py-2 rounded-lg font-bold hover:bg-cyberpunk-pink focus:outline-none"
      >
        Create Character
      </button>
    </form>
  );
};

export default CharacterForm;
