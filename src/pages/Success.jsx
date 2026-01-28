import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { endings, personalMessage, getGiftLink } from '../data/dialogues';
import { useSound } from '../hooks/useSound';

function Success() {
    const navigate = useNavigate();
    const { playSuccess, playClick } = useSound();
    const [showContent, setShowContent] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [ending, setEnding] = useState(null);

    useEffect(() => {
        // Check if user actually won the game
        const gameWon = sessionStorage.getItem('gameWon');
        const gameLives = parseInt(sessionStorage.getItem('gameLives') || '0');

        if (gameWon !== 'true') {
            navigate('/');
            return;
        }

        setIsAuthorized(true);

        // Determine ending based on lives
        if (gameLives >= 3) {
            setEnding(endings.perfect);
        } else if (gameLives === 2) {
            setEnding(endings.great);
        } else {
            setEnding(endings.good);
        }

        // Play success sound
        setTimeout(() => playSuccess(), 500);

        // Trigger confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 60,
                origin: { x: 0, y: 0.7 },
                colors: ['#FF6B9D', '#FFB3D1', '#E91E63', '#FFD700', '#00D4FF']
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 60,
                origin: { x: 1, y: 0.7 },
                colors: ['#FF6B9D', '#FFB3D1', '#E91E63', '#FFD700', '#00D4FF']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();

        setTimeout(() => setShowContent(true), 500);
        setTimeout(() => setShowButton(true), 2000);
    }, [navigate]);

    const handleDownload = () => {
        playClick();
        const link = getGiftLink();
        window.open(link, '_blank');
    };

    if (!isAuthorized || !ending) {
        return null;
    }

    // Get lives for display
    const gameLives = parseInt(sessionStorage.getItem('gameLives') || '0');

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
            {/* Floating decorations */}
            <div className="absolute top-10 left-6 md:left-12 text-4xl md:text-5xl animate-float">🎉</div>
            <div className="absolute top-20 right-8 md:right-16 text-3xl md:text-4xl animate-float" style={{ animationDelay: '0.5s' }}>🌟</div>
            <div className="absolute bottom-40 left-8 md:left-16 text-3xl md:text-4xl animate-float" style={{ animationDelay: '1s' }}>✨</div>
            <div className="absolute bottom-20 right-6 md:right-12 text-4xl md:text-5xl animate-float" style={{ animationDelay: '1.5s' }}>🎊</div>

            {/* Main content */}
            <div className={`glass-card p-8 md:p-12 max-w-lg w-full text-center transition-all duration-700 ${showContent ? 'animate-bounce-in' : 'opacity-0 scale-50'}`}>
                {/* Trophy */}
                <div className="text-6xl md:text-7xl mb-4 animate-float">🏆</div>

                {/* Rating */}
                <div className="text-2xl mb-4">{ending.rating}</div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 leading-tight">
                    {ending.title}
                </h1>

                <p className="text-base md:text-lg text-pink-500 font-medium mb-4">
                    {ending.subtitle}
                </p>

                {/* Hearts display */}
                <div className="flex justify-center gap-2 text-2xl mb-6">
                    {[1, 2, 3].map((i) => (
                        <span key={i} className={i <= gameLives ? '' : 'opacity-30 grayscale'}>
                            {i <= gameLives ? '❤️' : '🖤'}
                        </span>
                    ))}
                </div>

                {/* Ending message */}
                <div className="bg-pink-50/80 rounded-2xl p-5 md:p-6 mb-6 text-left border border-pink-100">
                    <p className="text-gray-700 text-sm md:text-base whitespace-pre-line leading-relaxed">
                        {ending.message}
                    </p>
                </div>

                {/* Closing */}
                <p className="text-pink-600 font-semibold mb-6 text-base md:text-lg">
                    {personalMessage.closing}
                </p>

                {/* Download button */}
                <div className={`transition-all duration-500 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <button
                        onClick={handleDownload}
                        className="btn-primary animate-pulse-glow"
                    >
                        Download Hadiah 🎁
                    </button>

                    <p className="mt-4 text-sm text-gray-500">
                        Semoga bermanfaat! 😊
                    </p>
                </div>

                {/* Casual closing */}
                <div className="mt-6 pt-5 border-t border-pink-200/50">
                    <p className="text-sm text-gray-400 italic leading-relaxed">
                        "Kalau ada pertanyaan, chat aja ya! 👋"
                    </p>
                </div>
            </div>

            {/* Play again link */}
            <button
                onClick={() => {
                    playClick();
                    sessionStorage.clear();
                    navigate('/');
                }}
                className="mt-6 text-pink-500 hover:text-pink-600 underline text-sm font-medium transition-colors"
            >
                Main lagi
            </button>
        </div>
    );
}

export default Success;
