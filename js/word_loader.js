var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const wordLists = {
    d3of6Normal: null,
    d3of6Special: null,
    wordleOfficial: null,
    wordleUnofficial: null
};
const isGitHubPages = window.location.hostname.includes("github.io");
const repoName = window.location.pathname.split("/")[1];
const basePath = isGitHubPages ? `/${repoName}/` : "/";
const paths = {
    d3of6Normal: `${basePath}assets/wordlists/12dicts/normal_words.txt`,
    d3of6Special: `${basePath}assets/wordlists/12dicts/special_words.txt`,
    wordleOfficial: `${basePath}assets/wordlists/wordle/all_words_official.txt`,
    wordleUnofficial: `${basePath}assets/wordlists/wordle/all_words_unofficial.txt`
};
function loadWords(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load word list: ${path}`);
        }
        const text = yield response.text();
        return text.split("\n");
    });
}
export function loadAllWords() {
    return __awaiter(this, void 0, void 0, function* () {
        // Skip if everything is already loaded
        if (Object.values(wordLists).every(l => l !== null))
            return;
        yield Promise.all(Object.entries(paths).map((_a) => __awaiter(this, [_a], void 0, function* ([key, path]) {
            wordLists[key] = yield loadWords(path);
        })));
    });
}
export function get3of6NormalWords() { return wordLists.d3of6Normal; }
export function get3of6SpecialWords() { return wordLists.d3of6Special; }
export function getWordleOfficialWords() { return wordLists.wordleOfficial; }
export function getWordleUnofficialWords() { return wordLists.wordleUnofficial; }
