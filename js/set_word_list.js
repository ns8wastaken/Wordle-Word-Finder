fetch("data.txt")
    .then(response => response.text())
    .then(data => {
        document.getElementById("word-list").textContent = data;
    })
    .catch(err => console.error("Error loading file:", err));
