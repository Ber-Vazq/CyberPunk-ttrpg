// pages/index.js
import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-cyberpunk-black text-white">
      <header className="bg-cyberpunk-pink p-4 shadow-lg">
        <h1 className="text-3xl font-bold">Pyramid Schemes</h1>
        <p className="text-lg">Cyberpunk Red Campaign Manager</p>
      </header>

      <main className="container mx-auto py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Campaigns Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Active Campaigns</h2>
            <ul className="space-y-4">
              <li className="bg-gray-900 p-4 rounded-lg shadow-md">
                <h3 className="text-xl">Campaign: Night City Blues</h3>
                <p>Next Session: <strong>September 30, 2024</strong></p>
              </li>
              {/* Additional campaigns */}
            </ul>
          </div>

          {/* GM Tools */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">GM Tools</h2>
            <ul className="space-y-4">
              <li className="bg-gray-900 p-4 rounded-lg shadow-md">
                <a href="/tools/npc-generator" className="text-lg text-cyberpunk-pink">NPC Generator</a>
              </li>
              <li className="bg-gray-900 p-4 rounded-lg shadow-md">
                <a href="/tools/session-logger" className="text-lg text-cyberpunk-pink">Session Logger</a>
              </li>
            </ul>
          </div>

          {/* Player Information */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Player Roster</h2>
            <ul className="space-y-4">
              <li className="bg-gray-900 p-4 rounded-lg shadow-md">
                <h3 className="text-xl">Player: Jaxx</h3>
                <p>Role: Solo</p>
                <p>Status: Alive</p>
              </li>
              {/* Additional players */}
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-cyberpunk-pink p-4 text-center">
        <p>&copy; 2024 Pyramid Schemes. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;