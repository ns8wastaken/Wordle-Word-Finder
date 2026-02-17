import { loadAllWords, getWordleOfficialWords, getWordleUnofficialWords } from "./word_loader.js";

function renderWordList() {
    const wordList = document.getElementById("word-list")!;
    const useValidWords = (document.getElementById("use-valid-words") as HTMLInputElement).checked;
    const words = useValidWords ? getWordleOfficialWords() : getWordleUnofficialWords();

    wordList.innerHTML = words.map(w => `<span class="word">${w}</span>`).join("");
}

async function initWordList() {
    await loadAllWords(); // wait for words to load

    renderWordList();

    (document.getElementById("use-valid-words")! as HTMLInputElement)
        .addEventListener("click", renderWordList);
}

initWordList();

document.getElementById("use-valid-words")!
    .addEventListener("click", renderWordList);
