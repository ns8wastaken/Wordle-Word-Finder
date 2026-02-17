function createLetterInput(): HTMLInputElement {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    return input;
}

function addRow(container: Element) {
    const rowSize = container.firstElementChild!.children.length;

    const div = document.createElement("div");
    div.className = "letter-row";

    for (let i = 0; i < rowSize; i++) {
        div.appendChild(createLetterInput());
    }

    container.appendChild(div);
}

function removeRow(container: Element) {
    if (container.children.length <= 1)
        return;
    container.lastChild?.remove();
}

export function setupRowControls(fieldsetId: string) {
    const fieldset = document.getElementById(fieldsetId);
    if (!fieldset) return;

    const container = fieldset.querySelector(".container");
    if (!container) return;

    const addButton = fieldset.querySelector<HTMLButtonElement>(".add");
    const removeButton = fieldset.querySelector<HTMLButtonElement>(".remove");

    if (!addButton || !removeButton) {
        console.warn(`Buttons missing in fieldset: ${fieldsetId}`);
        return;
    }

    addButton.addEventListener("click", () => addRow(container));
    removeButton.addEventListener("click", () => removeRow(container));
}
