/*
  Countries filter script
  Author: Husham
  License: free to use
*/

import * as module from "./functions.js";
import App from './classes/app.js'


export const startBtn = document.querySelector("#start");
export const searchBtn = document.querySelector("#include");
export const reverseBtn = document.querySelector(".fa-sort-alpha-down");
export const resultElement = document.querySelector(".result");
export const errorElement = document.querySelector(".error");
export const input = document.querySelector(".input-text");
export const countriesWrapper = document.querySelector(".countries-wrapper");
export let countries = [];
export const sortName = document.querySelector(".sort-name");
export const sortCapital = document.querySelector(".sort-capital");
export const sortPopulation= document.querySelector(".sort-population");


const url = "https://restcountries.eu/rest/v2/all"; // countries data


const app = new App(url);

//console.log(app);

// Event Listeners registration
/*
startBtn.addEventListener("click", module.btnListener);
searchBtn.addEventListener("click", module.btnListener);
reverseBtn.addEventListener("click", module.reverseBtnListener);
input.addEventListener("input", module.inputListener);
input.addEventListener("click", module.inputClickListener);
input.addEventListener("blur", module.inputBlurListener);
sortName.addEventListener("click", module.handleSort);
sortCapital.addEventListener("click", module.handleSort);
sortPopulation.addEventListener("click", module.handleSort);
*/



