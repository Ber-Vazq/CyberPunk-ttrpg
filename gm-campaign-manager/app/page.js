"use client";

import React, { useEffect, useState } from 'react';
import './globals.css';

// Campaign Card Component
const CampaignCard = ({ title, date }) => (
  <div className="p-4 bg-cyberpunk-blue rounded-lg">
    <p className="text-lg">Campaign: <span className="font-bold text-cyberpunk-pink">{title}</span></p>
    <p>Next Session: <span className="font-bold text-cyberpunk-pink">{date}</span></p>
  </div>
);

// GM Navbar Component
const GMNavbar = () => (
  <nav className="bg-cyberpunk-blue p-4 rounded-full">
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 justify-center">
      <li><a href="#" className="button">NPC Generator</a></li>
      <li><a href="/components/CharacterForm" className="button">Character Creation</a></li>
      <li><a href="#" className="button">Player Roster</a></li>
      <li><a href="#" className="button">Logs</a></li>
      <li><a href="#" className="button">Loot Tracker</a></li>
    </ul>
  </nav>
);

// Player Status Component
const PlayerStatus = ({ playerName, role, status }) => (
  <div className="card mb-8">
    <h3 className="text-xl font-semibold mb-2 text-cyberpunk-orange">Player: <span className="font-bold text-cyberpunk-pink">{playerName}</span></h3>
    <p>Role: <span className="font-bold text-cyberpunk-pink">{role}</span></p>
    <p>Status: <span className={status === "Alive" ? "text-green-400" : "text-red-400"}>{status}</span></p>
  </div>
);

// HomePage Component
const HomePage = () => {
  const [campaign, setCampaign] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Fetch campaign data
    fetch('http://localhost:3001/api/campaigns')
      .then(response => response.json())
      .then(data => {
        setCampaign(data[0]);
        console.log(data[0]); // Check the fetched campaign data
      })
      .catch(error => console.error('Error fetching campaign:', error));

    // Fetch characters data
    fetch('http://localhost:3001/api/characters') // Ensure this endpoint is correct
      .then(response => response.json())
      .then(data => {
        setCharacters(data);
        console.log(data); // Log character data
      })
      .catch(error => console.error('Error fetching characters:', error));
  }, []);

  return (
    <div className="min-h-screen bg-cyberpunk-black text-cyberpunk-pink">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-cyberpunk-orange">GM Screen</h1>
        <h2 className="text-2xl mb-4 text-cyberpunk-pink">Cyberpunk Red Campaign Manager</h2>
        <GMNavbar />

        {/* Render the campaign card */}
        {campaign ? (
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-2 text-cyberpunk-orange">Active Campaigns</h3>
            <CampaignCard title={campaign.title} date={campaign.nextSession} /> {/* Change to nextSession */}
          </section>
        ) : (
          <p>Loading campaign...</p>
        )}

        {/* Render the player status for each character */}
        {characters.length > 0 ? (
          characters.map(character => (
            <PlayerStatus
              key={character._id}
              playerName={character.name}
              role={character.role}
              status={character.status}
            />
          ))
        ) : (
          <p>Loading characters...</p>
        )}

        <footer className="text-center mt-8 text-cyberpunk-pink">
          © 2024 Pyramid Schemes. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
