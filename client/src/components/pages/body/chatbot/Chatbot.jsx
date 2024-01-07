import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { ChatbotContext } from '../../../Context/ChatbotContext';

function Chatbot() {
    const navigate = useNavigate();

    const { isChatbot, setIsChatbot, userInput, setUserInput, disableChat, handleChat, userMessages, loadingInputMessage } = useContext(ChatbotContext);

    const { userCredentials, isLoading } = useContext(AuthContext);

    const chatRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when new data is added
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [userMessages, isChatbot, isLoading]);


    return (
        <>
            <div className="show-chatbot">
                <button className="chatbot-toggler" onClick={() => setIsChatbot(isChatbot ? false : true)}>
                    {isChatbot ? (
                        <span className="material-symbols-outlined">close</span>
                    ) : (
                        <span className="material-symbols-outlined" >mode_comment</span>
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
                                <p>Hi {userCredentials && userCredentials.fullname} 👋 How can I help you today?</p>
                            </li>
                            {userMessages && userMessages.map(item => (
                                <>
                                    <li className='chat outgoing' key={item.id}><p>{item.user_message}</p></li>
                                    <li className='chat incoming' key={item.id}><span className="material-symbols-outlined">smart_toy</span><p>{item.response}</p></li>
                                </>
                            ))}
                            {isLoading && (
                                <>
                                    <li className='chat outgoing'><p>{loadingInputMessage}</p></li>
                                    <li className='chat incoming'><span className="material-symbols-outlined">smart_toy</span><p>...</p></li>
                                </>
                            )}
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
                    </div>
                )}
            </div>

        </>
    )
}

export default Chatbot
