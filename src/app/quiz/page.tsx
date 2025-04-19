"use client"
import { useState, useEffect } from "react";
import { quranicWords } from "@/lib/data/quranicwords";

export default function Quiz() {
    const [index, setIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [currentWord, setCurrentWord] = useState(quranicWords[0]);

    // Generate a new random word only when needed
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quranicWords.length);
        setCurrentWord(quranicWords[randomIndex]);
    }, [index]);

    const progress = ((index + 1) / quranicWords.length) * 100;

    const nextWord = () => {
        setShowAnswer(false);
        setIndex((prev) => (prev + 1) % quranicWords.length);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-4">
            <div className="w-full max-w-md">
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Word {index + 1} of {quranicWords.length}</span>
                        <span>{Math.round(progress)}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <div
                    className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 transition-opacity duration-300">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-medium text-gray-600 dark:text-gray-300">What is the meaning of:</h2>
                        <p className="text-5xl font-bold text-green-600 dark:text-green-400 mt-6 mb-4">{currentWord.arabic}</p>
                        <div className="h-0.5 w-16 bg-gray-200 dark:bg-gray-600 mx-auto"></div>
                    </div>

                    {showAnswer ? (
                        <div className="text-center mt-8 space-y-4 animate-fade-in">
                            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                {currentWord.english}
                            </p>
                            <p className="text-xl text-gray-700 dark:text-gray-300 mt-2">
                                {currentWord.bangla}
                            </p>
                            <button
                                onClick={nextWord}
                                className="mt-8 w-full bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Next Word
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowAnswer(true)}
                            className="mt-8 w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Reveal Meaning
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
