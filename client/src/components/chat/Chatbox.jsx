import { useContext, useRef, useState, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext"
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import { Stack } from "react-bootstrap"
import moment from "moment"
import InputEmoji from "react-input-emoji"

function Chatbox() {
    const { user } = useContext(AuthContext)
    const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext)
    const { recipientUser } = useFetchRecipientUser(currentChat, user)
    const [ textMessage, setTextMessage ] = useState("")
    const scroll = useRef()

    useEffect(() => {
        scroll.current?.scrollIntoView({behavior: "smooth"})
    }, [messages]);

    if(!recipientUser){
        return (
            <p style={{textAlign: "center", width:"100%"}}>
                No conversation selected yet...
            </p>
        )
    }
    
    if(isMessagesLoading){
        return (
            <p style={{textAlign: "center", width:"100%"}}>
                Loading chat...
            </p>
        )
    }

    function formatedText(texto) {
        const linkRegex = /(https?:\/\/[^\s]+)/
      
        if (linkRegex.test(texto)) {
          return <a style={{color: "#fff"}} href={texto} target="_blank" rel="noreferrer">{texto}</a>
        } else {
          return texto;
        }
    }

    return (
        <>
            <Stack gap={4} className="chat-box">
                <div className="chat-header">
                    <strong style={{textTransform: "capitalize"}}>{recipientUser.username}</strong>
                    {/*AQUI SE PUEDE VER EL CHAT_ID PARA ELIMINAR MENSAJES*/}
                    {/* <p>{currentChat._id}</p> */}
                </div>
                <Stack gap={3} className="messages">
                    {messages && messages.map((m, index) => {
                        return (
                            <>
                                <Stack 
                                    key={index}
                                    className={`${
                                        m.senderId === user?.id
                                            ? "message self align-self-end flex-grow-0"
                                            : "message left align-start flex-grow-0"
                                        }`}
                                        ref={scroll}
                                    >
                                    <span>{formatedText(m.text)}</span>
                                    <span className="message-footer">{moment(m.createdAt).calendar()}</span>
                                </Stack>
                            </>
                        )
                    })}
                </Stack>
                <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0" autoFocus>
                    <InputEmoji 
                        value={textMessage} 
                        onChange={setTextMessage}
                        fontFamily="nunito" 
                        borderColor="rgba(72, 112, 223, 0.2)" 
                    />
                    <button className="send-btn" onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
                        <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24">
                            <path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path>
                        </svg>
                    </button>
                </Stack>
            </Stack>
        </>
     );
}

export default Chatbox;