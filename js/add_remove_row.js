function createLetterInput() {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    return input;
}
function addRow(container) {
    const rowSize = container.firstElementChild.children.length;
    const div = document.createElement("div");
    div.className = "letter-row";
    for (let i = 0; i < rowSize; i++) {
        div.appendChild(createLetterInput());
    }
    container.appendChild(div);
}
function removeRow(container) {
    var _a;
    if (container.children.length <= 1)
        return;
    (_a = container.lastChild) === null || _a === void 0 ? void 0 : _a.remove();
}
export function setupRowControls(fieldsetId) {
    const fieldset = document.getElementById(fieldsetId);
    if (!fieldset)
        return;
    const container = fieldset.querySelector(".container");
    if (!container)
        return;
    const addButton = fieldset.querySelector(".add");
    const removeButton = fieldset.querySelector(".remove");
    if (!addButton || !removeButton) {
        console.warn(`Buttons missing in fieldset: ${fieldsetId}`);
        return;
    }
    addButton.addEventListener("click", () => addRow(container));
    removeButton.addEventListener("click", () => removeRow(container));
}
