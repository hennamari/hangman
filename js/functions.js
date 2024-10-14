const input = document.querySelector('#letterInput');
const output = document.querySelector('output');
const span = document.querySelector('#maskedWordDisplay'); // Arvattavan sanan näyttö
const guessCountSpan = document.querySelector('#guessCount'); // Arvausten määrä

const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
];

let randomizeWord = '';
let maskedWord = '';
let guessCount = 0;

// Uuden pelin käynnistys
const newGame = () => {
    const random = Math.floor(Math.random() * words.length); // Satunnainen sana listasta
    randomizeWord = words[random];
    maskedWord = "*".repeat(randomizeWord.length); // Luodaan maskedWord tähti-merkeillä
    console.log(randomizeWord); // Konsoliin tulostus, jotta näet mikä sana arvataan
    span.innerHTML = maskedWord; // Päivitetään näkyvä sana tähti-merkeillä
    guessCount = 0; // Nollataan arvauslaskuri
    guessCountSpan.innerHTML = guessCount; // Näytetään arvausten määrä
};

// Korvataan arvattuja kirjaimia oikeaan kohtaan
const replaceFoundCharts = (guess) => {
    let newString = maskedWord.split(''); // Muutetaan maskedWord taulukoksi
    for (let i = 0; i < randomizeWord.length; i++) {
        const char = randomizeWord[i];
        if (char.toLowerCase() === guess.toLowerCase()) {
            newString[i] = char; // Korvataan oikea kirjain
        }
    }
    maskedWord = newString.join(''); // Muutetaan taulukko takaisin merkkijonoksi
    span.innerHTML = maskedWord; // Päivitetään näytetty sana
};

// Voiton käsittely
const win = () => {
    alert(`You have guessed right, the word is ${randomizeWord}.`);
    newGame(); // Aloitetaan uusi peli
};

newGame(); // Käynnistetään peli heti sivun ladattua

// Tapahtumankuuntelija suoraan input-kentälle, ei lomakkeelle
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Estetään sivun lataus

        const guess = input.value.trim(); // Poistetaan ylimääräiset välilyönnit
        if (guess.toLowerCase() === randomizeWord.toLowerCase()) {
            win(); // Käyttäjä arvasi koko sanan oikein
        } else if (guess.length === 1) {
            replaceFoundCharts(guess); // Käyttäjä arvasi kirjaimen
            guessCount++; // Lisätään arvauslaskuriin yksi
            guessCountSpan.innerHTML = guessCount; // Päivitetään näytölle arvauslaskuri
            if (maskedWord.toLowerCase() === randomizeWord.toLowerCase()) {
                win(); // Käyttäjä arvasi kaikki kirjaimet oikein
            }
        } else {
            alert("You guessed wrong!"); // Käyttäjä arvasi väärän sanan
            guessCount++; // Väärästä arvauksesta lisätään laskuriin
            guessCountSpan.innerHTML = guessCount; // Päivitetään laskuri
        }
        input.value = ''; // Tyhjennetään tekstikenttä
    }
});