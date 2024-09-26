// models/Character.js
const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: String,
  role: String,
  stats: {
    intelligence: Number,
    reflex: Number,
    dexterity: Number,
    tech: Number,
    cool: Number,
    willpower: Number,
    luck: Number,
    movement: Number,
    body: Number,
    empathy: Number,
  },
  skills: Object,
  abilities: Object,
  cyberware: Array,
  inventory: Array,
  health: {
    max_hp: Number,
    current_hp: Number,
  },
  campaign_id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Character', CharacterSchema, 'characters');
