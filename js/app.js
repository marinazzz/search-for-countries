(() => {
  const darkModeStatus = Number(localStorage.getItem('darkMode'));
  darkModeStatus === 1 ?
    document.body.classList.add('dark-mode') :
    document.body.classList.remove('dark-mode');
})()

const darkModeBtn = document.querySelector('.dark-mode__btn');

darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  document.body.classList.contains('dark-mode') ?
    localStorage.setItem('darkMode', '1') :
    localStorage.removeItem('darkMode');
});

function showError() {
  let div = document.createElement("div");
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