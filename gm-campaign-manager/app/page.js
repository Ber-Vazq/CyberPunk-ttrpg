// pages/index.js
import React from 'react';
import './globals.css';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-cyberpunk-black text-cyberpunk-pink">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-cyberpunk-orange">Pyramid Schemes</h1>
        <h2 className="text-2xl mb-4 text-cyberpunk-pink">Cyberpunk Red Campaign Manager</h2>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-cyberpunk-orange">Active Campaigns</h3>
          <div className="p-4 bg-cyberpunk-blue rounded-lg">
            <p className="text-lg">Campaign: <span className="font-bold text-cyberpunk-pink">Night City Blues</span></p>
            <p>Next Session: <span className="font-bold text-cyberpunk-pink">September 30, 2024</span></p>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-cyberpunk-orange">GM Tools</h3>
          <ul className="list-disc pl-5">
            <li><a href="#" className="text-cyberpunk-pink hover:text-cyberpunk-orange">NPC Generator</a></li>
            <li><a href="#" className="text-cyberpunk-pink hover:text-cyberpunk-orange">Session Logger</a></li>
            <li><a href="#" className="text-cyberpunk-pink hover:text-cyberpunk-orange">Player Roster</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-cyberpunk-orange">Player: <span className="font-bold text-cyberpunk-pink">Jaxx</span></h3>
          <p>Role: <span className="font-bold text-cyberpunk-pink">Solo</span></p>
          <p>Status: <span className="text-green-400">Alive</span></p>
        </section>

        <footer className="text-center mt-8 text-cyberpunk-pink">
          © 2024 Pyramid Schemes. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default HomePage;