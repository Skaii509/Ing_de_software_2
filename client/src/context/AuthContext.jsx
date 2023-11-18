import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postReq } from "../utils/services";
import PropTypes from 'prop-types';

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    AuthContextProvider.propTypes = {
    children: PropTypes.node
    }

    const [user, setUser] = useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [loginError, setLoginError] = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    })

    useEffect(() => {
        const user = localStorage.getItem("User")

        setUser(JSON.parse(user))
    }, [])

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, [])

    // REGISTER USER----------------------------------------------------------------------------
    const registerUser = useCallback(async (e) => {
        e.preventDefault()

        setIsRegisterLoading(true)
        setRegisterError(null)

        const response = await postReq(`${baseUrl}/users/register`, JSON.stringify(registerInfo))

        setIsRegisterLoading(false)

        if(response.error){
            return setRegisterError(response)
        }

        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    }, [registerInfo])

    // LOGIN USER ----------------------------------------------------------------------------
    const loginUser = useCallback(async (e) => {
        e.preventDefault()
        setIsLoginLoading(true)
        setLoginError(null)

        const response = await postReq(`${baseUrl}/users/login`, JSON.stringify(loginInfo))
        
        setIsLoginLoading(false)
        
        if(response.error){
            return setLoginError(response)
        }

        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    }, [loginInfo])

    // LOGOUT USER ----------------------------------------------------------------------------
    const logoutUser = useCallback(() => {
        localStorage.removeItem("User")
        setUser(null)
    }, [])

    // RETURN ----------------------------------------------------------------------------
    return ( 
        <AuthContext.Provider value={{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterLoading,
            loginUser,
            logoutUser,
            loginError,
            loginInfo,
            updateLoginInfo,
            isLoginLoading
        }}>
            {children}
        </AuthContext.Provider> 
    );
}