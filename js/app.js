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
