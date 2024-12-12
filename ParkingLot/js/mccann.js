// Helper function to format date and time
function formatDateTime(dateTime) {
    if (!dateTime) return "Not Filled/Not Reserved";
    const date = new Date(dateTime);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    return date.toLocaleDateString("en-US", options);
}

// Fetch JSON data and populate the page
fetch("../../parking.json")
    .then(response => response.json())
    .then(data => {
        const mccannLot = data.parkingLots.find(lot => lot.name === "McCann Lot");

        // Update lot details
        document.getElementById("total-spaces").textContent = mccannLot.totalSpaces;
        document.getElementById("location").textContent = mccannLot.location;
        document.getElementById("hours").textContent = mccannLot.hours;
        document.getElementById("ev-chargers").textContent = mccannLot.evChargersYN === "Y" ? "Yes" : "No";
        document.getElementById("security").textContent = mccannLot.security;

        // Populate spaces
        const spacesList = document.getElementById("spaces-list");
        mccannLot.spaces.forEach(space => {
            const filledDate = formatDateTime(space.filledDateTime);
            const reservedDate = formatDateTime(space.reservedDateTime);

            const spaceElement = document.createElement("div");
            spaceElement.className = "space";
            spaceElement.innerHTML = `
                <p><strong>Space ID:</strong> ${space.spaceId}</p>
                <p><strong>Type:</strong> ${space.type}</p>
                <p><strong>Status:</strong> ${space.status}</p>
                <p><strong>Filled At:</strong> ${filledDate}</p>
                <p><strong>Reserved At:</strong> ${reservedDate}</p>
            `;
            spacesList.appendChild(spaceElement);
        });
    })
    .catch(error => {
        console.error("Error during data fetch or DOM manipulation:", error);
    });
