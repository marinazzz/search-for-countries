const countryID = localStorage.getItem("countryID");

if (countryID) {
  getCountryDetails()
  .then((countryID) => {
    renderCountryDetails(countryID);
  });
} else {
  console.log('Something wrong');
}

/* TODO: implement country detais fetching using the
   https://restcountries.eu/#api-endpoints-name end point
*/

async function getCountryDetails() {
  const response = await fetch(
    "https://restcountries.eu/rest/v2/all?fullText=true"
  );
  return response.json();
}

function renderCountryDetails(countryList) {
  let grid = "";
  countryList.forEach((country) => {
    grid += `
        <div class="card__image pad-md-bot">
        <img src="${country.flag}" alt="${country.name} flag" />
        </div>
        <div>
          <h2 class="pad-md-bot">${country.name}</h2>
          <div class="grid grid--xl-gap pad-md-bot pad-md-top">
            <ul class="pad-md-bot">
              <li class="card__info-details">Native Name:
                <span>${country.nativeName}</span>
              </li>
              <li class="card__info-details">Population:
                <span>${country.population}</span>
              </li>
              <li class="card__info-details">Region:
                <span>${country.region}</span>
              </li>
              <li class="card__info-details">Sub Region:
                <span>${country.subregion}</span>
              </li>
              <li class="card__info-details">Capital:
                <span>${country.capital}</span>
              </li>
            </ul>
            <ul>
              <li class="card__info-details">Top Level Domain:
                <span>${country.topLevelDomain}</span>
              </li>
              <li class="card__info-details">Currencies:
                <span>${country.currencies.map(
                  (currency) => currency.name
                )}</span>
              </li>
              <li class="card__info-details">Language:
                <span>${country.languages.map(
                  (language) => language.name
                )}</span>
              </li>
            </ul>
          </div>
          <div class="pad-md-top">
            <div class="card__info-details card__info-details--no-pad">Border Countries:
              <div class="links-row">
                <a class="main-btn">
                  France</a>
                <a class="main-btn">
                  Germany</a>
                <a class="main-btn">
                  Netherlands</a>
                </div>
            </div>
          </div>
        </div>
        `;
  });
  document.getElementById("countryDetails").innerHTML = grid;
}


