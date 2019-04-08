// app.js - main application Object

import World from "./world.js";
import SearchBook from "./searchBook.js";
import Print from "./print.js";

export default class App {
  url = undefined;
  world = undefined;
  print = undefined;
  searchBook = undefined;

  constructor(url) {
    this.url = url;
    this.fetchData();
    this.print = new Print();
  }

  set setWorld(world) {
    this.world = world;
  }

  set setSearchBook(book) {
    this.searchBook = book;
  }

  get getSearchBook() {
    return this.searchBook;
  }

  get getWorld() {
    return this.world;
  }

  fetchData() {
    // Feetching data from API
    fetchApiData(this);
  }
}

function fetchApiData(app) {
  fetch(app.url)
    .then(resp => resp.json()) // Transform the data into json
    .then(function(data) {
      app.setWorld = new World([...data]);

      let storage = window.localStorage;
      if (storage.getItem("searchBook")) {
        //console.log(JSON.parse(storage.getItem("searchBook")));
        //app.setSearchBook = new SearchBook(JSON.parse(storage.getItem('searchBook')));
        app.setSearchBook = new SearchBook(
          JSON.parse(storage.getItem("searchBook"))
        );
      } else {
        app.setSearchBook = new SearchBook();
      }

      //app.getSearchBook.loadSystemSearch('stan', 'Search Description');
      //console.log(app.getSearchBook.runSystemSearch(0, app.getWorld));
      // app.getSearchBook.getSystemSearches[0].runSearch(app.getWorld);
      return app;

      /*app.getSearchBook.getSystemSearches[2].runSearch(app.getWorld);
        app.getSearchBook.getSystemSearches[3].runSearch(app.getWorld);
        app.getSearchBook.getSystemSearches[4].runSearch(app.getWorld);*/

      //console.log(app.getSearchBook.getSystemSearches);
      //app.print.printBody(app.getWorld.countries);

      /// module.showCountries(countries);
    })
    .then(app => {
      //console.log(typeof app.getSearchBook.getSystemSearches[3].executor);

      if ((typeof app.getSearchBook.getSystemSearches[3].executor) == 'string') {
        
        app.getSearchBook.getSystemSearches[3].executor = new Function(
          "return " + app.getSearchBook.getSystemSearches[3].executor
        )();

        console.log(typeof app.getSearchBook.getSystemSearches[3].executor);
      }

     

      return app.getSearchBook.getSystemSearches[3].executor(app.getWorld, app.getSearchBook.getSystemSearches[3], app);
      //app.print.printBody(app.getSearchBook.getSystemSearches[0].runSearch(app.getWorld).getResult);
    })
    .then(search => {
      //app.print.printBody(search.getResult);
    })
    .catch(function(error) {
      console.log(error);
    });
}



