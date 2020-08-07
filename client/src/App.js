import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Componenets
import Navbar from './components/Navbar';

//Pages
import home from './pages/home';
import videocall from './pages/videocall';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Switch>'
          <Route exact path='/' component={home} />
          <Route exact path='/joincall/:id' component={videocall} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
