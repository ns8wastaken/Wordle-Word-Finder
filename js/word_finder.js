function getLetters() {
    const inputsCorrect = document.querySelectorAll("#correct input");

    let correctLetters = [];

    inputsCorrect.forEach((input, index) => {
        input.value = input.value.toUpperCase();
        if (input.value !== "") {
            correctLetters.push([input.value, index]);
        }
    });


    const inputsValid = document.querySelectorAll("#valid input");

    let validLetters = [];

    inputsValid.forEach(input => {
        input.value = input.value.toUpperCase();
        if (input.value !== "") {
            validLetters.push(input.value);
        }
    });


    const inputsInvalid = document.querySelectorAll("#invalid input");

    let invalidLetters = [];

    inputsInvalid.forEach(input => {
        input.value = input.value.toUpperCase();
        if (input.value !== "") {
            invalidLetters.push(input.value);
        }
    });

    return [correctLetters, validLetters, invalidLetters];
}

async function getWordSets() {
    try {
        const response = await fetch("../data.txt"); // Adjust path as needed
        const data = await response.text();
        const allWords = data.split("\n").map(word => word.trim());

        const wordsByLetter = {};
        const wordsByIndex = {};

        // Populate dictionaries
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            wordsByLetter[letter] = new Set();
            wordsByIndex[letter] = [];
        }

        allWords.forEach(word => {
            [...word].forEach((char, index) => {
                // Add word to wordsByLetter
                wordsByLetter[char].add(word);

                // Ensure wordsByIndex has enough sub-arrays for this index
                while (wordsByIndex[char].length <= index) {
                    wordsByIndex[char].push(new Set());
                }

                wordsByIndex[char][index].add(word);
            });
        });

        return [wordsByLetter, wordsByIndex];
    }
    catch (err) {
        console.error("Error loading file:", err);
        return [Map(), Map()];
    }
}

async function getAnswers() {
    const [correctLetters, validLetters, invalidLetters] = getLetters();
    const [wordsByLetter, wordsByIndex] = await getWordSets();

    possibleAnswers = new Set();

    validLetters.forEach(c => {
        possibleAnswers = possibleAnswers.union(wordsByLetter[c]);
    })

    correctLetters.forEach(data => {
        possibleAnswers = possibleAnswers.union(wordsByLetter[data[0]]);
    })

    correctLetters.forEach(data => {
        possibleAnswers = possibleAnswers.intersection(wordsByIndex[data[0]][data[1]]);
    })

    invalidLetters.forEach(c => {
        possibleAnswers = possibleAnswers.difference(wordsByLetter[c]);
    })

    const sortedAnswers = Array.from(possibleAnswers).sort((a, b) => {
        return new Set(b).size - new Set(a).size;
    });

    const wordList = document.getElementById("word-list");
    wordList.innerHTML = "";

    // Add the new words
    sortedAnswers.forEach(word => {
        const wordElement = document.createElement("span");
        wordElement.className = "word";
        wordElement.textContent = word;
        wordList.appendChild(wordElement);
    });
}


const answerButtonInput = document.getElementById("answer-button")

answerButtonInput.addEventListener("click", getAnswers)
