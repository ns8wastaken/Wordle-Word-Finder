import { getActiveWords } from "./active_words.js";
import { renderWords } from "./init_word_list.js";

type LetterIndex = { char: string, index: number };

function getLettersFromFieldset(fieldsetId: string): LetterIndex[] {
    const fieldset = document.getElementById(fieldsetId);
    if (!fieldset) return [];

    const results: LetterIndex[] = [];
    const rows = fieldset.querySelectorAll(".letter-row");

    rows.forEach(row => {
        const inputs = row.querySelectorAll<HTMLInputElement>("input[type='text']");
        inputs.forEach((input, index) => {
            const val = input.value.toLowerCase().trim();
            if (val) {
                results.push({ char: val, index: index });
            }
        });
    });

    return results;
}

function isValidWord(
    word: string,
    correct: LetterIndex[],
    valid: LetterIndex[],
    invalid: string[]
): boolean {
    // Invalid
    if (invalid.some(char => word.includes(char)))
        return false;

    // Correct
    if (correct.some(({ char, index }) => word[index] !== char))
        return false;

    // Valid
    for (const { char, index } of valid) {
        if (!word.includes(char)) return false;
        if (word[index] === char) return false;
    }

    return true;
}

export async function getAnswers() {
    const wordLengthInput = document.getElementById("word-length") as HTMLInputElement;
    const wordLength = Number(wordLengthInput?.value) || 5;

    const correct = getLettersFromFieldset("correct");
    const valid = getLettersFromFieldset("valid");
    const invalid = getLettersFromFieldset("invalid").map(item => item.char);

    const allWords = await getActiveWords();

    const answers = allWords.filter(word => {
        // First filter by length
        if (word.length !== wordLength) return false;
        // Then filter by game rules
        return isValidWord(word, correct, valid, invalid);
    });

    renderWords(answers);
}
