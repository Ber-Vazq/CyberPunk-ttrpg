const express = require('express');
const mongoose = require('mongoose');
const Character = require('./utils/models/Character'); // Your Character model
const Campaign = require('./utils/models/Campaign'); // Your Campaign model
const bodyParser = require('body-parser');
const cors = require('cors');

// Create the Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // To parse JSON bodies
app.use(cors()); // To enable CORS (Cross-Origin Resource Sharing)

// Connect to MongoDB
mongoose.connect('mongodb+srv://bvaq20:SqgBFrNmMVcsLDLh@cluster0.eqlp8.mongodb.net/CyberPunk', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Routes

// Fetch all campaigns
app.get('/api/campaigns', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    console.log(campaigns); // Log the retrieved campaigns
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch characters for a specific campaign
app.get('/api/campaign/:id/characters', async (req, res) => {  // Use lowercase 'c'
  try {
    const characters = await Character.find({ campaign_id: req.params.id });
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new character
app.post('/api/characters', async (req, res) => {  // Use lowercase 'c'
  try {
    const newCharacter = new Character(req.body);
    await newCharacter.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a new campaign
app.post('/api/campaigns', async (req, res) => {  // Use lowercase 'c'
  try {
    const newCampaign = new Campaign(req.body);
    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
