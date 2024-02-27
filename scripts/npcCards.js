class CharacterCard {
    constructor(name, picture, birthDate, deathDate, biography, relationships) {
      this.name = name;
      this.picture = picture;
      this.birthDate = birthDate;
      this.deathDate = deathDate;
      this.biography = biography;
      this.relationships = relationships;
    }
  
    updateName(newName) {
      this.name = newName;
    }
  
    updatePicture(newPicture) {
      this.picture = newPicture;
    }
  
    updateBirthDate(newBirthDate) {
      this.birthDate = newBirthDate;
    }
  
    updateDeathDate(newDeathDate) {
      this.deathDate = newDeathDate;
    }
  
    updateBiography(newBiography) {
      this.biography = newBiography;
    }
  
    updateRelationships(newRelationships) {
      this.relationships = newRelationships;
    }
  
    // Function to generate the character card HTML dynamically
    generateCardHTML() {
      return `
        <div class="character-picture">
          <img src="${this.picture}" alt="Character portrait">
        </div>
        <div class="character-info">
          <h1>${this.name}</h1>
          <p><strong>Birth/Death Date:</strong> ${this.birthDate} - ${this.deathDate}</p>
          <h2>Bio</h2>
          <p>${this.biography}</p>
          <h2>Relationships</h2>
          <ul id="relationships">
            ${this.relationships.map(relationship => `<li>${relationship}</li>`).join('')}
          </ul>
        </div>
      `;
    }
  }
  
  // Usage example:
  const character = new CharacterCard(
    "John Doe",
    "profile.jpg",
    "January 1, 2000",
    "December 31, 2077",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ["Friend 1", "Friend 2"]
  );
  
  // Generate and display the character card
  const characterCard = document.getElementById("character-card");
  characterCard.innerHTML = character.generateCardHTML();
  