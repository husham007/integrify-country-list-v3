export default class Search {
   result = undefined;

    constructor(type, input, method, description){
        this.type = type;
        this.input = input;
        this.method = method;
        this.description = description;
    }

    runSearch(arr){

        this.result = this.method(arr, this.input);
        //console.log(this);
        return this;
    }

    get getResult(){
        return this.result;
    }





}