import { allWords } from "./all_words.js";

const wordList = document.getElementById("word-list")!;

allWords.forEach((word: string) => {
    const wordElement = document.createElement("span");
    wordElement.className = "word";
    wordElement.textContent = word;
    wordList.appendChild(wordElement);
});
