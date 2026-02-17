export function checkWordLength(
    wordLengthInput: HTMLInputElement | null,
    extraOptions: HTMLElement | null
) {
    if (wordLengthInput && extraOptions) {
        if (Number(wordLengthInput.value) === 5) {
            extraOptions.classList.remove("hidden");
        } else {
            extraOptions.classList.add("hidden");
        }
    }
}
