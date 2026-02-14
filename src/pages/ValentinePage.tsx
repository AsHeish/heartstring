import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FloatingHearts } from '../components/ui/FloatingHearts';
import { MusicControl } from '../components/ui/MusicControl';
import { BirthdateVerification } from '../components/scenes/BirthdateVerification';
import { IntroScene } from '../components/scenes/IntroScene';
import { NameReveal } from '../components/scenes/NameReveal';
import { JourneyBegins } from '../components/scenes/JourneyBegins';
import { PhotoGallery } from '../components/scenes/PhotoGallery';
import { ReasonsCarousel } from '../components/scenes/ReasonsCarousel';
import { LoveLetter } from '../components/scenes/LoveLetter';
import { FinalProposal } from '../components/scenes/FinalProposal';
import { Celebration } from '../components/scenes/Celebration';
import { ValentineProvider } from '../context/ValentineContext';
import { getValentineData, verifyBirthdate, type ValentineData } from '../services/valentineService';
import './ValentinePage.css';

type Scene =
    | 'verification'
    | 'intro'
    | 'nameReveal'
    | 'journey'
    | 'photos'
    | 'reasons'
    | 'letter'
    | 'proposal'
    | 'celebration';

export const ValentinePage = () => {
    const { id } = useParams<{ id: string }>();
    const [currentScene, setCurrentScene] = useState<Scene>('verification');
    const [valentineData, setValentineData] = useState<ValentineData | null>(null);
    const [preloadedData, setPreloadedData] = useState<ValentineData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [verificationError, setVerificationError] = useState<string | undefined>();
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;

            try {
                // Preload data just to get the name for verification screen
                const data = await getValentineData(id);
                if (data) {
                    setPreloadedData(data);
                }
            } catch (error) {
                console.error('Error loading valentine:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [id]);

    const handleVerify = async (birthdate: string) => {
        if (!id) return;

        setIsVerifying(true);
        setVerificationError(undefined);

        try {
            const data = await verifyBirthdate(id, birthdate);
            if (data) {
                setValentineData(data);
                setCurrentScene('intro');
            } else {
                setVerificationError("Hmm, that doesn't seem right. Try again! 💕");
            }
        } catch (error) {
            setVerificationError("Something went wrong. Please try again.");
        } finally {
            setIsVerifying(false);
        }
    };

    const goToScene = (scene: Scene) => {
        setCurrentScene(scene);
    };

    if (isLoading) {
        return (
            <div className="valentine-page loading">
                <FloatingHearts count={10} />
                <div className="loading-content">
                    <div className="loading-heart">💕</div>
                    <p>Loading something special...</p>
                </div>
            </div>
        );
    }

    if (!preloadedData) {
        return (
            <div className="valentine-page not-found">
                <FloatingHearts count={10} />
                <div className="not-found-content">
                    <div className="not-found-icon">💔</div>
                    <h1>Valentine Not Found</h1>
                    <p>This link doesn't seem to exist.</p>
                </div>
            </div>
        );
    }

    const renderScene = () => {
        switch (currentScene) {
            case 'verification':
                return (
                    <BirthdateVerification
                        herName={preloadedData.herName}
                        onVerify={handleVerify}
                        error={verificationError}
                        isLoading={isVerifying}
                    />
                );
            case 'intro':
                return <IntroScene onContinue={() => goToScene('nameReveal')} />;
            case 'nameReveal':
                return <NameReveal onContinue={() => goToScene('journey')} />;
            case 'journey':
                return <JourneyBegins onContinue={() => goToScene('photos')} />;
            case 'photos':
                return <PhotoGallery onContinue={() => goToScene('reasons')} />;
            case 'reasons':
                return <ReasonsCarousel onContinue={() => goToScene('letter')} />;
            case 'letter':
                return <LoveLetter onContinue={() => goToScene('proposal')} />;
            case 'proposal':
                return <FinalProposal onYes={() => goToScene('celebration')} />;
            case 'celebration':
                return <Celebration />;
            default:
                return null;
        }
    };

    return (
        <ValentineProvider data={valentineData}>
            <div className="valentine-page">
                {currentScene !== 'verification' && (
                    <>
                        <FloatingHearts count={20} color="#ff4081" />
                        <MusicControl audioUrl={valentineData?.backgroundMusicUrl || '/audio/romantic.mp3'} />
                    </>
                )}

                <AnimatePresence mode="wait">
                    {renderScene()}
                </AnimatePresence>
            </div>
        </ValentineProvider>
    );
};
