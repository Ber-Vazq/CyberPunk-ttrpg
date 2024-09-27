const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },

  // Core stats (from the Cyberpunk character sheet)
  stats: {
    intelligence: { type: Number, default: 0 },
    reflexes: { type: Number, default: 0 },
    dexterity: { type: Number, default: 0 },
    tech: { type: Number, default: 0 },
    cool: { type: Number, default: 0 },
    willpower: { type: Number, default: 0 },
    luck: { type: Number, default: 0 },
    movement: { type: Number, default: 0 },
    body: { type: Number, default: 0 },
    empathy: { type: Number, default: 0 },
  },

  // Skills, divided into categories (you can adjust based on the skills in Cyberpunk)
  skills: {
    awareness: { type: Object, default: {} },  // Example: {handgun: 5, melee: 3}
    body: { type: Object, default: {} },       // Example: {endurance: 4, strength: 3}
    control: { type: Object, default: {} },    // Example: {driving: 3, piloting: 2}
    education: { type: Object, default: {} },  // Example: {history: 2, literature: 3}
    fighting: { type: Object, default: {} },   // Example: {brawling: 4, martial arts: 3}
    performance: { type: Object, default: {} },// Example: {acting: 4, dancing: 2}
    ranged_weapons: { type: Object, default: {} },  // Example: {rifles: 5, archery: 3}
    social: { type: Object, default: {} },  // Example: {persuasion: 4, bribery: 2}
    technique: { type: Object, default: {} },    // Example: {electronics: 4, hacking: 5}
    // Add more categories as needed
  },

  // Abilities
  abilities: { type: Object, default: {} },

  // Cyberware with type, description, and humanity cost
  cyberware: [
    {
      type: { type: String },            // Type of cyberware (e.g., Neural Link, Cyberarm)
      description: { type: String },     // A short description
      humanityLoss: { type: Number },    // Humanity cost of the cyberware
    },
  ],

  // Inventory items (with descriptions)
  inventory: [
    {
      itemName: { type: String },
      itemDescription: { type: String },
    },
  ],

  // Health
  health: {
    max_hp: { type: Number, default: 0 },
    current_hp: { type: Number, default: 0 },
    critical_injuries: { type: [String], default: [] },  // Array to hold critical injuries
  },
});

module.exports = mongoose.model('Character', CharacterSchema);
