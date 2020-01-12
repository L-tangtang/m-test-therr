import React from 'react';
import Map from '../router/map';
import Routes from '../router/views';
import '../assets/css/index.scss';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <div className="App-box">
                <BrowserRouter>
                    <Map routes={Routes} />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
