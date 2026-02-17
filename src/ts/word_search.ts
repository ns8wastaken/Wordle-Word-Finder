import { getActiveWords } from "./active_words.js";
import { renderWords } from "./init_word_list.js";

type LetterIndex = [string, number];

function getInputsFromFieldset(fieldsetId: string): HTMLInputElement[] {
    const fieldset = document.getElementById(fieldsetId);
    if (!fieldset) return [];

    const container = fieldset.querySelector(".container");
    const searchArea = container || fieldset;

    return Array.from(searchArea.querySelectorAll<HTMLInputElement>("input[type='text']"));
}

function extractLetters(inputs: HTMLInputElement[], includeIndex = true): LetterIndex[] | string[] {
    const results: LetterIndex[] | string[] = [];

    inputs.forEach((input, index) => {
        const value = input.value.toLowerCase();
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

function getLetters(): {
    correctLetters: LetterIndex[];
    validLetters: LetterIndex[];
    invalidLetters: string[];
} {
    const correctInputs = getInputsFromFieldset("correct");
    const validInputs = getInputsFromFieldset("valid");
    const invalidInputs = getInputsFromFieldset("invalid");

    const correctLetters = extractLetters(correctInputs) as LetterIndex[];
    const validLetters = extractLetters(validInputs) as LetterIndex[];
    const invalidLetters = extractLetters(invalidInputs, false) as string[];

    return { correctLetters, validLetters, invalidLetters };
}

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

export async function getAnswers() {
    const { correctLetters, validLetters, invalidLetters } = getLetters();
    const answers = (await getActiveWords()).filter(word =>
        isValidWord(word, correctLetters, validLetters, invalidLetters)
    );

    renderWords(answers);
}
