// Personalization Config - Update this for each client!
// This is the ONLY file you need to change for each couple

export interface Photo {
    url: string;
    caption: string;
}

export interface ValentineConfig {
    // Names
    herName: string;
    hisName: string;
    petName?: string; // Optional nickname like "Baby", "Jaan", etc.

    // Dates
    relationshipStartDate: string; // Format: "YYYY-MM-DD"

    // Photos - Add 5-10 photos for best experience
    photos: Photo[];

    // Reasons I love you - Add 5-10 reasons
    reasons: string[];

    // The final love message
    loveMessage: string;

    // Theme colors (using Valentine theme by default)
    theme: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
    };

    // Audio
    backgroundMusicUrl?: string;
}

// ============================================
// 💕 CUSTOMIZE BELOW FOR EACH CLIENT 💕
// ============================================

export const valentineData: ValentineConfig = {
    // Names of the couple
    herName: "Priya",
    hisName: "Rahul",
    petName: "Baby",

    // When did they start dating?
    relationshipStartDate: "2023-06-15",

    // Their photos together (add to public/photos folder)
    photos: [
        { url: "/photos/1.jpg", caption: "Where it all began 💕" },
        { url: "/photos/2.jpg", caption: "Our first trip together" },
        { url: "/photos/3.jpg", caption: "That magical evening" },
        { url: "/photos/4.jpg", caption: "Making memories" },
        { url: "/photos/5.jpg", caption: "Forever with you 💝" },
    ],

    // Why he loves her
    reasons: [
        "Your smile lights up my entire world",
        "The way you laugh at my terrible jokes",
        "How you always know when I need a hug",
        "Your kindness that touches everyone around you",
        "The way your eyes sparkle when you're happy",
        "How you make every ordinary moment special",
        "Your strength that inspires me every day",
    ],

    // The final love letter
    loveMessage: `From the moment I met you, I knew my life would never be the same.

Every day with you feels like a beautiful dream I never want to wake up from.

You're not just my girlfriend, you're my best friend, my confidant, my home.

Thank you for loving me, for believing in us, and for being the most amazing person I know.

I love you more than words could ever express.

Forever yours,
Rahul 💕`,

    // Valentine color theme
    theme: {
        primary: "#e91e63",      // Romantic pink
        secondary: "#f8bbd9",    // Light pink
        accent: "#ff4081",       // Vibrant pink
        background: "#1a0a10",   // Deep romantic dark
        text: "#ffffff",         // White text
    },

    // Background music (add to public/audio folder)
    backgroundMusicUrl: "/audio/romantic.mp3",
};

// Helper function to calculate days together
export const getDaysTogether = (): number => {
    const start = new Date(valentineData.relationshipStartDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

// Helper function to get formatted date
export const getFormattedStartDate = (): string => {
    const date = new Date(valentineData.relationshipStartDate);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
