import ol from 'openlayers';

const fromLatLon = (coordinates, opt_projection) => {
    return ol.proj.transform(coordinates, 'EPSG:4326',
      opt_projection !== undefined ? opt_projection : 'EPSG:3857'
    );
}


export { fromLatLon };
