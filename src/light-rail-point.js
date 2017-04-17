// A wrapper for a point


import React from 'react';
import { geom } from '@mitchelljbusby/ol-react';

import { fromLatLon } from './map-utils';

class LightRailPoint extends React.Component {
  render() {
    let { coordinates } = this.props;

    let projectedCoordinates = fromLatLon(coordinates);

    return (
      <geom.Point>
        { projectedCoordinates }
      </geom.Point>
    )
  }
}

LightRailPoint.propTypes = {
  coordinates: React.PropTypes.arrayOf(React.PropTypes.number)
}

export default LightRailPoint;
