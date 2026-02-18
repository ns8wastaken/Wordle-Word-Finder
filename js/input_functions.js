export function setupInputNavigation(container) {
    const getInputsInRow = (row) => Array.from(row.querySelectorAll("input[type='text']"));
    function focusInput(inputs, index) {
        const target = inputs[index];
        if (target) {
            target.focus();
            target.select();
        }
    }
    container.addEventListener("focusin", (event) => {
        const input = event.target;
        input.select();
    });
    container.addEventListener("mousedown", (event) => {
        const input = event.target;
        event.preventDefault();
        input.select();
    });
    container.addEventListener("keydown", (event) => {
        const input = event.target;
        const currentRow = input.closest(".letter-row");
        if (!currentRow)
            return;
        const inputs = getInputsInRow(currentRow);
        const colIndex = inputs.indexOf(input);
        switch (event.key) {
            case "Backspace": {
                if (input.value === "" && colIndex === 0) {
                    const prevRow = currentRow.previousElementSibling;
                    if (prevRow === null || prevRow === void 0 ? void 0 : prevRow.classList.contains("letter-row")) {
                        const prevInputs = getInputsInRow(prevRow);
                        focusInput(prevInputs, prevInputs.length - 1);
                    }
                }
                else if (input.value === "" && colIndex > 0) {
                    focusInput(inputs, colIndex - 1);
                }
                break;
            }
            case "ArrowUp": {
                event.preventDefault();
                const prevRow = currentRow.previousElementSibling;
                if (prevRow === null || prevRow === void 0 ? void 0 : prevRow.classList.contains("letter-row")) {
                    focusInput(getInputsInRow(prevRow), colIndex);
                }
                break;
            }
            case "ArrowDown": {
                event.preventDefault();
                const nextRow = currentRow.nextElementSibling;
                if (nextRow === null || nextRow === void 0 ? void 0 : nextRow.classList.contains("letter-row")) {
                    focusInput(getInputsInRow(nextRow), colIndex);
                }
                break;
            }
            case "ArrowLeft": {
                event.preventDefault();
                if (colIndex > 0) {
                    focusInput(inputs, colIndex - 1);
                }
                else {
                    const prevRow = currentRow.previousElementSibling;
                    if (prevRow === null || prevRow === void 0 ? void 0 : prevRow.classList.contains("letter-row")) {
                        const prevInputs = getInputsInRow(prevRow);
                        focusInput(prevInputs, prevInputs.length - 1);
                    }
                }
                break;
            }
            case "ArrowRight": {
                event.preventDefault();
                if (colIndex < inputs.length - 1) {
                    focusInput(inputs, colIndex + 1);
                }
                else {
                    const nextRow = currentRow.nextElementSibling;
                    if (nextRow === null || nextRow === void 0 ? void 0 : nextRow.classList.contains("letter-row")) {
                        focusInput(getInputsInRow(nextRow), 0);
                    }
                }
                break;
            }
        }
    });
    container.addEventListener("input", (event) => {
        const input = event.target;
        const currentRow = input.closest(".letter-row");
        if (!currentRow)
            return;
        const inputs = getInputsInRow(currentRow);
        const colIndex = inputs.indexOf(input);
        if (input.value.length >= input.maxLength) {
            if (colIndex < inputs.length - 1) {
                // Next box in same row
                focusInput(inputs, colIndex + 1);
            }
            else {
                // Jump to the first box of the next row
                const nextRow = currentRow.nextElementSibling;
                if (nextRow === null || nextRow === void 0 ? void 0 : nextRow.classList.contains("letter-row")) {
                    focusInput(getInputsInRow(nextRow), 0);
                }
            }
        }
    });
}
