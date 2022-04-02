const path = require('path')
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //telling the app to load the site from this directory. If this is not here, you will not have access to /img /js /css in the views

//Before HBS View Engine
// app.use('/help', express.static(path.join(__dirname, '../public/help.html'))) Setting static route for help.html in the public directory when /help is added to the url
// app.use('/about', express.static(path.join(__dirname, '../public/about.html'))) Setting static route for about.html in the public directory when /about is added to the url

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jacob Gardner'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jacob Gardner'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'How can we help?',
        name: 'Jacob Gardner'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'

        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { //{ latitude, longitude, location } = {} is setting a default object if there is an error before the oject is made.
        if (error) {
            return res.send(error)
        }
        forecast(latitude, longitude, (error, { description, temperature, location, likeTemp }) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                description: description,
                temperature: temperature,
                location: location,
                feelsLike: likeTemp
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        pageMessage: "Help article couldn't be found. Return to the help page for more assistance."
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        pageMessage: "Oh no. Page couldn't be found. "
    })
})
app.listen(3000, () => {
    console.log('Server started. Port 3000')
})

