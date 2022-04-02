const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#output1');
const message2 = document.querySelector('#output2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'Loading...';
    message2.textContent = '';
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
            } else {
                message1.textContent = '';
                message2.textContent = data.location + ' is ' + data.description + '. Temperature is ' + data.temperature + 'C and feels like ' + data.feelsLike + 'C.';
            }

        });
    });

})