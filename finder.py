allWords: list[str] = []

with open("data.txt", "r") as f:
    for line in f.readlines():
        allWords.append(line.strip())

wordsByLetter: dict[str, set]       = {chr(i): set() for i in range(65, 91)}
wordsByIndex:  dict[str, list[set]] = {chr(i): [] for i in range(65, 91)}

for word in allWords:
    for i, c in enumerate(word):
        wordsByLetter[c].add(word)

        while len(wordsByIndex[c]) - 1 < i:
            wordsByIndex[c].append(set())

        wordsByIndex[c][i].add(word)

correctLetters  = [('N', 3), ('O', 1), ('I', 2), ('T', 4)]
includedLetters = "NO"
excludedLetters = "CRAEFUDJ"

possibleAnswers = set()

for c in includedLetters:
    possibleAnswers |= wordsByLetter[c]

for c, i in correctLetters:
    possibleAnswers &= wordsByIndex[c][i]

for c in excludedLetters:
    possibleAnswers = possibleAnswers.difference(wordsByLetter[c])

print(list(sorted(
    possibleAnswers,
    key=lambda x: len(set(x)),
    reverse=True
)))
