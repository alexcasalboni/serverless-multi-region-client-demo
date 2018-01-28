import React from 'react';
import ReactDOM from 'react-dom';
import register from './registerServiceWorker';
import App from './App';

register();
ReactDOM.render(<App />, document.getElementById('root'));
