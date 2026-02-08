import { motion } from 'framer-motion';
import './PolaroidCard.css';

interface PolaroidCardProps {
    imageUrl: string;
    caption: string;
    rotation?: number;
}

export const PolaroidCard = ({ imageUrl, caption, rotation = 0 }: PolaroidCardProps) => {
    return (
        <motion.div
            className="polaroid-card"
            initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
            animate={{ opacity: 1, scale: 1, rotate: rotation }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            <div className="polaroid-image-container">
                <img src={imageUrl} alt={caption} className="polaroid-image" />
            </div>
            <p className="polaroid-caption">{caption}</p>
        </motion.div>
    );
};
