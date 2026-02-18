import { setFlags } from "./active_words.js";

export function checkWordLength(
    wordLength: number,
    extraOptions: HTMLElement | null
) {
    if (!extraOptions) return;

    // Get references to the specific checkboxes
    const dbNormal = document.getElementById("use-word-db") as HTMLInputElement;
    const dbExtra = document.getElementById("use-extra-words-db") as HTMLInputElement;
    const dbOfficial = document.getElementById("use-official-words") as HTMLInputElement;
    const dbUnofficial = document.getElementById("use-unofficial-words") as HTMLInputElement;

    if (wordLength === 5) {
        extraOptions.classList.remove("hidden");
    } else {
        // 1. Hide the UI
        extraOptions.classList.add("hidden");

        // 2. Physically uncheck the boxes
        if (dbOfficial) dbOfficial.checked = false;
        if (dbUnofficial) dbUnofficial.checked = false;

        // 3. Update the underlying state so the search doesn't use Wordle lists
        setFlags(
            dbNormal?.checked ?? true,
            dbExtra?.checked ?? false,
            false, // force official to false
            false  // force unofficial to false
        );
    }
}
