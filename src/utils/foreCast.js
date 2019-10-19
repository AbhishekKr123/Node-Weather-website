const request = require('request');

const foreCast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/56e86bc8f8c475ae05bad55e56089afd/' +
    latitude +
    ',' +
    longitude +
    '?units=us';
  request({ url, json: true }, (err, { body }) => {
    //const data = response.body;
    if (err) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location.Try another search', undefined);
    } else {
      const data = body.currently;
      callback(
        undefined,
        body.daily.data[0].summary +
          ' It is currently ' +
          body.currently.temperature +
          ' degress out. This high today is ' +
          body.daily.data[0].temperatureHigh +
          ' with a low of ' +
          body.daily.data[0].temperatureLow +
          '. There is a ' +
          body.currently.precipProbability +
          '% chance of rain.'
      );
    }
  });
};

module.exports = foreCast;
