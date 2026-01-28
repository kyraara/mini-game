import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { gameOverMessage } from '../data/dialogues';
import { useSound } from '../hooks/useSound';

function GameOver() {
    const navigate = useNavigate();
    const { playClick, playWrong } = useSound();

    // Play fail sound on mount
    useEffect(() => {
        const timer = setTimeout(() => playWrong(), 300);
        return () => clearTimeout(timer);
    }, []);

    const handleRetry = () => {
        playClick();
        sessionStorage.removeItem('gameWon');
        sessionStorage.removeItem('gameLives');
        navigate('/intro');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
            {/* Floating decorations */}
            <div className="absolute top-16 left-8 text-4xl animate-float opacity-50">💔</div>
            <div className="absolute top-24 right-12 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>😢</div>
            <div className="absolute bottom-32 left-12 text-3xl animate-float" style={{ animationDelay: '1s' }}>🥺</div>
            <div className="absolute bottom-20 right-8 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>💫</div>

            {/* Main content */}
            <div className="glass-card p-8 md:p-12 max-w-md w-full text-center animate-bounce-in">
                {/* Icon */}
                <div className="text-6xl md:text-7xl mb-6">😅</div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {gameOverMessage.title}
                </h1>

                <p className="text-base md:text-lg text-pink-500 font-medium mb-6">
                    {gameOverMessage.subtitle}
                </p>

                {/* Message */}
                <div className="bg-pink-50/80 rounded-2xl p-5 mb-8 border border-pink-100">
                    <p className="text-gray-700 text-sm md:text-base whitespace-pre-line leading-relaxed">
                        {gameOverMessage.message}
                    </p>
                </div>

                {/* Retry button */}
                <button
                    onClick={handleRetry}
                    className="btn-primary animate-pulse-glow"
                >
                    {gameOverMessage.retryText}
                </button>

                {/* Hearts display */}
                <div className="mt-6 flex justify-center gap-2 text-2xl">
                    <span className="opacity-30">🖤</span>
                    <span className="opacity-30">🖤</span>
                    <span className="opacity-30">🖤</span>
                </div>
            </div>
        </div>
    );
}

export default GameOver;
