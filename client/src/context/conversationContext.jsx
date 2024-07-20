import { createContext, useContext, useState } from 'react';

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    const value = {
        selectedConversation,
        setSelectedConversation,
        messages,
        setMessages,
    };

    return (
        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>
    );
};

export const useConversation = () => {
    const context = useContext(ConversationContext);
    if (context === undefined) {
        throw new Error('useConversation must be used within a ConversationProvider');
    }
    return context;
};