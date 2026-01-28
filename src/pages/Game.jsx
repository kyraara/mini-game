import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { dialogues, shuffleOptions } from '../data/dialogues';
import { useSound } from '../hooks/useSound';
import ChatBubble from '../components/ChatBubble';
import OptionButton from '../components/OptionButton';
import ProgressBar from '../components/ProgressBar';
import TypingIndicator from '../components/TypingIndicator';
import FloatingHeart from '../components/FloatingHeart';

function Game() {
    const navigate = useNavigate();
    const chatEndRef = useRef(null);
    const { playClick, playCorrect, playWrong, playPop } = useSound();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [messages, setMessages] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [isTyping, setIsTyping] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [hearts, setHearts] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);

    // Lives system - start with 3 lives
    const [lives, setLives] = useState(3);

    const currentDialog = dialogues[currentIndex];

    // Shuffle options once per question - memoized so it doesn't reshuffle on re-render
    const shuffledOptions = useMemo(() => {
        return shuffleOptions(currentDialog.options);
    }, [currentIndex]);

    // Auto scroll to bottom
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Show initial message with typing effect
    useEffect(() => {
        setIsTyping(true);
        setShowOptions(false);
        setSelectedOption(null);

        const timer = setTimeout(() => {
            playPop();
            setMessages(prev => [...prev, {
                type: 'received',
                sender: currentDialog.sender,
                avatar: currentDialog.avatar,
                text: currentDialog.message
            }]);
            setIsTyping(false);

            setTimeout(() => setShowOptions(true), 300);
        }, 1500);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    // Create floating heart
    const createHeart = () => {
        const id = Date.now() + Math.random();
        const left = Math.random() * 80 + 10;
        setHearts(prev => [...prev, { id, left }]);

        setTimeout(() => {
            setHearts(prev => prev.filter(h => h.id !== id));
        }, 2500);
    };

    const handleOptionClick = (option, index) => {
        if (selectedOption !== null) return;

        playClick();
        setSelectedOption(index);
        setShowOptions(false);

        // Add user's answer
        setMessages(prev => [...prev, {
            type: 'sent',
            text: option.text
        }]);

        // Show response after delay
        setTimeout(() => {
            setIsTyping(true);

            setTimeout(() => {
                setMessages(prev => [...prev, {
                    type: 'received',
                    sender: currentDialog.sender,
                    avatar: currentDialog.avatar,
                    text: option.response
                }]);
                setIsTyping(false);

                if (option.correct) {
                    playCorrect();
                    setCorrectCount(prev => prev + 1);

                    // Create hearts
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            createHeart();
                            playPop();
                        }, i * 120);
                    }

                    // Move to next or finish
                    setTimeout(() => {
                        if (currentIndex < dialogues.length - 1) {
                            setCurrentIndex(prev => prev + 1);
                        } else {
                            // Game won!
                            sessionStorage.setItem('gameWon', 'true');
                            sessionStorage.setItem('gameLives', String(lives));
                            sessionStorage.setItem('gameScore', String(correctCount + 1));
                            navigate('/success');
                        }
                    }, 1500);
                } else {
                    playWrong();
                    const newLives = lives - 1;
                    setLives(newLives);

                    // Check if game over
                    if (newLives <= 0) {
                        setTimeout(() => {
                            navigate('/gameover');
                        }, 1500);
                    } else {
                        // Show options again
                        setTimeout(() => {
                            setShowOptions(true);
                            setSelectedOption(null);
                        }, 1500);
                    }
                }
            }, 1000);
        }, 500);
    };

    const getOptionStatus = (option, index) => {
        if (selectedOption !== index) return null;
        return option.correct ? 'correct' : 'wrong';
    };

    // Render hearts display
    const renderHearts = () => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                    <span
                        key={i}
                        className={`text-xl transition-all duration-300 ${i <= lives ? 'scale-100' : 'scale-75 opacity-30 grayscale'
                            }`}
                    >
                        {i <= lives ? '❤️' : '🖤'}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-pink-100">
            {/* Floating hearts */}
            {hearts.map(heart => (
                <FloatingHeart key={heart.id} id={heart.id} left={heart.left} />
            ))}

            {/* Header with progress and lives */}
            <div className="game-header">
                <div className="max-w-xl mx-auto">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <span className="text-sm md:text-base font-medium text-gray-600">
                                Level {currentDialog.level || currentIndex + 1} / {dialogues.length}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            {renderHearts()}
                        </div>
                    </div>
                    <ProgressBar current={currentIndex} total={dialogues.length} />
                </div>
            </div>

            {/* Chat area */}
            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((msg, idx) => (
                        <ChatBubble
                            key={idx}
                            type={msg.type}
                            sender={msg.sender}
                            avatar={msg.avatar}
                            text={msg.text}
                        />
                    ))}

                    {isTyping && <TypingIndicator />}

                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* Options area - now with shuffled options! */}
            <div className="options-container">
                <div className="options-wrapper">
                    {showOptions && shuffledOptions.map((option, idx) => (
                        <OptionButton
                            key={idx}
                            text={option.text}
                            onClick={() => handleOptionClick(option, idx)}
                            disabled={selectedOption !== null}
                            status={getOptionStatus(option, idx)}
                        />
                    ))}

                    {!showOptions && !isTyping && selectedOption === null && (
                        <p className="text-center text-gray-400 text-sm py-4">
                            Tunggu sebentar... 💭
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Game;
