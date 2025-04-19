import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const MessContext = createContext();

// Crear un provider
export const MessProvider = ({ children }) => {
    const [chats, setChats] = useState([]);

    const cargarChats = async () => {
        try {
            const response = await fetch('http://localhost:3000/mensajes.json');
            const data = await response.json();
            setChats(data.chats.map((chat, i) => ({ ...chat, id: i }))); // Añadir id a cada chat
        } catch (error) {
            console.error("Error al cargar los chats", error);
        }
    }

    useEffect(() => {
        cargarChats();
    }, []);

    return (
        <MessContext.Provider value={{ chats }}>
            {children}
        </MessContext.Provider>
    );
};

// Crear un hook para acceder al contexto

export const useMessContext = () => {
    const context = useContext(MessContext);
    if (!context) {
        throw new Error('useMessContext debe ser usado dentro de un MessProvider');
    }
    return context;
};
export { MessContext };
