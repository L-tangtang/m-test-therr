import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import axios from './utils';
import 'antd/dist/antd.css';
React.Component.prototype.http = axios;

ReactDOM.render(<App />, document.getElementById('root'));
