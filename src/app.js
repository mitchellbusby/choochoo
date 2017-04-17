import React from 'react';
import ReactDOM from 'react-dom';

import Mapping from './map';

import Sidebar from './sidebar';

import './scss/main.scss';

const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x100000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4()
    + s4() + '-' + s4() + s4() + s4();
}

const coordinateSet = [
  [151.1858, -33.8692],
  [151.1452, -33.8892],
];

let initialPoints = coordinateSet.map(coords => {
  return {
    id: guid(),
    coordinates: coords
  }
});

function foreverLoadingPoints() {
  fetch('/all_lines')
  .then(response => response.json())
  .then(responseBody => {
    this.setState({
      points: responseBody
    });
    setTimeout(foreverLoadingPoints.bind(this), 10000);
  });
}

const fetchRealTime = () => {
  fetch('/realtime')
  .then(response => response.json())
  .then(responseBody => {
    console.log(responseBody)
  });
}

const fetchServiceData = serviceId => {
  return fetch('/service')
    .then(response => response.json());
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: initialPoints,
      loadingServiceData: false,
      serviceData: []
    };
  }

  render() {
    const { points, serviceData, loadingServiceData } = this.state;

    return (
      <main>
        <Mapping points={points} onPointSelected={this.onSelectedPointChanged.bind(this)} />
        <Sidebar serviceData={serviceData} loadingServiceData={loadingServiceData} />
      </main>
    )
  }

  componentDidMount() {
    foreverLoadingPoints.bind(this)();
  }

  onSelectedPointChanged(newPointId) {
    console.log(newPointId)
    this.setState({loadingServiceData: true});
    fetchServiceData(newPointId)
    .then(serviceData => {
      console.log(serviceData);
      this.setState({
        serviceData: serviceData
      });
    });
  }
}

export default App;
