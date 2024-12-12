fetch("../../parking.json")
    .then(response => {
        console.log("JSON response status:", response.status); // Debugging
        if (!response.ok) throw new Error("Failed to load JSON");
        return response.json();
    })
    .then(data => {
        console.log("Loaded JSON data:", data); // Debugging
        const mccannLot = data.parkingLots.find(lot => lot.name === "McCann Lot");
        if (!mccannLot) throw new Error("McCann Lot not found in JSON");

        // Populate lot details
        document.getElementById("total-spaces").textContent = mccannLot.totalSpaces;
        document.getElementById("location").textContent = mccannLot.location;
        document.getElementById("hours").textContent = mccannLot.hours;
        document.getElementById("ev-chargers").textContent = mccannLot.evChargersYN === "Y" ? "Yes" : "No";
        document.getElementById("security").textContent = mccannLot.security;

        console.log("McCann Lot data populated:", mccannLot); // Debugging

        // Populate spaces
        const spacesList = document.getElementById("spaces-list");
        mccannLot.spaces.forEach(space => {
            const spaceElement = document.createElement("div");
            spaceElement.className = "space";
            spaceElement.innerHTML = `
                <p><strong>Space ID:</strong> ${space.spaceId}</p>
                <p><strong>Type:</strong> ${space.type}</p>
                <p><strong>Status:</strong> ${space.status}</p>
                <p><strong>Filled At:</strong> ${space.filledDateTime || "N/A"}</p>
                <p><strong>Reserved At:</strong> ${space.reservedDateTime || "N/A"}</p>
            `;
            spacesList.appendChild(spaceElement);
        });
        console.log("Spaces data populated successfully"); // Debugging
    })
    .catch(error => {
        console.error("Error during data fetch or DOM manipulation:", error);
    });
