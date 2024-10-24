"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from '../Styles/Learn.module.css'; // Import the CSS module

const Learn = () => {
  const router = useRouter();
  const [sentences, setSentences] = useState([]);
  const [currentSentence, setCurrentSentence] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSentences = async () => {
      try {
        // Fetch language preferences from localStorage
        const storedPreferences = localStorage.getItem("languagePreferences");
        if (!storedPreferences) {
          router.push("/");
          return;
        }

        const { learningLanguage, level } = JSON.parse(storedPreferences);
        
        // Fetch sentences from the correct path
        const response = await fetch("/data/sentences.json");
        if (!response.ok) {
          throw new Error('Failed to fetch sentences');
        }
        
        const data = await response.json();
        
        // Filter sentences by the selected level and learning language
        const filteredSentences = data.sentences.filter((sentence) => 
          sentence.level === level && 
          sentence.learning_language === learningLanguage
        );

        if (filteredSentences.length === 0) {
          setError(`No sentences found for ${learningLanguage} at ${level} level`);
          return;
        }

        // Shuffle the filtered sentences
        const shuffledSentences = [...filteredSentences].sort(() => Math.random() - 0.5);

        setSentences(shuffledSentences);
        setCurrentSentence(shuffledSentences[0]);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load sentences:", err);
        setError("Could not load sentences. Please try again later.");
        setLoading(false);
      }
    };

    loadSentences();
  }, [router]);

  const handleNextSentence = () => {
    if (sentences.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % sentences.length;
    setCurrentIndex(nextIndex);
    setCurrentSentence(sentences[nextIndex]);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-md">
          <div className="text-xl text-red-500 mb-4">{error}</div>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Go Back to Settings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h1 className="text-2xl font-bold mb-4">
            Learning {currentSentence?.language_code}
          </h1>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Level: {currentSentence?.level}</p>
            <p className="text-lg text-gray-700">{currentSentence?.content}</p>
          </div>
          <button
            onClick={handleNextSentence}
            className={`${styles.continueButton} px-6 py-3 rounded-md text-white font-semibold`}
          >
            Next Sentence
          </button>
        </div>
      </div>
    </div>
  );
};

export default Learn;
