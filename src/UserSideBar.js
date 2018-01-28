import React from 'react';
import { Table } from 'react-bootstrap';
import regions from './regions.json';

class UserSideBar extends React.Component {

    computeDistance = (region, user) => 
      window.google.maps.geometry.spherical.computeDistanceBetween(
        new window.google.maps.LatLng(region.lat, region.long),
        new window.google.maps.LatLng(user.latitude, user.longitude),
      )
  
    getSortedDistances = () => {
      const distances = Object.keys(regions).map(regionCode => ({
        regionCode: regionCode,
        distance: this.computeDistance(regions[regionCode], this.props.coords),
      }));
      distances.sort((d1, d2) => d1.distance - d2.distance);
      return distances;
    }
  
    renderDistances = () => {    
      const distances = this.getSortedDistances()
      const closestRegion = distances[0].regionCode;
  
      const distancedInKM = distances.map((d) => 
        <tr
          key={d.regionCode}
          title={regions[d.regionCode].name}
          className={regions[d.regionCode].endpoint ? 'available' : ''}
        >
          <td className="RegionDistance">{d.regionCode}</td>
          <td className="RegionKM">{parseInt(d.distance/1000, 10)} km</td>
          <td className="RegionMiles">{parseInt(d.distance*0.621371/1000, 10)} mi</td>
        </tr>
      )
  
      return <div> 
        <h3 className="ClosestRegion">
          The closest region is <br/>
          <span title={closestRegion}>
            {regions[closestRegion].name}
          </span>
        </h3>
        <div className="DistancesKMContainer">
          <Table condensed className="DistancesKM">
            <tbody>
              {distancedInKM}
            </tbody>
          </Table>
        </div>
      </div>
    }
  
    render() {
        return <div>
          <h3 className="UserPosition">
            You are at <br/>
            (<em>{this.props.coords.latitude.toFixed(5)}</em>,&nbsp;
            <em>{this.props.coords.longitude.toFixed(5)}</em>)
          </h3>
          <div className="Distances">
            {this.renderDistances()}
          </div>
        </div>
    }
  }

export default UserSideBar;