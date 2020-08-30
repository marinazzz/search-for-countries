let select = new SlimSelect({
  select: '#slim-select',
  showSearch: false,
  placeholder: 'Filter by Region',
  // data: [
  //   { text: 'Value 1' },
  //   { text: 'Value 2' },
  //   { text: 'Value 3' }
  // ]
})

// Dark mode presistence implementation example
// (() => {
//   const darkModeStatus = Number(localStorage.getItem('darkMode'));
//   darkModeStatus === 1 ?
//     document.body.classList.add('dark-mode') :
//     document.body.classList.remove('dark-mode');
// })()

const darkModeBtn = document.querySelector('.dark-mode__btn');

darkModeBtn.addEventListener('click', () => {

  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', '1');
  } else {
    localStorage.removeItem('darkMode');
  }
});

// error handling needs to be implemented
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
                <img src="${country.flag}" alt="Germany flag" />
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

getCountries().then(data => {
  renderCountries(data);
})

// getCountry();


// .catch(function (err) {
    //     // There was an error
    //     console.warn('Something went wrong.', err);
    // });


// const searchCountry = document.getElementById('searchCountry');
// searchCountry.addEventListener('keyup', function (e) {

// })