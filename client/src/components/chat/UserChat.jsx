/* eslint-disable react/prop-types */
import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

export const UserChat = ({chat, user}) => {
    const { recipientUser } = useFetchRecipientUser(chat, user)
    const { onlineUsers } = useContext(ChatContext)

    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?.id)

    return ( 
        <>
            <Stack 
                direction="horizontal" 
                gap={3} 
                className="user-card align-items-center p-2 justify-content-between" 
                role="button"
            >
                <div className="d-flex">
                    <div className="me-2">
                        <img 
                            src="https://randomuser.me/api/portraits/lego/2.jpg" 
                            alt="Imagen de lego n2" 
                            height="35px" 
                            style={{borderRadius: "100%"}}
                        />
                    </div>
                    <div className="text-content">
                        <div className="name">{recipientUser?.username}</div>
                        <div className="text">Text Message</div>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <div className="date">
                        19/11/2023
                    </div>
                    <div className="this-user-notifications">2</div>
                    <span className={isOnline ? "user-online" : ""}></span>
                </div>
            </Stack>
        </>
     );
}

export default UserChat;