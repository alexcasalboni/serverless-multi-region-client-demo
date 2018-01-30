import React from 'react';
import {geolocated} from 'react-geolocated';
import {Map, refs} from './Map'
import RegionSideBar from './RegionSideBar';
import UserSideBar from './UserSideBar';
import {RegionMarker, UserMarker, PathMarker} from './Markers'
import regions from './regions.json';


class MapAWS extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      region: null,
      user: false,
      markers: [],
    };
    this.regionsRef = {};
  }

  handleRegionClick = (region) => {
    if (!region.endpoint) {
      region = null;
    }
    this.setState((state) => ({
      region: state.region === region ? null : region,
      user: false,
    }));
    this.updateMarkers();
  }

  handleUserClick = (region) => {
    this.setState((state) => ({
      user: !state.user,
      region: null,
    }));
    this.updateMarkers();
  }

  buildRegionMarker = (regionCode, region) =>
     <RegionMarker 
      key={regionCode}
      region={region}
      onClick={() => this.handleRegionClick(region)}
      saveRef={(ref) => {this.regionsRef[region.name] = ref;}}
    />

  getMarkers = () => {
    const markers = this.getRegionMarkers();
    if (this.hasGeolocation()) {
      markers.push(
        <UserMarker
          key="user"
          coords={this.props.coords}
          onClick={() => this.handleUserClick()}
          saveRef={(ref) => {this.userRef = ref;}}
        />
      );
      if (this.state.region) {
        markers.push(
          <PathMarker
            key={`path-user-${refs.map.getZoom()}-${this.state.region.name}`}
            map={refs.map}
            source={this.userRef}
            target={this.regionsRef[this.state.region.name]}
          />
        )
      }
    }
    return markers;
  }

  getRegionMarkers = () => 
    Object.keys(regions).map(
      regionCode => this.buildRegionMarker(regionCode, regions[regionCode])
    )

  hasGeolocation = () =>
    this.props.isGeolocationAvailable &&
    this.props.isGeolocationEnabled &&
    this.props.coords

  isSidebarActive = () => this.state.region || this.state.user

  updateMarkers() {
    this.setState({
      markers: this.getMarkers(),
    })
  }

  onZoomChanged = () => this.updateMarkers()
  componentDidMount = () => this.updateMarkers()

  render() {
    if (this.hasGeolocation()) {  // workaround (there is no event to detect geolocation)
      if (!this.state.markers.filter(m => m.type === UserMarker).length) {
        setTimeout(() => this.updateMarkers(), 500);  // side-effect (anti-pattern))
      }
    }
    return <div className={'MapContainer ' + (this.isSidebarActive() ? 'active' : '')}>
      <div className="Map">
        <Map
          onZoomChanged={this.onZoomChanged}
          markers={this.state.markers}
        />
      </div>
      <div className="MapSidebar">
        {
          this.state.user &&
          <UserSideBar
            coords={this.props.coords}
          />
        }
        {
          this.state.region &&
          <RegionSideBar
            region={this.state.region}
            user={this.state.activeUser}
          />
        }
      </div>
    </div>
  }

}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(MapAWS);
