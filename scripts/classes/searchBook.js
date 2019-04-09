import Search from "./search.js";
import { app } from "../script.js";
import * as functions from "../functions.js";

export default class SearchBook {
  systemSearches = [];
  userSearches = [];
  currentSearch = undefined;

  constructor(searchBook) {
    if (!arguments.length) {
      this.loadDefaultSystemSearches();
      window.localStorage.setItem(
        "searchBook",
        JSON.stringify(this, function(key, value) {
          //console.log("key", key, "value", value);
          if (typeof value === "function") {
            return value.toString();
          } else {
            return value;
          }
        })
      );
      //console.log(JSON.parse(window.localStorage.getItem('searchBook')));
    } else {
      searchBook.systemSearches.forEach(search => {
        /*this.systemSearches.push(
          new Search(
            search.type,
            search.input,
            search.method,
            search.description
          )
        );*/
        const systemSearch = new Search("system", search.input, search.method, search.description);
    this.addSystemSearch(systemSearch);   
    app.print.addToList(systemSearch);
      });

      searchBook.userSearches.forEach(search => {
       /* this.userSearches.push(
          new Search(
            search.type,
            search.input,
            search.method,
            search.description
          )
        );*/

      });
     
      this.currentSearch = new Search (searchBook.currentSearch.type,
        searchBook.currentSearch.input,
        searchBook.currentSearch.method,
        searchBook.currentSearch.description);
    }
    /*else {
      this.systemSearches = searchBook.systemSearches;
      this.userSearches = searchBook.userSearches;
      this.currentSearch = searchBook.currentSearch;
    }*/
  }

  get getSystemSearches() {
    return this.systemSearches;
  }

  getSystemSearch(index) {
    let func = new Function("return " + this.systemSearches[index])();
  }

  addSystemSearch(search) {
    this.systemSearches.push(search);
  }

  addUserSearch(search) {
    this.userSearches.push(search);
  }

  createSystemSearch(input, method, description) {
    const search = new Search("system", input, method, description);
    this.addSystemSearch(search);
    this.setCurrentSearch = search;
    app.print.addToList(search);
    return search;
  }

  createUserSearch(input, method, description) {
    const search = new Search("user", input, method, description);
    this.addUserSearch(search);
    this.setCurrentSearch = search;
    return search;
  }

  loadSystemSearch(input, description) {
    //console.log(arr)
    return this.createSystemSearch(
      input,
      world => {
        return world.getCountries.filter(country => {
          return country.name.includes(input);
        });
      },
      description
    );
  }

  loadDefaultSystemSearches() {
    let searchKey = "Asia";
    this.createSystemSearch(
      searchKey,
      function(world, key) {
        return new Promise((resolve, reject) => {
          let result = world.getCountries.filter(country => {
            return country.region.includes(key);
          });
          if (result) {
            resolve(result);
          } else reject("error");
        });
      },
      "Asian Countries"
    );

    searchKey = "Europe";
    this.createSystemSearch(
      searchKey,
      function(world, key) {
        return new Promise((resolve, reject) => {
          let result = world.getCountries.filter(country => {
            return country.region.includes(key);
          });
          if (result) {
            resolve(result);
          } else reject("error");
        });
      },
      "Europe Countries"
    );

    searchKey = "Africa";
    this.createSystemSearch(
      searchKey,
      function(world, key) {
        return new Promise((resolve, reject) => {
          let result = world.getCountries.filter(country => {
            return country.region.includes(key);
          });
          if (result) {
            resolve(result);
          } else reject("error");
        });
      },
      "African Countries"
    );

    searchKey = "";
    this.createSystemSearch(
      searchKey,
      (world, key) => {
        return new Promise((resolve, reject) => {
          //console.log(world, key);
          let result = world.getCountries.filter(country => {
            return country.region.includes(key);
          });
          if (result) {
            resolve(result);
          } else reject("error");
        });
        //return countries(world, key);
      },
      "All Countries"
    );

    return {
      userSearches: this.userSearches,
      systemSeaches: this.systemSeaches
    };
  }

  get getUserSearches() {
    return this.userSearches;
  }

  set setCurrentSearch(search) {
    this.currentSearch = search;
  }
}
