import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './MusicControl.css';

interface MusicControlProps {
    audioUrl?: string;
}

export const MusicControl = ({ audioUrl }: MusicControlProps) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        if (audioUrl) {
            audioRef.current = new Audio(audioUrl);
            audioRef.current.loop = true;
            audioRef.current.volume = 0.5;
        }

        // Try to play on first user interaction
        const handleFirstInteraction = () => {
            if (audioRef.current && !hasInteracted) {
                audioRef.current.play().catch(() => { });
                setHasInteracted(true);
            }
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, [audioUrl, hasInteracted]);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    if (!audioUrl) return null;

    return (
        <motion.button
            className="music-control"
            onClick={toggleMusic}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            title={isPlaying ? 'Pause music' : 'Play music'}
        >
            {isPlaying ? (
                <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    🎵
                </motion.span>
            ) : (
                <span>🔇</span>
            )}
        </motion.button>
    );
};
