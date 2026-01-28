function OptionButton({ text, onClick, disabled, status }) {
    const getStatusClass = () => {
        if (status === 'correct') return 'correct animate-correct';
        if (status === 'wrong') return 'wrong animate-wrong';
        return '';
    };

    return (
        <button
            onClick={onClick}
            className={`option-btn ${getStatusClass()}`}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default OptionButton;
