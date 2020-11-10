import data from './entries';
let getEntries = (type,state) => {
    var entry;
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
        })
        console.log(result);
        console.log(data);
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
    }

};

export default server;