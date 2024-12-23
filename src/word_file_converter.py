import pathlib

allWords = []
allAnswers = []

with open(pathlib.Path(__file__).parent / "all_words.txt", "r") as f:
    allWords = [line.strip().upper() for line in f.readlines()]

with open(pathlib.Path(__file__).parent / "all_answers.txt", "r") as f:
    allAnswers = [line.strip().upper() for line in f.readlines()]

allWords.sort(key=lambda x: len(set(x)), reverse=True)
allAnswers.sort(key=lambda x: len(set(x)), reverse=True)

print(f"Word count: {len(allWords)}")
print(f"Answer count: {len(allAnswers)}")

with open(pathlib.Path(__file__).parent / "ts/all_words.ts", "w") as f:
    f.write("export const allWords: string[] = [")
    f.write(",".join(f"\"{word}\"" for word in allWords))
    f.write("];")

with open(pathlib.Path(__file__).parent / "ts/all_answers.ts", "w") as f:
    f.write("export const allAnswers: string[] = [")
    f.write(",".join(f"\"{word}\"" for word in allAnswers))
    f.write("];")
