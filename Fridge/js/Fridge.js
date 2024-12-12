let globalAuthor = "Kevin Reiff   November 8th 2024";
let initTemperature = Math.floor(Math.random() * 40) + 1;
let timeFormat = false;
let tempUnit = 'F';
let alarmSound = new Audio('audio/alarm.mp3');
let tvSound = new Audio('audio/Netflix_Jingle.mp3');
let isDarkMode = false;

// Music Files
const musicFiles = [
    new Audio('audio/Rick_Roll.mp3'),
    new Audio('audio/Elevator_Music.mp3'),
    new Audio('audio/Jazz.mp3')
];
let shuffledPlaylist = [];
let currentTrackIndex = 0;

// Sets clock on app and displays footer info
function onLoad() {
    setInterval(updateClock, 1000);
    const bottom = document.getElementById('bottom');
    document.getElementById('temperature').innerHTML = initTemperature;
    bottom.innerHTML = `<hr>&copy; ${globalAuthor}`;
    hideAllViews();
    setupDarkModeToggle();
}

// Function to update the clock
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    let formattedHours = timeFormat ? hours : (hours % 12 || 12);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    document.getElementById('clock').innerText = `${formattedHours}:${minutes}:${seconds} ${timeFormat ? '' : ampm}`;
}

// Toggle between 12-hour and 24-hour clock
function toggleTime() {
    timeFormat = !timeFormat;
}

// Toggle between Fahrenheit and Celsius
function toggleTemp() {
    if (tempUnit === 'F') {
        tempUnit = 'C';
        initTemperature = ((initTemperature - 32) * 5 / 9).toFixed(1);
    } else {
        tempUnit = 'F';
        initTemperature = ((initTemperature * 9 / 5) + 32).toFixed(1);
    }
    document.getElementById('temperature').innerText = initTemperature;
    document.getElementById('temp-unit').innerText = tempUnit;
}

// Change temperature value based on the current unit
function changeTemp(action) {
    if (tempUnit === 'F') {
        initTemperature = action === 'increase' ? parseFloat(initTemperature) + 1 : parseFloat(initTemperature) - 1;
    } else {
        initTemperature = action === 'increase' ? parseFloat(initTemperature) + 0.5 : parseFloat(initTemperature) - 0.5;
    }
    document.getElementById('temperature').innerText = initTemperature.toFixed(1);
}

// Start the timer
let timer;
function startTimer() {
    const minutes = parseInt(document.getElementById('timer-input-minutes').value) || 0;
    const seconds = parseInt(document.getElementById('timer-input-seconds').value) || 0;

    if (!isNaN(minutes) && !isNaN(seconds) && (minutes > 0 || seconds > 0)) {
        let timeInSeconds = (minutes * 60) + seconds;

        timer = setInterval(() => {
            const mins = Math.floor(timeInSeconds / 60);
            const secs = timeInSeconds % 60;
            document.getElementById('timer-display').innerText = `${mins}:${secs.toString().padStart(2, '0')}`;
            timeInSeconds--;

            if (timeInSeconds < 0) {
                clearInterval(timer);
                alarmSound.play();
            }
        }, 1000);
    }
}

// Add item to the shopping list
function addItem() {
    const item = document.getElementById('item-input').value;
    if (item) {
        const list = document.getElementById('shopping-list');
        const listItem = document.createElement('li');
        listItem.innerText = item;
        list.appendChild(listItem);
        document.getElementById('item-input').value = '';
    }
}

// Function to change view content
function changeView(viewId, element) {
    const buttonOnOFF = document.getElementById('button1');
    if (buttonOnOFF.value === 'Off') {
        alert('Please turn on the fridge to use this feature.');
        return;
    }
    hideAllViews();

    if (viewId === 'view-netflix') {
        playNetflixSound();
    }

    const selectedView = document.getElementById(viewId);
    if (selectedView) {
        selectedView.style.display = 'flex';
        selectedView.style.justifyContent = 'center';
        selectedView.style.alignItems = 'center';
    }

    const navItems = document.getElementsByClassName('nav-item');
    for (let item of navItems) {
        item.classList.remove('selected');
    }

    element.classList.add('selected');
}

// Hide all views
function hideAllViews() {
    const views = document.getElementsByClassName('view');
    for (let view of views) {
        view.style.display = 'none';
    }
    document.getElementById('fridge-image').style.display = 'none';
}

// Function to toggle the display
function onOff() {
    const buttonOnOFF = document.getElementById('button1');

    if (buttonOnOFF.value === "Off") {
        buttonOnOFF.value = "On";
        buttonOnOFF.classList.remove('off');
        buttonOnOFF.classList.add('on');
        hideAllViews();
        const fridgeImage = document.getElementById('fridge-image');
        fridgeImage.style.display = 'flex';
        fridgeImage.style.justifyContent = 'center';
        fridgeImage.style.alignItems = 'center';
    } else {
        buttonOnOFF.value = "Off";
        buttonOnOFF.classList.remove('on');
        buttonOnOFF.classList.add('off');
        hideAllViews();
    }
}

// TV Functionality
function toggleTV() {
    const buttonOnOFF = document.getElementById('button1');
    if (buttonOnOFF.value === 'Off') {
        alert('Please turn on the fridge to use this feature.');
        return;
    }
    const netflixImage = document.querySelector('#view-netflix img');
    if (netflixImage.style.display === 'none' || netflixImage.style.display === '') {
        netflixImage.style.display = 'block';
        playNetflixSound();
    } else {
        netflixImage.style.display = 'none';
    }
}

// Function to play Netflix sound
function playNetflixSound() {
    tvSound.currentTime = 0; // Reset the sound
    tvSound.play().catch((error) => {
        console.error('Error playing the Netflix sound:', error);
    });
}

// Browser Functionality
function openBrowser() {
    window.open('https://www.google.com', '_blank');
}

// Music Player Functionality
function shufflePlaylist() {
    shuffledPlaylist = [...musicFiles];
    for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPlaylist[i], shuffledPlaylist[j]] = [shuffledPlaylist[j], shuffledPlaylist[i]];
    }
}

function playMusic() {
    if (shuffledPlaylist.length === 0) {
        shufflePlaylist();
    }
    currentTrackIndex = Math.floor(Math.random() * shuffledPlaylist.length); // Play a random track each time play is pressed
    playNextTrack();
}

function playNextTrack() {
    if (currentTrackIndex < shuffledPlaylist.length) {
        const track = shuffledPlaylist[currentTrackIndex];
        track.play();

        // Set up the event for playing the next track when this one ends
        track.onended = () => {
            currentTrackIndex++;
            if (currentTrackIndex < shuffledPlaylist.length) {
                playNextTrack();
            } else {
                // Reset to beginning of the playlist or stop if no looping is needed
                currentTrackIndex = 0;
            }
        };
    }
}

function stopMusic() {
    if (currentTrackIndex < shuffledPlaylist.length) {
        shuffledPlaylist[currentTrackIndex].pause();
        shuffledPlaylist[currentTrackIndex].currentTime = 0;
    }
    currentTrackIndex = Math.floor(Math.random() * shuffledPlaylist.length); // Reset to a random track for next play
}

// Dark Mode Toggle
function setupDarkModeToggle() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerText = 'Toggle Light/Dark Mode';
    darkModeToggle.classList.add('nav-item');
    darkModeToggle.onclick = toggleDarkMode;
    document.getElementById('navigation').appendChild(darkModeToggle);
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}
