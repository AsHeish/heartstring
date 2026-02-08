import { motion } from 'framer-motion';
import { TypewriterText } from '../ui/TypewriterText';
import './IntroScene.css';

interface IntroSceneProps {
    onContinue: () => void;
}

export const IntroScene = ({ onContinue }: IntroSceneProps) => {
    return (
        <motion.div
            className="intro-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="intro-content">
                <motion.div
                    className="intro-sparkle"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    ✨
                </motion.div>

                <h1 className="intro-title">
                    <TypewriterText
                        text="Someone special made this for you..."
                        speed={60}
                        delay={500}
                    />
                </h1>

                <motion.button
                    className="intro-button"
                    onClick={onContinue}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span>Open with love</span>
                    <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        💕
                    </motion.span>
                </motion.button>
            </div>

            <div className="intro-particles">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="particle"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0,
                        }}
                        animate={{
                            y: [null, Math.random() * window.innerHeight],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    >
                        ✦
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
