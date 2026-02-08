import { motion } from 'framer-motion';
import { useValentineData } from '../../context/ValentineContext';
import { TypewriterText } from '../ui/TypewriterText';
import { useState } from 'react';
import './LoveLetter.css';

interface LoveLetterProps {
    onContinue: () => void;
}

export const LoveLetter = ({ onContinue }: LoveLetterProps) => {
    const data = useValentineData();
    const [isComplete, setIsComplete] = useState(false);

    return (
        <motion.div
            className="love-letter-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="letter-container"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
            >
                <motion.div
                    className="letter-header"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <span className="letter-heart">💌</span>
                    <h2>A Letter For You</h2>
                </motion.div>

                <div className="letter-content">
                    <p className="letter-greeting">
                        My Dearest {data.petName || data.herName},
                    </p>

                    <div className="letter-body">
                        <TypewriterText
                            text={data.loveMessage}
                            speed={30}
                            onComplete={() => setIsComplete(true)}
                            showCursor={false}
                        />
                    </div>
                </div>

                <motion.div
                    className="letter-signature"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isComplete ? 1 : 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <span className="signature-hearts">💕</span>
                </motion.div>
            </motion.div>

            {isComplete && (
                <motion.button
                    className="continue-button"
                    onClick={onContinue}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    One more thing... 💕
                </motion.button>
            )}
        </motion.div>
    );
};
