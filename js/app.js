// let select = new SlimSelect({
//     select: '#slim-select',
//     showSearch: false,
//     placeholder: 'Filter by Region',

//     data: [
//         { text: 'Value 1' },
//         { text: 'Value 2' },
//         { text: 'Value 3' }
//     ]
// })

const darkModeBtn = document.querySelector('.dark-mode__btn');

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
