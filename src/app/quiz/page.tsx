"use client"
import { useState } from "react";
import { quranicWords } from "@/lib/data/quranicwords";
import { Button } from "@/components/ui/button";

export default function Quiz() {
    const [remainingWords, setRemainingWords] = useState(quranicWords);
    const [wordCount, setWordCount] = useState(0);
    const [index, setIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(remainingWords[index]);
    function nextWord() {
        if (wordCount < quranicWords.length - 1) {
            // Remove the current word from the remaining words
            setRemainingWords((prev) => {
                const newWords = [...prev];
                newWords.splice(index, 1);
                return newWords;
            }
            );
            console.log("Remaining words: ", remainingWords);
            setIndex((
                Math.floor(Math.random() * (remainingWords.length - 1))
            ));
            console.log("Index: ", index);
            setCurrentWord(remainingWords[index]);
            console.log("Current word: ", currentWord.arabic);
            setWordCount((prev) => prev + 1);
            console.log("Word count: ", wordCount);
        }
        else {
            setIndex(0);
            setCurrentWord(remainingWords[0]);
            setWordCount(0);
            setRemainingWords(quranicWords);
        }
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Quranic Words Quiz</h1>
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-semibold mb-2">Word Count: {wordCount + 1}</h2>
                <h2 className="text-xl font-semibold mb-2">{currentWord.arabic}</h2>
                <p className="text-gray-700 mb-4">{currentWord.bangla}</p>
                <p className="text-gray-700 mb-4">{currentWord.english}</p>
                <Button
                    onClick={nextWord}
                    variant="default"
                >
                    Next
                </Button>
                {
                    remainingWords.length > 0 ? (
                        <p className="text-gray-700 mt-4">Remaining Words: {quranicWords.length - wordCount - 1}</p>
                    ) : (
                        <p className="text-red-500 mt-4">No more words left!</p>
                    )
                }
            </div>
        </div>
    );
}
