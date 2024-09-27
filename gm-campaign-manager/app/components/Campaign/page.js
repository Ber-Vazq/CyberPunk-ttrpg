"use client";
// components/Campaign.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterForm from '../CharacterForm';

const Campaign = ({ campaignId }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const res = await axios.get(`http://localhost:3001/api/campaign/${campaignId}/characters`);
      setCharacters(res.data);
    };
    fetchCharacters();
  }, [campaignId]);

  const handleNewCharacter = (newCharacter) => {
    setCharacters([...characters, newCharacter]);
  };

  return (
    <div>
      <h1>Campaign Characters</h1>
      <CharacterForm campaignId={campaignId} onCharacterCreated={handleNewCharacter} />
      <ul>
        {characters.map((char) => (
          <li key={char._id}>
            {char.name} - {char.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Campaign;
