import React, {useState, useContext} from 'react'
import {Container, Form, Button, Row, Col, Alert} from 'react-bootstrap'
import AuthContext from '../context'
import { userLogin } from '../functions/userLogin'


function Login() {
    const [inputUser, setInputUser] = useState('')
    const [inputPw, setInputPw] = useState('')
    const {setAuthUser} = useContext(AuthContext)
 
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        let received = await userLogin(inputUser,inputPw)
        console.log(received,' arrived')
        if (received.login){
            console.log('You are logged in')
            setAuthUser(received.id)
        }
        setInputUser('')
        setInputPw('')
    
    }

    return (
       
    <Container className="Login">
        <Row className='justify-content-md-center'>
                <Col lg="8">
                    <div className='login'></div>
                    <h3>Login Page</h3>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={inputUser} type="text" placeholder="Enter username" onChange={(e) => setInputUser(e.target.value)}/>
                            <Form.Text className="text-muted">
                           
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={inputPw} type="password" placeholder="Password" onChange={(e) => setInputPw(e.target.value)}/>
                        </Form.Group> 
                        <Button value='login' variant="success"  onClick={(e) =>handleSubmit(e)} active>Submit</Button>
                    </Form>
                </Col>
            </Row>
    </Container>
       
    )
}

export default Login
