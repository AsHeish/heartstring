import { motion } from 'framer-motion';
import { useValentineData } from '../../context/ValentineContext';
import { TeaseButton } from '../ui/TeaseButton';
import './FinalProposal.css';

interface FinalProposalProps {
    onYes: () => void;
}

export const FinalProposal = ({ onYes }: FinalProposalProps) => {
    const data = useValentineData();

    return (
        <motion.div
            className="proposal-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="proposal-hearts"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
            >
                {['💗', '💖', '💕', '💝', '💗'].map((heart, i) => (
                    <motion.span
                        key={i}
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.15,
                            repeat: Infinity,
                        }}
                    >
                        {heart}
                    </motion.span>
                ))}
            </motion.div>

            <motion.h1
                className="proposal-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                {data.petName || data.herName}...
            </motion.h1>

            <motion.h2
                className="proposal-question"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
            >
                Will you be my Valentine? 💕
            </motion.h2>

            <motion.div
                className="proposal-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <TeaseButton onYesClick={onYes} />
            </motion.div>

            <motion.p
                className="proposal-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
            >
                (Try clicking "No" 😉)
            </motion.p>
        </motion.div>
    );
};
