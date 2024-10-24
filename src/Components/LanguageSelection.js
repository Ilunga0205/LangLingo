"use client"
import React, { useState } from 'react';
import { Languages, BookOpen, Brain, ChevronRight, Globe2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LanguageSelection = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedNative, setSelectedNative] = useState('');
  const [selectedLearning, setSelectedLearning] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isExiting, setIsExiting] = useState(false);

  const languages = [
    { code: 'FR', name: 'French', flag: '🇫🇷' },
    { code: 'EN', name: 'English', flag: '🇬🇧' }
  ];

  const levels = [
    { name: 'Beginner', emoji: '🌱', description: 'Just getting started' },
    { name: 'Intermediate', emoji: '🌿', description: 'Gaining confidence' },
    { name: 'Advanced', emoji: '🌳', description: 'Almost fluent' }
  ];

  const handleCompletion = () => {
    try {
      setIsExiting(true);
      
      // Find the selected language codes
      const learningLang = languages.find(lang => lang.name === selectedLearning);
      const nativeLang = languages.find(lang => lang.name === selectedNative);
      
      if (!learningLang || !nativeLang) {
        console.error('Language selection error:', { selectedLearning, selectedNative });
        throw new Error('Invalid language selection');
      }
      
      // Store the codes instead of names
      const userData = {
        nativeLanguage: nativeLang.code,
        learningLanguage: learningLang.code,
        level: selectedLevel
      };
      
      console.log('Storing user preferences:', userData); // Debug log
      localStorage.setItem('languagePreferences', JSON.stringify(userData));
      
      // Navigate after successful storage
      setTimeout(() => {
        router.push('/Learn');
      }, 500);
    } catch (error) {
      console.error('Error in handleCompletion:', error);
      setIsExiting(false); // Reset the exit animation if there's an error
      // You might want to show an error message to the user here
    }
  };

  const renderLogo = () => (
    <div className={`w-full flex justify-center mb-8 transition-all duration-500 ${isExiting ? 'opacity-0 transform -translate-y-8' : 'opacity-100'}`}>
      <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="w-32 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          LOGO
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-blue-100 mb-6 animate-bounce">
          <Globe2 className="w-8 h-8 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">What is your native language?</h2>
        <p className="text-gray-500">Choose the language you speak fluently</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => setSelectedNative(lang.name)} // Store the name
            className={`
              p-6 rounded-xl border-2 transition-all duration-300
              ${selectedNative === lang.name 
                ? 'bg-blue-500 text-white border-transparent shadow-lg scale-105' 
                : 'border-gray-200 hover:border-blue-500 hover:shadow-md'
              }
            `}
          >
            <div className="flex flex-col items-center space-y-3">
              <span className="text-3xl transform transition-transform duration-300 hover:scale-110">{lang.flag}</span>
              <span className="font-semibold">{lang.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-purple-100 mb-6 animate-pulse">
          <BookOpen className="w-8 h-8 text-purple-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">I want to learn...</h2>
        <p className="text-gray-500">Select your target language</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => setSelectedLearning(lang.name)} // Store the name
            disabled={selectedNative === lang.name}
            className={`
              p-6 rounded-xl border-2 transition-all duration-300
              ${selectedLearning === lang.name 
                ? 'bg-purple-500 text-white border-transparent shadow-lg scale-105'
                : selectedNative === lang.name
                ? 'opacity-50 cursor-not-allowed bg-gray-50'
                : 'border-gray-200 hover:border-purple-500 hover:shadow-md'
              }
            `}
          >
            <div className="flex flex-col items-center space-y-3">
              <span className="text-3xl transform transition-transform duration-300 hover:scale-110">{lang.flag}</span>
              <span className="font-semibold">{lang.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-full bg-green-100 mb-6 animate-pulse">
          <Brain className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">What is your level?</h2>
        <p className="text-gray-500">Be honest, we will adapt to you!</p>
      </div>
      
      <div className="space-y-4">
        {levels.map(level => (
          <button
            key={level.name}
            onClick={() => setSelectedLevel(level.name)}
            className={`
              w-full p-6 rounded-xl border-2 transition-all duration-300
              ${selectedLevel === level.name 
                ? 'bg-green-500 text-white border-transparent shadow-lg scale-105' 
                : 'border-gray-200 hover:border-green-500 hover:shadow-md'
              }
            `}
          >
            <div className="flex items-center space-x-4">
              <span className="text-3xl transform transition-transform duration-300 hover:scale-110">{level.emoji}</span>
              <div className="text-left">
                <div className="font-semibold text-lg">{level.name}</div>
                <div className={`text-sm ${selectedLevel === level.name ? 'text-white' : 'text-gray-500'}`}>
                  {level.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6 transition-all duration-500 ${isExiting ? 'opacity-0 transform translate-y-8' : 'opacity-100'}`}>
      <div className="max-w-2xl mx-auto space-y-8">
        {renderLogo()}
        
        <div className={`relative mb-12 transition-all duration-500 ${isExiting ? 'opacity-0 transform -translate-y-8' : 'opacity-100'}`}>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {[1, 2, 3].map(num => (
              <div
                key={num}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  transition-all duration-300 transform
                  ${step >= num 
                    ? 'bg-blue-500 text-white scale-110' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className={`bg-white rounded-2xl p-8 shadow-xl transform transition-all duration-500 ${isExiting ? 'opacity-0 transform translate-y-8' : 'hover:shadow-2xl'}`}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          <div className="flex justify-between mt-12">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-300 font-medium"
              >
                Back
              </button>
            )}
            {((step === 1 && selectedNative) ||
              (step === 2 && selectedLearning) ||
              (step === 3 && selectedLevel)) && (
              <button
                onClick={() => {
                  if (step < 3) setStep(step + 1);
                  else handleCompletion();
                }}
                className="ml-auto inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity duration-300 transform hover:scale-105"
              >
                <span>{step === 3 ? "Let's Start! 🚀" : 'Continue'}</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;