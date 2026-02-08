import { motion } from 'framer-motion';
import { useValentineData } from '../../context/ValentineContext';
import './JourneyBegins.css';

interface JourneyBeginsProps {
    onContinue: () => void;
}

export const JourneyBegins = ({ onContinue }: JourneyBeginsProps) => {
    const data = useValentineData();

    // Calculate days together
    const getDaysTogether = (): number => {
        const start = new Date(data.relationshipStartDate);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Format start date
    const getFormattedStartDate = (): string => {
        const date = new Date(data.relationshipStartDate);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const daysTogether = getDaysTogether();
    const startDate = getFormattedStartDate();

    return (
        <motion.div
            className="journey-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.h2
                className="journey-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                It all started on...
            </motion.h2>

            <motion.div
                className="date-reveal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
            >
                <span className="start-date">{startDate}</span>
            </motion.div>

            <motion.div
                className="days-counter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <motion.span
                    className="days-number"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
                >
                    {daysTogether}
                </motion.span>
                <span className="days-label">days of love & counting</span>
            </motion.div>

            <motion.div
                className="milestone-hearts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
            >
                {['💕', '💖', '💗', '💝', '💕'].map((heart, i) => (
                    <motion.span
                        key={i}
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 1,
                            delay: i * 0.1,
                            repeat: Infinity,
                        }}
                    >
                        {heart}
                    </motion.span>
                ))}
            </motion.div>

            <motion.button
                className="continue-button"
                onClick={onContinue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                See our memories 📸
            </motion.button>
        </motion.div>
    );
};
