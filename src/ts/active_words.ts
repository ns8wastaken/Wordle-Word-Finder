import {
    loadAllWords,
    get3of6NormalWords,
    get3of6SpecialWords,
    getWordleOfficialWords,
    getWordleUnofficialWords
} from "./word_loader.js";

type Flags = [
    use3of6Normal: boolean,
    use3of6Special: boolean,
    useWordleOfficialWords: boolean,
    useWordleUnofficialWords: boolean
];

let flags: Flags = [true, false, false, false];

// Mapping bits to their respective loader functions
const WORD_SOURCES = [
    get3of6NormalWords,
    get3of6SpecialWords,
    getWordleOfficialWords,
    getWordleUnofficialWords
];

const cache = new Map<number, string[]>();

function flagsToKey(flags: Flags): number {
    return flags.reduce((acc, bit, i) => {
        return bit ? (acc | (1 << i)) : acc;
    }, 0);
}

export function setFlags(
    use3of6Normal: boolean,
    use3of6Special: boolean,
    useWordleOfficialWords: boolean,
    useWordleUnofficialWords: boolean
) {
    flags = [
        use3of6Normal,
        use3of6Special,
        useWordleOfficialWords,
        useWordleUnofficialWords
    ];
}

export async function getActiveWords(): Promise<string[]> {
    await loadAllWords();

    const key = flagsToKey(flags);

    // Return cached result if available
    const cached = cache.get(key);
    if (cached) return cached;

    const allWords = new Set<string>();

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
}
