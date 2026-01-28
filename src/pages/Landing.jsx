import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();
    const [isStarting, setIsStarting] = useState(false);

    const handleStart = () => {
        setIsStarting(true);
        // Clear any previous game state
        sessionStorage.removeItem('gameWon');
        sessionStorage.removeItem('gameLives');
        sessionStorage.removeItem('gameScore');

        setTimeout(() => {
            navigate('/intro');
        }, 500);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
            {/* Floating decorations */}
            <div className="absolute top-16 left-8 md:left-16 text-3xl md:text-4xl animate-float opacity-70">✨</div>
            <div className="absolute top-24 right-12 md:right-20 text-2xl md:text-3xl animate-float" style={{ animationDelay: '1s' }}>🎮</div>
            <div className="absolute bottom-40 left-12 md:left-24 text-2xl md:text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🎁</div>
            <div className="absolute bottom-24 right-8 md:right-16 text-3xl md:text-4xl animate-float" style={{ animationDelay: '1.5s' }}>🌟</div>

            {/* Main content */}
            <div className={`glass-card p-8 md:p-12 max-w-md w-full text-center transition-all duration-500 ${isStarting ? 'scale-95 opacity-0' : 'animate-slide-up'}`}>
                {/* Gift icon */}
                <div className="text-6xl md:text-7xl mb-8 animate-float">🎁</div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                    Mini Game Challenge!
                </h1>

                {/* Story */}
                <div className="space-y-3 mb-8">
                    <p className="text-base md:text-lg text-gray-600">
                        Aku iseng bikin mini game nih 😄
                    </p>
                    <p className="text-base md:text-lg font-medium text-pink-600">
                        Ada hadiah di akhir kalau kamu berhasil! 🎁
                    </p>
                </div>

                {/* Game info */}
                <div className="bg-pink-50/80 rounded-2xl p-5 mb-8 border border-pink-100">
                    <p className="text-sm text-pink-400 mb-3 font-medium">🎮 Cara Main:</p>
                    <div className="space-y-2 text-sm md:text-base text-gray-700">
                        <p>• Jawab 5 pertanyaan simple</p>
                        <p>• Kamu punya <span className="text-red-500 font-semibold">3 ❤️ nyawa</span></p>
                        <p>• Jawab salah = -1 nyawa</p>
                        <p>• Nyawa habis = Game Over 😅</p>
                    </div>
                </div>

                {/* Start button */}
                <button
                    onClick={handleStart}
                    className="btn-primary animate-pulse-glow"
                    disabled={isStarting}
                >
                    {isStarting ? 'Loading...' : 'Mulai! 🚀'}
                </button>

                {/* Footer hint */}
                <p className="mt-6 text-sm text-gray-400">
                    Good luck! 🍀
                </p>
            </div>
        </div>
    );
}

export default Landing;
