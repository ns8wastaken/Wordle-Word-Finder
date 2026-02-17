export function setupInputNavigation(container: HTMLElement) {
    const getInputsInRow = (row: HTMLElement) =>
        Array.from(row.querySelectorAll<HTMLInputElement>("input[type='text']"));

    function focusInput(inputs: HTMLInputElement[], index: number) {
        inputs[index]?.focus();
        inputs[index]?.select();
    }

    container.addEventListener("keydown", (event: KeyboardEvent) => {
        const input = event.target as HTMLInputElement;
        const currentRow = input.closest(".letter-row") as HTMLElement;
        if (!currentRow) return;

        const inputs = getInputsInRow(currentRow);
        const colIndex = inputs.indexOf(input);

        switch (event.key) {
            case "Backspace": {
                if (input.value === "" && colIndex === 0) {
                    // Jump to the end of the PREVIOUS row
                    const prevRow = currentRow.previousElementSibling as HTMLElement;
                    if (prevRow?.classList.contains("letter-row")) {
                        const prevInputs = getInputsInRow(prevRow);
                        focusInput(prevInputs, prevInputs.length - 1);
                    }
                } else if (input.value === "" && colIndex > 0) {
                    focusInput(inputs, colIndex - 1);
                }
                break;
            }

            case "ArrowUp": {
                event.preventDefault();
                const prevRow = currentRow.previousElementSibling as HTMLElement;
                if (prevRow?.classList.contains("letter-row")) {
                    focusInput(getInputsInRow(prevRow), colIndex);
                }
                break;
            }

            case "ArrowDown": {
                event.preventDefault();
                const nextRow = currentRow.nextElementSibling as HTMLElement;
                if (nextRow?.classList.contains("letter-row")) {
                    focusInput(getInputsInRow(nextRow), colIndex);
                }
                break;
            }

            case "ArrowLeft": {
                if (colIndex > 0) {
                    focusInput(inputs, colIndex - 1);
                } else {
                    const prevRow = currentRow.previousElementSibling as HTMLElement;
                    if (prevRow?.classList.contains("letter-row")) {
                        const prevInputs = getInputsInRow(prevRow);
                        focusInput(prevInputs, prevInputs.length - 1);
                    }
                }
                break;
            }

            case "ArrowRight": {
                if (colIndex < inputs.length - 1) {
                    focusInput(inputs, colIndex + 1);
                } else {
                    const nextRow = currentRow.nextElementSibling as HTMLElement;
                    if (nextRow?.classList.contains("letter-row")) {
                        focusInput(getInputsInRow(nextRow), 0);
                    }
                }
                break;
            }
        }
    });

    container.addEventListener("input", (event: Event) => {
        const input = event.target as HTMLInputElement;
        const currentRow = input.closest(".letter-row") as HTMLElement;
        if (!currentRow) return;

        const inputs = getInputsInRow(currentRow);
        const colIndex = inputs.indexOf(input);

        if (input.value.length >= input.maxLength) {
            if (colIndex < inputs.length - 1) {
                // Next box in same row
                focusInput(inputs, colIndex + 1);
            } else {
                // Jump to the first box of the NEXT row
                const nextRow = currentRow.nextElementSibling as HTMLElement;
                if (nextRow?.classList.contains("letter-row")) {
                    focusInput(getInputsInRow(nextRow), 0);
                }
            }
        }
    });
}
