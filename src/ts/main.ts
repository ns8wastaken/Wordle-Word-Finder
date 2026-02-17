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

    // Listen for any changes on the checkboxes
    [dbNormal, dbExtra, dbOfficial, dbUnofficial].forEach(cb => {
        cb.addEventListener("change", updateSettings);
    });

    // Run once on load to initialize the state
    updateSettings();
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

    // Show wordle settings
    const wordLengthInput = document.getElementById("word-length") as HTMLInputElement | null;
    const extraOptions = document.getElementById("extra-options");
    checkWordLength(wordLengthInput, extraOptions);
    wordLengthInput?.addEventListener("input", () => checkWordLength(wordLengthInput, extraOptions));

    // Setup wordle settings
    setupSettings();
}

init();
