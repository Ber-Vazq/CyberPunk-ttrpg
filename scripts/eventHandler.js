// JavaScript code for handling form submission and displaying events
document.getElementById("eventForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const eventName = document.getElementById("eventName").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventDescription = document.getElementById("eventDescription").value;

    // Create event element and display it
    const eventElement = document.createElement("div");
    eventElement.innerHTML = `
      <h3>${eventName}</h3>
      <p>Date: ${eventDate}</p>
      <p>Description: ${eventDescription}</p>
      <button class="deleteButton">Delete</button>
    `;
    document.getElementById("eventList").appendChild(eventElement);

    // Retrieve events from Local Storage (if available)
    const storedEvents = localStorage.getItem("events") || "[]"; // Use "[]" if no events exist
    const events = JSON.parse(storedEvents);

    // Add the new event to the events array
    events.push({ eventName, eventDate, eventDescription });

    // Store the updated events back in Local Storage
    localStorage.setItem("events", JSON.stringify(events));

    // Clear form inputs
    document.getElementById("eventName").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventDescription").value = "";

    // Add event listener to delete button within the loop (after element creation)
    const deleteButton = eventElement.querySelector(".deleteButton"); // Add a period before the class name
    deleteButton.addEventListener("click", function () {
        // Remove the event from the events array
        const index = events.findIndex((e) => e.eventName === eventName && e.eventDate === eventDate && e.eventDescription === eventDescription);
        if (index !== -1) {
            events.splice(index, 1);
        }

        // Update the events in Local Storage
        localStorage.setItem("events", JSON.stringify(events));

        // Remove the event element from the DOM
        eventElement.remove();
    });
});

// Retrieve events from Local Storage and display them (optional, can be outside the submit event listener)
const storedEvents = localStorage.getItem("events");
if (storedEvents) {
    const events = JSON.parse(storedEvents);
    events.forEach((event) => {
        // Create and display event element
        const eventElement = document.createElement("div");
        eventElement.innerHTML = `
      <h3>${event.eventName}</h3>
      <p>Date: ${event.eventDate}</p>
      <p>Description: ${eventDescription}</p> <button class="deleteButton">Delete Event</button>
    `;
        document.getElementById("eventList").appendChild(eventElement);

        // Add event listener to delete button within the loop
        const deleteButton = eventElement.querySelector(".deleteButton"); // Add a period before the class name
        deleteButton.addEventListener("click", function () {
            // Remove the event from the events array
            const index = events.findIndex((e) => e.eventName === eventName && e.eventDate === eventDate && e.eventDescription === eventDescription);
            if (index !== -1) {
                events.splice(index, 1);
            }

            // Update the events in Local Storage
            localStorage.setItem("events", JSON.stringify(events));

            // Remove the event element from the DOM
            eventElement.remove();
        });
    });
}

// Event listener for the "Delete All Events" button (optional)
const deleteAllButton = document.getElementById("deleteButton");
if (deleteAllButton) {
    deleteAllButton.addEventListener("click", function () {
        // Clear local storage and event list
        localStorage.removeItem("events");
        document.getElementById("eventList").innerHTML = "";
    });
}