const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geoCode');
const forecast = require('./utils/foreCast');

const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup public directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Abhishek Kumar'
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me', name: 'Abhishek Kumar' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Type any address to get the Weather info of the location.',
    title: 'Help',
    name: 'Help Page'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'No address Provided' });
  }

  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ error: err });
    }
    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastdata,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }
  console.log(req.query);
  res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help Article Not Found',
    title: '404',
    name: 'Abhishek Kumar'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page Not Found',
    title: '404',
    name: 'Abhishek Kumar'
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is started');
});
