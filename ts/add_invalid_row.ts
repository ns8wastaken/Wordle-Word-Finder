const invalidFieldset = document.getElementById("invalid") as HTMLFieldSetElement;

invalidFieldset?.addEventListener("click", (event) => {
    if (event.target && (event.target as HTMLElement).id === "add-invalid-row") {
        const buttonAdd = event.target as HTMLInputElement;
        const buttonRemove = document.querySelector<HTMLInputElement>("#remove-invalid-row")!;
        buttonAdd.remove();
        buttonRemove.remove();

        for (let i = 0; i < 5; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.className = "letter-input";
            input.maxLength = 1;
            invalidFieldset.appendChild(input);
        }

        invalidFieldset.appendChild(buttonAdd);
        invalidFieldset.appendChild(buttonRemove);
    }

    else if (event.target && (event.target as HTMLElement).id === "remove-invalid-row") {
        for (let i = 0; i < 5; i++) {
            invalidFieldset.removeChild(invalidFieldset.children[invalidFieldset.childElementCount - 3]);
        }
    }
});