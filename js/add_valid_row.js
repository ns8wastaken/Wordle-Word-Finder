"use strict";
const validContainer = document.getElementById("valid-container");
validContainer === null || validContainer === void 0 ? void 0 : validContainer.addEventListener("click", (event) => {
    if (event.target && event.target.id === "add-valid-row") {
        const buttonAdd = event.target;
        const buttonRemove = document.querySelector("#remove-valid-row");
        buttonAdd.remove();
        buttonRemove.remove();
        const fieldset = document.createElement("fieldset");
        fieldset.className = "input-container-fieldset";
        fieldset.id = "valid";
        validContainer.appendChild(fieldset);
        for (let i = 0; i < 5; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.className = "letter-input";
            input.maxLength = 1;
            fieldset.appendChild(input);
        }
        fieldset.appendChild(buttonAdd);
        fieldset.appendChild(buttonRemove);
    }
    else if (event.target && event.target.id === "remove-valid-row") {
        const buttonRemove = event.target;
        const buttonAdd = document.querySelector("#add-valid-row");
        validContainer.removeChild(buttonRemove.parentElement);
        validContainer.children[validContainer.childElementCount - 1].appendChild(buttonAdd);
        validContainer.children[validContainer.childElementCount - 1].appendChild(buttonRemove);
    }
});
