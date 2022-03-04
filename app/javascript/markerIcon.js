import L from 'leaflet';

console.log(L.Icon.Default.prototype.options)
const icon = L.icon({
  ...L.Icon.Default.prototype.options,
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default icon;