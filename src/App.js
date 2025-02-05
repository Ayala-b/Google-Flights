import React, { useState } from 'react';
import FlightSearch from './FlightSearch';
import FlightResults from './FlightResults';

const App = () => {
  const [flights, setFlights] = useState([]);

  return (
    <div>
      <h1>Google Flights Clone</h1>
      
      {/* Flight Search */}
      <FlightSearch setFlights={setFlights} />
      
      {/* Flight Results */}
      <FlightResults flights={flights} />
    </div>
  );
};

export default App;
