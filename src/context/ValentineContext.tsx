import { createContext, useContext, ReactNode } from 'react';
import type { ValentineData } from '../services/valentineService';

interface ValentineContextType {
    data: ValentineData | null;
    isLoaded: boolean;
}

const ValentineContext = createContext<ValentineContextType>({
    data: null,
    isLoaded: false,
});

interface ValentineProviderProps {
    children: ReactNode;
    data: ValentineData | null;
}

export const ValentineProvider = ({ children, data }: ValentineProviderProps) => {
    return (
        <ValentineContext.Provider value={{ data, isLoaded: !!data }}>
            {children}
        </ValentineContext.Provider>
    );
};

export const useValentine = () => {
    const context = useContext(ValentineContext);
    if (!context) {
        throw new Error('useValentine must be used within a ValentineProvider');
    }
    return context;
};

// Helper hook to get data with fallback for static config
export const useValentineData = () => {
    const { data } = useValentine();

    // Fallback to static config if no dynamic data (for demo/development)
    if (!data) {
        // Return demo data
        return {
            hisName: 'Demo',
            herName: 'Demo',
            petName: 'Baby',
            herBirthdate: '2000-01-01',
            relationshipStartDate: '2023-01-01',
            photos: [],
            reasons: ['Demo reason 1', 'Demo reason 2'],
            loveMessage: 'This is a demo message.',
            id: 'demo',
            createdAt: new Date(),
        };
    }

    return data;
};
