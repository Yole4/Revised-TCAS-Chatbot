import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { apostRequest, backendUrl } from "../../utils/Services";


export const ChatbotContext = createContext();

export const ChatbotContextProvider = ({ children }) => {

    const { userCredentials, isLoading, setIsLoading, userId } = useContext(AuthContext);

    // ################################################################ CHATBOT REQUEST MESSAGE ######################################################################
    const [isChatbot, setIsChatbot] = useState(true);
    const [messages, setMessages] = useState({
        userMessage: [],
        botMessage: []
    });
    // const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [chatbotMount, setChatbotMount] = useState(false);
    const [loadingInputMessage, setLoadingInputMessage] = useState('');

    const [disableChat, setDisableChat] = useState(false);

    const handleChat = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (userInput && !disableChat) {
            setDisableChat(true);
            setLoadingInputMessage(userInput);
            setUserInput('');

            try {
                const response = await apostRequest(`${backendUrl}/api/chatbot/chat-request`, { userInput, userId: userId.toString() });
                setIsLoading(false);
                setDisableChat(false);

                if (response.error) {
                    console.log(response.message);
                }else{
                    setChatbotMount(chatbotMount ? false : true);
                }
            } catch (error) {
                setDisableChat(false);
                console.log(error);
                setIsLoading(false);
            }
        }
    };

    // ###############################################  FETCH CHATBOT MESSAGES  #############################################################
    const [userMessages, setUserMessages] = useState([]);

    useEffect(() => {
        if (userId) {
            const getMessage = async (e) => {
                setIsLoading(true);
                try {
                    const response = await apostRequest(`${backendUrl}/api/chatbot/get-chatbot-messages`, {userId: userId.toString()});

                    setIsLoading(false);

                    if (response.error) {
                        console.log(response.message);
                    }else{
                        setUserMessages(response.message);
                        response.message.map(item => {
                            setMessages([...messages, { userMessage: item.user_message, botMessage: item.response }]);
                        })
                    }   
                } catch (error) {
                    console.log("Error: ",error);
                    setIsLoading(false);
                }
            };
            getMessage();
        }
    }, [userId, chatbotMount]);

    return <ChatbotContext.Provider value={{
        isChatbot, setIsChatbot, messages, setMessages, userInput, setUserInput, disableChat, setDisableChat, handleChat, userMessages, loadingInputMessage
    }}>{children}</ChatbotContext.Provider>
}