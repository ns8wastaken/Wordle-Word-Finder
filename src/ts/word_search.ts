import { getWordleOfficialWords, getWordleUnofficialWords } from "./word_loader";

type LetterIndex = [string, number];

// --- Helper: get all inputs inside a fieldset's .letter-row ---
function getInputsFromFieldset(fieldsetId: string): HTMLInputElement[] {
    const fieldset = document.getElementById(fieldsetId);
    if (!fieldset) return [];
    const row = fieldset.querySelector<HTMLDivElement>(".letter-row");
    if (!row) return [];
    return Array.from(row.querySelectorAll<HTMLInputElement>("input.letter-input"));
}

// --- Extract letters from inputs ---
function extractLetters(inputs: HTMLInputElement[], includeIndex = true): LetterIndex[] | string[] {
    const results: LetterIndex[] | string[] = [];

    inputs.forEach((input, index) => {
        const value = input.value.toUpperCase();
        input.value = value; // normalize input
        if (!value) return;

        if (includeIndex) {
            (results as LetterIndex[]).push([value, index]);
        } else {
            (results as string[]).push(value);
        }
    });

    return results;
}

// --- Get letters from all sections ---
function getLetters() {
    const correctInputs = getInputsFromFieldset("correct-fieldset");
    const validInputs = getInputsFromFieldset("valid-fieldset");
    const invalidInputs = getInputsFromFieldset("invalid-fieldset");

    const correctLetters = extractLetters(correctInputs) as LetterIndex[];
    const validLetters = extractLetters(validInputs) as LetterIndex[];
    const invalidLetters = extractLetters(invalidInputs, false) as string[];

    return { correctLetters, validLetters, invalidLetters };
}

// --- Check if a word is valid ---
function isValidWord(
    word: string,
    correctLetters: LetterIndex[],
    validLetters: LetterIndex[],
    invalidLetters: string[]
): boolean {
    if (invalidLetters.some(char => word.includes(char))) return false;
    if (correctLetters.some(([char, index]) => word[index] !== char)) return false;

    for (const [char, index] of validLetters) {
        if (!word.includes(char)) return false;
        if (word[index % 5] === char) return false;
    }

    return true;
}

// --- Main: get answers and display ---
function getAnswers() {
    const { correctLetters, validLetters, invalidLetters } = getLetters();
    const useValidWords = (document.getElementById("use-valid-words") as HTMLInputElement)?.checked ?? false;

    const wordsToCheck = useValidWords ? getWordleOfficialWords() : getWordleUnofficialWords();
    const answers = wordsToCheck.filter(word =>
        isValidWord(word, correctLetters, validLetters, invalidLetters)
    );

    displayWordList(answers);
}

// --- Display the word list ---
function displayWordList(words: string[]) {
    const wordList = document.getElementById("word-list")!;
    wordList.innerHTML = "";

    words.forEach(word => {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = word;
        wordList.appendChild(span);
    });
}

// --- Event listeners ---
document.getElementById("search-button")?.addEventListener("click", getAnswers);

document.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key === "Enter") getAnswers();
});
