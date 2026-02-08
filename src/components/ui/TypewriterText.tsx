import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './TypewriterText.css';

interface TypewriterTextProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    onComplete?: () => void;
    showCursor?: boolean;
}

export const TypewriterText = ({
    text,
    speed = 50,
    delay = 0,
    className = '',
    onComplete,
    showCursor = true,
}: TypewriterTextProps) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setIsComplete(false);

        const timeout = setTimeout(() => {
            let currentIndex = 0;

            const interval = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    setIsComplete(true);
                    onComplete?.();
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, speed, delay, onComplete]);

    return (
        <motion.span
            className={`typewriter-text ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {displayedText}
            {showCursor && !isComplete && (
                <motion.span
                    className="typewriter-cursor"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    |
                </motion.span>
            )}
        </motion.span>
    );
};
