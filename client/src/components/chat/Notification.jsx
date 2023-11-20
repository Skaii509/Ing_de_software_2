import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import moment from "moment"

function Notification() {
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useContext(AuthContext)
    const { notifications, userChats, allUsers, markAllNotificationAsRead, markNotificationAsRead } = useContext(ChatContext)

    const unreadNotifications = unreadNotificationsFunc(notifications)
    
    const modifiedNotifications = notifications.map((n) => {
        const sender = allUsers.find((user) => user._id === n.senderId)

        return {
            ...n, 
            senderName: sender?.username
        }
    })

    // console.log("un", unreadNotifications)
    // console.log("mn", modifiedNotifications)

    return ( 
        <div className="notifications">
            <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                </svg>
                {unreadNotifications?.length === 0 ? null : (
                    <span className="notification-count">
                        <span>{unreadNotifications?.length}</span>
                    </span>
                )}
            </div>
            {isOpen ? (
                <div className="notifications-box">
                    <div className="notifications-header">
                        <h3>Notifications</h3>
                        <div className="mark-as-read" onClick={() => markAllNotificationAsRead(notifications)}>
                            Mark all as read
                        </div>
                    </div>
                    {modifiedNotifications?.length === 0 ? <span className="notification">No notification yet...</span> : null}
                    {modifiedNotifications && modifiedNotifications.map((n, index) => {
                        return (
                            <div key={index} className={n.isRead ? 'notification' : 'notification not-read'} onClick={() => {
                                markNotificationAsRead(n, userChats, user, notifications)
                                setIsOpen(false)
                            }}>
                                <span>{`${n.senderName} sent you a message`}</span>
                                <span className="notification-time">{moment(n.date).calendar()}</span>
                            </div>
                        )
                    }) }
                </div>
            ) : null}
            
        </div>
     )
}

export default Notification;