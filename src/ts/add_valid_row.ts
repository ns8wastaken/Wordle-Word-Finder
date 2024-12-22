const validContainer = document.getElementById("valid-container");

validContainer?.addEventListener("click", (event) => {
    if (event.target && (event.target as HTMLElement).id === "add-valid-row") {
        const buttonAdd = event.target as HTMLInputElement;
        const buttonRemove = document.querySelector<HTMLInputElement>("#remove-valid-row")!;
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

    else if (event.target && (event.target as HTMLElement).id === "remove-valid-row") {
        const buttonRemove = event.target as HTMLInputElement;
        const buttonAdd = document.querySelector<HTMLInputElement>("#add-valid-row")!;

        validContainer.removeChild(buttonRemove.parentElement!);

        validContainer.children[validContainer.childElementCount - 1].appendChild(buttonAdd);
        validContainer.children[validContainer.childElementCount - 1].appendChild(buttonRemove);
    }
});