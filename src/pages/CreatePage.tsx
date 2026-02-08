import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveValentineData, generateValentineId, uploadPhoto } from '../services/valentineService';
import { FloatingHearts } from '../components/ui/FloatingHearts';
import './CreatePage.css';

interface FormData {
    hisName: string;
    herName: string;
    petName: string;
    herBirthdate: string;
    relationshipStartDate: string;
    photos: { file: File | null; caption: string; preview: string }[];
    reasons: string[];
    loveMessage: string;
}

const initialFormData: FormData = {
    hisName: '',
    herName: '',
    petName: '',
    herBirthdate: '',
    relationshipStartDate: '',
    photos: Array(5).fill({ file: null, caption: '', preview: '' }),
    reasons: ['', '', '', '', ''],
    loveMessage: '',
};

export const CreatePage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [generatedLink, setGeneratedLink] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const totalSteps = 6;

    const updateField = (field: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handlePhotoChange = (index: number, file: File | null, caption?: string) => {
        const newPhotos = [...formData.photos];
        if (file) {
            newPhotos[index] = {
                file,
                caption: caption || newPhotos[index].caption,
                preview: URL.createObjectURL(file),
            };
        } else if (caption !== undefined) {
            newPhotos[index] = { ...newPhotos[index], caption };
        }
        updateField('photos', newPhotos);
    };

    const handleReasonChange = (index: number, value: string) => {
        const newReasons = [...formData.reasons];
        newReasons[index] = value;
        updateField('reasons', newReasons);
    };

    const addReason = () => {
        if (formData.reasons.length < 10) {
            updateField('reasons', [...formData.reasons, '']);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const valentineId = generateValentineId(
                formData.hisName,
                formData.herName,
                formData.herBirthdate
            );

            // Upload photos and get URLs
            const photoPromises = formData.photos
                .filter(p => p.file)
                .map(async (photo, index) => {
                    const url = await uploadPhoto(photo.file!, valentineId, index);
                    return { url, caption: photo.caption };
                });

            const uploadedPhotos = await Promise.all(photoPromises);

            // Save to Firestore
            await saveValentineData({
                hisName: formData.hisName,
                herName: formData.herName,
                petName: formData.petName || undefined,
                herBirthdate: formData.herBirthdate,
                relationshipStartDate: formData.relationshipStartDate,
                photos: uploadedPhotos,
                reasons: formData.reasons.filter(r => r.trim()),
                loveMessage: formData.loveMessage,
            });

            // Generate link
            const link = `${window.location.origin}/love/${valentineId}`;
            setGeneratedLink(link);
        } catch (err) {
            console.error('Error creating valentine:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const isStepValid = () => {
        switch (step) {
            case 1:
                return formData.hisName.trim() && formData.herName.trim();
            case 2:
                return formData.herBirthdate && formData.relationshipStartDate;
            case 3:
                return formData.photos.some(p => p.file);
            case 4:
                return formData.reasons.some(r => r.trim());
            case 5:
                return formData.loveMessage.trim().length > 20;
            default:
                return true;
        }
    };

    if (generatedLink) {
        return (
            <div className="create-page">
                <FloatingHearts count={15} />
                <motion.div
                    className="success-container"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="success-icon">🎉</div>
                    <h1>Your Valentine is Ready!</h1>
                    <p>Share this special link with her:</p>
                    <div className="link-box">
                        <input type="text" value={generatedLink} readOnly />
                        <button onClick={() => navigator.clipboard.writeText(generatedLink)}>
                            Copy 📋
                        </button>
                    </div>
                    <p className="hint">
                        She'll need to enter her birthdate ({formData.herBirthdate}) to see the surprise! 💕
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="create-page">
            <FloatingHearts count={10} />

            <div className="create-header">
                <h1>Create Your Valentine 💕</h1>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>
                <p className="step-indicator">Step {step} of {totalSteps}</p>
            </div>

            <div className="form-container">
                <AnimatePresence mode="wait">
                    {/* Step 1: Names */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            className="form-step"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <h2>Let's start with names ✨</h2>

                            <div className="form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.hisName}
                                    onChange={(e) => updateField('hisName', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Her Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter her name"
                                    value={formData.herName}
                                    onChange={(e) => updateField('herName', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Pet Name (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="Baby, Jaan, etc."
                                    value={formData.petName}
                                    onChange={(e) => updateField('petName', e.target.value)}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Dates */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            className="form-step"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <h2>Important Dates 📅</h2>

                            <div className="form-group">
                                <label>Her Birthdate (This will be her password! 🔐)</label>
                                <input
                                    type="date"
                                    value={formData.herBirthdate}
                                    onChange={(e) => updateField('herBirthdate', e.target.value)}
                                />
                                <small>She'll enter this to unlock the surprise</small>
                            </div>

                            <div className="form-group">
                                <label>When did you start dating?</label>
                                <input
                                    type="date"
                                    value={formData.relationshipStartDate}
                                    onChange={(e) => updateField('relationshipStartDate', e.target.value)}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Photos */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            className="form-step"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <h2>Add Your Memories 📸</h2>
                            <p className="step-description">Upload 3-5 photos together</p>

                            <div className="photos-grid">
                                {formData.photos.map((photo, index) => (
                                    <div key={index} className="photo-upload-card">
                                        {photo.preview ? (
                                            <div className="photo-preview">
                                                <img src={photo.preview} alt={`Photo ${index + 1}`} />
                                                <button
                                                    className="remove-photo"
                                                    onClick={() => {
                                                        const newPhotos = [...formData.photos];
                                                        newPhotos[index] = { file: null, caption: '', preview: '' };
                                                        updateField('photos', newPhotos);
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="photo-upload-label">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handlePhotoChange(index, e.target.files?.[0] || null)}
                                                />
                                                <span>+ Add Photo</span>
                                            </label>
                                        )}
                                        <input
                                            type="text"
                                            placeholder="Caption..."
                                            value={photo.caption}
                                            onChange={(e) => handlePhotoChange(index, null, e.target.value)}
                                            className="photo-caption-input"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Reasons */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            className="form-step"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <h2>Why Do You Love Her? 💗</h2>
                            <p className="step-description">Add 5-10 reasons</p>

                            <div className="reasons-list">
                                {formData.reasons.map((reason, index) => (
                                    <div key={index} className="reason-input-group">
                                        <span className="reason-number">#{index + 1}</span>
                                        <input
                                            type="text"
                                            placeholder={`Reason ${index + 1}...`}
                                            value={reason}
                                            onChange={(e) => handleReasonChange(index, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {formData.reasons.length < 10 && (
                                <button className="add-reason-btn" onClick={addReason}>
                                    + Add Another Reason
                                </button>
                            )}
                        </motion.div>
                    )}

                    {/* Step 5: Love Letter */}
                    {step === 5 && (
                        <motion.div
                            key="step5"
                            className="form-step"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <h2>Write Your Love Letter 💌</h2>
                            <p className="step-description">Pour your heart out!</p>

                            <div className="form-group">
                                <textarea
                                    placeholder="From the moment I met you..."
                                    value={formData.loveMessage}
                                    onChange={(e) => updateField('loveMessage', e.target.value)}
                                    rows={10}
                                />
                                <small>{formData.loveMessage.length} characters</small>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 6: Preview & Submit */}
                    {step === 6 && (
                        <motion.div
                            key="step6"
                            className="form-step preview-step"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <h2>Preview & Submit 🎉</h2>

                            <div className="preview-card">
                                <div className="preview-item">
                                    <strong>💑 Couple:</strong> {formData.hisName} & {formData.herName}
                                    {formData.petName && ` (${formData.petName})`}
                                </div>
                                <div className="preview-item">
                                    <strong>📅 Together since:</strong> {formData.relationshipStartDate}
                                </div>
                                <div className="preview-item">
                                    <strong>📸 Photos:</strong> {formData.photos.filter(p => p.file).length} uploaded
                                </div>
                                <div className="preview-item">
                                    <strong>💗 Reasons:</strong> {formData.reasons.filter(r => r.trim()).length} reasons
                                </div>
                                <div className="preview-item">
                                    <strong>💌 Letter:</strong> {formData.loveMessage.length} characters
                                </div>
                            </div>

                            {error && <p className="error-message">{error}</p>}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="form-navigation">
                    {step > 1 && (
                        <button className="nav-btn prev-btn" onClick={prevStep}>
                            ← Back
                        </button>
                    )}

                    {step < totalSteps ? (
                        <button
                            className="nav-btn next-btn"
                            onClick={nextStep}
                            disabled={!isStepValid()}
                        >
                            Next →
                        </button>
                    ) : (
                        <button
                            className="nav-btn submit-btn"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating... 💕' : 'Create Valentine! 🎉'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
