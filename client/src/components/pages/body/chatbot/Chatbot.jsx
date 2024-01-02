import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Chatbot() {
    const navigate = useNavigate();

    const [isChatbot, setIsChatbot] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    // loading
    const [isLoading, setIsLoading] = useState(false);
    const [disableChat, setDisableChat] = useState(false);

    const handleChat = async (e) => {
        e.preventDefault();

        if (userInput && !disableChat) {
            setDisableChat(true);
            setMessages([...messages, { userMessage: userInput, botMessage: "..." }]);
            setUserInput('');

            try {
                // const response = await axios.post(`${backendUrl}/api/chat-request`, { userInput }, {
                //     headers: {
                //         'Authorization': `Bearer ${token}`
                //     }
                // });

                const response = await axios.post(`/api/chat-request`, { userInput }, {
                    headers: {
                        'Authorization': `Bearer`
                    }
                });

                if (response.status === 200) {
                    setTimeout(() => {
                        setDisableChat(false);
                        setMessages([...messages, { botMessage: response.data.message, userMessage: userInput }]);
                    }, 1000);
                }
            } catch (error) {
                setDisableChat(false);
                console.log(error);
                setMessages([...messages, { userMessage: userInput, botMessage: "Something went wrong!" }]);
            }
        }
    };

    const chatRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when new data is added
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <div className="show-chatbot">
                <button className="chatbot-toggler" onClick={() => setIsChatbot(isChatbot ? false : true)}>
                    {isChatbot ? (
                        <span className="material-symbols-outlined">close</span>
                    ) : (
                        <span className="material-symbols-outlined">mode_comment</span>
                    )}
                </button>
                {isChatbot && (
                    <div className="chatbot" style={{ zIndex: '1100', animation: isChatbot ? 'chatbotAnimate 0.5s linear' : '' }}>
                        <header className='bg-navy'>
                            <h2>TCAS Chatbot</h2>
                            <span onClick={() => setIsChatbot(false)} className="material-symbols-outlined">close</span>
                        </header>
                        <ul className="chatbox" ref={chatRef}>
                            <li className="chat incoming">
                                <span className="material-symbols-outlined">smart_toy</span>
                                <p>Hi Shelo Mora Paglinawan 👋 How can I help you today?</p>
                            </li>
                            {messages && messages.map(item => (
                                <>
                                    <li className='chat outgoing' key={item.id}><p>{item.userMessage}</p></li>
                                    <li className='chat incoming' key={item.id}><span className="material-symbols-outlined">smart_toy</span><p>{item.botMessage}</p></li>
                                </>
                            ))}
                        </ul>
                        <div className="chat-input">
                            <form onSubmit={handleChat}>
                                <input placeholder="Enter a message..." value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                                {disableChat ? (
                                    <span id="send-btn" className="material-symbols-outlined"><span style={{ fontSize: '35px' }}>...</span></span>
                                ) : (
                                    <span id="send-btn" className="material-symbols-outlined"><button style={{ background: 'transparent', padding: '0', border: '0px solid white' }} type='submit'>Send</button></span>
                                )}
                            </form>
                        </div>

                        {isLoading && (
                            <div className="chatbot-container">
                                <div className="modal-pop-up-chatbot-loading">
                                    <div className="modal-pop-up-loading-spiner"></div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </>
    )
}

export default Chatbot
