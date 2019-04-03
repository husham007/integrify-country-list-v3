import * as module from "../functions.js";


export default class Print {
    header = undefined;
    menu = undefined;
    body = undefined;

    

    printHeader(){

    }

    printBody(countries){
        module.showCountries(countries);
    }

}