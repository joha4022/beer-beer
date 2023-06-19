import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from './Homepage';
import './App.css';


function App() {
  return (
    <Router >
      <Routes>
        <Route path='/' element={<Homepage />}/>
      </Routes>
    </Router>
  );
}

export default App;
