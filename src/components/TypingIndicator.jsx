function TypingIndicator() {
    return (
        <div className="flex justify-start animate-bubble-in">
            <div className="chat-bubble-received">
                <div className="typing-dots">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                </div>
            </div>
        </div>
    );
}

export default TypingIndicator;
