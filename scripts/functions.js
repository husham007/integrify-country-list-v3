// Listeners and supportive Functions

import * as module from "./script.js";
import Search from "./classes/search.js";


export const showCountries = countries => {
  module.countriesWrapper.innerHTML = " ";
  countries.forEach(country => {
    showCountry(country);
  });
  module.resultElement.className = "result-green";
  module.resultElement.textContent = `Number of found Countries are: ${
    countries.length
  }`;
};

function showCountry(country) {
  let countryDiv = document.createElement("div");
  let imageDiv = document.createElement("div");
  let content = document.createElement("div");
  let image = document.createElement("img");

  countryDiv.className = "country";
  // countryContent.className = 'country-content';
  image.src = country.flag;
  content.innerHTML =`<p>${country.name}, 
  ${country.capital} <br> ${reduce(country.languages, 'name').join(',')}</p>`;
 
  
  //countryContent.appendChild(content);
  imageDiv.appendChild(image);
  countryDiv.appendChild(imageDiv);
  countryDiv.appendChild(content);
  module.countriesWrapper.appendChild(countryDiv);
}

function reduce(array, key){
  //console.log(array, key)
  let sum = [];

array.reduce((acc, curr)=>{
sum.push(curr[key]);
}, '');

return sum;
}

export function btnListener(e) {
  reset();

  if (module.input.value !== null) {
    var event = new Event("input", {
      bubbles: true,
      cancelable: true
    });
    module.input.dispatchEvent(event);
  }
}

export function reverseBtnListener(e) {
  reset();
  module.input.value = null;
  if (e.target.className === "fas fa-sort-alpha-up fa-4x icon")
    e.target.className = "fas fa-sort-alpha-down fa-4x icon";
  else e.target.className = "fas fa-sort-alpha-up fa-4x icon";

  showCountries(module.countries.reverse());
}

export function inputListener() {
  if (validInputs()) {
    let searchBook = module.app.getSearchBook;
    let search = searchBook.createUserSearch(module.input.value, ((world, key)=>{
      return new Promise((resolve, reject)=>{
         let result = filterCountries(world, key);
          if (result){
              resolve(result);
          } else reject('error');
          
      });
      //return countries(world, key);
  }),
  'User Search');
  //console.log(search);
  search.executor(module.app.getWorld, search, module.app);
  //console.log(search);
  //module.app.print.printBody(search.getResult);    
  
}
else {
  console.log(module.app.getSearchBook.getCurrentSearch);
}
}

function filterCountries(world, value){
  return world.getCountries.filter(country => {
    return (
      search(country, "name", value) ||
      search(country, "capital", value) ||
      searchByLanguages(country, value)
    );
  });
}

function search(country, key, value) {
  return country[key].toUpperCase().includes(value.toUpperCase());
}

function searchByLanguages(country, value) {
  if (
    country.languages.find(language => {
      //console.log(language.name);
      return language.name
        .toUpperCase()
        .includes(value.toUpperCase());
    })
  ) {
    return true;
  } else {
    return false;
  }
}

function validInputs() {
  module.errorElement.innerHTML = "";
  module.select.value = 'common';
  if (!module.input.value) {
    module.errorElement.className = "result-red";
    module.errorElement.textContent = "Please Enter in the search field ";
    return true;
  } else if (!module.input.value.match(/^[A-Za-z]+$/g)) {
    module.errorElement.className = "result-red";
    module.errorElement.textContent = "Only Alphabetical keys dude!! :) ";
    return false;
  } else return true;
}

const element = (elementType, textContent, className, color) => {
  const element = document.createElement(elementType);
  element.textContent = textContent;
  element.className = className;
  element.style.background = color;
  return element;
};

function reset() {
  module.resultElement.textContent = null;
  module.errorElement.textContent = null;
  module.resultElement.className = null;
  module.errorElement.className = null;
}

export function inputClickListener(e) {
  document.querySelector(".input-wrapper").style.border = "2px solid black";
}

export function inputBlurListener(e) {
  document.querySelector(".input-wrapper").style.border = null;
}

export function selectListener(e) {
  let option = module.app.getSearchBook.getSystemSearches.find((search)=>{
    if (search.description === e.target.value){
      console.log('value matched');
      return true;
    }
  });
  option.executor(module.app.getWorld, option, module.app);
}



export function handleSort(e){
  
  if (e.target.className === 'sort-name'){

      sort(module.countries, 'name');      
      showCountries(module.countries);


  } else if (e.target.className === 'sort-capital'){
    sort(module.countries, 'capital');      
      showCountries(module.countries);
  } else {
    sort(module.countries, 'population');      
      showCountries(module.countries)

  }
}

function sort(arr, byKey){
  arr.sort((a, b)=>{
    if (a[byKey] > b[byKey]){
      return -1;
    }
    else {
      return 1;
    }
  })
}


export const countries = (world, key) => {
  //console.log(key);
  return world.getCountries.filter(country => {
    return country.region.includes(key);
  });
}