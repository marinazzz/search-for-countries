let select = new SlimSelect({
  select: "#slim-select",
  showSearch: false,
  placeholder: "Filter by Region",
  onChange: (e) => {
    filterByRegion(e.value)
  },
  allowDeselect: true
});

let countriesData = [];

async function getCountries() {
  const response = await fetch(
    "https://restcountries.eu/rest/v2/all?fields=name;capital;alpha3Code;flag;population;region"
  );
  return response.json();
}

function renderCountries(countriesList) {
  let card = "";
  countriesList.forEach((country) => {
    card += `
          <a href="details.html" class="card" data-country-code="${country.alpha3Code}">
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
          </a>`;
  });
  document.getElementById("output").innerHTML = card;
}

getCountries()
  .then((data) => {
    countriesData = data;
    renderCountries(countriesData);
    saveToLocalStorage();
  })
  .catch(showError);

function saveToLocalStorage() {
let countriesNodes = [...document.querySelectorAll(".card")];
    countriesNodes.forEach((cardNode) => {
      cardNode.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.setItem(
          "countryID",
          cardNode.dataset.countryCode
        );
        window.location.assign("details.html");
      });
    });
}
const debounce = (func, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

let search = document.getElementById("search");
search.addEventListener("keyup", debounce(searchCountry, 300));

function searchCountry() {
  filteredCountry ?
    filterData(filteredCountry) :
    filterData(countriesData);
}

function filterData(data) {
  const results = data.filter((value) => {
    return value.name
      .toLowerCase()
      .includes(search.value.toLowerCase());
  });
  renderCountries(results);
  saveToLocalStorage();
}

let filteredCountry = '';
function filterByRegion(name) {
  const regions = countriesData.filter((country) => {
    return country.region.includes(name);
  });
  filteredCountry = regions;
  renderCountries(filteredCountry);
  saveToLocalStorage();
}
