// Get elements
const coinCount = document.getElementById("coins");
const collectedCount = document.getElementById("collected");
const totalCoinsCount = document.getElementById("total-coins");
const timerText = document.createElement("p"); // Timer text

// Default values
let coins = localStorage.getItem("coins") ? parseInt(localStorage.getItem("coins")) : 500;
let collected = localStorage.getItem("collected") ? parseInt(localStorage.getItem("collected")) : 0;
let totalCoins = localStorage.getItem("totalCoins") ? parseInt(localStorage.getItem("totalCoins")) : 0;
let timerEndTime = localStorage.getItem("timerEndTime") ? parseInt(localStorage.getItem("timerEndTime")) : null;

// Display initial values
coinCount.textContent = coins;
collectedCount.textContent = collected;
totalCoinsCount.textContent = totalCoins;

// Coin Click Function
function collectCoin() {
    if (coins > 0) {
        coins--;
        collected++;
        updateDisplay();
        saveData();
    }

    // Start Timer if coins reach 0
    if (coins === 0 && !timerEndTime) {
        startTimer();
    }
}

// Save Coins Function
function saveCoins() {
    totalCoins += collected;
    collected = 0;
    updateDisplay();
    saveData();
}

// Reset Game Function
function resetGame() {
    coins = 500;
    collected = 0;
    totalCoins = 0;
    timerEndTime = null;
    localStorage.clear();
    updateDisplay();
}

// Update Display Function
function updateDisplay() {
    coinCount.textContent = coins;
    collectedCount.textContent = collected;
    totalCoinsCount.textContent = totalCoins;
}

// Save Data to Local Storage
function saveData() {
    localStorage.setItem("coins", coins);
    localStorage.setItem("collected", collected);
    localStorage.setItem("totalCoins", totalCoins);
}

// Start Timer Function
function startTimer() {
    let currentTime = Date.now();
    timerEndTime = currentTime + 60 * 60 * 1000; // 60 min from now
    localStorage.setItem("timerEndTime", timerEndTime);
    updateTimer();
}

// Update Timer Function
function updateTimer() {
    let interval = setInterval(() => {
        let timeLeft = timerEndTime - Date.now();

        if (timeLeft <= 0) {
            clearInterval(interval);
            coins = 500;
            timerEndTime = null;
            localStorage.removeItem("timerEndTime");
            saveData();
            updateDisplay();
            timerText.textContent = "";
        } else {
            let minutes = Math.floor(timeLeft / 60000);
            let seconds = Math.floor((timeLeft % 60000) / 1000);
            timerText.textContent = `Coins will reset in: ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

// If Timer Exists on Page Load
if (timerEndTime && Date.now() < timerEndTime) {
    updateTimer();
}

// Add Timer to Page
document.querySelector(".game-container").appendChild(timerText);
