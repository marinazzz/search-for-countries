let nameFilter;
let regionFilter;

let select = new SlimSelect({
  select: "#slim-select",
  showSearch: false,
  placeholder: "Filter by Region",
  onChange: (e) => {
    searchCountry();
  },
  allowDeselect: true,
});

let countriesData = [];

async function getCountries() {
  const response = await fetch(
    "https://restcountries.eu/rest/v2/all?fields=name;capital;alpha3Code;flag;population;region"
  );
  return response.json();
}

getCountries()
  .then((data) => {
    countriesData = data;
    renderCountries(countriesData);
    saveToLocalStorage();
  })
  .catch(showError);

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

const search = document.getElementById("search");
search.addEventListener("keyup", debounce(searchCountry, 300));

function searchCountry() {
  nameFilter = search.value;
  regionFilter = select.data.data.filter(regionName => regionName.selected)[0].value;

  filterCountries(nameFilter, regionFilter);
}

function filterCountries(nameFilter, regionFilter) {
  const filterResults = countriesData.filter(country => {
    if (nameFilter && regionFilter) {
      return country.name.toLowerCase().includes(nameFilter) && country.region.includes(regionFilter);
    } else if (nameFilter || regionFilter) {
      return nameFilter ?
        country.name.toLowerCase().includes(nameFilter) :
        country.region.includes(regionFilter);
    }
  });
  renderCountries(filterResults);
  saveToLocalStorage();
}

const spinnerWrapper = document.querySelector('.spinner-wrapper');
window.addEventListener('load', () => {
  spinnerWrapper.parentElement.removeChild(spinnerWrapper);
});