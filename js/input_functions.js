const inputs = document.querySelectorAll(".input-container-fieldset input");

// Ddd an event listener to all inputs inside "input-container-fieldset"
inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        // Check if the current input has a value
        if (input.value.length === input.maxLength) {
            if (inputs[index + 1]) {
                inputs[index + 1].focus();
            }
        }
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "") {
            e.preventDefault();
            if (inputs[index - 1]) {
                inputs[index - 1].focus();
                inputs[index - 1].select();
            }
        }
    });
});
