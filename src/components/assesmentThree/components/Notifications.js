import React, { useState, useEffect } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import { IoNotificationsCircle } from "react-icons/io5";
import axios from 'axios';
import { IoCheckmarkDone } from "react-icons/io5";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { FcBusinessman } from "react-icons/fc";
import { FcBusinesswoman } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';

function Notifications() {
    const [open, setOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/notification/unread/count');
            setUnreadCount(res.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='mr-6'>
            <Tooltip title="Notifications" arrow>
                <div className='border rounded-full mt-2 cursor-pointer'>
                    <Badge badgeContent={unreadCount.count} color="warning" onClick={handleOpen}>
                        <IoNotificationsCircle size={35} />
                    </Badge>
                </div>
            </Tooltip>
            {open && (
                <NotificationModal
                    open={open}
                    handleClose={handleClose}
                />
            )}
        </div>
    );
}

export default Notifications;

function NotificationModal({ open, handleClose }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 550,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 0,
        overflowY: "auto",
        backgroundColor: "#fff",
        borderRadius: 2,
        border: "none"
    };

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/notification');
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.post('http://localhost:5000/api/notification/mark-all-read');
            setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };

    const sortedNotifications = notifications
        .sort((a, b) => {
            if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
            return new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time);
        });

    return (
        <Modal
            open={open}
            aria-labelledby="notifications-modal"
            aria-describedby="notifications-list"
        >
            <Box sx={style}>
                <div className='sticky left-0 top-0 z-10 bg-white px-4 py-3 flex items-center border-none justify-between overflow-hidden'>
                    <div className='flex items-center gap-x-1.5'>
                        <button type='button' onClick={handleClose}>
                            <IoChevronBackCircleSharp size={25} />
                        </button>
                        <h1 className='text-[20px] font-semibold'>
                            Notifications
                        </h1>
                    </div>
                    <button type='button'
                        className='py-1.5 px-2.5 flex items-center gap-x-1 bg-gray-700 text-white rounded-md text-[14px]'
                        onClick={markAllAsRead}
                    >
                        <IoCheckmarkDone size={16} />
                        Mark All Read
                    </button>
                </div>
                <div>
                    {sortedNotifications.length > 0 ? (
                        sortedNotifications.map((notification) => (
                            <div key={notification.id} className={`bg-${notification.isRead ? 'gray-200' : 'blue-100'} shadow border px-3 py-1 mb-2 mx-3 rounded-md flex items-center justify-between`}>
                                <div className='text-left'>
                                    <h1 className='font-semibold text-[17px]'>
                                        {notification.message}
                                    </h1>
                                    <p className='text-[13px] font-medium text-gray-600'>
                                        Date: {notification.date} Time: {notification.time}
                                    </p>
                                </div>
                                <div className='text-right space-y-1'>
                                    <Tooltip title={notification.role === "superadmin" ? "superadmin" : "User"} arrow placement='left'>
                                        <p className='text-[13px] border-2 rounded-md'>
                                            {notification.role === "superadmin" ? <FcBusinessman size={30} /> : <FcBusinesswoman size={30} />}
                                        </p>
                                    </Tooltip>
                                    <Tooltip title={notification.isRead ? "Read" : "UnRead"} arrow placement='left'>
                                        <p className='text-[13px] mx-auto bg-blue-500 border px-2 rounded-md'>
                                            {notification.isRead ? <FaEye size={16} color='white' /> : <FaEyeSlash size={16} color='white' />}
                                        </p>
                                    </Tooltip>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Typography sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: 25
                        }}
                        >
                            <p className='text-[20px] font-semibold'>
                                No notifications available
                                <span className='animate-pulse'>
                                    ...
                                </span>
                            </p>
                        </Typography>
                    )}
                </div>
            </Box>
        </Modal>
    );
}
