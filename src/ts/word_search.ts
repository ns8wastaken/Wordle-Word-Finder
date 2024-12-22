import { allWords } from "./all_words.js";

function getLetters(): [Array<[string, number]>, Array<[string, number]>, Array<string>] {
    const inputsCorrect = document.querySelectorAll<HTMLInputElement>("#correct input[type=\"text\"]");

    let correctLetters: Array<[string, number]> = [];

    inputsCorrect.forEach((input: HTMLInputElement, index: number) => {
        input.value = input.value.toUpperCase();
        if (input.value !== "") {
            correctLetters.push([input.value, index]);
        }
    });


    const inputsValid = document.querySelectorAll<HTMLInputElement>("#valid input[type=\"text\"]");

    let validLetters: Array<[string, number]> = [];

    inputsValid.forEach((input: HTMLInputElement, index: number) => {
        input.value = input.value.toUpperCase();
        if (input.value !== "") {
            validLetters.push([input.value, index]);
        }
    });


    const inputsInvalid = document.querySelectorAll<HTMLInputElement>("#invalid input[type=\"text\"]");

    let invalidLetters: Array<string> = [];

    inputsInvalid.forEach((input: HTMLInputElement) => {
        input.value = input.value.toUpperCase();
        if (input.value !== "") {
            invalidLetters.push(input.value);
        }
    });

    return [correctLetters, validLetters, invalidLetters];
}

function getAnswers() {
    const [correctLetters, validLetters, invalidLetters] = getLetters();

    let answers: Array<string> = [];

    // Filter words
    for (const word of allWords) {
        let good = true;

        for (const char of invalidLetters) {
            if (word.includes(char)) {
                good = false;
                break;
            }
        }

        if (!good) {
            continue;
        }

        for (const [char, index] of correctLetters) {
            if (word[index] !== char) {
                good = false;
                break;
            }
        }

        if (!good) {
            continue;
        }

        for (const [char, index] of validLetters) {
            if (!word.includes(char)) {
                good = false;
                break;
            }

            if (word[index % 5] === char) {
                good = false;
                break;
            }
        }

        if (!good) {
            continue;
        }

        answers.push(word);
    }

    // Set the word list
    const wordList = document.getElementById("word-list")!;

    wordList.innerHTML = "";
    answers.forEach(word => {
        const wordElement = document.createElement("span");
        wordElement.className = "word";
        wordElement.textContent = word;
        wordList.appendChild(wordElement);
    });
}

const answerButtonInput = document.getElementById("answer-button")

if (answerButtonInput) {
    answerButtonInput.addEventListener("click", getAnswers)
}

document.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        getAnswers();
    }
})
