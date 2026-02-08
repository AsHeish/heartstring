import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useValentineData } from '../../context/ValentineContext';
import { PolaroidCard } from '../ui/PolaroidCard';
import './PhotoGallery.css';

interface PhotoGalleryProps {
    onContinue: () => void;
}

export const PhotoGallery = ({ onContinue }: PhotoGalleryProps) => {
    const data = useValentineData();
    const [currentIndex, setCurrentIndex] = useState(0);
    const photos = data.photos.length > 0 ? data.photos : [
        { url: '', caption: 'No photos yet 📸' }
    ];

    const handleNext = () => {
        if (currentIndex < photos.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const isLastPhoto = currentIndex === photos.length - 1;

    // If no photos, skip to next scene
    if (data.photos.length === 0) {
        return (
            <motion.div
                className="photo-gallery-scene"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.h2
                    className="gallery-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Our Beautiful Memories 📸
                </motion.h2>

                <p style={{ color: '#f8bbd9', marginBottom: '2rem' }}>
                    Many more memories to come...
                </p>

                <motion.button
                    className="continue-button"
                    onClick={onContinue}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Continue 💕
                </motion.button>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="photo-gallery-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.h2
                className="gallery-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Our Beautiful Memories 📸
            </motion.h2>

            <div className="photo-container">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100, rotate: 5 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        exit={{ opacity: 0, x: -100, rotate: -5 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    >
                        <PolaroidCard
                            imageUrl={photos[currentIndex].url}
                            caption={photos[currentIndex].caption}
                            rotation={Math.random() * 6 - 3}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="photo-counter">
                {currentIndex + 1} / {photos.length}
            </div>

            <div className="gallery-navigation">
                <motion.button
                    className="nav-button prev"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ←
                </motion.button>

                {isLastPhoto ? (
                    <motion.button
                        className="continue-button"
                        onClick={onContinue}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Continue 💕
                    </motion.button>
                ) : (
                    <motion.button
                        className="nav-button next"
                        onClick={handleNext}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        →
                    </motion.button>
                )}
            </div>

            <div className="photo-dots">
                {photos.map((_, i) => (
                    <motion.span
                        key={i}
                        className={`dot ${i === currentIndex ? 'active' : ''}`}
                        animate={{
                            scale: i === currentIndex ? 1.3 : 1,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};
