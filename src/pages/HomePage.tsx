import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FloatingHearts } from '../components/ui/FloatingHearts';
import './HomePage.css';

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <FloatingHearts count={20} />

            <motion.div
                className="home-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="home-icon"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    💕
                </motion.div>

                <h1 className="home-title">Valentine's Special</h1>
                <p className="home-subtitle">
                    Create a beautiful, personalized experience for your special someone
                </p>

                <div className="home-buttons">
                    <motion.button
                        className="create-btn primary"
                        onClick={() => navigate('/create')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Create Valentine 💝
                    </motion.button>
                </div>

                <div className="home-features">
                    <div className="feature">
                        <span className="feature-icon">✨</span>
                        <span>Beautiful Animations</span>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">📸</span>
                        <span>Photo Memories</span>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">💌</span>
                        <span>Love Letter</span>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">🔐</span>
                        <span>Private & Secure</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
