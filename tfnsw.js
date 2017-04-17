const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

var config = require('./config');

const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x100000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4()
    + s4() + '-' + s4() + s4() + s4();
}


class TfNswApi {
  constructor() {

  }
  /**
   * Returns a payload of data
   */
  fetch() {
      return this.realtime()
      .then(feed => {
        let current_vehicles = feed.entity.map(item => {
          let { latitude, longitude } = item.vehicle.position;
          return {
            id: item.vehicle.trip.trip_id,
            coordinates: [longitude, latitude]
          }
        });
        return current_vehicles;
      });
  }

  /**
   * Returns the raw protobuf entities from the TfNsw feed
   */
  realtime() {
      let promise = new Promise((resolve, reject) => {
        var requestSettings = {
          method: 'GET',
          url: 'https://api.transport.nsw.gov.au/v1/gtfs/vehiclepos/lightrail',
          headers: {
            'Authorization': 'apikey ' + config.TFNSW_API_KEY,
            'Accept': 'application/x-google-protobuf',
          },
          encoding: null,
        };

        request(requestSettings, (error, response, body) => {
          if (!error && response.statusCode == 200) {
            var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
            resolve(feed);
          }
          else {
            reject('ERROR IN REQUEST!');
          }
        });
      });
      return promise;
  }

  /**
   * Gets detailed information about the given service
   */
  service(id) {
    let payloadPromise = new Promise((resolve, reject) => {
      var result = {
        title: 'Towards Central',
        id: id,
        stops: [
          {
            name: 'Lilyfield',
            time: '11:05am'
          },
          {
            name: 'Rozelle Bay',
            time: '11:12am'
          },
          {
            name: 'Jubilee Park',
            time: '11:20am'
          }
        ],
      }
      resolve(result);
    });
    return payloadPromise;
  }
}



module.exports = {
  TfNswApi
}
