const request = require('request');

const geoCode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/+' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiYWJoaXNoZWtiaGFza2FyMzUiLCJhIjoiY2p2czZ4MjVxMGN5eDQ5bDlhdjg1ZmJ0byJ9.NhpY5H0j08WyIZcLV5NXew';
  request({ url, json: true }, (err, res) => {
    if (err) {
      callback('Unable to fetch the map api service', undefined);
    } else if (res.body.message) {
      callback('Invalid Url', undefined);
    } else {
      if (res.body.features.length > 0) {
        callback(undefined, {
          latitude: res.body.features[0].center[1],
          longitude: res.body.features[0].center[0],
          location: res.body.features[0].place_name
        });
      } else {
        callback(
          'Unable to find the location.Please try another search.',
          undefined
        );
      }
    }
  });
};

module.exports = geoCode;
