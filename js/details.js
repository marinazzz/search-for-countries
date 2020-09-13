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
} else {
  console.log("Something wrong");
}

/* TODO: implement country detais fetching using the
   https://restcountries.eu/#api-endpoints-name end point
*/

function formQueryParamFromAray(countryCodeArr) {
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
// recieves an array of country iso 3 letter codes as an argment
async function getNeighbouringCountries(countryIds) {
  const response = await fetch(
    `https://restcountries.eu/rest/v2/alpha?codes=${formQueryParamFromAray(
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
        <div class="card__info-details card__info-details--no-pad">Border Countries:
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
  // replace ul with definition lists
  grid += `
    <div class="card__image pad-md-bot">
    <img src="${countryData.flag}" alt="${countryData.name} flag" />
    </div>
    <div>
      <h2 class="pad-md-bot">${countryData.name}</h2>
      <div class="grid grid--xl-gap pad-md-bot pad-md-top">
        <ul class="pad-md-bot">
          <li class="card__info-details">Native Name:
            <span>${countryData.nativeName}</span>
          </li>
          <li class="card__info-details">Population:
            <span>${countryData.population}</span>
          </li>
          <li class="card__info-details">Region:
            <span>${countryData.region}</span>
          </li>
          <li class="card__info-details">Sub Region:
            <span>${countryData.subregion}</span>
          </li>
          <li class="card__info-details">Capital:
            <span>${countryData.capital}</span>
          </li>
        </ul>
        <ul>
          <li class="card__info-details">Top Level Domain:
            <span>${countryData.topLevelDomain}</span>
          </li>
          <li class="card__info-details">Currencies:
            <span>${countryData.currencies.map(
              (currency) => currency.name
            )}</span>
          </li>
          <li class="card__info-details">Language:
            <span>${countryData.languages.map(
              (language) => language.name
            )}</span>
          </li>
        </ul>
      </div>
      ${neighouringCountriesList}
    </div>
  `;
  console.log(neighouringCountriesList);
  document.getElementById("countryDetails").innerHTML = grid;
}
