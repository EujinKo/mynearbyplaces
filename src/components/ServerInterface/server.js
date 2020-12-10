import data from './entries';
let api = `https://eujinko-mynearbyplaces.herokuapp.com`;

let getEntries = (type,state) => {
    //Later on we will connect to a backend and fetch all the entries
    return(    fetch(api+"/search/"+type+"/"+state).then( x => {
        return x.json();
    }).then( y => {
        return y;
    }).catch(e => {
        console.log("ERROR: From server\n"+e);
    })
    )
}

let remove = (type,state,index) => {
    let result = data.find(element => element.type === type);
    console.log("type: "+type+":"+result);
    if(result){
        result.entries[state].splice(index,1);
    }
}

let add = (type, state, name, location, rate) => {

    fetch(api+'/place', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name: name,
            option: type,
            state: state,
            location: location,
            rate: rate,
            reviews: ''
        })
    }).then( x => x.json()).then( y => console.log(y));
}

let addReview = (id,review) => {
    fetch(api+'/review/'+id, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            reviews: review
        })
    }).then( x => x.json()).then( y => console.log(y));
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
    addReview: (id,review) => {
        addReview(id,review);
    },
    updateLocation: (type, state, location, index) => {
        updateLocation(type,state,location,index);
    },
    updateRate: (type, state, rate, index) => {
        updateRate(type,state,rate,index);
    },

};

export default server;