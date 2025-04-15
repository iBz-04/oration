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

type MasteredCard = {
  id: number;
  language: string;
};

const flashcardsByLanguage: Record<string, FlashCard[]> = {
  Spanish: [
    { id: 1, front: "casa", back: "house", language: "Spanish" },
    { id: 2, front: "perro", back: "dog", language: "Spanish" },
    { id: 3, front: "gato", back: "cat", language: "Spanish" },
    { id: 4, front: "libro", back: "book", language: "Spanish" },
    { id: 5, front: "amigo", back: "friend", language: "Spanish" },
    { id: 6, front: "agua", back: "water", language: "Spanish" },
    { id: 7, front: "coche", back: "car", language: "Spanish" },
    { id: 8, front: "tiempo", back: "time", language: "Spanish" },
    { id: 9, front: "comida", back: "food", language: "Spanish" },
    { id: 10, front: "escuela", back: "school", language: "Spanish" },
    { id: 11, front: "trabajo", back: "work", language: "Spanish" },
    { id: 12, front: "familia", back: "family", language: "Spanish" },
  ],
  Turkish: [
    { id: 1, front: "ev", back: "house", language: "Turkish" },
    { id: 2, front: "köpek", back: "dog", language: "Turkish" },
    { id: 3, front: "kedi", back: "cat", language: "Turkish" },
    { id: 4, front: "kitap", back: "book", language: "Turkish" },
    { id: 5, front: "arkadaş", back: "friend", language: "Turkish" },
    { id: 6, front: "su", back: "water", language: "Turkish" },
    { id: 7, front: "araba", back: "car", language: "Turkish" },
    { id: 8, front: "zaman", back: "time", language: "Turkish" },
    { id: 9, front: "yemek", back: "food", language: "Turkish" },
    { id: 10, front: "okul", back: "school", language: "Turkish" },
    { id: 11, front: "iş", back: "work", language: "Turkish" },
    { id: 12, front: "aile", back: "family", language: "Turkish" },
  ],
  French: [
    { id: 1, front: "maison", back: "house", language: "French" },
    { id: 2, front: "chien", back: "dog", language: "French" },
    { id: 3, front: "chat", back: "cat", language: "French" },
    { id: 4, front: "livre", back: "book", language: "French" },
    { id: 5, front: "ami", back: "friend", language: "French" },
    { id: 6, front: "eau", back: "water", language: "French" },
    { id: 7, front: "voiture", back: "car", language: "French" },
    { id: 8, front: "temps", back: "time", language: "French" },
    { id: 9, front: "nourriture", back: "food", language: "French" },
    { id: 10, front: "école", back: "school", language: "French" },
    { id: 11, front: "travail", back: "work", language: "French" },
    { id: 12, front: "famille", back: "family", language: "French" },
  ],
  German: [
    { id: 1, front: "Haus", back: "house", language: "German" },
    { id: 2, front: "Hund", back: "dog", language: "German" },
    { id: 3, front: "Katze", back: "cat", language: "German" },
    { id: 4, front: "Buch", back: "book", language: "German" },
    { id: 5, front: "Freund", back: "friend", language: "German" },
    { id: 6, front: "Wasser", back: "water", language: "German" },
    { id: 7, front: "Auto", back: "car", language: "German" },
    { id: 8, front: "Zeit", back: "time", language: "German" },
    { id: 9, front: "Essen", back: "food", language: "German" },
    { id: 10, front: "Schule", back: "school", language: "German" },
    { id: 11, front: "Arbeit", back: "work", language: "German" },
    { id: 12, front: "Familie", back: "family", language: "German" },
  ],
  Italian: [
    { id: 1, front: "casa", back: "house", language: "Italian" },
    { id: 2, front: "cane", back: "dog", language: "Italian" },
    { id: 3, front: "gatto", back: "cat", language: "Italian" },
    { id: 4, front: "libro", back: "book", language: "Italian" },
    { id: 5, front: "amico", back: "friend", language: "Italian" },
    { id: 6, front: "acqua", back: "water", language: "Italian" },
    { id: 7, front: "macchina", back: "car", language: "Italian" },
    { id: 8, front: "tempo", back: "time", language: "Italian" },
    { id: 9, front: "cibo", back: "food", language: "Italian" },
    { id: 10, front: "scuola", back: "school", language: "Italian" },
    { id: 11, front: "lavoro", back: "work", language: "Italian" },
    { id: 12, front: "famiglia", back: "family", language: "Italian" },
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
  const [difficultyLevel, setDifficultyLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [shuffledCards, setShuffledCards] = useState<FlashCard[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [reverseMode, setReverseMode] = useState<boolean>(false);
  const [masteredCards, setMasteredCards] = useState<MasteredCard[]>([]);
  const [attemptedCards, setAttemptedCards] = useState<Record<string, Record<number, number>>>({});
  const [hasTriedAnswer, setHasTriedAnswer] = useState<boolean>(false);

  const availableLanguages = ["Spanish", "Turkish", "French", "German", "Italian"];
  
  const getFilteredCards = useCallback(() => {
    const allCards = flashcardsByLanguage[currentLanguage];
    switch(difficultyLevel) {
      case "beginner":
        return allCards.slice(0, 5);
      case "intermediate":
        return allCards.slice(0, 8);
      case "advanced":
        return allCards;
      default:
        return allCards;
    }
  }, [currentLanguage, difficultyLevel]);
  
  const cards = shuffledCards.length > 0 ? shuffledCards : getFilteredCards();
  const currentCard = cards[currentCardIndex];

  const totalCards = getFilteredCards().length;
  const attemptedCount = Object.keys(attemptedCards[currentLanguage] || {}).length;
  const masteredCount = masteredCards.filter(card => card.language === currentLanguage).length;
  const progressPercentage = Math.round((attemptedCount / totalCards) * 100);
  const masteryPercentage = Math.round((masteredCount / totalCards) * 100);

  const currentFront = reverseMode ? currentCard.back : currentCard.front;
  const currentBack = reverseMode ? currentCard.front : currentCard.back;
  const frontLang = reverseMode ? "English" : currentCard.language;
  const backLang = reverseMode ? currentCard.language : "English";

  const isCurrentCardMastered = masteredCards.some(
    card => card.id === currentCard.id && card.language === currentLanguage
  );

  const shuffleCards = useCallback(() => {
    const filtered = getFilteredCards();
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCardIndex(0);
    setHasTriedAnswer(false);
  }, [getFilteredCards]);
  
  const resetShuffle = useCallback(() => {
    setShuffledCards([]);
    setCurrentCardIndex(0);
    setHasTriedAnswer(false);
  }, []);

  const handleFlip = () => {
    if (hasTriedAnswer || result) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleNextCard = useCallback(() => {
    setIsFlipped(false);
    setResult(null);
    setGuess("");
    setShowAnswer(false);
    setShowHint(false);
    setHasTriedAnswer(false);
    
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
    setShuffledCards([]);
    setShowHint(false);
    setHasTriedAnswer(false);
  };
  
  const toggleDirection = () => {
    setReverseMode(!reverseMode);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setGuess("");
    setResult(null);
    setShowAnswer(false);
    setShowHint(false);
    setScore(0);
    setStreak(0);
    setHasTriedAnswer(false);
  };
  
  const handleDifficultyChange = (level: "beginner" | "intermediate" | "advanced") => {
    setDifficultyLevel(level);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setGuess("");
    setResult(null);
    setShowAnswer(false);
    setShuffledCards([]);
    setShowHint(false);
    setHasTriedAnswer(false);
  };

  const checkAnswer = () => {
    setHasTriedAnswer(true);
    const isCorrect = guess.toLowerCase().trim() === currentBack.toLowerCase().trim();
    setResult(isCorrect ? "correct" : "incorrect");
    
    setAttemptedCards(prev => {
      const langAttempts = prev[currentLanguage] || {};
      return {
        ...prev,
        [currentLanguage]: {
          ...langAttempts,
          [currentCard.id]: (langAttempts[currentCard.id] || 0) + 1
        }
      };
    });
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      
      if (streak >= 2) {
        setMasteredCards(prev => {
          if (prev.some(card => card.id === currentCard.id && card.language === currentLanguage)) {
            return prev;
          }
          return [...prev, { id: currentCard.id, language: currentLanguage }];
        });
      }
    } else {
      setStreak(0);
      setIsFlipped(true);
    }
    
    setShowAnswer(true);
  };

  const handleGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
  };

  const showWordHint = () => {
    setHasTriedAnswer(true);
    setShowHint(true);
  };

  const getHintText = () => {
    const answer = currentBack;
    return `${answer.charAt(0)}${answer.slice(1).replace(/[a-zA-Z]/g, '_')}`;
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
  
  useEffect(() => {
    setShuffledCards([]);
  }, [currentLanguage, difficultyLevel]);
  
  useEffect(() => {
    setScore(0);
    setStreak(0);
  }, [currentLanguage, difficultyLevel]);

  return (
    <section className="container px-3 py-16 animate-fade-in opacity-0" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Language FlashCards</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Test your vocabulary knowledge with these interactive flashcards.</p>
      </div>
      
      <div className="max-w-xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Progress</div>
          <div className="text-sm text-muted-foreground">{attemptedCount}/{totalCards} ({progressPercentage}%)</div>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center mt-4 mb-2">
          <div className="text-sm font-medium">Mastery</div>
          <div className="text-sm text-muted-foreground">{masteredCount}/{totalCards} ({masteryPercentage}%)</div>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${masteryPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 mb-6">
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
      
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Button
          onClick={() => handleDifficultyChange("beginner")}
          variant={difficultyLevel === "beginner" ? "default" : "outline"}
          size="sm"
          className={difficultyLevel === "beginner" ? "bg-green-600 hover:bg-green-700" : ""}
        >
          Beginner
        </Button>
        <Button
          onClick={() => handleDifficultyChange("intermediate")}
          variant={difficultyLevel === "intermediate" ? "default" : "outline"}
          size="sm"
          className={difficultyLevel === "intermediate" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
        >
          Intermediate
        </Button>
        <Button
          onClick={() => handleDifficultyChange("advanced")}
          variant={difficultyLevel === "advanced" ? "default" : "outline"}
          size="sm"
          className={difficultyLevel === "advanced" ? "bg-red-600 hover:bg-red-700" : ""}
        >
          Advanced
        </Button>
        
        <Button
          onClick={shuffledCards.length > 0 ? resetShuffle : shuffleCards}
          variant="outline"
          size="sm"
          className="ml-2 flex items-center gap-1"
        >
          <ReloadIcon className="w-3 h-3 mr-1" />
          {shuffledCards.length > 0 ? "Reset Order" : "Shuffle Cards"}
        </Button>
        
        <Button
          onClick={toggleDirection}
          variant="outline"
          size="sm"
          className="ml-2 flex items-center gap-1"
        >
          {reverseMode ? `${currentLanguage} → English` : `English → ${currentLanguage}`}
        </Button>
      </div>
      
      <div className="flex justify-between items-center max-w-xl mx-auto mb-6">
        <div className="font-medium text-muted-foreground">
          Card {currentCardIndex + 1}/{cards.length}
          {isCurrentCardMastered && (
            <span className="ml-2 inline-flex items-center bg-green-500/10 text-green-600 dark:text-green-400 text-xs px-2 py-0.5 rounded-full">
              <CheckIcon className="w-3 h-3 mr-1" />
              Mastered
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="font-medium">
            Score: <span className="text-blue-600 dark:text-blue-400">{score}</span>
          </div>
          <div className="font-medium">
            Streak: <span className={`${streak > 2 ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
              {streak}
            </span>
          </div>
        </div>
      </div>
      
      <div className="max-w-xl mx-auto mb-8 aspect-[3/2]">
        <div 
          className="relative w-full h-full perspective-1000"
        >
          <div 
            className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${hasTriedAnswer || result ? "cursor-pointer" : "cursor-not-allowed"} ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            onClick={handleFlip}
          >
            <Card className="absolute w-full h-full bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 backdrop-blur-sm p-8 flex flex-col items-center justify-center backface-hidden">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {frontLang}
              </div>
              <div className="text-4xl font-bold mb-4 text-center">
                {currentFront}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                {hasTriedAnswer ? "Click to flip and see the translation" : "Enter your answer first to reveal the translation"}
              </p>
            </Card>
            
            <Card className="absolute w-full h-full bg-gradient-to-b from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 backdrop-blur-sm p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {backLang} Translation
              </div>
              <div className="text-4xl font-bold mb-4 text-center">
                {currentBack}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Click to flip back to {frontLang}
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
              placeholder={`Your answer in ${backLang}...`}
              value={guess}
              onChange={handleGuessChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
              disabled={!!result}
              onKeyDown={(e) => e.key === 'Enter' && guess && checkAnswer()}
            />
            {showHint && (
              <div className="mt-2 text-sm text-muted-foreground">
                Hint: <span className="font-medium">{getHintText()}</span>
              </div>
            )}
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
              onClick={showWordHint}
              variant="outline"
              disabled={showHint || !!result}
              className="flex items-center gap-1"
            >
              Hint
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
                  <span>Not quite. The correct answer is: <strong>{currentBack}</strong></span>
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