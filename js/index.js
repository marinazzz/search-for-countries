let select = new SlimSelect({
    select: '#slim-select',
    showSearch: false,
})

async function getCountries() {
    const response = await fetch('https://restcountries.eu/rest/v2/region/europe');
    return response.json();
}

function renderCountries(countriesList) {
    let card = '';
    countriesList.forEach((country) => {
        card += `
          <a class="card" href="details.html">
              <div class="card__image">
                  <img src="${country.flag}" alt="${country.name} flag" />
              </div>
              <div class="card__info">
                  <h2 class="card__info-heading">${country.name}</h2>
                  <ul>
                      <li class="card__info-details">Population:
                          <span>${country.population}</span>
                      </li>
                      <li class="card__info-details">Region:
                          <span>${country.region}</span>
                      </li>
                      <li class="card__info-details">Capital:
                          <span>${country.capital}</span>
                      </li>
                  </ul>
              </div>
          </a>`
    });
    document.getElementById('output').innerHTML = card;
}

getCountries()
.then(data => {
    renderCountries(data);
})
.catch(showError);

function showError() {
    let div = document.createElement('div');
    div.innerHTML = `
    <div class="alert" role="alert">
     <div class="alert__header">&#9888;</div>
     <div class="alert__body">
       <h3 class="alert__body-heading"><strong>Warning!</strong></h3>
        An error has occured, please reload the web page and try again.
     </div>
     <div class="alert__footer"></div>
    </div>
  `;
    document.body.append(div);
}


const searchCountry = document.getElementById('searchCountry');
searchCountry.addEventListener('keyup', filterCountry);

const countries = document.querySelectorAll('.card');

function filterCountry() {
    const countryNames = document.querySelectorAll('.card__info-heading');

    countryNames.forEach((name) => {
        name.textContent.toLowerCase().includes(searchCountry.value.toLowerCase()) ?
            name.parentElement.parentElement.style.display = 'block' :
            name.parentElement.parentElement.style.display = 'none';
    })
}
