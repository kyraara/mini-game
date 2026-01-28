import { avatarConfig } from '../data/dialogues';

function ChatBubble({ type, sender, text, avatar, showAvatar = true }) {
    const isSent = type === 'sent';
    const avatarEmoji = isSent ? avatarConfig.user.emoji : (avatar || avatarConfig.sender.emoji);

    return (
        <div className={`flex items-end gap-3 ${isSent ? 'flex-row-reverse' : 'flex-row'} animate-bubble-in`}>
            {/* Avatar */}
            {showAvatar && (
                <div className={`
          w-10 h-10 rounded-full flex items-center justify-center text-lg
          flex-shrink-0 shadow-md
          ${isSent
                        ? 'bg-gradient-to-br from-pink-400 to-pink-600'
                        : 'bg-gradient-to-br from-pink-200 to-pink-300'
                    }
        `}>
                    {avatarEmoji}
                </div>
            )}

            {/* Bubble */}
            <div className={`flex flex-col ${isSent ? 'items-end' : 'items-start'}`}>
                {!isSent && sender && (
                    <p className="text-xs font-semibold text-pink-500 mb-1.5 ml-1">{sender}</p>
                )}
                <div className={isSent ? 'chat-bubble-sent' : 'chat-bubble-received'}>
                    <p className={`text-sm md:text-base leading-relaxed ${isSent ? 'text-white' : 'text-gray-800'}`}>
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ChatBubble;
