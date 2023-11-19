import { createContext, useState, useEffect, useCallback } from "react";
import { getReq, baseUrl, postReq } from "../utils/services.js"
import PropTypes from 'prop-types'
import { io } from "socket.io-client"

export const ChatContext = createContext()

export const ChatContextProvider = ({children, user}) => {
    ChatContextProvider.propTypes = {
        children: PropTypes.node,
        user: PropTypes.object
    }

    const [ userChats, setUserChats ]                       = useState(null)
    const [ isUserChatsLoading, setIsUserChatsLoading ]     = useState(false)
    const [ userChatsError, setUserChatsError ]             = useState(null)
    const [ potentialChats, setPotentialChats ]             = useState([])
    const [ currentChat, setCurrentChat ]                   = useState(null)
    const [ messages, setMessages ]                         = useState(null)
    const [ isMessagesLoading, setIsMessagesLoading ]       = useState(false)
    const [ messagesError, setMessagesError ]               = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [ sendTextMessageError, setSendTextMessageError ] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [ newMessage, setNewMessage ]                     = useState(null)
    const [ socket, setSocket ]                             = useState(null)
    const [ onlineUsers, setOnlineUsers ]                   = useState([])

    // initial socket
    useEffect(() => {
        const newSocket = io("http://localhost:3000")
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    }, [user])

    useEffect(() => {
        if(socket === null) return
        socket.emit("addNewUser", user?.id)
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])
    
    useEffect(() => {
        if(socket === null) return

        const recipientId = currentChat?.members.find((id) => id !== user?.id)

        socket.emit("sendMessage", {...newMessage, recipientId})

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newMessage])

    useEffect(() => {
        if(socket === null) return

        socket.on("getMessage", res => {
            if(currentChat?._id !== res.chatId) return
            setMessages((prev) => [...prev, res])
        })

        return () => {
            socket.off("getMessage")
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, currentChat])

    useEffect(() => {
        const getUsers = async () => {
            const response = await getReq(`${baseUrl}/users`)
            if(response.error){
                return console.log("Error fetching users", response)
            }

            const pChats = response.filter((u) => {
                let isChatCreated = false
                if(user?.id === u._id) return false
                if(userChats){
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }

                return !isChatCreated
            })
            setPotentialChats(pChats)
        }

        getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userChats]);

    useEffect(() => {
        const getUserChats = async () => {
            if(user?.id){
                setIsUserChatsLoading(true)
                setUserChatsError(null)
                
                const response = await getReq(`${baseUrl}/chats/${user?.id}`)
                
                setIsUserChatsLoading(false)

                if(response.error){
                    return setUserChatsError(response)
                }
                setUserChats(response)
            }
        }

        getUserChats()
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
            setIsMessagesLoading(true)
            setMessagesError(null)
            
            const response = await getReq(`${baseUrl}/messages/${currentChat?._id}`)
            
            setIsMessagesLoading(false)

            if(response.error){
                return setMessagesError(response)
            }
            setMessages(response)
        }
    
        getMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentChat]);

    const sendTextMessage = useCallback( async (textMesage, sender, currentChatId, setTextMessage) => {
        if(!textMesage) return console.log("You must type something...")

        const response = await postReq(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender.id,
            text: textMesage
        }))

        if (response.error){
            return setSendTextMessageError(response)
        }

        setNewMessage(response)
        setMessages((prev) => [...prev, response])
        setTextMessage("")

    }, [])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    },[])

    const createChat = useCallback( async (firstId, secondId) => {
        const response = await postReq(`${baseUrl}/chats`, JSON.stringify({firstId, secondId}))
        if(response.error) return console.log("Error creating chat", response)
        setUserChats((prev) => [...prev, response])
    }, [])

    return (
        <>
            <ChatContext.Provider value={{
                userChats,
                isUserChatsLoading,
                userChatsError,
                potentialChats,
                createChat,
                currentChat,
                updateCurrentChat,
                messages,
                isMessagesLoading,
                messagesError,
                sendTextMessage,
                onlineUsers
            }}>
                {children}
            </ChatContext.Provider>
        </>
    )
}