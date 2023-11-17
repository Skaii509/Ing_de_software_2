import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
    return ( 
        <Navbar bg="dark" className="mb-4" style={{height: "3.75rem"}}>
            <Container>
                <Link to="/" className="link-light text-decoration-none" >
                    <h2>Logo</h2>
                </Link>
                <span className="text-warning">Logged in as Renato</span>
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        <Link to={"/login"}>Sign in</Link>
                        <Link to={"/register"}>Sign up</Link>
                        <Link to={""}></Link>
                    </Stack>
                </Nav>

            </Container>
        </Navbar>
    );
}

export default NavBar;