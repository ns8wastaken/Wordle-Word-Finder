var _a;
import { allWords } from "./all_words.js";
import { allAnswers } from "./all_answers.js";
// --- Helper: get all inputs inside a fieldset's .letter-row ---
function getInputsFromFieldset(fieldsetId) {
    const fieldset = document.getElementById(fieldsetId);
    if (!fieldset)
        return [];
    const row = fieldset.querySelector(".letter-row");
    if (!row)
        return [];
    return Array.from(row.querySelectorAll("input.letter-input"));
}
// --- Extract letters from inputs ---
function extractLetters(inputs, includeIndex = true) {
    const results = [];
    inputs.forEach((input, index) => {
        const value = input.value.toUpperCase();
        input.value = value; // normalize input
        if (!value)
            return;
        if (includeIndex) {
            results.push([value, index]);
        }
        else {
            results.push(value);
        }
    });
    return results;
}
// --- Get letters from all sections ---
function getLetters() {
    const correctInputs = getInputsFromFieldset("correct-fieldset");
    const validInputs = getInputsFromFieldset("valid-fieldset");
    const invalidInputs = getInputsFromFieldset("invalid-fieldset");
    const correctLetters = extractLetters(correctInputs);
    const validLetters = extractLetters(validInputs);
    const invalidLetters = extractLetters(invalidInputs, false);
    return { correctLetters, validLetters, invalidLetters };
}
// --- Check if a word is valid ---
function isValidWord(word, correctLetters, validLetters, invalidLetters) {
    if (invalidLetters.some(char => word.includes(char)))
        return false;
    if (correctLetters.some(([char, index]) => word[index] !== char))
        return false;
    for (const [char, index] of validLetters) {
        if (!word.includes(char))
            return false;
        if (word[index % 5] === char)
            return false;
    }
    return true;
}
// --- Main: get answers and display ---
function getAnswers() {
    var _a, _b;
    const { correctLetters, validLetters, invalidLetters } = getLetters();
    const useValidWords = (_b = (_a = document.getElementById("use-valid-words")) === null || _a === void 0 ? void 0 : _a.checked) !== null && _b !== void 0 ? _b : false;
    const wordsToCheck = useValidWords ? allAnswers : allWords;
    const answers = wordsToCheck.filter(word => isValidWord(word, correctLetters, validLetters, invalidLetters));
    displayWordList(answers);
}
// --- Display the word list ---
function displayWordList(words) {
    const wordList = document.getElementById("word-list");
    wordList.innerHTML = "";
    words.forEach(word => {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = word;
        wordList.appendChild(span);
    });
}
// --- Event listeners ---
(_a = document.getElementById("search-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", getAnswers);
document.addEventListener("keypress", (event) => {
    if (event.key === "Enter")
        getAnswers();
});
