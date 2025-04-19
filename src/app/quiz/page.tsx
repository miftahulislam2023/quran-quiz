"use client"
import { useState, useEffect } from "react";
import { quranicWords } from "@/lib/data/quranicwords";
import { Button } from "@/components/ui/button";

// Define the type for a Quranic word
interface QuranicWord {
    arabic: string;
    english: string;
    bangla: string;
}

export default function Quiz() {
    const [remainingWords, setRemainingWords] = useState<QuranicWord[]>([...quranicWords]);
    const [wordCount, setWordCount] = useState(0);
    const [currentWord, setCurrentWord] = useState<QuranicWord | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showMeaning, setShowMeaning] = useState(false);

    // Initialize with a random word on first load
    useEffect(() => {
        if (remainingWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * remainingWords.length);
            setCurrentWord(remainingWords[randomIndex]);
        }
    }, []);

    function nextWord() {
        // Reset card flip state
        setIsFlipped(false);
        setShowMeaning(false);

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

    function toggleMeaning() {
        setIsFlipped(!isFlipped);
        setShowMeaning(!showMeaning);
    }

    const isComplete = wordCount >= quranicWords.length;
    const remainingCount = quranicWords.length - wordCount;
    const progress = (wordCount / quranicWords.length) * 100;

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-3xl font-bold text-center mb-8 text-primary">Quranic Words Quiz</h1>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700">
                <div
                    className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${isComplete ? 100 : progress}%` }}
                ></div>
            </div>

            {/* Word count and remaining display */}
            <div className="flex justify-between mb-4 text-sm text-gray-600">
                <span>Word {wordCount + 1} of {quranicWords.length}</span>
                <span>{remainingCount - 1} words remaining</span>
            </div>

            {currentWord ? (
                <div className="relative perspective-1000">
                    {/* Flashcard with flip animation */}
                    <div
                        className={`relative transition-all duration-500 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                        style={{ transformStyle: "preserve-3d", transition: "transform 0.6s" }}
                        onClick={toggleMeaning}
                    >
                        {/* Front of card (Arabic word) */}
                        <div
                            className={`flex flex-col items-center justify-center bg-white p-10 rounded-xl shadow-lg border border-gray-200 min-h-[300px] backface-hidden ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
                            style={{ backfaceVisibility: "hidden" }}
                        >
                            <h2 className="text-4xl font-bold mb-6 text-primary">{currentWord.arabic}</h2>
                            <p className="text-gray-500 text-sm mt-4">Click to see meaning</p>
                        </div>

                        {/* Back of card (Meanings) */}
                        <div
                            className={`absolute inset-0 flex flex-col items-center justify-center bg-white p-10 rounded-xl shadow-lg border border-gray-200 min-h-[300px] backface-hidden rotate-y-180 ${showMeaning ? 'opacity-100' : 'opacity-0'}`}
                            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                        >
                            <h3 className="text-2xl font-bold mb-2 text-primary">{currentWord.english}</h3>
                            <p className="text-xl mb-6 text-gray-700">{currentWord.bangla}</p>
                            <div className="text-sm text-gray-400 mt-2">Arabic: {currentWord.arabic}</div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8 space-x-4">
                        <Button
                            onClick={toggleMeaning}
                            variant="outline"
                            className="min-w-24"
                        >
                            {showMeaning ? "Show Word" : "Show Meaning"}
                        </Button>
                        <Button
                            onClick={nextWord}
                            variant="default"
                            className="min-w-24"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            ) : isComplete ? (
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
                    <div className="text-5xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold text-primary mb-4">Quiz Completed!</h2>
                    <p className="text-gray-600 mb-6">You've reviewed all {quranicWords.length} words.</p>

                    <Button
                        onClick={nextWord}
                        variant="default"
                        className="px-6"
                    >
                        Restart Quiz
                    </Button>
                </div>
            ) : (
                <div className="flex justify-center items-center min-h-[300px]">
                    <div className="animate-pulse text-gray-400">Loading...</div>
                </div>
            )}

            {/* Tips section */}
            <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-2">Study Tips</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Try to pronounce the Arabic word before revealing the meaning</li>
                    <li>• Practice writing the word in Arabic to improve retention</li>
                    <li>• Use the word in a simple sentence to enhance your learning</li>
                </ul>
            </div>
        </div>
    );
}
