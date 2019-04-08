import {app} from '../script.js' ;
export default class Search {
   result = undefined;

    constructor(type, input, method, description){
        this.type = type;
        this.input = input;
        this.method = method;
        this.description = description;
    }

    executor = (arr, obj, app)=>{
        
       // console.log(obj);
      //  this.result = this.method(arr, this.input);
      if (typeof obj.method == 'string'){
         
          obj.method = new Function('return ' + obj.method)();
      }
      obj.method(arr, obj.input)
      .then((result)=>{
         
         obj.result = result;
         //console.log(this);
         return obj;
          
                  
      })
      .then((search)=>{
        // console.log(this);
         //console.log(search);
        app.print.printBody(search.result);
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
