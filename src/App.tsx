import React from 'react';
import { Routes, Route } from "react-router-dom";
import Cex from './pages/Cex';
import Dex from './pages/Dex';

 function App() {

  return (
  <React.Fragment>
    <Routes>
      <Route path="*" element={<Cex />} />
      <Route path="/dex" element={<Dex />} />
    </Routes>
  </React.Fragment>

  );
}

export default App;
