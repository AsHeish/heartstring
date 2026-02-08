import { useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingHearts } from '../ui/FloatingHearts';
import './BirthdateVerification.css';

interface BirthdateVerificationProps {
    herName: string;
    onVerify: (birthdate: string) => void;
    error?: string;
    isLoading?: boolean;
}

export const BirthdateVerification = ({
    herName,
    onVerify,
    error,
    isLoading
}: BirthdateVerificationProps) => {
    const [birthdate, setBirthdate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (birthdate) {
            onVerify(birthdate);
        }
    };

    return (
        <motion.div
            className="verification-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <FloatingHearts count={15} />

            <motion.div
                className="verification-card"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
            >
                <motion.div
                    className="verification-icon"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    💝
                </motion.div>

                <h1 className="verification-title">
                    Hello, {herName}! 💕
                </h1>

                <p className="verification-subtitle">
                    Someone special made this for you...
                </p>

                <p className="verification-hint">
                    Enter your birthdate to unlock the surprise ✨
                </p>

                <form onSubmit={handleSubmit} className="verification-form">
                    <motion.div
                        className="date-input-container"
                        whileFocus={{ scale: 1.02 }}
                    >
                        <input
                            type="date"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            required
                            className="birthdate-input"
                        />
                    </motion.div>

                    {error && (
                        <motion.p
                            className="verification-error"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button
                        type="submit"
                        className="verify-button"
                        disabled={!birthdate || isLoading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isLoading ? (
                            <span>Opening... 💫</span>
                        ) : (
                            <span>Unlock My Surprise 💕</span>
                        )}
                    </motion.button>
                </form>

                <p className="verification-footer">
                    🔐 Your special date is the key
                </p>
            </motion.div>
        </motion.div>
    );
};
