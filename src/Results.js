import React from 'react';
import { Table } from 'react-bootstrap';
import regions from './regions.json';


export class ReadResults extends React.PureComponent {
  
  render() {
    const data = this.props.data || {};
    return <Table condensed className="ReadResults">
      {
        data.error &&
        <tbody>
          <tr><th>Error:</th><td> Key not found :(</td></tr>
          <tr><th>Time:</th><td> {data.elapsedTime}ms</td></tr>
        </tbody>
      }
      {
        data.value &&
        <tbody>
          <tr><th>Value:</th><td> {data.value}</td></tr>
          <tr><th>Write:</th><td> {regions[data.writeRegion].name}</td></tr>
          <tr><th>Read:</th><td> {regions[data.readRegion].name}</td></tr>
          <tr><th>Time:</th><td> {data.elapsedTime}ms</td></tr>
        </tbody>
      }
      </Table>
  }
    
}

export class WriteResults extends React.PureComponent {
  
  render() {
    const data = this.props.data || {};
    return <Table condensed className="WriteResults">
      {
        data.error &&
        <tbody>
          <tr><th>Error:</th><td> Something went wrong :(</td></tr>
          <tr><th>Time:</th><td> {data.elapsedTime}ms</td></tr>
        </tbody>
      }
      {
        data.value &&
        <tbody>
          <tr><th>Result:</th><td> OK!</td></tr>
          <tr><th>Time:</th><td> {data.elapsedTime}ms</td></tr>
        </tbody>
      }
      </Table>
  }
    
}
