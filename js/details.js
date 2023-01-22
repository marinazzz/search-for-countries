const countryID = localStorage.getItem('countryID');

if (countryID) {
  getCountryDetails(countryID)
    .then((countryData) => {
      renderCountryDetails(countryData);
    })
    .catch(showError);
}

function formQueryParamFromArray(countryCodeArr) {
  let queryStringArr = '';
  countryCodeArr.forEach((countryCode) => {
    queryStringArr += countryCode + ';';
  });
  return queryStringArr;
}

async function getCountryDetails(id) {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
  return response.json();
}
async function getNeighbouringCountries(countryIds) {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${formQueryParamFromArray(
      countryIds
    )}`
  );
  return response.json();
}

function renderCountryDetails(countryData) {
  let grid = '';

  grid += `
    <div class="pad-md-bot">
     <img class="card__flag" src="${countryData.map(
       (flag) => flag.flags.svg
     )}" alt="${countryData.map((name) => name?.name.official)} flag" />
    </div>
    <div>
      <h2 class="pad-md-bot">${countryData.map((name) => name?.name.official)}
      </h2>
      <div class="grid grid--xl-gap pad-md-bot pad-md-top">
      <dl class="pad-md-bot">
      <div class="card__info-details">
         <dt>Native Name:</dt>
         <dd>${countryData.map((name) => name?.name.common)}</dd>
      </div>
      <div class="card__info-details">
         <dt>Population:</dt>
         <dd>${countryData.map((name) => name?.population)}</dd>
      </div>
      <div class="card__info-details">
         <dt>Region:</dt>
         <dd>${countryData.map((name) => name?.region)}</dd>
      </div>
      <div class="card__info-details">
         <dt>Sub Region:</dt>
         <dd>${countryData.map((name) => name?.subregion)}</dd>
      </div>
      <div class="card__info-details">
         <dt>Capital:</dt>
         <dd>${countryData.map((name) => name?.capital?.[0])}</dd>
      </div>
    </dl>
    </div>
          <div class="card__info-details">
             <dt>Top Level Domain:</dt>
             <dd>${countryData.map((name) => name?.tld[0])}</dd>
           </div>
           <div class="card__info-details">
           <dt>Timezone:</dt>
           <dd>${countryData.map((name) => name?.timezones[0])}</dd>
        </div>
    </div>
  `;
  document.getElementById('countryDetails').innerHTML = grid;
}
