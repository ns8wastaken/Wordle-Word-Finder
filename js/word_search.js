var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getActiveWords } from "./active_words.js";
import { renderWords } from "./init_word_list.js";
function getLettersFromFieldset(fieldsetId) {
    const fieldset = document.getElementById(fieldsetId);
    if (!fieldset)
        return [];
    const results = [];
    const rows = fieldset.querySelectorAll(".letter-row");
    rows.forEach(row => {
        const inputs = row.querySelectorAll("input[type='text']");
        inputs.forEach((input, index) => {
            const val = input.value.toLowerCase().trim();
            if (val) {
                results.push({ char: val, index: index });
            }
        });
    });
    return results;
}
function isValidWord(word, correct, valid, invalid) {
    // Invalid
    if (invalid.some(char => word.includes(char)))
        return false;
    // Correct
    if (correct.some(({ char, index }) => word[index] !== char))
        return false;
    // Valid
    for (const { char, index } of valid) {
        if (!word.includes(char))
            return false;
        if (word[index] === char)
            return false;
    }
    return true;
}
export function getAnswers() {
    return __awaiter(this, void 0, void 0, function* () {
        const wordLengthInput = document.getElementById("word-length");
        const wordLength = Number(wordLengthInput === null || wordLengthInput === void 0 ? void 0 : wordLengthInput.value) || 5;
        const correct = getLettersFromFieldset("correct");
        const valid = getLettersFromFieldset("valid");
        const invalid = getLettersFromFieldset("invalid").map(item => item.char);
        const allWords = yield getActiveWords();
        const answers = allWords.filter(word => {
            // First filter by length
            if (word.length !== wordLength)
                return false;
            // Then filter by game rules
            return isValidWord(word, correct, valid, invalid);
        });
        renderWords(answers);
    });
}
