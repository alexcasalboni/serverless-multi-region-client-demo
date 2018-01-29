import React from 'react';
import {ReadForm, WriteForm} from './Forms';
import NProgress from 'nprogress/nprogress'
import 'nprogress/nprogress.css';

class RegionSideBar extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        readKey: '',
        readData: null,
        writeValue: '',
        writeData: null,
      };
    }
  
    handleReadKeyChange(event) {
      this.setState({
        readKey: event.target.value,
        readData: null,
        writeData: null,
      });
    }

    handleWriteValueChange(event) {
      this.setState({
        writeValue: event.target.value,
        writeData: null,
      });
    }
  
    componentWillReceiveProps(nextProps) {
      // clear any data if region changes
      if (
        !this.props.region || !nextProps.region ||
        this.props.region.name !== nextProps.region.name
      ) {
        this.setState({
          readData: null,
          writeData: null,
        });
      }
    }
  
    getEndpoint() {
      if (this.props.region) {
        return this.props.region.endpoint;
      }
      throw new Error("No region is selected!")
    }
  
    handleReadSubmit(event) {
      event.preventDefault();
      const endpoint = this.getEndpoint();
      const key = this.state.readKey;
      if (!key) {
        return alert("Insert a key first!");
      }
      return this.readKey(endpoint, key)
        .then((data) => {
          this.setState({
            readData: data,
          });
        });
    }
  
    readKey(endpoint, key) {
      NProgress.start();
      const beforeTime = new Date();
      let afterTime = null;
      return fetch(`${endpoint}/${key}`)
        .then((response) => {
          NProgress.done();
          afterTime = new Date();
          return response.json()
        }).then((data) => {
          data.elapsedTime = afterTime.getTime() - beforeTime.getTime();
          return data;
        });
    }

    handleWriteSubmit(event) {
      event.preventDefault();
      const endpoint = this.getEndpoint();
      const key = this.state.readKey;
      const value = this.state.writeValue;
      if (!key) {
        return alert("Insert a key first!");
      }
      if (!value) {
        return alert("Insert a value first!");
      }
      return this.writeValue(endpoint, key, value)
        .then((data) => {
          this.setState({
            writeData: data,
          });
        });
    }

    writeValue(endpoint, key, value) {
      NProgress.start();
      const beforeTime = new Date();
      let afterTime = null;
      return fetch(`${endpoint}/${key}`, {
        method: 'POST',
        body: JSON.stringify({value: value}),
      })
        .then((response) => {
          NProgress.done();
          afterTime = new Date();
          return response.json()
        }).then((data) => {
          data.elapsedTime = afterTime.getTime() - beforeTime.getTime();
          return data;
        });
    }
  
    render() {
      if (!this.props.region) {
        return null;
      }
      return <div>
        <h3 className="SideBarTitle">{this.props.region.name}</h3>
        <ReadForm
          onSubmit={(e) => this.handleReadSubmit(e)}
          onChange={(e) => this.handleReadKeyChange(e)}
          input={this.state.readKey}
          data={this.state.readData}
        />
        <WriteForm
          onSubmit={(e) => this.handleWriteSubmit(e)}
          onChange={(e) => this.handleWriteValueChange(e)}
          input={this.state.writeValue}
          data={this.state.writeData}
        />
      </div>
      }
}

export default RegionSideBar;
