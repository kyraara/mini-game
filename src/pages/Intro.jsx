import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { introMessages, avatarConfig } from '../data/dialogues';
import { useSound } from '../hooks/useSound';
import ChatBubble from '../components/ChatBubble';
import TypingIndicator from '../components/TypingIndicator';

function Intro() {
    const navigate = useNavigate();
    const chatEndRef = useRef(null);
    const { playPop, playClick } = useSound();

    const [messages, setMessages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [showButton, setShowButton] = useState(false);

    // Auto scroll
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Show messages one by one
    useEffect(() => {
        if (currentIndex >= introMessages.length) {
            setIsTyping(false);
            setTimeout(() => setShowButton(true), 500);
            return;
        }

        setIsTyping(true);

        const timer = setTimeout(() => {
            playPop();
            setMessages(prev => [...prev, {
                type: 'received',
                sender: introMessages[currentIndex].sender,
                avatar: introMessages[currentIndex].avatar,
                text: introMessages[currentIndex].message
            }]);
            setIsTyping(false);

            setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
            }, 800);
        }, 1500);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    const handleStart = () => {
        playClick();
        navigate('/game');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-pink-100">
            {/* Header */}
            <div className="game-header">
                <div className="max-w-xl mx-auto text-center">
                    <h1 className="text-lg md:text-xl font-bold text-gray-800">
                        💌 Pesan Untukmu
                    </h1>
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

            {/* Start button */}
            <div className="options-container">
                <div className="options-wrapper">
                    {showButton && (
                        <button
                            onClick={handleStart}
                            className="btn-primary w-full animate-bounce-in"
                        >
                            Aku Siap! 💪
                        </button>
                    )}

                    {!showButton && (
                        <p className="text-center text-gray-400 text-sm py-4">
                            Tunggu sebentar... 💭
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Intro;
