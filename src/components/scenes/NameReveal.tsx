import { motion } from 'framer-motion';
import { useValentineData } from '../../context/ValentineContext';
import './NameReveal.css';

interface NameRevealProps {
    onContinue: () => void;
}

export const NameReveal = ({ onContinue }: NameRevealProps) => {
    const data = useValentineData();

    return (
        <motion.div
            className="name-reveal-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="names-container">
                <motion.div
                    className="name his-name"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <span className="name-text">{data.hisName}</span>
                    <motion.div
                        className="name-sparkles"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    >
                        ✨
                    </motion.div>
                </motion.div>

                <motion.div
                    className="heart-connector"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.5, type: 'spring' }}
                >
                    <motion.span
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        ❤️
                    </motion.span>
                </motion.div>

                <motion.div
                    className="name her-name"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                >
                    <span className="name-text">{data.herName}</span>
                    <motion.div
                        className="name-sparkles"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    >
                        ✨
                    </motion.div>
                </motion.div>
            </div>

            <motion.p
                className="love-story-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 0.5 }}
            >
                A love story...
            </motion.p>

            <motion.button
                className="continue-button"
                onClick={onContinue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Continue 💕
            </motion.button>
        </motion.div>
    );
};
