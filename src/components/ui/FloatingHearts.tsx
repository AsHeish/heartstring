import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import './FloatingHearts.css';

interface Heart {
    id: number;
    x: number;
    delay: number;
    duration: number;
    size: number;
    opacity: number;
}

interface FloatingHeartsProps {
    count?: number;
    color?: string;
}

export const FloatingHearts = ({ count = 15, color = '#ff4081' }: FloatingHeartsProps) => {
    const [hearts, setHearts] = useState<Heart[]>([]);

    const generateHearts = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 8 + Math.random() * 6,
            size: 15 + Math.random() * 20,
            opacity: 0.3 + Math.random() * 0.4,
        }));
    }, [count]);

    useEffect(() => {
        setHearts(generateHearts);
    }, [generateHearts]);

    return (
        <div className="floating-hearts-container">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="floating-heart"
                    initial={{
                        y: '110vh',
                        x: `${heart.x}vw`,
                        opacity: 0,
                        scale: 0
                    }}
                    animate={{
                        y: '-10vh',
                        opacity: [0, heart.opacity, heart.opacity, 0],
                        scale: [0, 1, 1, 0.5],
                        x: `${heart.x + (Math.random() * 10 - 5)}vw`
                    }}
                    transition={{
                        duration: heart.duration,
                        delay: heart.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    style={{
                        fontSize: heart.size,
                        color: color,
                    }}
                >
                    ❤️
                </motion.div>
            ))}
        </div>
    );
};
