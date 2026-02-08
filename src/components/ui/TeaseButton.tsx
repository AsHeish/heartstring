import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import './TeaseButton.css';

interface TeaseButtonProps {
    onYesClick: () => void;
    yesText?: string;
    noText?: string;
}

export const TeaseButton = ({
    onYesClick,
    yesText = "Yes! 💕",
    noText = "No"
}: TeaseButtonProps) => {
    const noButtonRef = useRef<HTMLButtonElement>(null);
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
    const [escapeCount, setEscapeCount] = useState(0);
    const [noButtonText, setNoButtonText] = useState(noText);

    const escapeTexts = [
        "No",
        "Are you sure?",
        "Really?! 😢",
        "Please? 🥺",
        "Think again!",
        "I love you!",
        "💔",
        "Okay... just kidding!",
        "You can't catch me!",
        "🏃‍♂️💨",
    ];

    const handleNoHover = () => {
        // Calculate random new position
        const maxX = window.innerWidth - 150;
        const maxY = window.innerHeight - 100;

        const newX = Math.random() * maxX - maxX / 2;
        const newY = Math.random() * maxY - maxY / 2;

        setNoPosition({ x: newX, y: newY });
        setEscapeCount((prev) => prev + 1);
        setNoButtonText(escapeTexts[Math.min(escapeCount, escapeTexts.length - 1)]);
    };

    return (
        <div className="tease-button-container">
            <motion.button
                className="yes-button"
                onClick={onYesClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    boxShadow: [
                        '0 0 20px rgba(255, 64, 129, 0.5)',
                        '0 0 40px rgba(255, 64, 129, 0.8)',
                        '0 0 20px rgba(255, 64, 129, 0.5)',
                    ],
                }}
                transition={{
                    boxShadow: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    },
                }}
            >
                {yesText}
            </motion.button>

            <motion.button
                ref={noButtonRef}
                className="no-button"
                onHoverStart={handleNoHover}
                animate={{
                    x: noPosition.x,
                    y: noPosition.y,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                }}
            >
                {noButtonText}
            </motion.button>
        </div>
    );
};
