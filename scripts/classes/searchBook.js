import Search from "./search.js";
import {app} from '../script.js'

export default class SearchBook {
  systemSearches = [];
  userSearches = [];
  currentSearch = undefined;

  constructor() {
    this.loadDefaultSystemSearches();
  }

  get getSystemSearches() {
    return this.systemSearches;
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
          let result = countries(world, key);
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
          let result = countries(world, key);
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
          let result = countries(world, key);
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
      function(world, key) {
        return new Promise((resolve, reject) => {
          let result = countries(world, key);
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

function countries(world, key) {
  //console.log(key);
  return world.getCountries.filter(country => {
    return country.region.includes(key);
  });
}
