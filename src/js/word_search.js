import { allWords } from "./all_words.js";
import { allAnswers } from "./all_answers.js";
function getLetters() {
    const inputsCorrect = document.querySelectorAll("#correct input[type=\"text\"]");
    let correctLetters = [];
    inputsCorrect.forEach((input, index) => {
        input.value = input.value.toUpperCase();
        if (input.value !== "") {
            correctLetters.push([input.value, index]);
        }
    });
    const inputsValid = document.querySelectorAll("#valid input[type=\"text\"]");
    let validLetters = [];
    inputsValid.forEach((input, index) => {
        input.value = input.value.toUpperCase();
        if (input.value !== "") {
            validLetters.push([input.value, index]);
        }
    });
    const inputsInvalid = document.querySelectorAll("#invalid input[type=\"text\"]");
    let invalidLetters = [];
    inputsInvalid.forEach((input) => {
        input.value = input.value.toUpperCase();
        if (input.value !== "") {
            invalidLetters.push(input.value);
        }
    });
    return [correctLetters, validLetters, invalidLetters];
}
function getAnswers() {
    const [correctLetters, validLetters, invalidLetters] = getLetters();
    let answers = [];
    // Filter words
    for (const word of (document.getElementById("use-valid-words").checked ? allAnswers : allWords)) {
        let good = true;
        for (const char of invalidLetters) {
            if (word.includes(char)) {
                good = false;
                break;
            }
        }
        if (!good) {
            continue;
        }
        for (const [char, index] of correctLetters) {
            if (word[index] !== char) {
                good = false;
                break;
            }
        }
        if (!good) {
            continue;
        }
        for (const [char, index] of validLetters) {
            if (!word.includes(char)) {
                good = false;
                break;
            }
            if (word[index % 5] === char) {
                good = false;
                break;
            }
        }
        if (!good) {
            continue;
        }
        answers.push(word);
    }
    // Set the word list
    const wordList = document.getElementById("word-list");
    wordList.innerHTML = "";
    answers.forEach(word => {
        const wordElement = document.createElement("span");
        wordElement.className = "word";
        wordElement.textContent = word;
        wordList.appendChild(wordElement);
    });
}
const answerButtonInput = document.getElementById("answer-button");
if (answerButtonInput) {
    answerButtonInput.addEventListener("click", getAnswers);
}
document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getAnswers();
    }
});
