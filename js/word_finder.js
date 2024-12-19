function getLetters() {
    const inputs = document.querySelectorAll(".input-container-fieldset#correct input");

    inputs.forEach((input, index) => {
        console.log(`Index: ${index}, Text: ${input.value}`);
    });
}

// getLetters();

function handleKeyPress(event) {
    console.log(`Key pressed: ${event.key}, Key Code: ${event.keyCode}`);
}

document.addEventListener("keydown", handleKeyPress);
