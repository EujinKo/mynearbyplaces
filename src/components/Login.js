import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import { Navbar,Nav,Form,Row,Col,FormControl,Button,Container } from 'react-bootstrap';


class Login extends React.Component {
    constructor(props){ //Constructor always receive props
        super(props);   //Superconstructor
        this.state = {
            username: '',
            authenticated: false
        };
    }    
    navigationBar(){
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>My Nearby Places</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/mynearbyplaces">Home</Nav.Link>
                        <Nav.Link href='/login' disabled>Login</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    }

    onSubmit = (event) => {
        //You don't access the DOM object directly
        if(this.state.username.trim().length > 0){  //trim(): removes space at the beginning and the end
            //User Successfully signed in
            //Now changed the state
            this.setState({
                authenticated: true
            });
            
        }
        event.preventDefault();
    }
    onInputChange = (event) => { //add event if you need to know which function fired the function
        //event target is the input tag
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value   //You need to add bracket to indicate that the string is a key
        });
    }

    render(){
        //Save the data which wants to be passed to the variable 'from'
        let from = {pathname: '/', state: {user: this.state.username}};
        if(this.state.authenticated){
            return (
                <Redirect to= {from} />
            );
            //Convention to provide object to the Redirect
        }

        return(
            <div>
                {this.navigationBar()}
                <br></br>
                <Container>
                    <Form  onSubmit={this.onSubmit}>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                            Username
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control
                                name = "username"
                                placeholder="username"
                                onChange={this.onInputChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="outline-primary" type="submit">Login</Button>
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        );
    }

}

export default Login;