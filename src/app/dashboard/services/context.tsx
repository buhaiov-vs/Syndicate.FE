import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ContextType {
    lastRefresh: string;
    refreshPage: () => void;
}

const ServicesContext = createContext<ContextType | undefined>(undefined);

interface ProviderProps {
    children: ReactNode;
}

export const ServicesContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const [lastRefresh, setLastRefresh] = useState<string>(Date.now().toString());

    const refreshPage = () => {
        setLastRefresh(Date.now().toString());
    };

    return (
        <ServicesContext.Provider value={{ lastRefresh, refreshPage }}>
            {children}
        </ServicesContext.Provider>
    );
};

// Custom hook for consuming the context
export const useServicesContext = () => {
    const context = useContext(ServicesContext);
    if (!context) throw new Error("useServicesContext must be used within a ServicesContextProvider");
    return context;
};