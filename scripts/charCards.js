// Replace with actual date and time of your next session
const nextSession = new Date("2024-03-10T19:00:00");

// Update the countdown every second
const updateCountdown = () => {
    const now = new Date();
    const diff = nextSession - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Format the countdown string
    const countdownString = `${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Update the countdown element
    document.getElementById("countdown").textContent = `Next Session: ${countdownString}`;

    // Call the function again after 1 second
    setTimeout(updateCountdown, 1000);
};

// Sample character data (replace with your actual characters)
const characters = [
    {
        name: "Johnny Silverhand",
        role: "Solo",
        player: "John Doe",
    },
    {
        name: "Rogue Amendiares",
        role: "Techie",
        player: "Jane Smith",
    },
];

// Create a character card for each character in the list
const characterList = document.getElementById("character-list");

characters.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("character-card");

    const name = document.createElement("h3");
    name.textContent = character.name;
    card.appendChild(name);

    const role = document.createElement("p");
    role.textContent = `Role: ${character.role}`;
    card.appendChild(role);

    const player = document.createElement("p");
    player.textContent = `Player: ${character.player}`;
    card.appendChild(player);

    characterList.appendChild(card);
});

// Start the countdown
updateCountdown();
