const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#output1');
const message2 = document.querySelector('#output2');
const message3 = document.querySelector('#output3');
const message4 = document.querySelector('#output4');
const message5 = document.querySelector('#output5');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    message1.textContent = 'Loading...';
    message2.textContent = '';
    message3.textContent = '';
    message4.textContent = '';
    message5.textContent = '';

    const location = search.value

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
            } else {
                message1.textContent = data.location + ' is ' + data.description;
                message2.textContent = 'Temperature: ' + data.temperature + 'C ';
                message3.textContent = 'Feels like: ' + data.feelsLike + 'C';
                message4.textContent = 'Humidity: ' + data.humidity + '%';
                message5.textContent = 'UV Index: ' + data.uvindex;

                const location = search.value
            }

        });
    });

})