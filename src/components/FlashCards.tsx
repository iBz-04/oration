"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon, ReloadIcon, CheckIcon, CrossCircledIcon } from "@radix-ui/react-icons";

type FlashCard = {
  id: number;
  front: string;
  back: string;
  language: string;
};

const flashcardsByLanguage: Record<string, FlashCard[]> = {
  Spanish: [
    { id: 1, front: "casa", back: "house", language: "Spanish" },
    { id: 2, front: "perro", back: "dog", language: "Spanish" },
    { id: 3, front: "gato", back: "cat", language: "Spanish" },
    { id: 4, front: "libro", back: "book", language: "Spanish" },
    { id: 5, front: "amigo", back: "friend", language: "Spanish" },
  ],
  Turkish: [
    { id: 1, front: "ev", back: "house", language: "Turkish" },
    { id: 2, front: "köpek", back: "dog", language: "Turkish" },
    { id: 3, front: "kedi", back: "cat", language: "Turkish" },
    { id: 4, front: "kitap", back: "book", language: "Turkish" },
    { id: 5, front: "arkadaş", back: "friend", language: "Turkish" },
  ],
  French: [
    { id: 1, front: "maison", back: "house", language: "French" },
    { id: 2, front: "chien", back: "dog", language: "French" },
    { id: 3, front: "chat", back: "cat", language: "French" },
    { id: 4, front: "livre", back: "book", language: "French" },
    { id: 5, front: "ami", back: "friend", language: "French" },
  ],
  German: [
    { id: 1, front: "Haus", back: "house", language: "German" },
    { id: 2, front: "Hund", back: "dog", language: "German" },
    { id: 3, front: "Katze", back: "cat", language: "German" },
    { id: 4, front: "Buch", back: "book", language: "German" },
    { id: 5, front: "Freund", back: "friend", language: "German" },
  ],
};

export const FlashCards = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("Spanish");
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [guess, setGuess] = useState<string>("");
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const availableLanguages = ["Spanish", "Turkish", "French", "German"];
  const cards = flashcardsByLanguage[currentLanguage];
  const currentCard = cards[currentCardIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = useCallback(() => {
    setIsFlipped(false);
    setResult(null);
    setGuess("");
    setShowAnswer(false);
    
    setCurrentCardIndex((prev) => {
      if (prev >= cards.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  }, [cards.length]);

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setGuess("");
    setResult(null);
    setShowAnswer(false);
  };

  const checkAnswer = () => {
    const isCorrect = guess.toLowerCase().trim() === currentCard.back.toLowerCase().trim();
    setResult(isCorrect ? "correct" : "incorrect");
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setShowAnswer(true);
  };

  const handleGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        if (result === "correct") {
          handleNextCard();
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [result, handleNextCard]);

  return (
    <section className="container px-3 py-16 animate-fade-in opacity-0" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Language FlashCards</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Test your vocabulary knowledge with these interactive flashcards.</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {availableLanguages.map((language) => (
          <Button
            key={language}
            onClick={() => handleLanguageChange(language)}
            variant={currentLanguage === language ? "default" : "outline"}
            className={`bg-gradient-to-r ${
              currentLanguage === language ? "from-blue-600 to-purple-600 text-white" : ""
            }`}
          >
            {language}
          </Button>
        ))}
      </div>
      
      <div className="flex justify-between items-center max-w-xl mx-auto mb-6">
        <div className="font-medium text-muted-foreground">
          Card {currentCardIndex + 1}/{cards.length}
        </div>
        <div className="font-medium">
          Score: <span className="text-blue-600 dark:text-blue-400">{score}</span>
        </div>
      </div>
      
      <div className="max-w-xl mx-auto mb-8 aspect-[3/2]">
        <div 
          className="relative w-full h-full perspective-1000"
        >
          <div 
            className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            onClick={handleFlip}
          >
            <Card className="absolute w-full h-full bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 backdrop-blur-sm p-8 flex flex-col items-center justify-center backface-hidden">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {currentCard.language}
              </div>
              <div className="text-4xl font-bold mb-4 text-center">
                {currentCard.front}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Click to flip and see the English translation
              </p>
            </Card>
            
            <Card className="absolute w-full h-full bg-gradient-to-b from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 backdrop-blur-sm p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                English Translation
              </div>
              <div className="text-4xl font-bold mb-4 text-center">
                {currentCard.back}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Click to flip back to {currentCard.language}
              </p>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Your answer in English..."
              value={guess}
              onChange={handleGuessChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
              disabled={!!result}
              onKeyDown={(e) => e.key === 'Enter' && guess && checkAnswer()}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={checkAnswer}
              disabled={!guess || !!result}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Check
            </Button>
            
            <Button 
              onClick={handleNextCard}
              variant="outline"
              className="flex items-center gap-1"
            >
              Next
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {result && (
          <div className={`mt-4 p-4 rounded-lg ${
            result === "correct" 
              ? "bg-green-500/10 text-green-600 dark:text-green-400" 
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}>
            <div className="flex items-center gap-2">
              {result === "correct" ? (
                <>
                  <CheckIcon className="w-5 h-5" />
                  <span>Correct! Great job!</span>
                </>
              ) : (
                <>
                  <CrossCircledIcon className="w-5 h-5" />
                  <span>Not quite. The correct answer is: <strong>{currentCard.back}</strong></span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      <style jsx global>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
}; 