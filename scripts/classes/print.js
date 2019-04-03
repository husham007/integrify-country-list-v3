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

    addToList(search){
        let list = document.getElementById('list');
        let option = document.createElement("option");
        option.text = search.description;
        list.add(option);
    }

}