// Array of parking lots
const parkingLots = [
    {
        name: "McCann Lot",
        mapFilename: "../public/McCann.png",
        comments: "Large lot near McCann gym, available for events and student use."
    },
    {
        name: "Upper West Lot",
        mapFilename: "../public/UpperWest.png",
        comments: "Small lot near Beck building, mainly for faculty."
    },
    {
        name: "Dyson Lot",
        mapFilename: "../public/Dyson.png",
        comments: "Reserved for faculty and staff, with some handicap spaces."
    },
    {
        name: "Foy Lot",
        mapFilename: "../public/Foy.png",
        comments: "Close to Foy Townhouses, primarily for student use."
    },
    {
        name: "Fontaine Lot",
        mapFilename: "../public/Fontaine.png",
        comments: "Mixed use, primarily for visitors and students."
    },
    {
        name: "Steel Plant Lot",
        mapFilename: "../public/SteelPlant.png",
        comments: "Available to students and faculty, near art studios."
    }
];

// Get the lots list container
const lotsList = document.getElementById("lots-list");

// Generate HTML for each parking lot
parkingLots.forEach(lot => {
    const lotElement = document.createElement("div");
    lotElement.className = "lot";
    lotElement.innerHTML = `
        <a href="${lot.name === "McCann Lot" ? "../html/mccann.html" : "../html/404.html"}">
            <img src="${lot.mapFilename}" alt="${lot.name}">
            <h2>${lot.name}</h2>
            <p>${lot.comments}</p>
        </a>
    `;
    lotsList.appendChild(lotElement);
});
