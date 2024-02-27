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
      const imageSrc = this.picture?.src || URL.createObjectURL(this.picture);
      return `
        <div class="character-card">
          <img src="<span class="math-inline">\{imageSrc\}" alt\="Character portrait"\>
  <div class\="character\-info"\>
  <h1\></span>{this.name}</h1>
            <p><strong>Birth/Death Date:</strong> ${this.birthDate} - <span class="math-inline">\{this\.deathDate\}</p\>
  <h2\>Bio</h2\>
  <p\></span>{this.biography}</p>
            <h2>Relationships</h2>
            <ul id="relationships">
              ${this.relationships.map(relationship => `<li>${relationship}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }
  }
  
  // Function to create a CharacterCard object from form data
  function createCharacter(name, picture, birthDate, deathDate, biography, relationships) {
    return new CharacterCard(name, picture, birthDate, deathDate, biography, relationships);
  }
  
  // Function to add a new character card to the DOM
  function addCharacterCardToDOM(character) {
    const cardHTML = character.generateCardHTML();
    const characterCards = document.getElementById("character-cards");
    characterCards.insertAdjacentHTML("beforeend", cardHTML);
    // Persist character data to local storage (optional)
    storeCharacterData(character);
  }
  
  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById("character-form"));
    const pictureFile = formData.get("picture").files[0];
  
    if (!pictureFile) {
      // Handle case where no image is selected
      alert("Please select an image file.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function(event) {
      const character = createCharacter(
        formData.get("name"),
        event.target.result, // Use the reader result (data URL)
        formData.get("birth-date"),
        formData.get("death-date"),
        formData.get("biography"),
        formData.get("relationships").split(",").map(relationship => relationship.trim())
      );
      addCharacterCardToDOM(character);
    };
    reader.readAsDataURL(pictureFile); // Read the selected image file as data URL
  }
  
  // Function to store character data in local storage
  function storeCharacterData(character) {
    // Get existing character data from local storage (empty array initially)
    const existingCards = JSON.parse(localStorage.getItem("characters")) || [];
  
    // Convert picture to base64 string (assuming picture is a File object)
    const reader = new FileReader();
    reader.onloadend = function() {
      const imageData = reader.result ? btoa(reader.result) : null; // Handle potential errors
  
      // Create a new character object with encoded image data
      const characterToSave = {
        ...character,
        imageData,
      };
  
      // Add the new character data to the array
      existingCards.push(characterToSave);
  
      // Update local storage with the updated array (convert to JSON string)
      localStorage.setItem("characters", JSON.stringify(existingCards));
    };
    reader.readAsArrayBuffer(character.picture); // Read the image file as an ArrayBuffer
  }
  
  // Load existing character cards from local storage on page load
  window.addEventListener
  