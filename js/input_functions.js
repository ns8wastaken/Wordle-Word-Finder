const inputs = document.querySelectorAll(".input-container-fieldset input");

// Ddd event listeners to all inputs inside "input-container-fieldset"
inputs.forEach((input, index) => {
    // Increment focused input index (letter entered)
    input.addEventListener("input", () => {
        // Check if the current input has a value
        if (input.value.length === input.maxLength) {
            if (inputs[index + 1]) {
                inputs[index + 1].focus();
            }
        }
    });

    // Movement keys (backspace, up, down, left, right)
    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "") {
            e.preventDefault();
            if (inputs[index - 1]) {
                inputs[index - 1].focus();
                inputs[index - 1].select();
            }
        }

        else if (e.key === "ArrowLeft") {
            e.preventDefault();
            if (inputs[index - 1]) {
                inputs[index - 1].focus();
                inputs[index - 1].select();
            }
        }

        else if (e.key === "ArrowRight") {
            e.preventDefault();
            if (inputs[index + 1]) {
                inputs[index + 1].focus();
                inputs[index + 1].select();
            }
        }

        else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (inputs[index - 5]) {
                inputs[index - 5].focus();
                inputs[index - 5].select();
            }
        }

        else if (e.key === "ArrowDown") {
            e.preventDefault();
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
