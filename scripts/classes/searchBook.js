import Search from './search.js';

export default class SearchBook {
    systemSearches = [];
    userSearches = [];

    get getSystemSearches(){
        return this.systemSearches;
    }

    addSystemSearch(search){
        this.systemSearches.push(search);
    }

    addUserSearch(search){
        this.userSearches.push(search);
    }

    createSystemSearch(input, method, description){
        const search = new Search ('system', input, method, description);
        this.addSystemSearch(search);
        return search;
    }

    createUserSearch(input, method, description){
        const search = new Search ('user', input, method, description);
        this.addUserSearch(search);
        return search;
    }

    loadSystemSearch(input, description){
        //console.log(arr)
        return this.createSystemSearch(input, (world)=>{
            return world.getCountries.filter((country)=>{
                return country.name.includes(input);
            });
        }, description);
    }

    loadDefaultSystemSearches(){
        let searchKey = 'Asia';
        this.createSystemSearch(searchKey, function (world, key){
            return regionalCountries(world, key);
        },
        'Asian Countries');

        searchKey = 'Europe';
        this.createSystemSearch(searchKey, function (world, key){
            return regionalCountries(world, key);
        },
        'Europe Countries');
    }


    
   

    get getUserSearches(){
        return this.userSearches;
    }

}

function regionalCountries (world, key){
    console.log(key);
      return  world.getCountries.filter((country)=>{
            return country.region.includes(key);
        });
}