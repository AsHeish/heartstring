import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useValentineData } from '../../context/ValentineContext';
import { TypewriterText } from '../ui/TypewriterText';
import './ReasonsCarousel.css';

interface ReasonsCarouselProps {
    onContinue: () => void;
}

export const ReasonsCarousel = ({ onContinue }: ReasonsCarouselProps) => {
    const data = useValentineData();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showReason, setShowReason] = useState(true);
    const reasons = data.reasons.length > 0 ? data.reasons : ['You are amazing!'];

    const handleNext = () => {
        if (currentIndex < reasons.length - 1) {
            setShowReason(false);
            setTimeout(() => {
                setCurrentIndex(currentIndex + 1);
                setShowReason(true);
            }, 300);
        }
    };

    const isLastReason = currentIndex === reasons.length - 1;

    return (
        <motion.div
            className="reasons-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.h2
                className="reasons-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Reasons I Love You 💕
            </motion.h2>

            <motion.div
                className="reason-number"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
            >
                #{currentIndex + 1}
            </motion.div>

            <AnimatePresence mode="wait">
                {showReason && (
                    <motion.div
                        key={currentIndex}
                        className="reason-card"
                        initial={{ opacity: 0, y: 50, rotateX: -20 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: -50, rotateX: 20 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    >
                        <div className="reason-content">
                            <span className="reason-quote">"</span>
                            <TypewriterText
                                text={reasons[currentIndex]}
                                speed={40}
                                showCursor={false}
                            />
                            <span className="reason-quote">"</span>
                        </div>

                        <motion.div
                            className="reason-hearts"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            {['💗', '💖', '💕'].map((heart, i) => (
                                <motion.span
                                    key={i}
                                    animate={{
                                        y: [-5, 5, -5],
                                        rotate: [-5, 5, -5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: i * 0.2,
                                        repeat: Infinity,
                                    }}
                                >
                                    {heart}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="reasons-progress">
                {reasons.map((_, i) => (
                    <motion.div
                        key={i}
                        className={`progress-dot ${i <= currentIndex ? 'filled' : ''}`}
                        animate={{
                            scale: i === currentIndex ? 1.3 : 1,
                        }}
                    />
                ))}
            </div>

            {isLastReason ? (
                <motion.button
                    className="continue-button"
                    onClick={onContinue}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    There's more... 💌
                </motion.button>
            ) : (
                <motion.button
                    className="next-reason-button"
                    onClick={handleNext}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    Next reason 💕
                </motion.button>
            )}
        </motion.div>
    );
};
