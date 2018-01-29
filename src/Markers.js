import React from 'react';
import { compose, withStateHandlers } from "recompose"
import { Marker, InfoWindow } from "react-google-maps"
import awsLogo from './imgs/aws.png';
import awsLogoBW from './imgs/aws-bw.png';
import userImg from './imgs/user.png';

const ICON_SIZE = 30;

export const RegionMarker = compose(
    withStateHandlers(() => ({
      isOpen: false,
    }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      })
    }),
  )((props) => 
    <Marker 
      position={{
        lat: props.region.lat,
        lng: props.region.long,
      }}
      onClick={props.onClick}
      onMouseOver={props.onToggleOpen}
      onMouseOut={props.onToggleOpen}
      icon={{
        url: props.region.endpoint ? awsLogo : awsLogoBW,
        size: {width: ICON_SIZE, height: ICON_SIZE},
        scaledSize: {width: ICON_SIZE, height: ICON_SIZE},
      }}
      ref={props.saveRef}
    >
      {props.isOpen && 
        <InfoWindow onCloseClick={props.onToggleOpen}>
          <div>
            {props.region.name}
          </div>
        </InfoWindow>
      }
    </Marker>
  )


export class UserMarker extends React.PureComponent {
  render = () =>
    <Marker 
      onClick={this.props.onClick}
      position={{
        lat: this.props.coords.latitude,
        lng: this.props.coords.longitude,
      }}
      icon={{
        url: userImg,
        size: {width: ICON_SIZE, height: ICON_SIZE},
        scaledSize: {width: ICON_SIZE, height: ICON_SIZE},
      }}
      ref={this.props.saveRef}
    />
}


export class PathMarker extends React.Component {

  constructor(props) {
    super(props);
    this.map = props.map;
    this.source = props.source;
    this.target = props.target;
  }

  computeIconPath() {
    // SO reference: https://stackoverflow.com/a/24575594/1875166
    const curvature = 0.3;
    const p1 = this.map.getProjection().fromLatLngToPoint(this.source.getPosition());
    const p2 = this.map.getProjection().fromLatLngToPoint(this.target.getPosition());
    const e = new window.google.maps.Point(p1.x - p2.x, p1.y - p2.y);
    const m = new window.google.maps.Point(e.x / 2, e.y / 2);
    const o = new window.google.maps.Point(e.y, -e.x);
    const c = new window.google.maps.Point(m.x + curvature * o.x, m.y + curvature * o.y);
    return "M 0 0 q " + c.x + " " + c.y + " " + e.x + " " + e.y;
  }

  getPosition = () => this.source.getPosition()

  getIcon() {
    return {
      path: this.computeIconPath(),
      scale: 1 / (Math.pow(2, -this.map.getZoom())),
      strokeWeight: 2,
      strokeColor: '#EC9C3C',
      fillColor: '#000',
      fillOpacity: 0,
      rotation: 180,
      anchor: new window.google.maps.Point(0, 0)
    };
  }

  render() {
    if (!this.source || !this.target) {
      return null;
    }
    return <Marker
      position={this.getPosition()}
      icon={this.getIcon()}
      clickable={false}
      zIndex={-100}
    />;
  }

}
