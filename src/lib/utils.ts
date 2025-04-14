import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { DEFAULT_LANG, languageByValue, languages } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstNextLanguage(language: string): string {
  const currentLanguageIndex = languages.findIndex(
    ({ value }) => value === language
  );

  if (currentLanguageIndex === -1) {
    return languages[0].value;
  }

  const nextLanguageIndex = (currentLanguageIndex + 1) % languages.length;
  return languages[nextLanguageIndex].value;
}

// Simple language detection based on character frequencies and patterns
export function detectLanguage(text: string): string | null {
  if (!text || text.length < 5) {
    return null;
  }

  // Clean the text - keep only letters and spaces
  const cleanText = text.toLowerCase().replace(/[^a-zÀ-ÿ\s]/gi, '');
  
  // Character frequency analysis for different languages
  const languagePatterns: Record<string, RegExp[]> = {
    Spanish: [
      /[áéíóúñü]/i, // Spanish specific characters
      /\b(?:el|la|los|las|de|en|por|que|con|para|como|pero|es|son|hay|tiene|hacer|estar|ser|yo|tu|usted|nosotros|ellos)\b/gi, // Common Spanish words
    ],
    Turkish: [
      /[çğıöşü]/i, // Turkish specific characters
      /\b(?:bir|ve|bu|için|ile|de|da|ben|sen|biz|siz|onlar|var|yok|evet|hayır|merhaba|teşekkür|lütfen)\b/gi, // Common Turkish words
    ],
    German: [
      /[äöüß]/i, // German specific characters
      /\b(?:der|die|das|und|ist|ich|du|wir|sie|ein|eine|nicht|auch|auf|für|mit|sich|des|dem|zu|dass|aber|aus|wenn|dann)\b/gi, // Common German words
    ],
    French: [
      /[àâçéèêëîïôùûüÿ]/i, // French specific characters
      /\b(?:le|la|les|un|une|des|et|est|sont|je|tu|il|elle|nous|vous|ils|elles|ce|cette|ces|dans|sur|pour|avec|mon|ton|son)\b/gi, // Common French words
    ],
    English: [
      /\b(?:the|and|is|in|to|you|that|it|he|was|for|on|are|with|as|his|they|be|at|one|have|this|from|or|had|by|word|but|not|what)\b/gi, // Common English words
      /\b(?:all|were|we|when|your|can|said|there|use|an|each|which|she|do|how|their|if|will|up|other|about|out|many|then|them|these)\b/gi, // More English words
    ],
    Russian: [
      /[а-яё]/i, // Cyrillic characters
      /\b(?:и|в|не|что|на|я|быть|он|с|это|а|то|все|она|так|его|но|да|ты|к|у|же|вы|за|бы|по|только|её|мне|было|вот|от|меня|еще)\b/gi, // Common Russian words
    ],
    Arabic: [
      /[\u0600-\u06FF]/i, // Arabic characters
      /\b(?:في|من|على|إلى|عن|أن|هذا|مع|كان|لا|أو|هي|هو|يا|كل|عند|ما|نحن|هم|كيف|لكن|و|ثم|قد|فى|لم|لن|له|من|هي|نت|انا|انت|هذه)\b/gi, // Common Arabic words
    ],
    Hindi: [
      /[\u0900-\u097F]/i, // Devanagari characters
      /\b(?:और|का|एक|में|की|है|यह|हैं|से|हो|को|पर|इस|सकता|के|साथ|हुआ|थे|या|हुई|जो|कर|कहा|गया|करने|किया|लिये|अपने|ने|बहुत|कुछ)\b/gi, // Common Hindi words
    ],
    Japanese: [
      /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/i, // Hiragana, Katakana, Kanji
      /\b(?:の|に|は|を|が|と|で|た|して|です|ます|から|まで|ない|よう|こと|もの|人|私|それ|あり|おり|なる|へ|や|いる|れる|など|いう)\b/gi, // Common Japanese particles and words
    ],
    Mandarin: [
      /[\u4E00-\u9FFF]/i, // Chinese characters
      /\b(?:的|一|是|在|不|了|有|和|人|这|中|大|为|上|个|国|我|以|要|他|时|来|用|们|生|到|作|地|于|出|就|分|对|成|会|可|主)\b/gi, // Common Mandarin words
    ],
    Portuguese: [
      /[áâãàçéêíóôõú]/i, // Portuguese specific characters
      /\b(?:o|a|os|as|de|em|para|com|um|uma|por|que|se|como|não|mais|eu|você|ele|ela|nós|vocês|eles|elas|seu|sua|seus|suas|nos)\b/gi, // Common Portuguese words
    ],
  };

  // Score each language based on character patterns and word matches
  const scores: Record<string, number> = {};
  
  // Initialize scores
  Object.keys(languagePatterns).forEach(lang => {
    scores[lang] = 0;
  });
  
  // Score based on unique character sets
  Object.entries(languagePatterns).forEach(([language, patterns]) => {
    // Special characters are a stronger indicator
    const specialCharPattern = patterns[0];
    const specialCharMatches = (cleanText.match(specialCharPattern) || []).length;
    scores[language] += specialCharMatches * 2; // Give more weight to special characters
    
    // Common words are also a strong indicator
    if (patterns.length > 1) {
      const wordPatterns = patterns.slice(1);
      wordPatterns.forEach(pattern => {
        const matches = (cleanText.match(pattern) || []).length;
        scores[language] += matches * 1.5; // Give words more weight
      });
    }
  });
  
  // Apply language-specific heuristics
  if (cleanText.match(/[а-яё]/i)) {
    // If Cyrillic characters are present, heavily bias toward Russian
    scores["Russian"] += cleanText.length * 0.5;
  }
  
  if (cleanText.match(/[\u0600-\u06FF]/i)) {
    // If Arabic characters are present, heavily bias toward Arabic
    scores["Arabic"] += cleanText.length * 0.5;
  }
  
  if (cleanText.match(/[\u0900-\u097F]/i)) {
    // If Devanagari characters are present, heavily bias toward Hindi
    scores["Hindi"] += cleanText.length * 0.5;
  }
  
  if (cleanText.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/i)) {
    // If Japanese characters are present, heavily bias toward Japanese
    scores["Japanese"] += cleanText.length * 0.5;
  }
  
  if (cleanText.match(/[\u4E00-\u9FFF]/i)) {
    // If Chinese characters are present, heavily bias toward Mandarin
    scores["Mandarin"] += cleanText.length * 0.5;
  }
  
  // Normalize by text length for fairness
  Object.keys(scores).forEach(lang => {
    scores[lang] = scores[lang] / Math.sqrt(cleanText.length); // Use sqrt to reduce the penalty for longer texts
  });
  
  // Find the language with the highest score
  let detectedLanguage = null;
  let highestScore = 0;
  
  Object.entries(scores).forEach(([language, score]) => {
    if (score > highestScore) {
      highestScore = score;
      detectedLanguage = language;
    }
  });
  
  // Make sure the score is high enough to be confident
  if (highestScore > 0.1) {
    return detectedLanguage;
  }
  
  return null;
}

export const getVoiceByLanguage = (language: string) => {
  const languageConfig = languageByValue[language];

  const voices = speechSynthesis.getVoices();

  const voice = voices.find(({ lang }) => lang === languageConfig.lang);

  if (voice) return voice;

  const defaultVoice = voices.find(({ lang }) => lang === DEFAULT_LANG);

  return defaultVoice ?? voices[0];
};

const BASE64_MARKER = ";base64,";

export async function fileToBase64(file: File) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target === null) return reject(new Error("No target"));
      resolve(event.target.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export function base64ToUint8Array(dataURI: string) {
  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = dataURI.substring(base64Index);
  const raw = atob(base64);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
