import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
import { IoMdSend } from "react-icons/io";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const ENDPOINT = 'https://ecommerce-backend-three-eta.vercel.app';

const UserOne = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = socketIOClient(ENDPOINT);
        setSocket(newSocket);

        newSocket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, { text: message.text, sender: message.sender }]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (socket && message) {
            const fullMessage = { text: message, sender: 'User One' };
            socket.emit('sendMessage', fullMessage);
            setMessage('');  // Clear the input field
        }
    };

    return (
        <div className='chat-container user-one bg-white'>
            <div className='bg-gray-800 flex items-center space-x-2 py-2 pl-5 text-white rounded-tl-md rounded-tr-md'>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <img src='https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?t=st=1721108959~exp=1721112559~hmac=6ffd113434c414dbdb0c0164431a3e5c5b8de11034ce176e722dbdefeb984931&w=996'
                        alt='User One'
                        className='h-8 w-8 rounded-full border-2 border-white'
                    />
                </StyledBadge>
                <div className='text-[18px] font-medium'>Shree Nallini</div>
            </div>
            <div className='chat-window'>
                {messages.length > 0 ? (
                    <ul className='messages'>
                        {messages.map((msg, index) => (
                            <li key={index} className={msg.sender === 'User One' ? 'message right' : 'message left'}>
                                {msg.text}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='text-center flex items-center justify-center h-full text-gray-500'>No messages yet...</div>
                )}
            </div>
            <div className='chat-input'>
                <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Type a message...'
                />
                <button onClick={sendMessage} className='flex items-center gap-x-1 font-medium'>
                    Send
                    <IoMdSend size={20} />
                </button>
            </div>
        </div>
    );
};

export default UserOne;
