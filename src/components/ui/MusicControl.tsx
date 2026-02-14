import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import './MusicControl.css';

interface MusicControlProps {
    audioUrl?: string;
}

export const MusicControl = ({ audioUrl }: MusicControlProps) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const hasInteractedRef = useRef(false);

    // Create / swap the audio element only when audioUrl changes
    useEffect(() => {
        if (!audioUrl) return;

        // Pause & discard old audio
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = '';
        }

        const audio = new Audio(audioUrl);
        audio.loop = true;
        audio.volume = 0.5;
        audioRef.current = audio;

        // If user already interacted, auto-play the new track
        if (hasInteractedRef.current) {
            audio.play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, [audioUrl]);

    // Listen for the very first user interaction to start playback
    useEffect(() => {
        const handleFirstInteraction = () => {
            if (hasInteractedRef.current) return;
            hasInteractedRef.current = true;

            if (audioRef.current) {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false));
            }

            // Remove listeners once triggered
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
        };
    }, []);

    const toggleMusic = useCallback(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(() => { });
        }
    }, [isPlaying]);

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
