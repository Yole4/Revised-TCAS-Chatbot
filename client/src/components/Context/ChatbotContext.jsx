import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { apostRequest, backendUrl } from "../../utils/Services";


export const ChatbotContext = createContext();

export const ChatbotContextProvider = ({ children }) => {

    const { userCredentials, isLoading, setIsLoading, userId } = useContext(AuthContext);

    const [isChatbot, setIsChatbot] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const [disableChat, setDisableChat] = useState(false);

    const handleChat = async (e) => {
        e.preventDefault();

        if (userInput && !disableChat) {
            setDisableChat(true);
            setMessages([...messages, { userMessage: userInput, botMessage: "..." }]);
            setUserInput('');

            try {
                const response = await apostRequest(`${backendUrl}/api/chatbot/chat-request`, { userInput });

                if (response.error) {
                    setTimeout(() => {
                        setDisableChat(false);
                        setMessages([...messages, { botMessage: response.message, userMessage: userInput }]);
                    }, 1000);
                }else{
                    setTimeout(() => {
                        setDisableChat(false);
                        setMessages([...messages, { botMessage: response.message, userMessage: userInput }]);
                    }, 1000);
                }
            } catch (error) {
                setDisableChat(false);
                console.log(error);
                setMessages([...messages, { userMessage: userInput, botMessage: "Something went wrong!" }]);
            }
        }
    };

    return <ChatbotContext.Provider value={{
        isChatbot, setIsChatbot, messages, setMessages, userInput, setUserInput, disableChat, setDisableChat, handleChat
    }}>{children}</ChatbotContext.Provider>
}