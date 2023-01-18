const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('Success!! Returned IP:', ip);
});
fetchCoordsByIP('99.239.38.246', (error, data) => {
  if (error) {
    console.log("It's not working!", error);
    return;
  }
  console.log('Good job, it worked! Coordinates received:', data);
});
const exampleCoords = { latitude: '49.2488091', longitude: '-122.9805104' };
fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("Not working!", error);
    return;
  }
  console.log('Here are the flyover times for ya!', passTimes);

});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});