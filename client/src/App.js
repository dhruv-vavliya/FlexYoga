import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertComponent } from './components/Alert';

import Navbar from './components/Navbar';
import Home from './components/Home';

const userContext = createContext();

function App() {

  const [user, setUser] = useState();

  return (
    <Router>
      <AlertComponent>
        <userContext.Provider value={ {user ,setUser} } >
          <Navbar />
          <Home />
        </userContext.Provider>
      </AlertComponent>
    </Router>
  );
}

export { App as default ,userContext};
