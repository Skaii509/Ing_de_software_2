import { Routes, Route, Navigate } from 'react-router-dom'
import ChatPage from './pages/Chat.jsx'
import LoginPage from './pages/Login.jsx'
import RegisterPage from './pages/Register.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container> 
    )
}
  
export default App
 