import React from 'react';
import { Map, View, Feature, layer, source, geom} from 'ol-react';

import LightRailPoint from './light-rail-point';
import { fromLatLon } from './map-utils';

import lightRailLogo from './images/light_rail_logo.png';

class Mapping extends React.Component {
  render() {

    let lrStyle = {
      image: {
        type: 'icon',
        src: lightRailLogo
      }
    };

    let center = fromLatLon([151.1815, -33.8840]);

    let { points } = this.props;

    let mapPoints = points.map(point => {
      return (
        <Feature key={point.id} id={point.id} style={lrStyle}>
          <LightRailPoint id={point.id} coordinates={point.coordinates} />
        </Feature>
      )
    });

    return (
      <div className={'map-container'}>
        <Map view={<View resolution={14} center={center} />}
            onSingleClick={this.onPointSelected.bind(this)}
          >
          <layer.Tile>
            <source.OSM />
          </layer.Tile>
          <layer.Vector>
            <source.Vector>
              { mapPoints }
            </source.Vector>
          </layer.Vector>
        </Map>
      </div>
    )
  }

  onPointSelected(evt) {
    let pixel = evt.pixel;

    let features = [];

    evt.map.forEachFeatureAtPixel(pixel, (feature) => {
      features.push(feature);
    });

    let clicked_ids = features.map(feature => feature.getId());

    if (this.props.onPointSelected && clicked_ids.length > 0) {
      let first_clicked = clicked_ids[0];
      this.props.onPointSelected(first_clicked);
    }
  }
}

Mapping.propTypes = {
  points: React.PropTypes.arrayOf(React.PropTypes.any),
  onPointSelected: React.PropTypes.func,
};

Mapping.defaultProps = {
  points: []
}

export default Mapping;
