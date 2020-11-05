import React from 'react';
import {Redirect} from 'react-router-dom';


class Login extends React.Component {
    constructor(props){ //Constructor always receive props
        super(props);   //Superconstructor
        this.state = {
            username: '',
            authenticated: false
        };
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
                <br></br>
                <form onSubmit={this.onSubmit}>
                    <label>Username:</label>
                    <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.onInputChange} //Normal react tag has onChange on every tag
                    ></input>
                    <button type="submit" className="MyButton">Login</button>
                </form>
            </div>
        );
    }

}

export default Login;