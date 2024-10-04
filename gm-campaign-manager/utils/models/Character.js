const mongoose = require('mongoose');

// Sub-schema for skills
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Skill name
  level: { type: Number, required: true }, // Skill level (0-10)
  stat: { type: String, required: true }, // Associated stat (e.g., "Reflexes")
  total: { type: Number, required: true }, // Calculated as stat + level
});

// Sub-schema for gear
const gearSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // Weapon, Armor, Equipment
  description: String,
  stats: {
    damage: String, // e.g., "3d6"
    armorPenetration: Boolean,
    range: Number,
    specialEffects: String,
  },
});

// Sub-schema for cyberware
const cyberwareSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // Neuralware, Bioware, etc.
  description: String,
  effect: String, // Description of the effect
  humanityLoss: Number,
  statBonuses: [{
    stat: { type: String }, // e.g., "Reflexes"
    bonus: { type: Number },
  }],
  skillBonuses: [{
    skill: { type: String },
    bonus: { type: Number },
  }],
});

// Main character schema
const characterSchema = new mongoose.Schema({
  // Basic Information
  name: { type: String, required: true },
  handle: String,
  role: { type: String, required: true }, // e.g., Netrunner, Solo

  // Lifepath (Background) as a Single String
  lifepath: { type: String }, // Player-written story

  // Attributes (Stats)
  stats: {
    intelligence: { type: Number, required: true },
    reflexes: { type: Number, required: true },
    dexterity: { type: Number, required: true },
    tech: { type: Number, required: true },
    cool: { type: Number, required: true },
    willpower: { type: Number, required: true },
    luck: { type: Number, required: true },
    move: { type: Number, required: true },
    body: { type: Number, required: true },
    empathy: { type: Number, required: true },
  },

  // Derived Stats
  derivedStats: {
    hitPoints: {
      maxHP: { type: Number, required: true },
      currentHP: { type: Number, required: true },
      seriouslyWoundedThreshold: { type: Number, required: true },
      deathSave: { type: Number, required: true },
    },
    humanity: {
      maxHumanity: { type: Number, required: true },
      currentHumanity: { type: Number, required: true },
      empathyModifier: { type: Number, required: true },
    },
    initiative: { type: Number, required: true },
    moveAllowance: { type: Number, required: true },
  },

  // Role Abilities
  roleAbility: {
    name: { type: String, required: true },
    level: { type: Number, required: true },
    description: String,
    statBonuses: [{
      stat: { type: String },
      bonus: { type: Number },
    }],
    skillBonuses: [{
      skill: { type: String },
      bonus: { type: Number },
    }],
    specialAbilities: [{
      name: String,
      description: String,
    }],
  },

  // Skills
  skills: [skillSchema],

  // Gear and Cyberware
  gear: [gearSchema],
  cyberware: [cyberwareSchema],

  // Character Points and Resources
  reputation: { type: Number, default: 0 },
  streetCred: { type: Number, default: 0 },
  cash: { type: Number, default: 0 },
  humanityLossTotal: { type: Number, default: 0 },

  // Flags and Metadata
  isNPC: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Character', characterSchema);
