import { setupInputNavigation } from "./input_functions.js";
import { getAnswers } from "./word_search.js";
import { setupRowControls } from "./add_remove_row.js";
import { initWordList } from "./init_word_list.js";
import { checkWordLength } from "./show_wordle_settings.js";
import { setFlags } from "./active_words.js";

function setupSettings() {
    const dbNormal = document.getElementById("use-word-db") as HTMLInputElement;
    const dbExtra = document.getElementById("use-extra-words-db") as HTMLInputElement;
    const dbOfficial = document.getElementById("use-official-words") as HTMLInputElement;
    const dbUnofficial = document.getElementById("use-unofficial-words") as HTMLInputElement;

    const updateSettings = () => setFlags(
        dbNormal.checked,
        dbExtra.checked,
        dbOfficial.checked,
        dbUnofficial.checked
    );

    [dbNormal, dbExtra, dbOfficial, dbUnofficial].forEach(cb => {
        cb.addEventListener("change", updateSettings);
    });

    updateSettings();
}

function syncAllRows(wordLength: number) {
    const allRows = document.querySelectorAll(".letter-row");

    allRows.forEach(row => {
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
        } else if (diff < 0) {
            // Remove extra inputs from the end
            for (let i = 0; i < Math.abs(diff); i++) {
                row.lastElementChild?.remove();
            }
        }
    });
}

function init() {
    // Input functions
    document
        .querySelectorAll<HTMLElement>(".container")
        .forEach(setupInputNavigation);

    // Word search
    document.getElementById("search-button")?.addEventListener("click", getAnswers);
    document.addEventListener("keypress", (event: KeyboardEvent) => {
        if (event.key === "Enter") getAnswers();
    });

    // Add / remove row
    setupRowControls("valid");
    setupRowControls("invalid");

    // Init word list
    initWordList();

    // Show wordle settings + sync rows
    const wordLengthInput = document.getElementById("word-length") as HTMLInputElement | null;
    const wordLength = Number(wordLengthInput?.value);
    const extraOptions = document.getElementById("extra-options");
    checkWordLength(wordLength, extraOptions);
    wordLengthInput?.addEventListener("input", () => {
        const wordLength = Number(wordLengthInput?.value);
        syncAllRows(wordLength);
        checkWordLength(wordLength, extraOptions);
    });

    // Setup wordle settings
    setupSettings();
}

init();
