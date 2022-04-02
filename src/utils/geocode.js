const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamFjb2ItZ2FyZG5lciIsImEiOiJja3dkZ2dkd3IydnNxMnlsam9laGMwYzR4In0.lpriZ91SBgjfyNlj7Iac7Q&limit=1&fuzzyMatch=false'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({ error: 'Unable to connect to location services' })
        } else if (body.features.length === 0) {
            callback({ error: 'Unable to find location. Try another search' }, undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode


// BEFORE ES6
// CHANGES MARKED WITH /*  */
// const request = require('request')

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamFjb2ItZ2FyZG5lciIsImEiOiJja3dkZ2dkd3IydnNxMnlsam9laGMwYzR4In0.lpriZ91SBgjfyNlj7Iac7Q&limit=1&fuzzyMatch=false'

//     request({ url, json: true }, (error, /* response */) => {
//         if (error) {
//             callback('Unable to connect to location services')
//         } else if (/* response.body.features.length === 0 */) {
//             callback('Unable to find location. Try another search', undefined)
//         } else {
//             callback(undefined, {
//                 location: /* response.body.features[0].place_name */,
//                 longitude: /* response.body.features[0].center[0] */,
//                 latitude: /* response.body.features[0].center[1] */
//             })
//         }
//     })
// }

// module.exports = geocode