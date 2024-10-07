"use client";
import React, { useState, useEffect } from 'react';
import '../../globals.css';
import axios from 'axios';
import Cyberware from '../Cyberware/page';

// Health Table Constant
const HEALTH_TABLE = [
  // body values from 2 to 10 (index 0 to 8)
  // willpower from 2 to 10 (index 0 to 8)
  [20, 25, 25, 30, 30, 35, 35, 40, 40], // Willpower 2
  [25, 25, 30, 30, 35, 35, 40, 40, 45], // Willpower 3
  [25, 30, 30, 35, 35, 40, 40, 45, 45], // Willpower 4
  [30, 30, 35, 35, 40, 40, 45, 45, 50], // Willpower 5
  [30, 35, 35, 40, 40, 45, 45, 50, 50], // Willpower 6
  [35, 35, 40, 40, 45, 45, 50, 50, 55], // Willpower 7
  [35, 40, 40, 45, 45, 50, 50, 55, 55], // Willpower 8
  [40, 40, 45, 45, 50, 50, 55, 55, 60], // Willpower 9
  [40, 45, 45, 50, 50, 55, 55, 60, 60], // Willpower 10
];
const CharacterForm = ({ campaignId, onCharacterCreated }) => {
  // Basic Character Information
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [roleAbility, setRoleAbility] = useState({
    name: '',
    level: 0,
    description: '',
    statBonuses: [],
    skillBonuses: [],
  });
  const [lifepath, setLifepath] = useState(''); // Lifepath field

  // Stats
  const [stats, setStats] = useState({
    intelligence: 0,
    reflexes: 0,
    dexterity: 0,
    tech: 0,
    cool: 0,
    willpower: 0,
    luck: 0,
    move: 0,
    body: 0,
    empathy: 0,
  });

  // Derived Stats
  const [derivedStats, setDerivedStats] = useState({
    maxHP: 0,
    currentHP: 0,
    seriouslyWoundedThreshold: 0,
    deathSave: 0,
    initiative: 0,
    humanity: {
      maxHumanity: 0,
      currentHumanity: 0,
      empathyModifier: 0,
    },
    moveAllowance: 0,
  });

  // Skills
  const [skills, setSkills] = useState([]);

  // Cyberware and Inventory
  const [cyberware, setCyberware] = useState([]);
  const [inventory, setInventory] = useState([]);

  // Role Data
  const rolesData = {
    "Solo": {
      abilityName: "Combat Sense",
      description: "Adds to combat awareness and reaction speed.",
      statBonuses: [{ stat: "initiative", bonusPerLevel: 1 }],
      skillBonuses: [{ skill: "Handgun", bonusPerLevel: 1 }],
    },
    "Netrunner": {
      abilityName: "Interface",
      description: "Allows interaction with the Net and hacking.",
      // Define any stat or skill bonuses if applicable
    },
    // Add other roles with their abilities and descriptions
    // ...
  };

  // Available Skills (for simplicity, a subset)
  const availableSkills = [
    { name: 'Athletics', stat: 'dexterity' },
    { name: 'Handgun', stat: 'reflexes' },
    { name: 'Stealth', stat: 'dexterity' },
    { name: 'Hacking', stat: 'intelligence' },
    // Add more skills as needed
  ]
  // Effect to calculate derived stats whenever stats, roleAbility, or cyberware change
  useEffect(() => {
    calculateDerivedStats();
    calculateAllSkillTotals();
  }, [stats, cyberware, roleAbility]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const characterData = {
      name,
      role,
      roleAbility,
      lifepath,
      stats,
      derivedStats,
      skills,
      cyberware,
      inventory,
      campaign_id: campaignId,
    };

    const res = await axios.post('http://localhost:3001/api/character', characterData);
    onCharacterCreated(res.data);
  };

  // Function to calculate derived stats
  const calculateDerivedStats = () => {
    const { body, willpower, reflexes, empathy: originalEmpathy } = stats;
  
    // Max HP calculation using the health table
    const maxHP = calculateMaxHP(body, willpower) || 0;
    const seriouslyWoundedThreshold = Math.floor(maxHP / 2);
    const deathSave = body;
  
    // Humanity calculations
    const maxHumanity = originalEmpathy * 10;
    const humanityLossTotal = cyberware.reduce((total, item) => total + (item.humanityLoss || 0), 0);
    const currentHumanity = maxHumanity - humanityLossTotal;
  
    // Adjusted Empathy
    const adjustedEmpathy = Math.floor(currentHumanity / 10);
  
    // Initiative calculation with role ability bonus
    let initiativeBase = reflexes;
    roleAbility.statBonuses.forEach(bonus => {
      if (bonus.stat === 'initiative') {
        initiativeBase += bonus.bonusPerLevel * roleAbility.level;
      }
    });
  
    // Update derived stats without modifying the original stats state
    setDerivedStats({
      maxHP,
      currentHP: maxHP,
      seriouslyWoundedThreshold,
      deathSave,
      initiative: initiativeBase,
      humanity: {
        maxHumanity,
        currentHumanity,
      },
      adjustedEmpathy,
      moveAllowance: stats.move,
    });
  

    // Adjust empathy stat based on humanity loss
    setStats(prevStats => ({
      ...prevStats,
    }));
  };

  const calculateMaxHP = (body, willpower) => {
    const bodyIndex = Math.max(0, Math.min(body - 2, 8));
    const willpowerIndex = Math.max(0, Math.min(willpower - 2, 8));

    return HEALTH_TABLE[willpowerIndex][bodyIndex];
  };

  const handleStatChange = (stat, value) => {
    const updatedStats = { ...stats, [stat]: Number(value) };
    setStats(updatedStats);
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index].level = Number(value);
    updatedSkills[index].total = calculateSkillTotal(updatedSkills[index]);
    setSkills(updatedSkills);
  };

  const calculateSkillTotal = (skill) => {
    const baseStatValue = stats[skill.stat] || 0;
    let total = baseStatValue + skill.level;

    // Apply role ability bonuses
    roleAbility.skillBonuses.forEach(bonus => {
      if (bonus.skill === skill.name) {
        total += bonus.bonusPerLevel * roleAbility.level;
      }
    });

    // Apply cyberware bonuses
    cyberware.forEach(cyber => {
      if (cyber.skillBonuses) {
        cyber.skillBonuses.forEach(bonus => {
          if (bonus.skill === skill.name) {
            total += bonus.bonus;
          }
        });
      }
    });

    return total;
  };

  const calculateAllSkillTotals = () => {
    const updatedSkills = skills.map(skill => ({
      ...skill,
      total: calculateSkillTotal(skill),
    }));
    setSkills(updatedSkills);
  };

  // Initialize skills when availableSkills change or role changes
  useEffect(() => {
    const initialSkills = availableSkills.map(skill => ({
      ...skill,
      level: 0,
      total: calculateSkillTotal({ ...skill, level: 0 }),
    }));
    setSkills(initialSkills);
  }, [availableSkills, stats, roleAbility, role]);

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
              const selectedRole = e.target.value;
              setRole(selectedRole);
              const roleData = rolesData[selectedRole] || {
                abilityName: '',
                description: '',
                statBonuses: [],
                skillBonuses: [],
              };
              setRoleAbility({
                name: roleData.abilityName,
                level: 0,
                description: roleData.description,
                statBonuses: roleData.statBonuses || [],
                skillBonuses: roleData.skillBonuses || [],
              });
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

      {/* Role Ability Section */}
      {role && (
        <div className="mb-6">
          <h3 className="text-xl text-cyberpunk-orange font-bold mb-2">Role Ability</h3>
          <div>
            <label className="block text-cyberpunk-pink mb-1">{roleAbility.name}</label>
            <p className="text-cyberpunk-pink mb-2">{roleAbility.description}</p>
            <label className="block text-cyberpunk-pink mb-1">Ability Level</label>
            <input
              type="number"
              min="0"
              max="10"
              value={roleAbility.level}
              onChange={(e) => setRoleAbility(prev => ({ ...prev, level: Number(e.target.value) }))}
              className="w-full px-3 py-2 mb-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Lifepath Section */}
      <div className="mb-6">
        <h3 className="text-xl text-cyberpunk-orange font-bold mb-2">Lifepath / Background Story</h3>
        <textarea
          placeholder="Write your character's background story here..."
          value={lifepath}
          onChange={(e) => setLifepath(e.target.value)}
          className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
          rows="5"
        ></textarea>
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

      {/* Derived Stats Section */}
      <div className="mb-6">
        <h3 className="text-xl text-cyberpunk-orange font-bold mb-2">Derived Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-cyberpunk-pink mb-1">Max HP</label>
            <input
              type="number"
              value={derivedStats.maxHP}
              readOnly
              className="w-full px-3 py-2 border border-cyberpunk-pink bg-gray-700 text-cyberpunk-pink rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-cyberpunk-pink mb-1">Death Save</label>
            <input
              type="number"
              value={derivedStats.deathSave}
              readOnly
              className="w-full px-3 py-2 border border-cyberpunk-pink bg-gray-700 text-cyberpunk-pink rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-cyberpunk-pink mb-1">Initiative</label>
            <input
              type="number"
              value={derivedStats.initiative}
              readOnly
              className="w-full px-3 py-2 border border-cyberpunk-pink bg-gray-700 text-cyberpunk-pink rounded-lg focus:outline-none"
            />
          </div>
    <div>
      <label className="block text-cyberpunk-pink mb-1">Max Humanity</label>
      <input
        type="number"
        value={derivedStats.humanity.maxHumanity}
        readOnly
        className="w-full px-3 py-2 border border-cyberpunk-pink bg-gray-700 text-cyberpunk-pink rounded-lg focus:outline-none"
      />
    </div>
    <div>
      <label className="block text-cyberpunk-pink mb-1">Current Humanity</label>
      <input
        type="number"
        value={derivedStats.humanity.currentHumanity}
        readOnly
        className="w-full px-3 py-2 border border-cyberpunk-pink bg-gray-700 text-cyberpunk-pink rounded-lg focus:outline-none"
      />
    </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-6">
        <h3 className="text-xl text-cyberpunk-orange font-bold mb-2">Skills</h3>
        {skills.map((skill, index) => (
          <div key={skill.name} className="mb-2">
            <label className="block text-cyberpunk-pink mb-1">
              {skill.name} (Associated Stat: {skill.stat})
            </label>
            <input
              type="number"
              min="0"
              value={skill.level}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              className="w-full px-3 py-2 border border-cyberpunk-pink bg-cyberpunk-blue text-cyberpunk-pink rounded-lg focus:outline-none"
            />
            <p className="text-cyberpunk-pink">Total Skill Value: {skill.total}</p>
          </div>
        ))}
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
