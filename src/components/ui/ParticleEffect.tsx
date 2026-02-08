import { motion } from 'framer-motion';
import './ParticleEffect.css';
import { useEffect, useState } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
}

interface ParticleEffectProps {
    type: 'confetti' | 'petals' | 'sparkles';
    isActive: boolean;
}

const colors = {
    confetti: ['#ff4081', '#e91e63', '#f8bbd9', '#ffeb3b', '#ff9800', '#4caf50', '#2196f3'],
    petals: ['#ffb6c1', '#ff69b4', '#ff1493', '#ffc0cb', '#f8bbd9'],
    sparkles: ['#ffd700', '#fff', '#ffeb3b', '#ff4081'],
};

const shapes = {
    confetti: '■',
    petals: '❀',
    sparkles: '✦',
};

export const ParticleEffect = ({ type, isActive }: ParticleEffectProps) => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        if (!isActive) {
            setParticles([]);
            return;
        }

        const particleColors = colors[type];
        const count = type === 'confetti' ? 100 : 50;

        const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: -10 - Math.random() * 20,
            size: 10 + Math.random() * 20,
            color: particleColors[Math.floor(Math.random() * particleColors.length)],
            duration: 2 + Math.random() * 3,
        }));

        setParticles(newParticles);

        // Add more particles periodically
        const interval = setInterval(() => {
            setParticles(prev => [
                ...prev.slice(-80),
                ...Array.from({ length: 20 }, (_, i) => ({
                    id: Date.now() + i,
                    x: Math.random() * 100,
                    y: -10,
                    size: 10 + Math.random() * 20,
                    color: particleColors[Math.floor(Math.random() * particleColors.length)],
                    duration: 2 + Math.random() * 3,
                }))
            ]);
        }, 500);

        return () => clearInterval(interval);
    }, [isActive, type]);

    if (!isActive) return null;

    return (
        <div className="particle-effect-container">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="particle"
                    initial={{
                        x: `${particle.x}vw`,
                        y: `${particle.y}vh`,
                        opacity: 1,
                        rotate: 0,
                    }}
                    animate={{
                        y: '110vh',
                        rotate: type === 'confetti' ? 720 : 360,
                        x: `${particle.x + (Math.random() * 20 - 10)}vw`,
                    }}
                    transition={{
                        duration: particle.duration,
                        ease: 'linear',
                    }}
                    style={{
                        fontSize: particle.size,
                        color: particle.color,
                    }}
                >
                    {shapes[type]}
                </motion.div>
            ))}
        </div>
    );
};
