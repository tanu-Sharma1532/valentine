import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Confetti from 'react-confetti';
import { 
  FaHeart, 
  FaArrowRight, 
  FaStar, 
  FaMusic, 
  FaEnvelope,
  FaSearch,
  FaQuestionCircle,
  FaTrophy,
  FaGamepad,
  FaImages,
  FaCheck,
  FaTimes,
  FaRandom,
  FaEye,
  FaMale,
  FaFemale,
  FaFire,
  FaLightbulb,
  FaChevronRight,
  FaChevronLeft
} from 'react-icons/fa';
import { GiHeartKey, GiRose, GiPartyPopper, GiLovers } from 'react-icons/gi';
import './App.css';

function App() {
  const [answer, setAnswer] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [activeGame, setActiveGame] = useState('proposal'); // 'proposal', 'findOmkar', 'mcq', 'memory'
  
  // Honey Bee Guide States
  const [honeyBeeActive, setHoneyBeeActive] = useState(false);
  const [honeyBeePosition, setHoneyBeePosition] = useState({ x: 50, y: 50 });
  const [honeyBeeMessage, setHoneyBeeMessage] = useState('');
  const [honeyBeePath, setHoneyBeePath] = useState([]);
  const [autoBeeStarted, setAutoBeeStarted] = useState(false);
  const [canClickYes, setCanClickYes] = useState(false);
  const [beeJourneyComplete, setBeeJourneyComplete] = useState(false);
  
  // Game 1: Find O-M-K-A-R Grid States
  const [gameGrid, setGameGrid] = useState([]);
  const [foundLetters, setFoundLetters] = useState([]);
  const [game1Score, setGame1Score] = useState(0);
  const [showGame1Hint, setShowGame1Hint] = useState(false);
  const [game1Complete, setGame1Complete] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [gridMessage, setGridMessage] = useState('Find all letters: O M K A R');
  
  // Game 2: MCQ States
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [mcqScore, setMcqScore] = useState(0);
  const [mcqComplete, setMcqComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showMcqResult, setShowMcqResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  
  // Game 3: Memory Lane States
  const [memoryPhotos, setMemoryPhotos] = useState([]);
  const [shuffledPhotos, setShuffledPhotos] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [memoryGameComplete, setMemoryGameComplete] = useState(false);
  const [showMemoryHint, setShowMemoryHint] = useState(false);
  
  const yesButtonRef = useRef(null);

  // Sample photos for memory game - Now using local photos from public folder
  // Using useMemo to prevent recreation on every render
  const initialMemoryPhotos = useMemo(() => [
    { 
      id: 1, 
      url: "/img3.jpeg",
      date: "Normal Meet",
      year: "2022",
      description: "The day our story began"
    },
    { 
      id: 2, 
      url: "/img1.jpeg",
      date: "First Date",
      year: "2023",
      description: "Coffee and endless conversations"
    },
    { 
      id: 3, 
      url: "/img4.jpeg",
      date: "Special Moment",
      year: "2023",
      description: "When I knew you were the one"
    },
    { 
      id: 4, 
      url: "/img5.jpeg",
      date: "Few Last Moments",
      year: "2023",
      description: "Exploring the world together"
    },
    { 
      id: 5, 
      url: "/img2.jpeg",
      date: "Recent Memory",
      year: "2024",
      description: "Making everyday moments special"
    }
  ], []);

  const mcqQuestions = [
    {
      question: "What's my biggest wish for our relationship?",
      options: [
        "To always keep surprising each other",
        "To grow together, not just grow old",
        "To be each other's safe side always",
        "All of these, because our love deserves everything"
      ],
      correctAnswer: 3,
      hint: "Our love story deserves every beautiful thing... ✨",
      romanticReveal: "With you, I want it all - every dream, every hope, every tomorrow 🌈"
    },
    {
      question: "What's the memory that still makes me blush when I think about it?",
      options: [
        "when you kiss me on forehead in balcony and pull me closer",
        "That surprise birthday cake you threw me",
        "The time when you first time hold my hand",
        "When you serenaded me in front of our friends"
      ],
      correctAnswer: 0,
      hint: "Rain wasn't the only thing falling that day... 🌧️",
      romanticReveal: "I was falling in love, and I've never stopped 💘"
    },
    {
      question: "What's my favorite way you show love without words?",
      options: [
        "The way you remember little details about me",
        "Your spontaneous forehead kisses though i never get that",
        "How you make my favorite sabudana khichadi when I'm hungry",
        "All the small acts that say 'I'm thinking of you'"
      ],
      correctAnswer: 3,
      hint: "Love speaks loudest in whispers, not shouts... 🤫",
      romanticReveal: "Your silent love speaks volumes to my heart 📣"
    },
    {
      question: "What's the quality in you that makes me feel safest?",
      options: [
        "How you listen without judgment",
        "The consistency of your love",
        "how you make me get out of the problems",
        "All of above"
      ],
      correctAnswer: 3,
      hint: "It's not grand gestures, but steady presence... 🌊",
      romanticReveal: "Your constant love is my anchor in every storm ⚓"
    },
    {
      question: "What's my biggest dream for us that I've whispered to you at night?",
      options: [
        "Growing old together, holding hands on a porch swing",
        "Building a home filled with laughter and love",
        "Traveling the world and collecting memories",
        "Creating a love story that our grandchildren will tell"
      ],
      correctAnswer: 0,
      hint: "It's about time... not places... ⏳",
      romanticReveal: "I want every chapter of my life to be written with you 📖"
    },
    {
      question: "What's our secret language that no one else understands?",
      options: [
        "Our special hand squeeze codes",
        "The way we finish each other's sentences",
        "Our inside jokes that make us laugh in public",
        "The meaningful looks across a crowded room"
      ],
      correctAnswer: 3,
      hint: "Sometimes words aren't needed... 👀",
      romanticReveal: "Our eyes have conversations that words could never capture 💕"
    },
    {
      question: "What's my favorite place to be with you?",
      options: [
        "Anywhere, as long as it's with you",
        "Curled up on the couch under a blanket",
        "That quiet corner of the café where we first talked for hours",
        "All of the above"
      ],
      correctAnswer: 3,
      hint: "Home isn't a place, it's wherever you are... 🏠",
      romanticReveal: "With you, everywhere feels like home and every moment feels magical ✨"
    },
    {
      question: "What's the one thing I'll never get tired of hearing from you?",
      options: [
        "The way you say my name",
        "Your laugh, especially when it's genuine and loud",
        "Your random thoughts and stories from your day",
        "All of these - your voice is my favorite sound"
      ],
      correctAnswer: 3,
      hint: "It's not what you say, but how you say it... 🎶",
      romanticReveal: "Your voice is the melody that plays in my heart all day long 💖"
    },
    {
      question: "What makes an ordinary day extraordinary when I'm with you?",
      options: [
        "Your smile first thing in the morning",
        "The way you make even chores fun",
        "Our little rituals and routines",
        "Simply waking up next to you, every single day"
      ],
      correctAnswer: 3,
      hint: "Magic is in the mundane moments... ✨",
      romanticReveal: "With you, even the most ordinary days become precious memories 📅"
    },
    {
      question: "What do I love most about our future together?",
      options: [
        "Knowing I'll have you by my side through everything",
        "All the adventures we still have to experience",
        "Building a life filled with love and laughter",
        "That it's OUR future, written together"
      ],
      correctAnswer: 3,
      hint: "The best is yet to come... 🌅",
      romanticReveal: "I can't wait to write every page of our story with you 📚"
    },
    {
      question: "What's my favorite thing about falling asleep next to you?",
      options: [
        "Feeling your heartbeat against my back",
        "Your arm wrapped protectively around me",
        "Knowing I'm safe in your warmth",
        "All of these - it's my favorite part of every day"
      ],
      correctAnswer: 3,
      hint: "Sweet dreams are made of this... 🌙",
      romanticReveal: "Falling asleep in your arms is where I find my peace and my paradise 🌌"
    },
    {
      question: "What would I choose if I could keep only one memory of us?",
      options: [
        "The moment I realized I was in love with you",
        "Our first kiss, nervous and perfect",
        "All the quiet, ordinary moments in between",
        "Every single second - I could never choose just one"
      ],
      correctAnswer: 3,
      hint: "Some choices are impossible to make... 💫",
      romanticReveal: "Every memory with you is a treasure I'd protect with my whole heart 🗝️"
    }
  ];

  // Initialize memory game with useCallback to avoid dependency issues
  const shufflePhotos = useCallback(() => {
    const shuffled = [...initialMemoryPhotos].sort(() => Math.random() - 0.5);
    setShuffledPhotos(shuffled);
    setSelectedOrder([]);
  }, [initialMemoryPhotos]);

  // Initialize Find OMKAR grid game
  const initializeGridGame = useCallback(() => {
    const gridSize = 8; // 8x8 grid
    const targetWord = 'OMKAR';
    const allLetters = targetWord.split('');
    const otherLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(l => !targetWord.includes(l));
    
    // Create empty grid
    let newGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));
    
    // Place OMKAR letters in random positions
    allLetters.forEach(letter => {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        if (newGrid[row][col] === '') {
          newGrid[row][col] = {
            letter: letter,
            isTarget: true,
            found: false,
            row,
            col
          };
          placed = true;
        }
      }
    });
    
    // Fill remaining cells with random letters
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newGrid[i][j] === '') {
          const randomLetter = otherLetters[Math.floor(Math.random() * otherLetters.length)];
          newGrid[i][j] = {
            letter: randomLetter,
            isTarget: false,
            found: false,
            row: i,
            col: j
          };
        }
      }
    }
    
    setGameGrid(newGrid);
    setFoundLetters([]);
    setGame1Score(0);
    setAttempts(0);
    setGame1Complete(false);
    setGridMessage('Find all letters: O M K A R');
  }, []);

  // ========== HONEY BEE GUIDE FUNCTIONS ==========
  const activateHoneyBeeGuide = useCallback(() => {
    setHoneyBeeActive(true);
    setCanClickYes(false);
    setBeeJourneyComplete(false);
    setHoneyBeeMessage("🐝 Buzz buzz! I'm here to help you find the YES button! Follow my trail! 🍯");
    
    // Clear any existing path
    setHoneyBeePath([]);
    
    // Start the bee's journey to find the YES button
    setTimeout(() => startBeeJourney(), 1000);
  }, []);

  const startBeeJourney = () => {
    const messages = [
      "🐝 Let me guide you to the sweetest YES of your life!",
      "🐝 This way! The YES button is full of honey!",
      "🐝 Buzz buzz! I see the YES button from here!",
      "🐝 Almost there! The YES button smells like flowers!",
      "🐝 Just a little further! The YES button is magical!",
      "🐝 Look! The YES button is right there! So shiny!"
    ];
    
    let currentStep = 0;
    const totalSteps = 6;
    
    const beeInterval = setInterval(() => {
      if (currentStep < totalSteps) {
        // Move bee to random positions before reaching target
        const randomX = Math.random() * 70 + 15;
        const randomY = Math.random() * 70 + 15;
        setHoneyBeePosition({ x: randomX, y: randomY });
        setHoneyBeeMessage(messages[currentStep]);
        
        // Create a trail dot
        setHoneyBeePath(prev => [...prev.slice(-20), { x: randomX, y: randomY }]);
        
        currentStep++;
        
        // On final step, go to YES button
        if (currentStep === totalSteps) {
          clearInterval(beeInterval);
          setTimeout(() => {
            // Find YES button position
            const yesButton = document.querySelector('.yes-button-final');
            if (yesButton) {
              const rect = yesButton.getBoundingClientRect();
              const containerRect = document.querySelector('.container').getBoundingClientRect();
              
              const targetX = ((rect.left + rect.width/2 - containerRect.left) / containerRect.width) * 100;
              const targetY = ((rect.top + rect.height/2 - containerRect.top) / containerRect.height) * 100;
              
              // Animate bee flying to YES button
              const beeSteps = 20;
              let step = 0;
              const startX = honeyBeePosition.x;
              const startY = honeyBeePosition.y;
              
              const flyInterval = setInterval(() => {
                step++;
                const progress = step / beeSteps;
                const currentX = startX + (targetX - startX) * progress;
                const currentY = startY + (targetY - startY) * progress;
                
                setHoneyBeePosition({ x: currentX, y: currentY });
                setHoneyBeePath(prev => [...prev.slice(-20), { x: currentX, y: currentY }]);
                
                if (step >= beeSteps) {
                  clearInterval(flyInterval);
                  setBeeJourneyComplete(true);
                  setHoneyBeeMessage("🐝 I made it! Now YOU click the YES button! It's the sweetest choice! 💝");
                  
                  // Enable YES button
                  setCanClickYes(true);
                  
                  // Make YES button pulse and glow
                  setTimeout(() => {
                    yesButton.style.transform = 'scale(1.1)';
                    yesButton.style.boxShadow = '0 0 20px gold, 0 0 40px #ff4081';
                    yesButton.style.zIndex = '1000';
                    yesButton.classList.add('pulse-attention');
                  }, 500);
                }
              }, 50);
            }
          }, 1000);
        }
      }
    }, 1500);
  };

  // Create floating elements (hearts and stars)
  useEffect(() => {
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 30 + 10,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
      type: Math.random() > 0.5 ? 'heart' : 'star',
      emoji: Math.random() > 0.5 ? '💫' : '✨'
    }));
    setHearts(newHearts);
    
    // Initialize memory game
    setMemoryPhotos(initialMemoryPhotos);
    shufflePhotos();
    
    // Initialize Find OMKAR grid game
    initializeGridGame();
  }, [shufflePhotos, initializeGridGame, initialMemoryPhotos]);

  // Check if all games are completed
  const allGamesCompleted = game1Complete && mcqComplete && memoryGameComplete;

  // Start bee automatically when all games are completed and user is on proposal page
  useEffect(() => {
    if (allGamesCompleted && activeGame === 'proposal' && !autoBeeStarted && !honeyBeeActive) {
      // Start bee automatically after 2 seconds
      const timer = setTimeout(() => {
        setCanClickYes(false);
        setBeeJourneyComplete(false);
        activateHoneyBeeGuide();
        setAutoBeeStarted(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [allGamesCompleted, activeGame, autoBeeStarted, honeyBeeActive, activateHoneyBeeGuide]);

  // Handle proposal responses
  const handleYes = () => {
    if (!canClickYes) {
      setHoneyBeeMessage("🐝 Hey! Follow me first! I'm leading you to the YES button! 🍯");
      
      // Make YES button pulse to draw attention
      const yesButton = document.querySelector('.yes-button-final');
      if (yesButton) {
        yesButton.style.animation = 'gentlePulse 2s infinite';
        setTimeout(() => {
          yesButton.style.animation = '';
        }, 2000);
      }
      return;
    }
    
    setAnswer('yes');
    setShowMessage(true);
    setHoneyBeeActive(false);
  };

  const handleBeeClick = () => {
    if (beeJourneyComplete) return;
    
    setHoneyBeeMessage("🐝 Hey! Don't click me, follow me to the YES button! I'll show you the way! 🍯");
    
    // Make YES button pulse gently to draw attention
    const yesButton = document.querySelector('.yes-button-final');
    if (yesButton) {
      yesButton.style.animation = 'gentlePulse 2s infinite';
      setTimeout(() => {
        yesButton.style.animation = '';
      }, 2000);
    }
  };

  // ========== GAME 1: Find O-M-K-A-R Grid ==========
  const handleCellClick = (row, col, cell) => {
    if (cell.found) return;
    
    setAttempts(attempts + 1);
    
    if (cell.isTarget && !foundLetters.includes(cell.letter)) {
      // Found a correct letter
      const newFoundLetters = [...foundLetters, cell.letter];
      setFoundLetters(newFoundLetters);
      
      // Update grid to show found
      const newGrid = [...gameGrid];
      newGrid[row][col] = { ...cell, found: true };
      setGameGrid(newGrid);
      
      // Update score
      const newScore = Math.min(100, game1Score + 20);
      setGame1Score(newScore);
      
      // Set message for found letter
      const messages = {
        'O': "O is for 'Only' - You're the only one for me! 💕",
        'M': "M is for 'Mine' - You'll always be mine! 💝",
        'K': "K is for 'Kissable' - Your lips are my favorite! 💋",
        'A': "A is for 'Amazing' - You're simply amazing! ✨",
        'R': "R is for 'Romantic' - You're my perfect romantic! 🌹"
      };
      setGridMessage(messages[cell.letter]);
      
      // Check if game is complete
      if (newFoundLetters.length === 5) {
        setTimeout(() => {
          setGame1Complete(true);
          setGridMessage("🎉 CONGRATULATIONS! You found all letters! 🎉");
        }, 500);
      }
    } else if (cell.isTarget && foundLetters.includes(cell.letter)) {
      setGridMessage(`Already found ${cell.letter}! Find the other letters! 🔍`);
    } else {
      // Wrong letter
      const wrongMessages = [
        "Almost! That's not in OMKAR! 🤔",
        "Nope! Keep looking for the right letters! 🔎",
        "Wrong letter! Try another spot! 💡",
        "Close but no! OMKAR letters only! 🎯"
      ];
      setGridMessage(wrongMessages[attempts % wrongMessages.length]);
      
      // Temporarily highlight wrong choice
      const newGrid = [...gameGrid];
      newGrid[row][col] = { ...cell, wrong: true };
      setGameGrid(newGrid);
      
      setTimeout(() => {
        const resetGrid = [...gameGrid];
        resetGrid[row][col] = { ...cell, wrong: false };
        setGameGrid(resetGrid);
      }, 500);
    }
  };

  // ========== GAME 2: MCQ QUIZ ==========
  const handleMcqAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowMcqResult(true);
    
    // Mark question as answered
    if (!answeredQuestions.includes(currentQuestion)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }
  };

  const handleNextQuestion = () => {
    // Calculate score for current question if correct
    if (selectedAnswer === mcqQuestions[currentQuestion].correctAnswer) {
      setMcqScore(Math.min(100, mcqScore + (100 / mcqQuestions.length)));
    }
    
    // Move to next question or complete quiz
    if (currentQuestion < mcqQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowMcqResult(false);
      setShowHint(false);
    } else {
      setMcqComplete(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowMcqResult(false);
      setShowHint(false);
    }
  };

  // ========== GAME 3: Memory Lane ==========
  const handlePhotoSelect = (photoId) => {
    if (!selectedOrder.includes(photoId) && selectedOrder.length < memoryPhotos.length) {
      const newOrder = [...selectedOrder, photoId];
      setSelectedOrder(newOrder);
      
      if (newOrder.length === memoryPhotos.length) {
        // Check if order is correct
        const correctOrder = memoryPhotos.map(p => p.id);
        const isCorrect = JSON.stringify(newOrder) === JSON.stringify(correctOrder);
        setMemoryGameComplete(isCorrect);
      }
    }
  };

  const removeLastPhoto = () => {
    if (selectedOrder.length > 0) {
      const newOrder = [...selectedOrder];
      newOrder.pop();
      setSelectedOrder(newOrder);
    }
  };

  const resetMemoryGame = () => {
    setSelectedOrder([]);
    shufflePhotos();
    setMemoryGameComplete(false);
  };

  // Romantic messages from Tanu to Omkar
  const romanticMessages = [
    "Every day with you feels like a page from my favorite love story 📖",
    "Your smile is my favorite notification in this life 😊",
    "Being with you feels like coming home after a long journey 🏡",
    "You're not just my love, you're my favorite adventure 🌟",
    "My heart does a happy dance every time I think of you 💃",
    "You make ordinary moments feel magical ✨",
    "With you, I've found my forever person 💫"
  ];

  // Calculate question colors
  const getOptionClass = (optionIndex) => {
    if (!showMcqResult) {
      return selectedAnswer === optionIndex ? 'selected' : '';
    }
    
    if (optionIndex === mcqQuestions[currentQuestion].correctAnswer) {
      return 'correct';
    }
    
    if (optionIndex === selectedAnswer && optionIndex !== mcqQuestions[currentQuestion].correctAnswer) {
      return 'wrong';
    }
    
    return '';
  };

  return (
    <div className="app">
      {answer === 'yes' && <Confetti recycle={false} numberOfPieces={500} gravity={0.1} />}
      
      {/* Floating Elements Background */}
      <div className="floating-container">
        {hearts.map(heart => (
          <div 
            key={heart.id}
            className={`floating-element ${heart.type}`}
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
              animationDelay: `${heart.delay}s`
            }}
          >
            {heart.emoji}
          </div>
        ))}
      </div>

      {/* Honey Bee Guide */}
      {honeyBeeActive && (
        <div 
          className="honey-bee-guide"
          style={{
            left: `${honeyBeePosition.x}%`,
            top: `${honeyBeePosition.y}%`,
          }}
          onClick={handleBeeClick}
        >
          <div className="honey-bee">🐝</div>
          <div className="bee-message">{honeyBeeMessage}</div>
          
          {/* Bee trail */}
          {honeyBeePath.map((point, index) => (
            <div 
              key={index}
              className="bee-trail-dot"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                opacity: index / honeyBeePath.length
              }}
            />
          ))}
        </div>
      )}

      <div className="container">
        {/* Show only YES response or main content */}
        {showMessage ? (
          <div className="response-message success">
            <FaMusic className="music-icon" />
            <h2>YAY! YOU'RE MY VALENTINE! 🎉💝🎊</h2>
            <p className="celebration-text">
              You completed all the games and won my heart forever! 
              Let's make this Valentine's Day the beginning of our best chapter! ✨
            </p>
            
            <div className="achievements">
              <h4>🏆 Our Achievements Together:</h4>
              <ul>
                <li>✅ Mastered OMKAR Grid - Found all letters like a pro!</li>
                <li>✅ Aced the Love Quiz - You know my heart so well</li>
                <li>✅ Perfect Timeline - Our beautiful journey continues</li>
                <li>✅ Won the grand prize: A lifetime of love together! 💖</li>
              </ul>
            </div>
            
            <div className="final-message">
              <GiHeartKey className="heart-key" />
              <p>
                <strong>To My Dearest Omkar,</strong><br/>
                From the moment we met, you've filled my life with joy, laughter, and love. 
                Every day with you is a blessing, and I can't wait to create a million more memories together. 
                Will you be my Valentine today, tomorrow, and forever? 💕
              </p>
              <p className="signature">With all my love,<br/>Your Tanu 💝</p>
            </div>
            
            <button 
              className="celebrate-button"
              onClick={() => window.location.reload()}
            >
              Create More Memories Together! <FaArrowRight />
            </button>
          </div>
        ) : (
          <>
            {/* Game Navigation */}
            <div className="game-navigation">
              <button 
                className={`nav-btn ${activeGame === 'proposal' ? 'active' : ''}`}
                onClick={() => setActiveGame('proposal')}
              >
                <GiLovers /> Proposal
              </button>
              <button 
                className={`nav-btn ${activeGame === 'findOmkar' ? 'active' : ''}`}
                onClick={() => setActiveGame('findOmkar')}
              >
                <FaSearch /> Find OMKAR
              </button>
              <button 
                className={`nav-btn ${activeGame === 'mcq' ? 'active' : ''}`}
                onClick={() => setActiveGame('mcq')}
              >
                <FaQuestionCircle /> Love Quiz
              </button>
              <button 
                className={`nav-btn ${activeGame === 'memory' ? 'active' : ''}`}
                onClick={() => setActiveGame('memory')}
              >
                <FaImages /> Memory Lane
              </button>
            </div>

            {/* MAIN PROPOSAL SECTION */}
            {activeGame === 'proposal' && (
              <>
                <header className="header">
                  <div className="couple-icons">
                    <div className="icon-wrapper female">
                      <FaFemale className="icon" />
                      <span className="name">Tanu</span>
                    </div>
                    <div className="heart-connector">❤️</div>
                    <div className="icon-wrapper male">
                      <FaMale className="icon" />
                      <span className="name">Omkar</span>
                    </div>
                  </div>
                  
                  <h1 className="title">
                    <GiRose className="rose-icon" /> 
                    Will You Be My Valentine? 
                    <GiRose className="rose-icon" />
                  </h1>
                  <p className="subtitle">
                    <FaStar /> A special invitation from Tanu to Omkar <FaStar />
                  </p>
                </header>

                <main className="main-content">
                  {/* Game Progress */}
                  <div className="game-progress">
                    <div className="progress-item">
                      <span className="progress-icon">🔍</span>
                      <span className="progress-text">Find OMKAR: {game1Complete ? '✅' : `${foundLetters.length}/5`}</span>
                    </div>
                    <div className="progress-item">
                      <span className="progress-icon">❓</span>
                      <span className="progress-text">Love Quiz: {mcqComplete ? '✅' : `${answeredQuestions.length}/${mcqQuestions.length}`}</span>
                    </div>
                    <div className="progress-item">
                      <span className="progress-icon">📸</span>
                      <span className="progress-text">Memory Lane: {memoryGameComplete ? '✅' : 'In progress'}</span>
                    </div>
                  </div>

                  {/* Special Final Proposal when all games are completed */}
                  {allGamesCompleted ? (
                    <div className="final-proposal">
                      <div className="envelope">
                        <FaEnvelope className="envelope-icon" />
                        <h2 className="question">My Dearest Omkar... The Final Question 💖</h2>
                        
                        <div className="message-card">
                          <div className="message-content">
                            <div className="romantic-text">
                              <p>My Love,</p>
                              <p>You've completed every game, solved every puzzle, and proven how well you know my heart. 💕</p>
                              <p>Now, after all our adventures together, I have just one final question for you...</p>
                            </div>
                            
                            <div className="heart-divider">
                              ✨ 💌 ✨
                            </div>
                            
                            <div className="final-question-box">
                              <h3>
                                <FaStar className="star-icon" /> 
                                WILL YOU BE MY VALENTINE, TODAY AND FOREVER? 
                                <FaStar className="star-icon" />
                              </h3>
                              
                              <div className="final-buttons">
                                <button 
                                  className={`yes-button-final ${canClickYes ? 'active' : 'inactive'}`}
                                  onClick={handleYes}
                                  ref={yesButtonRef}
                                  disabled={!canClickYes}
                                >
                                  <FaHeart /> 
                                  {canClickYes ? 'YES! A THOUSAND TIMES YES! 💖' : 'Follow the bee first! 🐝'}
                                </button>
                                
                                {honeyBeeActive && !canClickYes && (
                                  <div className="honey-bee-help">
                                    <p className="bee-instruction">
                                      🐝 Follow the buzzing bee! It will lead you to the YES button! 🍯
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="romantic-quote">
                              <FaStar className="quote-star" />
                              <p className="quote-text">
                                Our love story is my favorite adventure, and I want to keep writing it with you forever...
                              </p>
                              <FaStar className="quote-star" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Original Proposal Content */
                    <div className="envelope">
                      <FaEnvelope className="envelope-icon" />
                      <h2 className="question">My Dearest Omkar...</h2>
                      
                      <div className="message-card">
                        <div className="message-content">
                          <div className="romantic-text">
                            <p>Hey my love! 💕</p>
                            <p>I've created something special just for you... 🎁</p>
                            <p>Before I ask you the most important question, let's play some games together! 🎮</p>
                            <p>Each game unlocks a piece of my heart and reveals how much you mean to me 💝</p>
                          </div>
                          
                          <div className="heart-divider">
                            ✨ 💌 ✨
                          </div>
                          
                          <div className="game-instructions">
                            <h3><FaGamepad /> Game Journey:</h3>
                            <ul>
                              <li><strong>Find OMKAR Grid:</strong> Find all 5 letters in the alphabet grid</li>
                              <li><FaQuestionCircle /> <strong>Love Quiz:</strong> Answer questions about our beautiful journey</li>
                              <li><FaImages /> <strong>Memory Lane:</strong> Arrange our precious memories in order</li>
                            </ul>
                            <p className="hint-text">Complete all games to unlock my final question! 🔓</p>
                          </div>

                          <div className="romantic-quote">
                            <FaStar className="quote-star" />
                            <p className="quote-text">
                              {romanticMessages[Math.floor(Math.random() * romanticMessages.length)]}
                            </p>
                            <FaStar className="quote-star" />
                          </div>

                          <div className="proposal">
                            <h3>
                              <FaStar className="star-icon" /> 
                              Ready to play and be my forever Valentine? 
                              <FaStar className="star-icon" />
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </main>
              </>
            )}

            {/* ========== GAME 1: FIND OMKAR GRID ========== */}
            {activeGame === 'findOmkar' && (
              <div className="game-container">
                <h2 className="game-title">
                  <FaSearch /> Game 1: Find OMKAR in the Grid <FaSearch />
                </h2>
                
                <div className="game-instruction">
                  <p>Hi Omkar! Find all 5 letters of your name hidden in this alphabet grid!</p>
                  <p>Click on letters to find O, M, K, A, R. Each found letter reveals a special message! 💌</p>
                  
                  <div className="letters-to-find">
                    <h4>Find these letters:</h4>
                    <div className="target-letters">
                      {['O', 'M', 'K', 'A', 'R'].map((letter, index) => (
                        <span 
                          key={index} 
                          className={`target-letter ${foundLetters.includes(letter) ? 'found' : ''}`}
                        >
                          {letter}
                          {foundLetters.includes(letter) && ' ✓'}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="game-stats">
                    <div className="stat-item">
                      <span className="stat-label">Progress:</span>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${(foundLetters.length / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{foundLetters.length}/5</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Attempts:</span>
                      <span className="attempts-count">{attempts}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Score:</span>
                      <span className="score-count">{game1Score}</span>
                    </div>
                  </div>
                  
                  <div className="game-message">
                    <FaFire className="message-icon" />
                    <p className="message-text">{gridMessage}</p>
                  </div>
                  
                  <div className="game-controls">
                    <button className="control-btn" onClick={initializeGridGame}>
                      <FaRandom /> New Grid
                    </button>
                    <button 
                      className="control-btn hint-btn"
                      onClick={() => setShowGame1Hint(!showGame1Hint)}
                    >
                      <FaLightbulb /> {showGame1Hint ? 'Hide Hint' : 'Show Hint'}
                    </button>
                  </div>
                  
                  {showGame1Hint && (
                    <div className="hint-box">
                      <strong>💡 Hint:</strong> The letters O, M, K, A, R are randomly placed in the grid. 
                      Look carefully and remember which ones you've already found! They light up when found. 
                      Each found letter reveals a romantic message about us! 💝
                    </div>
                  )}
                </div>

                {/* Alphabet Grid */}
                <div className="alphabet-grid-container">
                  <div className="alphabet-grid">
                    {gameGrid.map((row, rowIndex) => (
                      <div key={rowIndex} className="grid-row">
                        {row.map((cell, colIndex) => (
                          <button
                            key={`${rowIndex}-${colIndex}`}
                            className={`grid-cell ${
                              cell.found ? 'found' : 
                              cell.wrong ? 'wrong' : ''
                            }`}
                            onClick={() => handleCellClick(rowIndex, colIndex, cell)}
                            disabled={cell.found}
                          >
                            <span className="cell-letter">{cell.letter}</span>
                            {cell.found && (
                              <span className="cell-check">✅</span>
                            )}
                            {cell.wrong && (
                              <span className="cell-cross">❌</span>
                            )}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                  
                  {/* Legend */}
                  <div className="grid-legend">
                    <div className="legend-item">
                      <div className="legend-color found-legend"></div>
                      <span>Found Letter</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color wrong-legend"></div>
                      <span>Wrong Letter</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color normal-legend"></div>
                      <span>Other Letters</span>
                    </div>
                  </div>
                </div>

                {/* Found Letters Messages */}
                {foundLetters.length > 0 && (
                  <div className="found-messages">
                    <h4><FaHeart /> Messages from Your Found Letters:</h4>
                    <div className="messages-grid">
                      {foundLetters.map((letter, index) => {
                        const messages = {
                          'O': "O is for 'Only' - You're the only one who makes my heart race! 💓",
                          'M': "M is for 'Mine' - You'll always be mine, now and forever! 💝",
                          'K': "K is for 'Kissable' - Your lips are my favorite! 💋",
                          'A': "A is for 'Amazing' - You make every day amazing! ✨",
                          'R': "R is for 'Romantic' - You're my perfect romantic partner! 🌹"
                        };
                        return (
                          <div key={index} className="message-card-small">
                            <div className="message-letter">{letter}</div>
                            <p className="message-content">{messages[letter]}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {game1Complete && (
                  <div className="game-complete">
                    <GiPartyPopper className="party-icon" />
                    <h3>🎉 MASTER DETECTIVE! 🎉</h3>
                    <p>You found all OMKAR letters in just {attempts} attempts!</p>
                    <div className="completion-stats">
                      <div className="stat-complete">
                        <span className="stat-label">Accuracy:</span>
                        <span className="stat-value">{Math.round((5/attempts)*100)}%</span>
                      </div>
                      <div className="stat-complete">
                        <span className="stat-label">Final Score:</span>
                        <span className="stat-value">{game1Score}/100</span>
                      </div>
                    </div>
                    <p className="reward-message">
                      Special Decoded Message: "OMKAR = Only My King Always Radiates love! 👑💖"
                    </p>
                    <button 
                      className="next-game-button"
                      onClick={() => setActiveGame('mcq')}
                    >
                      Next Game: Our Love Quiz ❓
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ========== GAME 2: MCQ QUIZ ========== */}
            {activeGame === 'mcq' && (
              <div className="game-container">
                <h2 className="game-title">
                  <FaQuestionCircle /> Game 2: How Well Do You Know My Heart? <FaQuestionCircle />
                </h2>
                
                <div className="game-instruction">
                  <p>Answer these questions about us and our beautiful journey together 💑</p>
                  <div className="quiz-header">
                    <div className="quiz-stats">
                      <span className="quiz-progress">Question {currentQuestion + 1} of {mcqQuestions.length}</span>
                      <div className="score-display">
                        <FaTrophy className="trophy-icon" />
                        Score: {mcqScore.toFixed(1)}%
                      </div>
                      <div className="answered-count">
                        <FaCheck className="check-icon" />
                        Answered: {answeredQuestions.length}/{mcqQuestions.length}
                      </div>
                    </div>
                  </div>
                </div>

                {!mcqComplete ? (
                  <div className="mcq-game">
                    <div className="question-card">
                      <div className="question-header">
                        <span className="question-number">Q{currentQuestion + 1}</span>
                        <h3 className="question-text">
                          {mcqQuestions[currentQuestion].question}
                        </h3>
                      </div>
                      
                      <div className="options-container">
                        {mcqQuestions[currentQuestion].options.map((option, index) => {
                          const optionClass = getOptionClass(index);
                          
                          return (
                            <button
                              key={index}
                              className={`option-btn ${optionClass}`}
                              onClick={() => handleMcqAnswer(index)}
                              disabled={showMcqResult}
                            >
                              <div className="option-content">
                                <span className="option-letter">
                                  {String.fromCharCode(65 + index)}
                                </span>
                                <span className="option-text">{option}</span>
                              </div>
                              {showMcqResult && (
                                <span className="result-icon">
                                  {index === mcqQuestions[currentQuestion].correctAnswer ? '✅' : 
                                  index === selectedAnswer ? '❌' : ''}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      
                      {/* Hint Button */}
                      <div className="hint-section">
                        <button 
                          className="hint-toggle-btn"
                          onClick={() => setShowHint(!showHint)}
                        >
                          <FaLightbulb /> {showHint ? 'Hide Hint' : 'Need a hint?'}
                        </button>
                        
                        {showHint && (
                          <div className="hint-message">
                            💡 {mcqQuestions[currentQuestion].hint}
                          </div>
                        )}
                      </div>
                      
                      {/* Answer Feedback */}
                      {showMcqResult && (
                        <div className="answer-feedback">
                          {selectedAnswer === mcqQuestions[currentQuestion].correctAnswer ? (
                            <div className="correct-answer">
                              <div className="feedback-header">
                                <FaStar className="feedback-icon" />
                                <strong>Perfect Answer! 💖</strong>
                              </div>
                              <div className="feedback-content">
                                <div className="romantic-reveal">
                                  {mcqQuestions[currentQuestion].romanticReveal}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="wrong-answer">
                              <div className="feedback-header">
                                <FaTimes className="feedback-icon" />
                                <strong>That's okay! ❤️</strong>
                              </div>
                              <div className="feedback-content">
                                <p className="hint-text">{mcqQuestions[currentQuestion].hint}</p>
                                <div className="romantic-reveal">
                                  {mcqQuestions[currentQuestion].romanticReveal}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Navigation Buttons */}
                      <div className="mcq-navigation">
                        <button 
                          className="nav-btn-secondary"
                          onClick={handlePreviousQuestion}
                          disabled={currentQuestion === 0}
                        >
                          <FaChevronLeft /> Previous
                        </button>
                        
                        <div className="question-dots">
                          {mcqQuestions.map((_, index) => (
                            <span 
                              key={index}
                              className={`question-dot ${currentQuestion === index ? 'active' : ''} ${
                                answeredQuestions.includes(index) ? 'answered' : ''
                              }`}
                              onClick={() => {
                                if (answeredQuestions.includes(index) || index <= Math.max(...answeredQuestions, 0)) {
                                  setCurrentQuestion(index);
                                  setSelectedAnswer(null);
                                  setShowMcqResult(false);
                                  setShowHint(false);
                                }
                              }}
                            >
                              {index + 1}
                            </span>
                          ))}
                        </div>
                        
                        <button 
                          className="nav-btn-primary"
                          onClick={handleNextQuestion}
                          disabled={!showMcqResult}
                        >
                          {currentQuestion < mcqQuestions.length - 1 ? (
                            <>Next <FaChevronRight /></>
                          ) : (
                            <>See Results <FaTrophy /></>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="game-complete">
                    <GiPartyPopper className="party-icon" />
                    <h3>🎉 YOU KNOW MY HEART SO WELL! 🎉</h3>
                    <p className="final-score">Your final score: <strong>{mcqScore.toFixed(1)}%</strong></p>
                    
                    <div className="score-breakdown">
                      <div className="breakdown-item">
                        <span className="breakdown-label">Questions Answered:</span>
                        <span className="breakdown-value">{answeredQuestions.length}/{mcqQuestions.length}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Accuracy:</span>
                        <span className="breakdown-value">{((answeredQuestions.length/mcqQuestions.length)*100).toFixed(1)}%</span>
                      </div>
                    </div>
                    
                    <div className="score-message">
                      {mcqScore >= 95 ? (
                        <p>Perfect! You know me better than I know myself! 💖 Soulmate level! 🥰</p>
                      ) : mcqScore >= 80 ? (
                        <p>Amazing! You understand my heart completely! 😊 Perfect match! 💕</p>
                      ) : mcqScore >= 60 ? (
                        <p>Great job! We're learning each other more every day! 💘</p>
                      ) : (
                        <p>Good start! Let's spend more time sharing our hearts! 💝</p>
                      )}
                    </div>
                    
                    <p className="reward-message">
                      💝 Special Reward: "Every correct answer proves how much you care! I love you! 💕"
                    </p>
                    
                    <div className="result-buttons">
                      <button 
                        className="next-game-button"
                        onClick={() => setActiveGame('memory')}
                      >
                        Final Game: Our Memory Lane 📸
                      </button>
                      <button 
                        className="review-button"
                        onClick={() => {
                          setMcqComplete(false);
                          setCurrentQuestion(0);
                          setSelectedAnswer(null);
                          setShowMcqResult(false);
                        }}
                      >
                        Review Questions 🔄
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========== GAME 3: MEMORY LANE ========== */}
            {activeGame === 'memory' && (
              <div className="game-container">
                <h2 className="game-title">
                  <FaImages /> Game 3: Our Beautiful Journey <FaImages />
                </h2>
                
                <div className="game-instruction">
                  <p>Arrange our memories in the order they happened in our love story! 💑</p>
                  <p>Each memory holds a special place in my heart ❤️</p>
                  
                  <div className="game-controls">
                    <button className="control-btn" onClick={resetMemoryGame}>
                      <FaRandom /> Shuffle
                    </button>
                    <button className="control-btn" onClick={removeLastPhoto}>
                      <FaTimes /> Undo Last
                    </button>
                    <button 
                      className="control-btn hint-btn"
                      onClick={() => setShowMemoryHint(!showMemoryHint)}
                    >
                      <FaEye /> {showMemoryHint ? 'Hide Hints' : 'Show Memories'}
                    </button>
                  </div>
                  
                  <div className="selected-order">
                    <h4>Your Timeline:</h4>
                    <div className="order-display">
                      {selectedOrder.map((id, index) => {
                        const photo = memoryPhotos.find(p => p.id === id);
                        return (
                          <div key={id} className="order-item">
                            <span className="order-number">{index + 1}</span>
                            {photo && <span className="order-name">{photo.date}</span>}
                          </div>
                        );
                      })}
                      {selectedOrder.length === 0 && (
                        <p className="empty-order">Click photos to build our timeline</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="memory-game">
                  <div className="photos-grid">
                    {shuffledPhotos.map((photo) => (
                      <div 
                        key={photo.id}
                        className={`memory-photo ${selectedOrder.includes(photo.id) ? 'selected' : ''}`}
                        onClick={() => handlePhotoSelect(photo.id)}
                      >
                        <img src={photo.url} alt={photo.description} />
                        <div className="photo-overlay">
                          <h4>{photo.date}</h4>
                          {selectedOrder.includes(photo.id) && (
                            <div className="selection-indicator">
                              #{selectedOrder.indexOf(photo.id) + 1}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {memoryGameComplete && (
                  <div className="game-complete">
                    <GiPartyPopper className="party-icon" />
                    <h3>🎉 PERFECT TIMELINE! 🎉</h3>
                    <p>You perfectly arranged our beautiful journey!</p>
                    <div className="timeline-display">
                      {memoryPhotos.map((photo, index) => (
                        <div key={photo.id} className="timeline-item">
                          <div className="timeline-marker">{index + 1}</div>
                          <div className="timeline-content">
                            <strong>{photo.date}</strong> 
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="reward-message">
                      💝 FINAL UNLOCK: "All games completed! Return to the proposal for my final question! 🔓💌"
                    </p>
                    <button 
                      className="celebrate-button"
                      onClick={() => setActiveGame('proposal')}
                    >
                      <FaHeart /> See My Final Question! <FaHeart />
                    </button>
                  </div>
                )}

                {!memoryGameComplete && selectedOrder.length === memoryPhotos.length && (
                  <div className="game-feedback">
                    <FaTimes className="wrong-icon" />
                    <h3>Almost Perfect!</h3>
                    <p>The timeline isn't quite right. Let's try again together!</p>
                    <button className="try-again-btn" onClick={resetMemoryGame}>
                      Build Our Story Again
                    </button>
                  </div>
                )}
              </div>
            )}

            <footer className="footer">
              <p>Made with <FaHeart className="heartbeat" /> by Tanu for her Omkar 💑</p>
              <p className="hint">
                💖 Every game is a piece of my heart waiting for you to discover!
              </p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

export default App;