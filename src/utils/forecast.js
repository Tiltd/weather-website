const request = require('request')

const forecast = (lati, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7e43c6c94351f8e73421c92afb340c91&query=' + encodeURIComponent(lati) + ',' + encodeURIComponent(long)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({ error: 'Unable to connect to weather service. Check connection and try again' }, undefined)
        } else if (body.error) {
            callback({ error: 'Unable to find location. Check location and try again.' })
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions,
                temperature: body.current.temperature,
                likeTemp: body.current.feelslike,
                location: body.location.name,
                humidity: body.current.humidity,
                uvindex: body.current.uv_index
            })
        }
    })
}

module.exports = forecast



///////// BEFORE ES6////////
// CHANGES MARKED WITH /*  */
// const request = require('request')

// const forecast = (lati, long, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=7e43c6c94351f8e73421c92afb340c91&query=' + encodeURIComponent(lati) + ',' + encodeURIComponent(long)
//     request({ url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service. Check connection and try again', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location. Check location and try again.')
//         } else {
//             callback(undefined, {
//                 description: response.body.current.weather_descriptions,
//                 temperature: response.body.current.temperature,
//                 likeTemp: response.body.current.feelslike,
//                 location: response.body.location.name
//             })
//         }
//     })
// }

// module.exports = forecast