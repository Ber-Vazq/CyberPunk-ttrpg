const mongoose = require('mongoose');

// Define the schema
const CampaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    nextSession: { type: Date, required: true },
    gm: { type: String, required: true },
    characters: [
        {
            name: { type: String, required: true },
            role: { type: String, required: true },
            status: { type: String, required: true }
        }
    ]
});

// Create the model and specify the collection name
const Campaign = mongoose.model('Campaign', CampaignSchema, 'campaigns');

module.exports = Campaign;