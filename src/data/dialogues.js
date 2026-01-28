// Dialog data for Chat Simulator game
// Konteks: Ngasih tools/app yang sudah dijanjikan lewat mini game!

// Avatar configuration (Kamu = cowok yang bikin game, Dia = cewek yang main)
export const avatarConfig = {
    sender: {
        name: "Dia",
        emoji: "🧑",
        color: "#FF6B9D"
    },
    user: {
        name: "Kamu",
        emoji: "👧",
        color: "#E91E63"
    }
};

// Intro messages - konteks ngasih tools/app
export const introMessages = [
    {
        sender: avatarConfig.sender.name,
        avatar: avatarConfig.sender.emoji,
        message: "Haii! 👋"
    },
    {
        sender: avatarConfig.sender.name,
        avatar: avatarConfig.sender.emoji,
        message: "Inget gak aku pernah bilang mau kasih kamu sesuatu?"
    },
    {
        sender: avatarConfig.sender.name,
        avatar: avatarConfig.sender.emoji,
        message: "Nah ini dia! Tapi aku bikin seru dikit 😄"
    },
    {
        sender: avatarConfig.sender.name,
        avatar: avatarConfig.sender.emoji,
        message: "Kamu harus jawab beberapa pertanyaan dulu baru bisa download 🎁"
    },
    {
        sender: avatarConfig.sender.name,
        avatar: avatarConfig.sender.emoji,
        message: "Tenang, gampang kok! Kamu punya 3 ❤️ nyawa. Ready? 😏"
    }
];

// Main game dialogues - Fun & casual, cocok untuk baru kenal
export const dialogues = [
    {
        id: 1,
        level: 1,
        sender: avatarConfig.sender.name,
        avatar: avatarConfig.sender.emoji,
        message: "Oke mulai yang gampang dulu... Kamu tim pagi atau tim malam?",
        options: [
            {
                text: "Tim pagi dong, produktif!",
                correct: true,
                response: "Wah rajin! Noted ya!"
            },
            {
                text: "Tim malam, lebih fokus",
                correct: true,
                response: "Sama dong! Malam lebih tenang ya 🌙"
            },
            {
                text: "Gak dua-duanya, tim tidur aja 😴",
                correct: false,
                response: "Haha jujur banget!"
            }
        ]
    },
    {
        id: 2,
        level: 2,
        sender: avatarConfig.sender.name,
        avatar: avatarConfig.sender.emoji,
        message: "Kalau lagi gabut, biasanya ngapain?",
        options: [
            {
                text: "Scroll TikTok/Reels sampai lupa waktu",
                correct: false,
                response: "Relatable sih haha"
            },
            {
                text: "Belajar hal baru atau explore sesuatu",
                correct: true,
                response: "Nice! Suka yang produktif ya!"
            },
            {
                text: "Tidur lagi aja",
                correct: false,
                response: "Hmm bisa sih haha"
            }
        ]
    },
    {
        id: 3,
        level: 3,
        sender: avatarConfig.sender.name,
        avatar: avatarConfig.sender.emoji,
        message: "Kalau dikasih tools/app gratis, yang paling kamu butuhin apa?",
        options: [
            {
                text: "Yang bisa bantu produktivitas!",
                correct: true,
                response: "Pas banget! Semoga yang aku kasih berguna 😁"
            },
            {
                text: "Yang buat hiburan aja",
                correct: false,
                response: "Understandable 😄"
            },
            {
                text: "Gak tau, yang penting gratisan",
                correct: false,
                response: "Haha jujur banget!"
            }
        ]
    },
    {
        id: 4,
        level: 4,
        sender: avatarConfig.sender.name,
        avatar: avatarConfig.sender.emoji,
        message: "Weekend nanti ada rencana gak?",
        options: [
            {
                text: "Rebahan aja di rumah",
                correct: false,
                response: "Self-care time!"
            },
            {
                text: "Coba explore tempat baru / ngerjain sesuatu",
                correct: true,
                response: "Seru! Semangat ya! ✨"
            },
            {
                text: "Belum tau sih, lihat mood",
                correct: false,
                response: "Fleksibel ya haha"
            }
        ]
    },
    {
        id: 5,
        level: 5,
        sender: avatarConfig.sender.name,
        avatar: avatarConfig.sender.emoji,
        message: "Last question! Menurut kamu, game ini gimana? 😁",
        options: [
            {
                text: "Gaje banget sih haha",
                correct: false,
                response: "Yah 😂 tapi makasih udah main!"
            },
            {
                text: "Lumayan kreatif, unik caranya!",
                correct: true,
                response: "Yeay! Makasih udah main sampai akhir! 🎉"
            },
            {
                text: "Biasa aja sih",
                correct: false,
                response: "Oke noted buat improve 😅"
            }
        ]
    }
];

// Utility function to shuffle options randomly
export const shuffleOptions = (options) => {
    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Multiple endings based on remaining lives
export const endings = {
    perfect: {
        hearts: 3,
        title: "PERFECT! 🏆",
        subtitle: "3/3 ❤️ - Keren banget!",
        message: `Wah gak salah satu pun!

Ini dia yang udah aku janjiin 😄
Semoga tools ini berguna buat kamu!`,
        rating: "⭐⭐⭐"
    },
    great: {
        hearts: 2,
        title: "Great! 🎉",
        subtitle: "2/3 ❤️ - Hampir perfect!",
        message: `Almost there!

Gapapa, yang penting berhasil 😁
Ini hadiahnya!`,
        rating: "⭐⭐"
    },
    good: {
        hearts: 1,
        title: "You Made It! 😅",
        subtitle: "1/3 ❤️ - Selamat!",
        message: `Fiuh! Hampir aja tadi!

At least kamu berhasil 😂
Nih tools yang aku janjiin!`,
        rating: "⭐"
    }
};

// Game over message
export const gameOverMessage = {
    title: "Game Over! 😅",
    subtitle: "Nyawa kamu habis...",
    message: "Belum beruntung nih 😅\n\nTapi gapapa, coba lagi!\nPasti bisa! 💪",
    retryText: "Coba Lagi 🔄"
};

// Personal message shown on success page
export const personalMessage = {
    title: "Selamat! 🎉",
    subtitle: "Kamu berhasil!",
    message: `Makasih udah mau main game iseng ini 😄

Ini tools yang udah aku janjiin kemarin!
Semoga bermanfaat ya!

Kalau ada yang bingung, chat aja 👋`,
    closing: "Enjoy! 🎁"
};

// Encoded download link (Base64) - REPLACE THIS WITH YOUR ACTUAL LINK
// To encode: btoa("https://drive.google.com/your-link")
export const encodedGiftLink = "aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL3lvdXItbGluay1oZXJl";

// Decode function
export const getGiftLink = () => {
    try {
        return atob(encodedGiftLink);
    } catch {
        return "#";
    }
};
