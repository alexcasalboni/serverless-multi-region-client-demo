import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
import MapAWS from './MapAWS';
import { PageHeader } from 'react-bootstrap';
import GitHubForkRibbon from 'react-github-fork-ribbon';


const App = (props) => {
  return (
    <div className="App"> 
      <PageHeader>
        Multi-region Sample App
        <small>https://map.global.faas.website</small>
      </PageHeader>
      <MapAWS />
      <GitHubForkRibbon
        href="https://github.com/alexcasalboni/serverless-multi-region-client-demo"
        target="_blank"
        position="right"
        color="orange">
        Fork me on GitHub
      </GitHubForkRibbon>
    </div>
  );
}

export default App;
