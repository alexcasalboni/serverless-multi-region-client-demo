import React from 'react';
import { compose, withProps, withHandlers } from "recompose"
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps"
import {geolocated} from 'react-geolocated';
import RegionSideBar from './RegionSideBar';
import UserSideBar from './UserSideBar';
import {RegionMarker, UserMarker, PathMarker} from './Markers'
import regions from './regions.json';

const refs = {
  map: undefined,
};

const Map = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=" + process.env.REACT_APP_GOOGLE_MAP_API_KEY,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `500px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
      defaultCenterLat: 50.110560,
      defaultCenterLng: 8.636554,
      defaultZoom: 3,
    }),
    withHandlers({
      onMapMounted: () => ref => {
        refs.map = ref;
      },
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      options={{
        fullscreenControl: false,
        streetViewControl: false,
      }}
      ref={props.onMapMounted}
      defaultZoom={props.defaultZoom}
      defaultCenter={{
        lat: props.defaultCenterLat,
        lng: props.defaultCenterLng
      }}
    >
      {props.markers}
    </GoogleMap>
)


class MapAWS extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      region: null,
      user: false,
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
  }

  handleUserClick = (region) => {
    this.setState((state) => ({
      user: !state.user,
      region: null,
    }));
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
            key={"path-user-" + this.state.region.name}
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

  isSidebarActive = () =>
    this.state.region || this.state.user

  render = () => (
    <div className={'MapContainer ' + (this.isSidebarActive() ? 'active' : '')}>
      <div className="Map">
        <Map markers={this.getMarkers()} />
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
  )

}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(MapAWS);
