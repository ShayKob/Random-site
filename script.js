let wordsList = ["מעיינ", "מעייני", "שייקה", "שייקס", "אייל גולנ", "סדרות חשבוניות", "טסימ לחול"];
let remainingWords = [...wordsList];
let currentWord = "";
let guessedLetters = [];
let lives = 5;

function nextScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
}

function checkName() {
    const val = document.getElementById('nameInput').value.trim();
    if (val === 'מעיין') {
        nextScreen('screen-hozech');
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

function moveButton() {
    const btn = document.getElementById('runawayBtn');
    const x = Math.random() * (window.innerWidth - btn.clientWidth - 50);
    const y = Math.random() * (window.innerHeight - btn.clientHeight - 50);
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}

function startHangman() {
    remainingWords = [...wordsList];
    setupWord();
}

function setupWord() {
    if (remainingWords.length === 0) {
        remainingWords = [...wordsList];
    }
    
    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    currentWord = remainingWords[randomIndex];
    remainingWords.splice(randomIndex, 1);
    
    lives = 5;
    guessedLetters = [];
    document.getElementById('gameControls').style.display = 'none';
    updateGameDisplay();
    createAlphabet();
    nextScreen('screen-hangman');
}

function createAlphabet() {
    const alphabet = "אבגדהוזחטיכלמנסעפצקרשת";
    const container = document.getElementById('alphabet');
    container.innerHTML = "";
    
    [...alphabet].forEach(letter => {
        const btn = document.createElement('button');
        btn.textContent = letter;
        btn.className = 'letter-btn';
        btn.onclick = () => handleGuess(letter, btn);
        container.appendChild(btn);
    });
}

function handleGuess(letter, btn) {
    btn.disabled = true;
    if (currentWord.includes(letter)) {
        guessedLetters.push(letter);
        if (checkWin()) {
            document.getElementById('gameControls').style.display = 'block';
        }
    } else {
        lives--;
        if (lives <= 0) {
            nextScreen('screen-fail');
        }
    }
    updateGameDisplay();
}

function updateGameDisplay() {
    let display = "";
    [...currentWord].forEach(letter => {
        if (letter === " ") {
            display += " - ";
        } else {
            display += guessedLetters.includes(letter) ? letter : "_";
        }
    });
    document.getElementById('wordDisplay').textContent = display;
    document.getElementById('livesCount').textContent = lives;
    
    const imgIndex = 6 - lives; 
    const imgElement = document.getElementById('hangmanPic');
    if (imgIndex >= 1 && imgIndex <= 5) {
        imgElement.src = `images/image${imgIndex}.jpg`;
    } else if (lives === 5) {
        imgElement.src = `images/image1.jpg`;
    }
}

function checkWin() {
    return [...currentWord].every(letter => 
        letter === " " || guessedLetters.includes(letter)
    );
}

function showAnswer() {
    document.getElementById('revealedWord').textContent = currentWord;
    nextScreen('screen-answer');
}

function showVirus() {
    document.getElementById('virus-alert').style.display = 'flex';
}

function closeVirus() {
    document.getElementById('virus-alert').style.display = 'none';
    nextScreen('screen-retry');
}

function hideMe() {
    document.getElementById('hideBtn').style.display = 'none';
}