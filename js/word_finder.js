const answerButtonInput = document.getElementById("answer-button")

function getLetters() {
    const inputs = document.querySelectorAll(".input-container-fieldset#correct input");

    inputs.forEach((input, index) => {
        console.log(`Index: ${index}, Text: ${input.value}`);
    });
}

answerButtonInput.addEventListener("click", getLetters)
