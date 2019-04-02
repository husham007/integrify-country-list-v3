import SearchBook from "./searchBook.js";

export default class World {

   

    constructor(countries){
        this.countries = countries;
        
        }
    
    get getCountries(){
        return this.countries;
    }

    set setCountries (countries){
        this.countries = countries;
    }
}
