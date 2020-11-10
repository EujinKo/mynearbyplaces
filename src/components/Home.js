import React from 'react';
import {Link} from 'react-router-dom';
import availableStates from './ServerInterface/states.js';
import availableOptions from './ServerInterface/options.js';
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar,Nav,Form,Button,Col,ListGroup} from 'react-bootstrap';
import SelectEntry from './ServerInterface/SelectEntry.js';
import server from './ServerInterface/server';
import Logo from "./Images/logo.png";
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
                    <img
                        alt=""
                        src={Logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    <Navbar.Brand>My Nearby Places</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to='/' disabled>Home</Nav.Link>
                        {this.state.username.length > 0 
                            ? <Navbar.Text>Hello, {this.state.username}</Navbar.Text>
                            :<Nav.Link as={Link} to='/login'>Login</Nav.Link>}

                    </Nav>
                </Navbar>
            </div>
        );
    }

    searchBar(){
        return(
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand> Search Engine </Navbar.Brand>
                </Navbar>
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
            </div>
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

    startSearching = (option,place) => {
        this.setState({
            option: option,
            place: place
        });

        let result;
        // console.log("option: "+option+", place: "+place);
        this.setState({
            isSearching: true
        });
        if(option === "Restaurants"){
            result = server.fetchRestaurants(place);
        }
        if(option === "Dentists"){
            result = server.fetchDentists(place);
        }
        if(option === "Shopping Malls"){
            result = server.fetchShoppingMalls(place);
        }
        if(option === "Dry Cleaning"){
            result = server.fetchDryCleaning(place);
        }
        console.log(result);
        if(result === undefined){
            this.setState({entries:[]});
            return;
        }
        this.setState({entries:result});
        return;

    }

    populateReviews(array){
        var result='';
        for(let i=1;i<array.length+1;i++){
            result += i+". "+array[i-1]+" ";
        }
        return result;
    }

    searchResult(){
        let result = this.state.entries;

        return(
            result.map((data,index) =>
            <ListGroup.Item key= {index}>
                {data.name}
                <br/>Location: {data.location}
                <br/>Rate: {data.rate}
                <br/>Reviews: {this.populateReviews(data.reviews)}
                <br/>
                <Form inline onSubmit={
                        (e)=>{
                            e.preventDefault();
                            var review = document.getElementById('addReview'+index).value;
                            if(review.trim().length > 0){
                                server.addReview(data.option, data.state, review, index);
                                this.startSearching(data.option, data.state);
                            }

                        }
                    }>
                    <Navbar.Text>Add Review</Navbar.Text>
                    <Col xs="auto">
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control id={"addReview"+index} as="textarea" rows={1} />
                        </Form.Group>
                    </Col>
                    <Button variant="outline-success" size="sm" type="submit">
                        Add Review
                    </Button>
                </Form>

                <Form inline onSubmit={
                        (e)=>{
                            e.preventDefault();
                            var location = document.getElementById('updateLocation'+index).value;
                            if(location.trim().length > 0){
                                server.updateLocation(data.option, data.state, location, index);
                                this.startSearching(data.option, data.state);
                            }

                        }
                    }>
                    <Navbar.Text>Update Location</Navbar.Text>
                    <Col xs="auto">
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control id={"updateLocation"+index} as="textarea" rows={1} />
                        </Form.Group>
                    </Col>
                    <Button variant="outline-success" size="sm" type="submit">
                        Update
                    </Button>
                </Form>
                <Form inline onSubmit={
                        (e)=>{
                            e.preventDefault();
                            var rate = document.getElementById('updateRate'+index).value;
                            server.updateRate(data.option, data.state, rate, index);
                            this.startSearching(data.option, data.state);
                        }
                    }>

                    <Navbar.Text>Update Rate</Navbar.Text>
                    <Form.Control id={'updateRate' + index} as="select" defaultValue="Choose...">
                        <SelectEntry entry={1} key={'rate1index' + index} />
                        <SelectEntry entry={2} key={'rate2index' + index} />
                        <SelectEntry entry={3} key={'rate3index' + index} />
                        <SelectEntry entry={4} key={'rate4index' + index} />
                        <SelectEntry entry={5} key={'rate5index' + index} />
                    </Form.Control>
                    <Button variant="outline-success" size="sm" type="submit">
                        Update
                    </Button>
                </Form>
                <Form inline onSubmit={
                        (e)=>{
                            e.preventDefault(); 
                            server.removeEntry(data.option, data.state, index);
                            this.startSearching(data.option, data.state);
                        }
                    }>
                    <Button variant="outline-danger" size="sm" type="submit">
                        Delete Place
                    </Button>
                </Form>
            </ListGroup.Item>
           )
        );

    }


    //executed only after the page is rendered
    componentDidMount(){
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



    addBar(){
        return(
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand> Add Service </Navbar.Brand>
                </Navbar>
                <Navbar bg="light" variant="light">
                    <Form inline onSubmit={
                        (e)=>{
                            e.preventDefault(); 
                            var option = document.getElementById('addoption').value;
                            var place = document.getElementById('addplace').value;
                            var name = document.getElementById('addname').value;
                            var location = document.getElementById('addlocation').value;
                            var rate = document.getElementById('addrate').value;
                            this.addService(option,place,name,location,rate);
                        }
                    }>
                        <Col xs="auto">
                            <Navbar.Text>Options</Navbar.Text>
                        </Col>

                        <Col xs="auto">
                            <Form.Control id='addoption' as="select" defaultValue="Choose...">
                                <option key='default'>Choose...</option>
                                {this.populateOption()}
                            </Form.Control>
                        </Col>
                        <Col xs="auto">
                            <Navbar.Text>Place</Navbar.Text>
                        </Col>
                        <Col xs="auto">
                            <Form.Control id='addplace' as="select" defaultValue="Choose...">
                                <option>Choose...</option>
                                {this.populateStatesOption()}
                            </Form.Control>
                        </Col>
                        <Navbar.Text>Location</Navbar.Text>
                        <Col xs="auto">
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control id='addlocation' as="textarea" rows={1} />
                            </Form.Group>
                        </Col>
                        <Navbar.Text>Name</Navbar.Text>
                        <Col xs="auto">
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control id='addname' as="textarea" rows={1} />
                            </Form.Group>
                        </Col>
                        <Navbar.Text>Rate</Navbar.Text>
                        <Col xs="auto">
                            <Form.Control id='addrate' as="select" defaultValue="Choose...">
                                <SelectEntry entry={1} key={'rate1'} />
                                <SelectEntry entry={2} key={'rate2'} />
                                <SelectEntry entry={3} key={'rate3'} />
                                <SelectEntry entry={4} key={'rate4'} />
                                <SelectEntry entry={5} key={'rate5'} />
                            </Form.Control>
                        </Col>
                        <Button variant="outline-info" type="submit">Add</Button>
                    </Form>
                </Navbar>
            </div>
        );
    }

    addService = (option,place,name,location,rate) =>{
        this.setState({
            option: option,
            place: place
        });
        server.addEntry(option, place,name,location,rate);
        // alert(option+place+name+location+rate);
        
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
                {this.addBar()}
            </div>
        );
    }
}
export default Home;    //Components which exported can be imported on other pages