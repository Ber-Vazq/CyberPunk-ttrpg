// pages/index.js
import React from 'react';
import './globals.css';

const CampaignCard = ({ title, date }) => (
  <div className="p-4 bg-cyberpunk-blue rounded-lg">
    <p className="text-lg">Campaign: <span className="font-bold text-cyberpunk-pink">{title}</span></p>
    <p>Next Session: <span className="font-bold text-cyberpunk-pink">{date}</span></p>
  </div>
);

const ToolsList = () => (
  <ul className="list-disc pl-5">
    <li><a href="#" className="text-cyberpunk-pink hover:text-cyberpunk-orange">NPC Generator</a></li>
    <li><a href="#" className="text-cyberpunk-pink hover:text-cyberpunk-orange">Session Logger</a></li>
    <li><a href="#" className="text-cyberpunk-pink hover:text-cyberpunk-orange">Player Roster</a></li>
    <li><a href="functions/combatLog" className="text-cyberpunk-pink hover:text-cyberpunk-orange">Combat Logs</a></li>
  </ul>
);

const PlayerStatus = ({ playerName, role, status }) => (
  <section className="mb-8">
    <h3 className="text-xl font-semibold mb-2 text-cyberpunk-orange">Player: <span className="font-bold text-cyberpunk-pink">{playerName}</span></h3>
    <p>Role: <span className="font-bold text-cyberpunk-pink">{role}</span></p>
    <p>Status: <span className={status === "Alive" ? "text-green-400" : "text-red-400"}>{status}</span></p>
  </section>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-cyberpunk-black text-cyberpunk-pink">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-cyberpunk-orange">GM Screen</h1>
        <h2 className="text-2xl mb-4 text-cyberpunk-pink">Cyberpunk Red Campaign Manager</h2>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-cyberpunk-orange">Active Campaigns</h3>
          <CampaignCard title="Pyramid Schemes" date="September 30, 2024" />
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-cyberpunk-orange">GM Tools</h3>
          <ToolsList />
        </section>

        <PlayerStatus playerName="Gonzo" role="Rockerboy" status="Alive" />
        <PlayerStatus playerName="Randi" role="Solo" status="Alive" />
        <PlayerStatus playerName="Bug" role="Techie" status="Alive" />
        <PlayerStatus playerName="Lena" role="Medtech" status="Alive" />

        <footer className="text-center mt-8 text-cyberpunk-pink">
          © 2024 Pyramid Schemes. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
