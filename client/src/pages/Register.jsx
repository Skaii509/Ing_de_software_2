import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

function RegisterPage() {
    return ( 
        <Form>
            <Row style={{
                height: "100vh",
                justifyContent: "center",
                paddingTop: "20%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Register</h2>

                        <Form.Control  type="text" placeholder="Username..." />
                        <Form.Control  type="text" placeholder="Email..." />
                        <Form.Control  type="password" placeholder="Password..." />
                        <Button variant="primary" type="submit">Send</Button>

                        <Alert variant="danger"><p>An error ocurred.</p></Alert>
                    </Stack>
                </Col>
            </Row>
        </Form>
    );
}

export default RegisterPage;