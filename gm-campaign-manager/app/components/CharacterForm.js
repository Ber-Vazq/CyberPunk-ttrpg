// components/CharacterForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CharacterForm = ({ campaignId, onCharacterCreated }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [stats, setStats] = useState({
    intelligence: 0,
    reflexes: 0,
    dexterity: 0,
    tech: 0,
    cool: 0,
    willpower: 0,
    luck: 0,
    movement: 0,
    body: 0,
    empathy: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const characterData = { name, role, stats, campaign_id: campaignId };
    const res = await axios.post('http://localhost:3001/api/character', characterData);
    onCharacterCreated(res.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Character</h2>
      <input
        type="text"
        placeholder="Character Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      {/* Add inputs for each stat, for brevity only showing one */}
      <input
        type="number"
        placeholder="Intelligence"
        value={stats.intelligence}
        onChange={(e) => setStats({ ...stats, intelligence: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Reflex"
        value={stats.reflex}
        onChange={(e) => setStats({ ...stats, reflex: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Dexterity"
        value={stats.dexterity}
        onChange={(e) => setStats({ ...stats, dexterity: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Tech"
        value={stats.tech}
        onChange={(e) => setStats({ ...stats, tech: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Cool" 
        value={stats.cool}
        onChange={(e) => setStats({ ...stats, cool: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Will"
        value={stats.will}
        onChange={(e) => setStats({ ...stats, will: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Luck"
        value={stats.luck}
        onChange={(e) => setStats({ ...stats, luck: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Move"
        value={stats.move}
        onChange={(e) => setStats({ ...stats, movement: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Body"
        value={stats.body}
        onChange={(e) => setStats({ ...stats, body: Number(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Empathy"
        value={stats.empathy}
        onChange={(e) => setStats({ ...stats, empathy: Number(e.target.value) })}
      />
      {/* Repeat for other stats */}
      <button type="submit">Create Character</button>
    </form>
  );
};

export default CharacterForm;
