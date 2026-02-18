import { setupInputNavigation } from "./input_functions.js";
import { getAnswers } from "./word_search.js";
import { setupRowControls } from "./add_remove_row.js";
import { initWordList } from "./init_word_list.js";
import { checkWordLength } from "./show_wordle_settings.js";
import { setFlags } from "./active_words.js";
function setupSettings() {
    const dbNormal = document.getElementById("use-word-db");
    const dbExtra = document.getElementById("use-extra-words-db");
    const dbOfficial = document.getElementById("use-official-words");
    const dbUnofficial = document.getElementById("use-unofficial-words");
    const updateSettings = () => setFlags(dbNormal.checked, dbExtra.checked, dbOfficial.checked, dbUnofficial.checked);
    [dbNormal, dbExtra, dbOfficial, dbUnofficial].forEach(cb => {
        cb.addEventListener("change", updateSettings);
    });
    updateSettings();
}
function syncAllRows(wordLength) {
    const allRows = document.querySelectorAll(".letter-row");
    allRows.forEach(row => {
        var _a;
        const currentInputs = row.querySelectorAll("input");
        const diff = wordLength - currentInputs.length;
        if (diff > 0) {
            // Add missing inputs
            for (let i = 0; i < diff; i++) {
                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                row.appendChild(input);
            }
        }
        else if (diff < 0) {
            // Remove extra inputs from the end
            for (let i = 0; i < Math.abs(diff); i++) {
                (_a = row.lastElementChild) === null || _a === void 0 ? void 0 : _a.remove();
            }
        }
    });
}
function init() {
    var _a;
    // Input functions
    document
        .querySelectorAll(".container")
        .forEach(setupInputNavigation);
    // Word search
    (_a = document.getElementById("search-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", getAnswers);
    document.addEventListener("keypress", (event) => {
        if (event.key === "Enter")
            getAnswers();
    });
    // Add / remove row
    setupRowControls("valid");
    setupRowControls("invalid");
    // Init word list
    initWordList();
    // Show wordle settings + sync rows
    const wordLengthInput = document.getElementById("word-length");
    const wordLength = Number(wordLengthInput === null || wordLengthInput === void 0 ? void 0 : wordLengthInput.value);
    const extraOptions = document.getElementById("extra-options");
    checkWordLength(wordLength, extraOptions);
    wordLengthInput === null || wordLengthInput === void 0 ? void 0 : wordLengthInput.addEventListener("input", () => {
        const wordLength = Number(wordLengthInput === null || wordLengthInput === void 0 ? void 0 : wordLengthInput.value);
        syncAllRows(wordLength);
        checkWordLength(wordLength, extraOptions);
    });
    // Setup wordle settings
    setupSettings();
}
init();
