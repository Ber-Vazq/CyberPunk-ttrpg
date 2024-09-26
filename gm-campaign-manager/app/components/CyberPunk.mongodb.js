// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('CyberPunk');

// Create a new document in the collection.
db.getCollection('Characters').insertMany([
    {
      "_id": ObjectId("60f73c1f9b1d2c001f4e5e61"),
      "name": "Gonzo",
      "role": "Rockerboy",
      "status": "Alive",
      "campaignId": ObjectId("60f73c1f9b1d2c001f4e5e5e")
    },
    {
      "_id": ObjectId("60f73c1f9b1d2c001f4e5e62"),
      "name": "Randi",
      "role": "Solo",
      "status": "Alive",
      "campaignId": ObjectId("60f73c1f9b1d2c001f4e5e5e")
    },
    {
      "_id": ObjectId("60f73c1f9b1d2c001f4e5e63"),
      "name": "Bug",
      "role": "Techie",
      "status": "Alive",
      "campaignId": ObjectId("60f73c1f9b1d2c001f4e5e5e")
    },
    {
      "_id": ObjectId("60f73c1f9b1d2c001f4e5e64"),
      "name": "Lina",
      "role": "Medtech",
      "status": "Alive",
      "campaignId": ObjectId("60f73c1f9b1d2c001f4e5e5e")
    }
  ]);
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('CyberPunk');

// Create a new document in the collection.
db.getCollection('Campaign').insertOne({
    "_id": ObjectId("60f73c1f9b1d2c001f4e5e5e"),
    "title": "Pyramid Schemes",
    "description": "A thrilling adventure through the neon-lit streets of Night City.",
    "nextSession": "2024-09-30",
    "players": [
      ObjectId("60f73c1f9b1d2c001f4e5e61"),
      ObjectId("60f73c1f9b1d2c001f4e5e62"),
      ObjectId("60f73c1f9b1d2c001f4e5e63"),
      ObjectId("60f73c1f9b1d2c001f4e5e64")
    ]
  });
