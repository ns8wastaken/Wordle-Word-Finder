const inputs = document.querySelectorAll<HTMLInputElement>(".input-container-fieldset input[type=\"text\"]");

// Ddd event listeners to all inputs inside "input-container-fieldset"
inputs.forEach((input: HTMLInputElement, index: number) => {
    // Increment focused input index (letter entered)
    input.addEventListener("input", () => {
        // Check if the current input has a value
        if (input.value.length === input.maxLength) {
            if (inputs[index + 1]) {
                inputs[index + 1].focus();
                inputs[index + 1].select();
            }
        }
    });

    // Movement keys (backspace, up, down, left, right)
    input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && input.value === "") {
            event.preventDefault();
            if (inputs[index - 1]) {
                inputs[index - 1].focus();
                inputs[index - 1].select();
            }
        }

        else if (event.key === "ArrowLeft") {
            event.preventDefault();
            if (inputs[index - 1]) {
                inputs[index - 1].focus();
                inputs[index - 1].select();
            }
        }

        else if (event.key === "ArrowRight") {
            event.preventDefault();
            if (inputs[index + 1]) {
                inputs[index + 1].focus();
                inputs[index + 1].select();
            }
        }

        else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (inputs[index - 5]) {
                inputs[index - 5].focus();
                inputs[index - 5].select();
            }
        }

        else if (event.key === "ArrowDown") {
            event.preventDefault();
            if (inputs[index + 5]) {
                inputs[index + 5].focus();
                inputs[index + 5].select();
            }
        }
    });

    // Selects text in input on focus
    input.addEventListener("focus", () => {
        input.select();
    });
});
