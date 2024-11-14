"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Round =  Map<string, number>

type RoundContextProps = {
    round: Round;
    setRound: React.Dispatch<React.SetStateAction<Round>>;
}

const RoundContext = createContext<RoundContextProps | undefined>(undefined);

export const RoundContextProvider = ({ children }: { children: ReactNode }) => {
    const [round, setRound] = useState(new Map());

    return (
        <RoundContext.Provider value={{ round, setRound }}>
            {children}
        </RoundContext.Provider>
    );
};

export const useRoundContext = (): RoundContextProps => {
    const context = useContext(RoundContext);
    if (context === undefined) {
        throw new Error('useRound must be used within a RoundProvider');
    }
    return context;
};