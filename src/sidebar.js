import React from 'react';

class Sidebar extends React.Component {
  render() {

    let { loadingServiceData, serviceData } = this.props;

    if (loadingServiceData) {
      return (
        <div className={'sidebar'}>
          <h2>Loading...</h2>
        </div>
      )
    }

    if (!serviceData) {
      return (
        <div className={'sidebar'}>
          <h2>Select a carriage to see service data</h2>
        </div>
      )
    }

    return (
      <div className={'sidebar'}>
        <h2>Towards Central</h2>
        <h3>Current stop: Lilyfield</h3>
        <ul>
          <li>Lilyfield | 11:05am</li>
            <li>Rozelle Bay | 11:12am</li>
            <li>Jubilee Park | 11:20am</li>
        </ul>
      </div>
    )
  }
}

Sidebar.propTypes = {
  selectedItem: React.PropTypes.any,
  loadingServiceData: React.PropTypes.bool,
  serviceData: React.PropTypes.any
}

export default Sidebar;
