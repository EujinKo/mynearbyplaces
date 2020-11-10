import data from './entries';
let getEntries = (type,state) => {
    //Later on we will connect to a backend and fetch all the entries
    let result = data.find(element => element.type === type);
    if(result){
        return result.entries[state];
    }else{
        return [];
    }
}

let remove = (type,state,index) => {
    let result = data.find(element => element.type === type);
    console.log("type: "+type+":"+result);
    if(result){
        alert(result.entries[state].splice(index,1));
    }
}

let add = (type, state, name, location, rate) => {
    let result = data.find(element => element.type === type);
    if(result){
        result.entries[state].push({
            name: name,
            option: type,
            state: state,
            location: location,
            rate: rate,
            reviews: []
        })
        console.log(result);
        console.log(data);
    }
}

let addReview = (type,state,review,index) => {
    let result = data.find(element => element.type === type);
    if(result){
        result.entries[state][index].reviews.push(review);
    }
}
let updateLocation = (type,state,location,index) => {
    let result = data.find(element => element.type === type);
    if(result){
        result.entries[state][index].location = location;
    }
}
let updateRate = (type,state,rate,index) => {
    let result = data.find(element => element.type === type);
    if(result){
        result.entries[state][index].rate = rate;
    }
}
let server = {
    fetchRestaurants : (state) => {
        return getEntries('Restaurants',state);
    },
    fetchDentists : (state) => {
        return getEntries('Dentists',state);
    },
    fetchShoppingMalls : (state) => {
        return getEntries('Shopping Malls',state);
    },
    fetchDryCleaning : (state) => {
        return getEntries('Dry Cleaning',state);
    },
    removeEntry : (type, state, index) => {
        remove(type, state, index);
    },
    addEntry : (type,state, name, location,rate) => {
        add(type, state, name, location, rate);
    },
    addReview: (type, state, review, index) => {
        addReview(type,state,review,index);
    },
    updateLocation: (type, state, location, index) => {
        updateLocation(type,state,location,index);
    },
    updateRate: (type, state, rate, index) => {
        updateRate(type,state,rate,index);
    },

};

export default server;