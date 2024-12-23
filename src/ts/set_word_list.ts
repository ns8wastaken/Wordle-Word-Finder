import { allWords } from "./all_words.js";
import { allAnswers } from "./all_answers.js";

function setWordList() {
    const wordList = document.getElementById("word-list")!;

    wordList.innerHTML = "";

    for (const word of ((document.getElementById("use-valid-words")! as HTMLInputElement).checked ? allAnswers : allWords)) {
        const wordElement = document.createElement("span");
        wordElement.className = "word";
        wordElement.textContent = word;
        wordList.appendChild(wordElement);
    };
}

setWordList();

document.getElementById("use-valid-words")!.addEventListener("click", event => {
    setWordList();
});
