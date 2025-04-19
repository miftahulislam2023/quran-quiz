"use client"
import { useState, useEffect } from "react";
import { quranicWords } from "@/lib/data/quranicwords";
import { Button } from "@/components/ui/button";

export default function Quiz() {
    const [remainingWords, setRemainingWords] = useState([...quranicWords]);
    const [wordCount, setWordCount] = useState(0);
    const [currentWord, setCurrentWord] = useState(null);

    // Initialize with a random word on first load
    useEffect(() => {
        if (remainingWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * remainingWords.length);
            setCurrentWord(remainingWords[randomIndex]);
        }
    }, []);

    function nextWord() {
        if (remainingWords.length > 1) {
            // Create a new array without the current word
            const newRemainingWords = remainingWords.filter(word => word !== currentWord);

            // Get a random word from the remaining words
            const randomIndex = Math.floor(Math.random() * newRemainingWords.length);
            const nextWord = newRemainingWords[randomIndex];

            // Update all states
            setRemainingWords(newRemainingWords);
            setCurrentWord(nextWord);
            setWordCount(prev => prev + 1);
        } else if (remainingWords.length === 1) {
            // Last word was shown, prepare for restart
            setRemainingWords([]);
            setCurrentWord(null);
            setWordCount(prev => prev + 1);
        } else {
            // Reset the quiz
            const freshWords = [...quranicWords];
            const randomIndex = Math.floor(Math.random() * freshWords.length);

            setRemainingWords(freshWords);
            setCurrentWord(freshWords[randomIndex]);
            setWordCount(0);
        }
    }

    const isComplete = wordCount >= quranicWords.length;
    const remainingCount = quranicWords.length - wordCount;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Quranic Words Quiz</h1>
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded shadow-md">
                {currentWord ? (
                    <>
                        <h2 className="text-lg font-semibold mb-2">Word Count: {wordCount + 1}</h2>
                        <h2 className="text-xl font-semibold mb-2">{currentWord.arabic}</h2>
                        <p className="text-gray-700 mb-4">{currentWord.bangla}</p>
                        <p className="text-gray-700 mb-4">{currentWord.english}</p>
                    </>
                ) : isComplete ? (
                    <p className="text-green-600 mb-4">You've completed the quiz!</p>
                ) : (
                    <p className="text-gray-600 mb-4">Loading...</p>
                )}

                <Button
                    onClick={nextWord}
                    variant="default"
                >
                    {isComplete ? "Restart Quiz" : "Next"}
                </Button>

                {!isComplete && (
                    <p className="text-gray-700 mt-4">
                        Remaining Words: {remainingCount - 1}
                    </p>
                )}
            </div>
        </div>
    );
}
