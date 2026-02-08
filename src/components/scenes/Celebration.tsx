import { motion } from 'framer-motion';
import { useValentineData } from '../../context/ValentineContext';
import { ParticleEffect } from '../ui/ParticleEffect';
import './Celebration.css';

export const Celebration = () => {
    const data = useValentineData();

    return (
        <motion.div
            className="celebration-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <ParticleEffect type="confetti" isActive={true} />
            <ParticleEffect type="petals" isActive={true} />

            <motion.div
                className="celebration-content"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
            >
                <motion.div
                    className="celebration-hearts"
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                    }}
                >
                    💕💖💕
                </motion.div>

                <motion.h1
                    className="celebration-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Yay! 🎉
                </motion.h1>

                <motion.h2
                    className="celebration-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    I knew you'd say yes!
                </motion.h2>

                <motion.p
                    className="celebration-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    Happy Valentine's Day, {data.petName || data.herName}! 💕
                </motion.p>

                <motion.div
                    className="celebration-love"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8, type: 'spring' }}
                >
                    <p>
                        {data.hisName} ❤️ {data.herName}
                    </p>
                    <span className="forever">Forever & Always</span>
                </motion.div>
            </motion.div>

            <motion.div
                className="floating-emojis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                {['🥰', '😍', '💋', '🌹', '💝', '✨'].map((emoji, i) => (
                    <motion.span
                        key={i}
                        className="floating-emoji"
                        animate={{
                            y: [0, -30, 0],
                            x: [0, Math.sin(i) * 20, 0],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 3,
                            delay: i * 0.3,
                            repeat: Infinity,
                        }}
                        style={{
                            left: `${15 + i * 14}%`,
                        }}
                    >
                        {emoji}
                    </motion.span>
                ))}
            </motion.div>
        </motion.div>
    );
};
