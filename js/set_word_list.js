fetch("data.txt")
    .then(response => response.text())
    .then(data => {
        wordList = document.getElementById("word-list");

        data.split("\n").forEach(word => {
            const wordElement = document.createElement("span");
            wordElement.className = "word";
            wordElement.textContent = word;
            wordList.appendChild(wordElement);
        });
    })
    .catch(err => console.error("Error loading file:", err));
