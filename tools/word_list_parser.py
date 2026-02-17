import sys
from pathlib import Path

def normalize(word: str) -> str | None:
    word = word.strip()

    if len(word) == 0:
        return None

    return word.lower()

def load_words(raw_txt: Path) -> list[str]:
    words = set()

    with raw_txt.open("r", encoding="utf-8", errors="ignore") as f:
        for word in f.readlines():
            word = normalize(word)

            if word == None:
                continue

            words.add(word)

    return list(words)

def write_list(path: Path, words: list[str]):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        f.write("\n".join(words))

def main():
    if len(sys.argv) != 3:
        print("usage: python word_list_parser.py <input> <output>")
        sys.exit(1)

    source = Path(sys.argv[1])
    outdir = Path(sys.argv[2])

    print(f"Loading words from {source}")

    words = load_words(source)
    print(f"{len(words)} words")

    write_list(outdir, sorted(words))

if __name__ == "__main__":
    main()
