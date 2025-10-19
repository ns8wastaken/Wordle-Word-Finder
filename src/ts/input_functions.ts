function setupInputNavigation(row: HTMLDivElement) {
    row.addEventListener("keydown", (event) => {
        const input = event.target as HTMLInputElement;
        if (!input.classList.contains("letter-input")) return;

        const inputs = Array.from(row.querySelectorAll<HTMLInputElement>(".letter-input"));
        const colIndex = inputs.indexOf(input);

        switch (event.key) {
            case "Backspace":
                if (input.value === "" && inputs[colIndex - 1]) {
                    event.preventDefault();
                    inputs[colIndex - 1].focus();
                    inputs[colIndex - 1].select();
                }
                break;

            case "ArrowLeft":
                if (inputs[colIndex - 1]) {
                    event.preventDefault();
                    inputs[colIndex - 1].focus();
                    inputs[colIndex - 1].select();
                }
                break;

            case "ArrowRight":
                if (inputs[colIndex + 1]) {
                    event.preventDefault();
                    inputs[colIndex + 1].focus();
                    inputs[colIndex + 1].select();
                }
                break;
        }
    });

    row.addEventListener("input", (event) => {
        const input = event.target as HTMLInputElement;
        if (!input.classList.contains("letter-input")) return;

        const inputs = Array.from(row.querySelectorAll<HTMLInputElement>(".letter-input"));
        const colIndex = inputs.indexOf(input);

        if (input.value.length === input.maxLength && inputs[colIndex + 1]) {
            inputs[colIndex + 1].focus();
            inputs[colIndex + 1].select();
        }
    });

    row.addEventListener("focusin", (event) => {
        const input = event.target as HTMLInputElement;
        if (input.classList.contains("letter-input")) input.select();
    });
}

// Initialize once — works for existing and future inputs
document.querySelectorAll<HTMLDivElement>(".letter-row").forEach(setupInputNavigation);
