var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getActiveWords } from "./active_words.js";
export function renderWords(words) {
    return __awaiter(this, void 0, void 0, function* () {
        const wordList = document.getElementById("word-list");
        wordList.innerHTML = words.map(w => `<span class="word">${w}</span>`).join("");
    });
}
export function initWordList() {
    return __awaiter(this, void 0, void 0, function* () {
        renderWords(yield getActiveWords());
    });
}
