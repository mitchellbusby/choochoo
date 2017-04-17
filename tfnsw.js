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
      let payloadPromise = new Promise((resolve, reject) => {
        var result = [
          {
            id: guid(),
            coordinates: [151.1452, -33.8892],
          }
        ];
        resolve(result);
      });
      return payloadPromise;
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
