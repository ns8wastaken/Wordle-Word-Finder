import { getWordleOfficialWords, getWordleUnofficialWords } from "./word_loader";
function setWordList() {
    const wordList = document.getElementById("word-list");
    wordList.innerHTML = "";
    for (const word of (document.getElementById("use-valid-words").checked
        ? getWordleOfficialWords()
        : getWordleUnofficialWords())) {
        const wordElement = document.createElement("span");
        wordElement.className = "word";
        wordElement.textContent = word;
        wordList.appendChild(wordElement);
    }
    ;
}
setWordList();
document.getElementById("use-valid-words").addEventListener("click", setWordList);
