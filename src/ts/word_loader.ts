type WordLists = {
    d3of6Normal: string[] | null;
    d3of6Special: string[] | null;
    wordleOfficial: string[] | null;
    wordleUnofficial: string[] | null;
};

const wordLists: WordLists = {
    d3of6Normal: null,
    d3of6Special: null,
    wordleOfficial: null,
    wordleUnofficial: null
};

const paths: Record<keyof WordLists, string> = {
    d3of6Normal:      "/assets/wordlists/12dicts/normal_words.txt",
    d3of6Special:     "/assets/wordlists/12dicts/special_words.txt",
    wordleOfficial:   "/assets/wordlists/wordle/all_words_official.txt",
    wordleUnofficial: "/assets/wordlists/wordle/all_words_unofficial.txt"
};

async function loadWords(path: string): Promise<string[]> {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to load word list: ${path}`);
    }

    const text = await response.text();
    return text.split("\n");
}

export async function loadAllWords() {
    // Skip if everything is already loaded
    if (Object.values(wordLists).every(l => l !== null))
        return;

    await Promise.all(
        Object.entries(paths).map(async ([key, path]) => {
            wordLists[key as keyof WordLists] = await loadWords(path);
        })
    );
}

export function get3of6NormalWords() { return wordLists.d3of6Normal!; }
export function get3of6SpecialWords() { return wordLists.d3of6Special!; }
export function getWordleOfficialWords() { return wordLists.wordleOfficial!; }
export function getWordleUnofficialWords() { return wordLists.wordleUnofficial!; }
