import React, { useState, useEffect, useRef } from 'react';

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [position, setPosition] = useState({ x: 30, y: 30 }); // bottom-left initial
  const [isMovementPaused, setIsMovementPaused] = useState(false);
  const initialPosition = { x: 30, y: 30 };
  const timerRef = useRef(null);

  // Autonomous Movement Logic - Wandering across the bottom area
  useEffect(() => {
    const moveRobot = () => {
      if (!showInput && !isSpeaking && !isMovementPaused) {
        const nextX = Math.random() * (window.innerWidth - 120) + 20;
        const nextY = Math.random() * (window.innerHeight - 150) + 50; 
        setPosition({ x: nextX, y: nextY });
      }
    };
 
    const moveInterval = setInterval(moveRobot, 6000); // Move every 6 seconds
    return () => clearInterval(moveInterval);
  }, [showInput, isSpeaking, isMovementPaused]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  const playRoboticBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const speak = async (text) => {
    const voiceId = 'BTNeCNdXniCSbjEac5vd';
    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

    if (!apiKey) {
      console.warn('ElevenLabs API Key missing. Falling back to browser TTS.');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1.5;
        utterance.rate = 1.1;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
      return;
    }

    try {
      setIsSpeaking(true);
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) throw new Error('ElevenLabs API request failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        setIsSpeaking(false);
        console.error('Audio playback error');
      };

      audio.play();
    } catch (error) {
      console.error('Error with ElevenLabs:', error);
      setIsSpeaking(false);
      // Final fallback to browser TTS if ElevenLabs fails
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleClick = () => {
    playRoboticBeep();
    if (showInput) return;
    const greeting = getGreeting();
    const msg = `Hello, ${greeting}! I am your AI assistant. How can I help you?`;
    setMessage(msg);
    setShowBubble(true);
    speak(msg);
    setShowInput(true);
  };

  // Fuzzy matching logic for spelling mistakes
  const getFuzzyMatch = (input) => {
    const sections = [
      { id: 'projects', keys: ['projects', 'work', 'kaam', 'portfolio', 'showcase'] },
      { id: 'skills', keys: ['skills', 'tools', 'tech', 'avade', 'knowledge'] },
      { id: 'about', keys: ['about', 'profile', 'bio', 'mahiti', 'intro'] },
      { id: 'contact', keys: ['contact', 'talk', 'hire', 'sampark', 'connect'] },
      { id: 'home', keys: ['home', 'start', 'top', 'sharuat'] }
    ];

    // Simple similarity check (checks if input is within 1-2 chars of a keyword)
    const isCloseMatch = (str1, str2) => {
      if (str1.length < 3) return str1 === str2;
      let mistakes = 0;
      const len = Math.min(str1.length, str2.length);
      for (let i = 0; i < len; i++) {
        if (str1[i] !== str2[i]) mistakes++;
      }
      mistakes += Math.abs(str1.length - str2.length);
      return mistakes <= 2; // Allow up to 2 mistakes
    };

    for (const section of sections) {
      for (const key of section.keys) {
        if (input.includes(key) || isCloseMatch(input, key)) {
          return section.id;
        }
      }
    }
    return null;
  };

  const handleInputSubmit = (e) => {
    if (e.key === 'Enter') {
      const input = inputValue.toLowerCase().trim();
      let response = "I'm not sure I understand, but I can take you to my Projects, Skills, About, or Contact sections!";
      let targetId = getFuzzyMatch(input);

      const responseMap = {
        projects: "Let's check out my projects and creative work.",
        skills: "I'll show you the tools and technologies I'm proficient in.",
        about: "Here's more information about me and my journey.",
        contact: "Let's get in touch! Taking you to the contact section.",
        home: "Taking you back to the top of the page.",
        thanks: "You are very welcome! It is my absolute pleasure to help such a wonderful person like you. ❤️ Is there anything else I can do for you?"
      };

      // Check for Thank You specifically
      const thankKeywords = ['thank', 'thanks', 'aabhar', 'dhanyavad', 'dhanyavaad', 'shukriya', 'meherbani'];
      if (thankKeywords.some(key => input.includes(key))) {
        targetId = 'thanks';
      }

      if (targetId && targetId !== 'thanks') {
        response = responseMap[targetId];
        const section = document.getElementById(targetId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (targetId === 'thanks') {
        response = responseMap.thanks;
      }

      setMessage(response);
      speak(response);
      setInputValue('');
      
      // Reset the bubble timer, but keep the input open for more questions
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        // Only hide if the user hasn't typed anything new
        if (inputValue === '') {
           // We'll keep it open for now as requested
        }
      }, 10000);
    }
  };

  const resetPosition = (e) => {
    e.stopPropagation(); // Prevent mascot click
    setPosition(initialPosition);
    setIsMovementPaused(true);
    // Move again after 5 seconds
    setTimeout(() => {
      setIsMovementPaused(false);
    }, 5000);
  };

  return (
    <div 
      className="ai-assistant-container"
      style={{ 
        left: `${position.x}px`, 
        bottom: `${position.y}px`,
        transition: 'all 2s ease-in-out'
      }}
    >
      <div className={`speech-bubble ${showBubble ? 'show' : ''}`}>
        <button className="close-bubble" onClick={() => { setShowBubble(false); setShowInput(false); }}>&times;</button>
        <div className="message-content">{message}</div>
        {showInput && (
          <input 
            type="text" 
            className="ai-input" 
            placeholder="Ask something else..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputSubmit}
            autoFocus
          />
        )}
        <div className="bubble-arrow"></div>
      </div>
      
      <div className={`robot-mascot ${isSpeaking ? 'speaking' : ''}`} onClick={handleClick}>
        <div className="robot-head">
          <div className="robot-eyes">
            <div className="eye left-eye"></div>
            <div className="eye right-eye"></div>
          </div>
        </div>
        <div className="robot-body">
          <div className="robot-arm arm-l"></div>
          <div className="robot-arm arm-r"></div>
        </div>
        <div className="robot-shadow"></div>
      </div>

      {(position.x !== initialPosition.x || position.y !== initialPosition.y) && (
        <button 
          className="reset-position-btn" 
          onClick={resetPosition}
          title="Return to Home"
        >
          <i className="ri-arrow-go-back-line"></i>
        </button>
      )}

      <style>{`
        .ai-assistant-container {
          position: fixed;
          z-index: 1000;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .speech-bubble {
          position: absolute;
          bottom: 110px;
          left: 0;
          background: var(--card-bg);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(14, 165, 233, 0.4);
          padding: 15px 20px;
          border-radius: 20px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-color);
          min-width: 200px;
          max-width: 280px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          opacity: 0;
          transform: translateY(15px) scale(0.9);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          pointer-events: auto;
        }

        .speech-bubble.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .message-content {
          margin-bottom: 5px;
          line-height: 1.4;
        }

        .close-bubble {
          position: absolute;
          top: 5px;
          right: 10px;
          background: none;
          border: none;
          color: var(--secondary-text);
          font-size: 18px;
          cursor: pointer;
          opacity: 0.5;
          transition: opacity 0.2s;
        }

        .close-bubble:hover {
          opacity: 1;
          color: #ef4444;
        }

        .ai-input {
          width: 100%;
          margin-top: 10px;
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid rgba(14, 165, 233, 0.3);
          background: rgba(255,255,255,0.1);
          color: var(--text-color);
          outline: none;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
        }

        .ai-input:focus {
          border-color: var(--accent-blue);
          box-shadow: 0 0 10px rgba(14, 165, 233, 0.2);
        }

        .bubble-arrow {
          position: absolute;
          bottom: -8px;
          left: 30px;
          width: 15px;
          height: 15px;
          background: var(--card-bg);
          border-right: 1px solid rgba(14, 165, 233, 0.4);
          border-bottom: 1px solid rgba(14, 165, 233, 0.4);
          transform: rotate(45deg);
        }

        .robot-mascot {
          width: 70px;
          height: 80px;
          position: relative;
          animation: robot-float 4s ease-in-out infinite;
        }

        .robot-head {
          width: 50px;
          height: 40px;
          background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
          border-radius: 12px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          border: 2px solid rgba(255,255,255,0.3);
        }

        .robot-eyes {
          display: flex;
          justify-content: space-around;
          padding-top: 15px;
          width: 100%;
        }

        .eye {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 12px #fff;
          animation: blink 4s infinite;
        }

        .robot-body {
          width: 40px;
          height: 35px;
          background: linear-gradient(135deg, #8b5cf6, #0ea5e9);
          border-radius: 10px 10px 15px 15px;
          margin: -5px auto 0;
          position: relative;
          border: 2px solid rgba(255,255,255,0.3);
        }

        .robot-arm {
          position: absolute;
          width: 10px;
          height: 25px;
          background: #8b5cf6;
          border-radius: 5px;
          top: 5px;
        }

        .arm-l { left: -12px; transform: rotate(15deg); }
        .arm-r { right: -12px; transform: rotate(-15deg); }

        .speaking .arm-l { animation: wave 0.5s infinite alternate; }
        .speaking .arm-r { animation: wave 0.5s infinite alternate-reverse; }

        @keyframes robot-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes blink {
          0%, 45%, 55%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.1); }
        }

        @keyframes wave {
          from { transform: rotate(15deg); }
          to { transform: rotate(50deg); }
        }

        .reset-position-btn {
          position: absolute;
          bottom: -20px;
          left: -25px;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(14, 165, 233, 0.4);
          color: var(--text-color);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          z-index: 5;
          animation: btn-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .reset-position-btn:hover {
          background: var(--accent-blue);
          color: white;
          transform: scale(1.1) rotate(-15deg);
        }

        @keyframes btn-pop {
          from { transform: scale(0) rotate(-45deg); opacity: 0; }
          to { transform: scale(1) rotate(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AIAssistant;
