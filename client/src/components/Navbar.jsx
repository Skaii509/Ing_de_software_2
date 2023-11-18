import { Container, Nav, Navbar, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'

function NavBar() {
    const { user, logoutUser } = useContext(AuthContext)
    return ( 
        <Navbar bg="dark" className="mb-4" style={{height: "3.75rem"}}>
            <Container>
                <Link to="/" className="link-light text-decoration-none" >
                    <h2>Logo</h2>
                </Link>
                {user && <span className="text-warning">Logged in as {user?.username}</span>}
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        {
                            user && (
                                <Link onClick={() => logoutUser()} to={"/login"}>Sign out</Link>
                            )
                        }
                        {
                            !user && (
                                <>
                                    <Link to={"/login"}>Sign in</Link>
                                    <Link to={"/register"}>Sign up</Link>
                                </>
                            )
                        }
                        
                    </Stack>
                </Nav>

            </Container>
        </Navbar>
    );
}

export default NavBar;