import { Routes, Route, Navigate } from 'react-router-dom'
import ChatPage from './pages/Chat.jsx'
import LoginPage from './pages/Login.jsx'
import RegisterPage from './pages/Register.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'
import NavBar from './components/Navbar.jsx'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext.jsx'
import { ChatContextProvider } from './context/ChatContext.jsx'

function App() {
  const { user } = useContext(AuthContext)
  return (
    <ChatContextProvider user={user}>
      <NavBar />
      <Container className='text-secondary'>
        <Routes>
          <Route path="/" element={ user ? <ChatPage /> : <LoginPage />} />
          <Route path="/register" element={user ? <ChatPage /> : <RegisterPage />} />
          <Route path="/login" element={user ? <ChatPage /> : <LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container> 
    </ChatContextProvider>
    )
}
  
export default App
 