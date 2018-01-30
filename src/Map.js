import React from 'react';
import { compose, withProps, withHandlers } from "recompose"
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps"

export const refs = {
    map: undefined,
};

export const Map = compose(
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
        mapTypeControl: false,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.TOP_LEFT,
        }
      }}
      ref={props.onMapMounted}
      onZoomChanged={props.onZoomChanged}
      defaultZoom={props.defaultZoom}
      defaultCenter={{
        lat: props.defaultCenterLat,
        lng: props.defaultCenterLng
      }}
    >
      {props.markers}
    </GoogleMap>
);
