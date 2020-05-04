const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 65535;
const weather = require('./utils/weather');
//app.com/
//app.com/help
//app.com/about

//Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');

//setup hbs engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicPath));


app.get('/about', (req, res) => {
    res.render('about', {
        headTitle: 'About',
        title: 'About page',
        name: 'RB609',
        age: '20'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        headTitle: "Help",
        title: 'Help page',
        name: 'RB609'
    })
})
app.get('', (req, res) => {
    res.render('index', {
        headTitle: 'Home',
        title: 'Weather app',
        name: 'RB609'
    });
})

app.get('/weather', (req, res) => {
    if(req.query.address) {
        return weather(req.query.address, (error, data, place) => {
            if(error) {
                res.send({
                    error
                })
            }
            else {
                res.send({
                    forcast: data.current.weather_descriptions[0],
                    place: place,
                    temperature: data.current.temperature,
                    feels_like: data.current.feelslike,
                })
            }
        });
    }
    res.send({
        error: 'Please fill address'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        headTitle: '404 not found',
        title: '404',
        error: 'Help Article not found'
    });
})

app.get('*', (req, res) => { //Match everything that hasnt been listed above
    res.render('404', {
        headTitle: '404 not found',
        error: 'Page not found',
        title: '404'
    });
})

app.listen(port, () => {
    console.log("Server up on port 65535");
});