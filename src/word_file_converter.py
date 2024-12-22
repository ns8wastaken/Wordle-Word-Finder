import pathlib

words = []

with open(pathlib.Path(__file__).parent / "all_words.txt", "r") as f:
    words = [line.strip().upper() for line in f.readlines()]

words.sort(key=lambda x: len(set(x)), reverse=True)

print(f"Word count: {len(words)}")

with open(pathlib.Path(__file__).parent / "ts/all_words.ts", "w") as f:
    f.write("export const allWords: string[] = [")
    f.write(",".join(f"\"{word}\"" for word in words))
    f.write("];")
