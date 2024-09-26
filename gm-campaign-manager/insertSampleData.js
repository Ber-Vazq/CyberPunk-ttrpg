const mongoose = require('mongoose');

// Replace with your connection string
const connectionString = 'mongodb+srv://bvaq20:SqgBFrNmMVcsLDLh@cluster0.eqlp8.mongodb.net/CyberPunk';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");

    const campaignData = {
        title: "Pyramid Schemes",
        description: "A thrilling adventure set in the dark underbelly of Night City.",
        nextSession: new Date("2024-09-30T18:00:00Z"), // Use new Date for ISO date
        gm: "Bernardo",
        characters: [
            {
                name: "Gonzo",
                role: "Rockerboy",
                status: "Alive"
            },
            {
                name: "Randi",
                role: "Solo",
                status: "Alive"
            }
        ]
    };

    // Replace with your Campaign model
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

    const newCampaign = new Campaign(campaignData);

    newCampaign.save()
        .then(() => {
            console.log("Sample campaign inserted successfully");
            mongoose.connection.close();
        })
        .catch(error => {
            console.error("Error inserting campaign:", error);
            mongoose.connection.close();
        });
}).catch(err => {
    console.error("MongoDB connection error:", err);
});
