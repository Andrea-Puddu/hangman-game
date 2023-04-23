"use strict";

const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "application",
  "programming",
  "interface",
  "wizard",
  "love",
  "pigeon",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popup.style.display = "flex";
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Show hidden word
function displayWord() {
  // create html for each letter
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
        </span>`
      )
      .join("")} 
  `;

  // get the word all in 1 line
  const innerWord = wordEl.innerText.replaceAll(/\n/g, "");

  // create and display message
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won 😊";
    popup.style.display = "flex";
  }
}

// Keydown letter press
window.addEventListener("keydown", function (e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Keydown letter press (REFACTORED)
// function isLetter(letter) {
//   const code = letter.charCodeAt(0);
//   return code >= 65 && code <= 90;
// }

// function handleCorrectLetter(letter) {
//   if (!correctLetters.includes(letter)) {
//     correctLetters.push(letter);
//     displayWord();
//   } else {
//     showNotification();
//   }
// }

// function handleWrongLetter(letter) {
//   if (!wrongLetters.includes(letter)) {
//     wrongLetters.push(letter);
//     updateWrongLettersEl();
//   } else {
//     showNotification();
//   }
// }

// window.addEventListener("keydown", function (e) {
//   const letter = e.key;
//   if (!isLetter(letter)) {
//     return;
//   }

//   if (selectedWord.includes(letter)) {
//     handleCorrectLetter(letter);
//   } else {
//     handleWrongLetter(letter);
//   }
// });

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  //  Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();
