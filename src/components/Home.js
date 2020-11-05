import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import { Button } from 'react-bootstrap';
//Link: for client side swithcing
//Button: for server side


class Home extends React.Component {
    //Needs method to check whether user is already logged in
    constructor(props){ //Constructor always receive props
        super(props);   //Superconstructor
        this.state = {
            username: ''
        };
    }

    getPathWithCursor=(cursor)=>{
        let from = {pathname: '/quiz', state: {
            username: this.state.username,
            cursor: cursor
        }};
        return from;
    }
    
    body = () => {
        return (
            <div class="container">
                <p>Welcome to the image quiz!</p>
                hello
                <Button>hello</Button>
            </div>

        );
    }


    SetUserName = (username) =>{
        this.setState({
            username: username
        });
    }

    render() { //mandatory method
        const location = this.props.location;
        //Anything sent from previous page is saved in props.location
        if(location){
            if(location.state){
                //Indicates that this comes from Login page
                if(location.state.user){
                    //Set additional condition to escape infinite loop
                    if(location.state.user !== this.state.username){
                        this.SetUserName(location.state.user);
                    }
                }
            }
        }

        return (    //If (this.state.username.length > 0 ) == true, show the username, otherwise go to button
            <div>
                <div className="loginButton">
                    
                    {this.state.username.length > 0 
                    ? this.state.username
                    :<Link className='MyButton' to='/login'>Login</Link>}
                
                </div>
                
                {this.body()}        
            </div>
        );
    }
}
export default Home;    //Components which exported can be imported on other pages