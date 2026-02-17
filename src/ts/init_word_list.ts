import { getActiveWords } from "./active_words.js";

export async function renderWords(words: string[]) {
    const wordList = document.getElementById("word-list")!;
    wordList.innerHTML = words.map(w => `<span class="word">${w}</span>`).join("");
}

export async function initWordList() {
    renderWords(await getActiveWords());
}
