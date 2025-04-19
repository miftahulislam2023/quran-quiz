"use client"
import { useState } from "react";
import { quranicWords } from "@/lib/data/quranicwords";

export default function Quiz() {
    const [remainingWords, setRemainingWords] = useState(quranicWords);
    const [wordCount, setWordCount] = useState(0);
    const [index, setIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(remainingWords[0]);
    function nextWord() {
        if (index < remainingWords.length - 1) {
            setIndex(index + 1);
            setCurrentWord(remainingWords[index + 1]);
            setWordCount(wordCount + 1);
        }
        else {
            setIndex(0);
            setCurrentWord(remainingWords[0]);
            setWordCount(0);
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
                <button
                    onClick={nextWord}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
