/* Imports */
// > Part A: Import `getCountries` from fetch-utils.js
import { getContinents, getCountries } from './fetch-utils.js';
// > Part B: Import `getContinents` from fetch-utils.js
import { renderContinentOption, renderCountry } from './render-utils.js';

/* Get DOM Elements */
const notificationDisplay = document.getElementById('notification-display');
const searchForm = document.getElementById('search-form');
const continentSelect = document.getElementById('continent-select');
const countryList = document.getElementById('country-list');

/* State */
let error = null;
let count = 0;
let continents = [];
let countries = [];

/* Events */
window.addEventListener('load', async () => {
    // > Part A: call findCountries (with no arguments)
    findCountries();
    // > Part B: await the call to get continents to get the response
    const response = await getContinents();
    // > Part B: Assign to state the:
    //      - error,
    //      - data (to the continents variable)
    error = response.error;
    continents = response.data;

    if (!error) {
        displayContinentOptions();
    }
});

async function findCountries(name, continent) {
    // > Part A: Call the service function that gets the countries
    const response = await getCountries(name, continent);
    // > Part C: Add the name and continent arguments to getCountries

    // > Part A: Assign to state the :
    //      - error,
    //      - data (to the countries variable)
    error = response.error;
    count = response.count;
    countries = response.data;

    // > Part D: Assign to state the:
    //      - count (of db records)

    displayNotifications();
    if (!error) {
        displayCountries();
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    // > Part C: Call findCountries with name and continent from formData
    findCountries(formData.get('name'), formData.get('continent'));
});

/* Display Functions */
function displayCountries() {
    countryList.innerHTML = '';

    for (const country of countries) {
        // > Part A: render and append to list
        const countryEl = renderCountry(country);
        countryList.append(countryEl);
    }
}

function displayNotifications() {
    if (error) {
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.classList.remove('error');
        // > Part D: Display a message with
        //      - how many items were returned in countries array
        //      - how many total matching countries were in the db
        notificationDisplay.textContent = `Showing ${countries.length} of ${count} matching countries`;
    }
}

function displayContinentOptions() {
    for (const continent of continents) {
        // > Part B: render and append options to select
        const option = renderContinentOption(continent);
        continentSelect.append(option);
    }
}
