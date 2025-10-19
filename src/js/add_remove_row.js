"use strict";
// Function to handle a fieldset (Valid or Invalid)
function setupRowControls(fieldsetId) {
    const fieldset = document.getElementById(fieldsetId);
    if (!fieldset)
        return;
    const container = fieldset.querySelector(".letter-row");
    const addButton = fieldset.querySelector("input[type='button'][value='+']");
    const removeButton = fieldset.querySelector("input[type='button'][value='-']");
    if (!container || !addButton || !removeButton)
        return;
    // Add row
    addButton.addEventListener("click", () => {
        // Create 5 new inputs
        for (let i = 0; i < 5; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.className = "letter-input";
            input.maxLength = 1;
            container.appendChild(input);
        }
    });
    // Remove row
    removeButton.addEventListener("click", () => {
        const inputs = container.querySelectorAll(".letter-input");
        if (inputs.length > 5) {
            // Remove last 5 inputs to remove one “row”
            for (let i = 0; i < 5; i++) {
                const lastInput = container.lastElementChild;
                if (lastInput)
                    container.removeChild(lastInput);
            }
        }
    });
}
// Initialize both sections
setupRowControls("valid-fieldset");
setupRowControls("invalid-fieldset");
