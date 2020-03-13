/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYXhsd2FuZzE5NzYiLCJhIjoiY2s3bXgyczA3MG1yNjNtbzN5emhsZXBvNiJ9.YPSvp997dLJUn92340bU_g';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/axlwang1976/ck7mxp4ul0i5u1ilau6qpwpr5',
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(location => {
    const el = document.createElement('div');
    el.classList.add('marker');

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(location.coordinates)
      .addTo(map);

    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(location.coordinates)
      .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
      .addTo(map);

    bounds.extend(location.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
