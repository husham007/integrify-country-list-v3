import {app} from '../script.js' ;
export default class Search {
   result = undefined;

    constructor(type, input, method, description){
        this.type = type;
        this.input = input;
        this.method = method;
        this.description = description;
    }

    runSearch(arr){

      //  this.result = this.method(arr, this.input);
      this.method(arr, this.input)
      .then((result)=>{
         
         this.result = result;
         //console.log(this);
         return this;
          
                  
      })
      .then((search)=>{
         
        app.print.printBody(search.getResult);
        //console.log(this);
    
         
                 
     })
     .catch((error)=>{
          console.log('error', error);
          return false;
      })
        //console.log(this);
        return this;
        
    }

    get getResult(){
        return this.result;
    }





}