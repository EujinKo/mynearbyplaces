import React from 'react';
import availableStates from './ServerInterface/states.js';
import availableOptions from './ServerInterface/options.js';
import { Link,Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar,Nav,Form,FormControl,Button,Container,Col,ListGroup} from 'react-bootstrap';
import SelectEntry from './ServerInterface/SelectEntry.js';
import server from './ServerInterface/server';
//Link: for client side swithcing
//Button: for server side


class Home extends React.Component {
    //Needs method to check whether user is already logged in
    constructor(props){ //Constructor always receive props
        super(props);   //Superconstructor
        this.state = {
            username: '',
            isSearching: false,
            option: '',
            state: '',
            entries:[],
        };
    }

    navigationBar(){
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>My Nearby Places</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href='/mynearbyplaces' disabled>Home</Nav.Link>
                        {this.state.username.length > 0 
                            ? <Navbar.Text>Hello, {this.state.username}</Navbar.Text>
                            :<Nav.Link href='/login'>Login</Nav.Link>}

                    </Nav>
                </Navbar>
            </div>
        );
    }

    searchBar(){
        return(
            <Navbar bg="light" variant="light">
                <Form inline onSubmit={
                    (e)=>{
                        e.preventDefault(); 
                        var option = document.getElementById('option').value;
                        var place = document.getElementById('place').value;
                        this.startSearching(option,place);
                    }
                }>
                    <Col xs="auto">
                        <Navbar.Text>Options</Navbar.Text>
                    </Col>

                    <Col xs="auto">
                        <Form.Control id='option' as="select" defaultValue="Choose...">
                            <option key='default'>Choose...</option>
                            {this.populateOption()}
                        </Form.Control>
                    </Col>
                    <Col xs="auto">
                        <Navbar.Text>Place</Navbar.Text>
                    </Col>
                    <Col xs="auto">
                        <Form.Control id='place' as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            {this.populateStatesOption()}
                        </Form.Control>
                    </Col>

                    <Button variant="outline-info" type="submit">Search</Button>
                </Form>
            </Navbar>
        );
    }
    populateStatesOption(data){
        return(
            availableStates.map(data=>
                <SelectEntry entry={data} key={data} />)
        );
    }
    populateOption(){
        return(
            availableOptions.map(data=>
                <SelectEntry entry={data} key={data}/>)
        );
    }

    startSearching(option,place){
        this.setState({
            option: option,
            place: place
        });

        let result,entry;
        // console.log("option: "+option+", place: "+place);
        this.setState({
            isSearching: true
        });
        if(option === "Restaurants"){
            result = server.fetchRestaurants(place);
        }
        console.log(result);
        if(result === undefined){
            this.setState({entries:[]});
            return;
        }
        this.setState({entries:result});
        return;

    }
    // removeEntry(option,state,index){
    //     console.log("before"+ data.state);
    //     server.removeEntry(data.option, data.state, index);
    // }

    searchResult(){
        let result = this.state.entries;
        let option = this.state;

        return(
            result.map((data,index) =>
            <ListGroup.Item key= {index}>
                {data.name}, location: {data.location}
                <Button variant="outline-danger" size="sm"
                    onClick={
                        function(){
                            console.log("before"+ data.state);
                            server.removeEntry(data.option, data.state, index);
                        }

                    }>
                    Delete
                    </Button>
            </ListGroup.Item>
           )
        );

    }


    //executed only after the page is rendered
    componentDidMount(){
        alert();

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
                if(location.state.option){
                    this.setState({
                        option: location.state.option
                    })
                }
                if(location.state.state){
                    this.setState({
                        state: location.state.state
                    })
                }
            }
        }
    }
    //Explictly delete the event listener when everything is deleted so
    // it doesn't run on the background
    componentWillUnmount(){
        window.removeEventListener("keydown",this.handleKeyDown);
    }
    //e : event object
    handleKeyDown = (e) =>{
        if(e.keyCode === 39) {  //Right arrow key

        }else if(e.keyCode === 37) {  //Left arrow key

        }
    }

    getPathWithCursor=(cursor)=>{
        let from = {pathname: '/quiz', state: {
            username: this.state.username,
            cursor: cursor
        }};
        return from;
    }
  

    SetUserName = (username) =>{
        this.setState({
            username: username
        });
    }


    render() { //mandatory method
        console.log(this.state);
        return (    //If (this.state.username.length > 0 ) == true, show the username, otherwise go to button
            <div id="root">
                {this.navigationBar()} 
                {this.searchBar()}
                <ListGroup id="result">
                    {this.state.isSearching
                    ?this.searchResult()
                    :<div></div>}
                </ListGroup>
            </div>
        );
    }
}
export default Home;    //Components which exported can be imported on other pages