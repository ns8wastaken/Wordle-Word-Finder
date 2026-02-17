import sys
from pathlib import Path

SPECIAL_ENDINGS = {"$", "^", "&"}

def normalize(word: str) -> str | None:
    word = word.strip()

    if len(word) == 0:
        return None

    return word.lower()

def load_words(raw_txt: Path) -> tuple[list[str], list[str]]:
    words = set()
    special_words = set()

    with raw_txt.open("r", encoding="utf-8", errors="ignore") as f:
        for word in f.readlines():
            word = normalize(word)

            if word == None:
                continue

            # detect words ending with $, ^, or &
            # $ = extra word (not present in at least 3 dicts)
            # ^ = close / similar spelling (no hyphen, etc.)
            # & = British variant (in addition to American spelling)
            if word[-1] in SPECIAL_ENDINGS:
                special_words.add(word[:-1])
            else:
                words.add(word)

    return (list(words), list(special_words))

def write_list(path: Path, words: list[str]):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        f.write("\n".join(words))

def main():
    if len(sys.argv) != 3:
        print("usage: python 3of6game_parser.py <input> <output_dir>")
        sys.exit(1)

    source = Path(sys.argv[1])
    outdir = Path(sys.argv[2])

    print(f"Loading words from {source}")
    words, special_words = load_words(source)
    print(f"{len(words)} normal words")
    print(f"{len(special_words)} special words")

    normal_words_path = outdir / "normal_words.txt"
    write_list(normal_words_path, sorted(words))
    print("Created main word list at", normal_words_path)

    special_words_path = outdir / "special_words.txt"
    write_list(special_words_path, sorted(special_words))
    print("Created special word list at", special_words_path)

if __name__ == "__main__":
    main()
