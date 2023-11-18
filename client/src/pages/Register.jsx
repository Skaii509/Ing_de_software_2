import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

function RegisterPage() {
    const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext)

    return ( 
        <Form onSubmit={registerUser}>
            <Row style={{
                height: "100vh",
                justifyContent: "center",
                paddingTop: "20%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Register</h2>

                        <Form.Control  type="text" placeholder="Username..." onChange={(e) => {
                            updateRegisterInfo({...registerInfo, username: e.target.value})
                        }} />
                        <Form.Control  type="text" placeholder="Email..." onChange={(e) => {
                            updateRegisterInfo({...registerInfo, email: e.target.value})
                        }} />
                        <Form.Control  type="password" placeholder="Password..." onChange={(e) => {
                            updateRegisterInfo({...registerInfo, password: e.target.value})
                        }} />
                        <Button variant="primary" type="submit">{isRegisterLoading ? "Creating your account" : "Send"}</Button>

                        {
                            registerError?.error && (
                                <Alert variant="danger">
                                    <p>{registerError?.message}</p>
                                </Alert>
                            )
                        }
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
}

export default RegisterPage;