/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { baseUrl, getReq } from '../utils/services';

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null)
    
    const recipientId = chat?.members.find((id) => id !== user?.id)
 
    useEffect(() => {
        const getUser = async () => {
            if(!recipientId) return null
            const response = await getReq(`${baseUrl}/users/${recipientId}`)

            if(response.error){
                return setError(response)
            }

            setRecipientUser(response)
        }

        getUser()
    }, [recipientId]);

    return {recipientUser}
}