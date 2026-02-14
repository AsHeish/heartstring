import { motion } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
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
    const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
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

    const escapeButton = useCallback(() => {
        const button = noButtonRef.current;
        if (!button) return;

        const buttonRect = button.getBoundingClientRect();
        const padding = 20;

        // Use the full viewport, keeping the button fully visible
        const maxX = window.innerWidth - buttonRect.width - padding;
        const maxY = window.innerHeight - buttonRect.height - padding;

        // Random position anywhere on the viewport
        const newX = padding + Math.random() * (maxX - padding);
        const newY = padding + Math.random() * (maxY - padding);

        setNoPosition({ x: newX, y: newY });
        setEscapeCount((prev) => prev + 1);
        setNoButtonText(escapeTexts[Math.min(escapeCount, escapeTexts.length - 1)]);
    }, [escapeCount, escapeTexts]);

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
                className={`no-button ${noPosition ? 'no-button--escaped' : ''}`}
                onHoverStart={escapeButton}
                onTouchStart={escapeButton}
                animate={
                    noPosition
                        ? { left: noPosition.x, top: noPosition.y }
                        : {}
                }
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
