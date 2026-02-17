#!/bin/bash

python tools/3of6game_parser.py \
    data/3of6game.txt \
    src/assets/wordlists/12dicts/
echo

python tools/word_list_parser.py \
    data/all_words_official.txt \
    src/assets/wordlists/wordle/all_words_official.txt
echo

python tools/word_list_parser.py \
    data/all_words_unofficial.txt \
    src/assets/wordlists/wordle/all_words_unofficial.txt
