const countryID = localStorage.getItem("countryID");

if (countryID) {
  getCountryDetails(countryID).then((countryData) => {
    if (countryData.borders.length > 0) {
      getNeighbouringCountries(countryData.borders).then((countries) => {
        renderCountryDetails(countryData, countries);
      });
      // implement error handling
    } else {
      renderCountryDetails(countryData, null);
    }
  });
  // implement error handling
}

function formQueryParamFromArray(countryCodeArr) {
  let queryStringArr = "";
  countryCodeArr.forEach((countryCode) => {
    queryStringArr += countryCode + ";";
  });
  return queryStringArr;
}

async function getCountryDetails(id) {
  const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  return response.json();
}
// recieves an array of country iso 3 letter codes as an argument
async function getNeighbouringCountries(countryIds) {
  const response = await fetch(
    `https://restcountries.eu/rest/v2/alpha?codes=${formQueryParamFromArray(
      countryIds
    )}`
  );
  return response.json();
}

function renderCountryDetails(countryData, neighbouringCountries) {
  let grid = "";
  let neighouringCountriesList = "";
  if (neighbouringCountries !== null) {
    neighouringCountriesList = `
      <div class="pad-md-top">
        <div class="card__info-details">
         <h3>Border Countries:</h3>
         <div class="links-row">`;
    neighbouringCountries.forEach((country) => {
      neighouringCountriesList += `
      <span class="main-btn">${country.name}</span>
      `;
    });
    neighouringCountriesList += `
          </div>
        </div>
      </div>`;
  }
  grid += `
    <div class="pad-md-bot">
     <img class="card__flag" src="${countryData.flag}" alt="${countryData.name} flag" />
    </div>
    <div>
      <h2 class="pad-md-bot">${countryData.name}</h2>
      <div class="grid grid--xl-gap pad-md-bot pad-md-top">
        <dl class="pad-md-bot">
          <div class="card__info-details">
             <dt>Native Name:</dt>
             <dd>${countryData.nativeName}</dd>
          </div>
          <div class="card__info-details">
             <dt>Population:</dt>
             <dd>${countryData.population}</dd>
          </div>
          <div class="card__info-details">
             <dt>Region:</dt>
             <dd>${countryData.region}</dd>
          </div>
          <div class="card__info-details">
             <dt>Sub Region:</dt>
             <dd>${countryData.subregion}</dd>
          </div>
          <div class="card__info-details">
             <dt>Capital:</dt>
             <dd>${countryData.capital}</dd>
          </div>
        </dl>
        <dl>
          <div class="card__info-details">
             <dt>Top Level Domain:</dt>
             <dd>${countryData.topLevelDomain}</dd>
           </div>
          <div class="card__info-details">
             <dt>Currencies:</dt>
             <dd>${countryData.currencies.map(
                 (currency) => currency.name
               )}</dd>
          </div>
          <div class="card__info-details">
              <dt>Language:</dt>
              <dd>${countryData.languages.map(
               (language) => language.name
              )}</dd>
           </div>
        </dl>
      </div>
      ${neighouringCountriesList}
    </div>
  `;
  document.getElementById("countryDetails").innerHTML = grid;
}
