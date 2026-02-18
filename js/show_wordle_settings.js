import { setFlags } from "./active_words.js";
export function checkWordLength(wordLength, extraOptions) {
    var _a, _b;
    if (!extraOptions)
        return;
    // Get references to the specific checkboxes
    const dbNormal = document.getElementById("use-word-db");
    const dbExtra = document.getElementById("use-extra-words-db");
    const dbOfficial = document.getElementById("use-official-words");
    const dbUnofficial = document.getElementById("use-unofficial-words");
    if (wordLength === 5) {
        extraOptions.classList.remove("hidden");
    }
    else {
        // 1. Hide the UI
        extraOptions.classList.add("hidden");
        // 2. Physically uncheck the boxes
        if (dbOfficial)
            dbOfficial.checked = false;
        if (dbUnofficial)
            dbUnofficial.checked = false;
        // 3. Update the underlying state so the search doesn't use Wordle lists
        setFlags((_a = dbNormal === null || dbNormal === void 0 ? void 0 : dbNormal.checked) !== null && _a !== void 0 ? _a : true, (_b = dbExtra === null || dbExtra === void 0 ? void 0 : dbExtra.checked) !== null && _b !== void 0 ? _b : false, false, // force official to false
        false // force unofficial to false
        );
    }
}
