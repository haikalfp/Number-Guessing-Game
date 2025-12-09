// Elements
const difficultyScreen = document.getElementById('difficulty-screen');
const playScreen = document.getElementById('play-screen');
const customInputs = document.getElementById('custom-inputs');
const minInput = document.getElementById('min-num');
const maxInput = document.getElementById('max-num');
const customError = document.getElementById('custom-error');
const rangeDisplay = document.getElementById('range-display');
const attemptsDisplay = document.getElementById('attempts-display');
const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-guess');
const messageArea = document.getElementById('message-area');
const feedbackText = document.getElementById('feedback-text');
const restartBtn = document.getElementById('restart-btn');
const backMenuBtn = document.getElementById('back-menu-btn');
const toggleHistoryBtn = document.getElementById('toggle-history-btn');
const historyContainer = document.getElementById('history-container');
const historyList = document.getElementById('history-list');

// Game State
let secretNum = 0;
let minNum = 1;
let maxNum = 100;
let attempts = 0;
let isGameActive = false;

// Event Listeners for Difficulty Buttons
document.querySelectorAll('.btn-difficulty').forEach(btn => {
    btn.addEventListener('click', () => {
        const level = parseInt(btn.dataset.level);
        if (level === 5) {
            // Show Custom Inputs
            customInputs.classList.remove('hidden');
        } else {
            startGame(level);
        }
    });
});

// Start Custom Game Button
document.getElementById('start-custom-btn').addEventListener('click', () => {
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);

    if (isNaN(min) || isNaN(max)) {
        showError('Please enter valid numbers.');
        return;
    }

    if (min >= max) {
        showError('Minimum must be less than Maximum.');
        return;
    }

    minNum = min;
    maxNum = max;
    initGameLoop();
});

// Submit Guess
submitBtn.addEventListener('click', handleGuess);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleGuess();
});

// Restart Game
restartBtn.addEventListener('click', () => {
    initGameLoop();
});

// Back to Menu
backMenuBtn.addEventListener('click', resetGame);

// Toggle History
toggleHistoryBtn.addEventListener('click', () => {
    historyContainer.classList.toggle('hidden');
    toggleHistoryBtn.textContent = historyContainer.classList.contains('hidden')
        ? 'Show History'
        : 'Hide History';
});

// Functions

function startGame(level) {
    minNum = 1;
    switch (level) {
        case 1: maxNum = 10; break;
        case 2: maxNum = 50; break;
        case 3: maxNum = 100; break;
        case 4: maxNum = 1000000; break;
    }
    initGameLoop();
}

function initGameLoop() {
    // Generate Secret Number
    secretNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    attempts = 0;
    isGameActive = true;

    // UI Updates
    difficultyScreen.classList.add('hidden');
    playScreen.classList.remove('hidden');

    rangeDisplay.textContent = `Range: ${minNum} - ${maxNum}`;
    attemptsDisplay.textContent = `Attempts: 0`;

    guessInput.value = '';
    guessInput.focus();

    messageArea.classList.add('hidden');
    restartBtn.classList.add('hidden');

    // Clear History
    historyList.innerHTML = '';
    historyContainer.classList.add('hidden');
    toggleHistoryBtn.classList.remove('hidden');
    toggleHistoryBtn.textContent = 'Show History';
}

function handleGuess() {
    if (!isGameActive) return;

    const guess = parseInt(guessInput.value);

    if (isNaN(guess)) {
        showMessage('Please enter a valid number.', 'warning');
        return;
    }

    if (guess < minNum || guess > maxNum) {
        showMessage(`Please guess between ${minNum} and ${maxNum}.`, 'warning');
        return;
    }

    attempts++;
    attemptsDisplay.textContent = `Attempts: ${attempts}`;

    let hint = '';
    let type = '';

    if (guess === secretNum) {
        hint = 'Correct';
        type = 'correct';
        endGame(true);
    } else if (guess < secretNum) {
        hint = 'Too low';
        type = 'low';
        showMessage('Too low! Try again.', 'warning');
    } else {
        hint = 'Too high';
        type = 'high';
        showMessage('Too high! Try again.', 'warning');
    }

    addToHistory(guess, hint, type);
    guessInput.value = '';
    guessInput.focus();
}

function addToHistory(guess, hint, type) {
    const li = document.createElement('li');
    li.innerHTML = `<span>Guess: ${guess}</span> <span class="hint ${type}">${hint}</span>`;
    historyList.prepend(li);
}

function showMessage(text, type) {
    messageArea.classList.remove('hidden');
    feedbackText.textContent = text;

    // Reset classes
    messageArea.className = 'message-box';
    if (type) messageArea.classList.add(type);
}

function showError(msg) {
    customError.textContent = msg;
    customError.classList.remove('hidden');
}

function endGame(win) {
    isGameActive = false;
    showMessage(`Congratulations! You guessed ${secretNum} in ${attempts} attempts!`, 'success');
    restartBtn.classList.remove('hidden');
    toggleHistoryBtn.classList.remove('hidden'); // ensure it's visible
}

function resetGame() {
    playScreen.classList.add('hidden');
    difficultyScreen.classList.remove('hidden');
    customInputs.classList.add('hidden');
    customError.classList.add('hidden');
    minInput.value = '';
    maxInput.value = '';
}
