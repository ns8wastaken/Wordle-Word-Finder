var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loadAllWords, get3of6NormalWords, get3of6SpecialWords, getWordleOfficialWords, getWordleUnofficialWords } from "./word_loader.js";
let flags = [false, false, false, false];
// Mapping bits to their respective loader functions
const WORD_SOURCES = [
    get3of6NormalWords,
    get3of6SpecialWords,
    getWordleOfficialWords,
    getWordleUnofficialWords
];
const cache = new Map();
function flagsToKey(flags) {
    return flags.reduce((acc, bit, i) => {
        return bit ? (acc | (1 << i)) : acc;
    }, 0);
}
export function setFlags(use3of6Normal, use3of6Special, useWordleOfficialWords, useWordleUnofficialWords) {
    flags = [
        use3of6Normal,
        use3of6Special,
        useWordleOfficialWords,
        useWordleUnofficialWords
    ];
}
export function getActiveWords() {
    return __awaiter(this, void 0, void 0, function* () {
        yield loadAllWords();
        const key = flagsToKey(flags);
        // Return cached result if available
        const cached = cache.get(key);
        if (cached)
            return cached;
        const allWords = new Set();
        // Iterate through sources: if the bit at index i is set, add those words
        WORD_SOURCES.forEach((getSource, i) => {
            const isBitSet = (key & (1 << i)) !== 0;
            if (isBitSet) {
                getSource().forEach(w => allWords.add(w));
            }
        });
        const result = Array.from(allWords);
        cache.set(key, result);
        return result;
    });
}
