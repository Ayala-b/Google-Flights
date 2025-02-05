import React from "react";

const FlightResults = ({ flights, isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <><h3>API Response (JSON):</h3><p>Loading...</p> </>
      ) : (
        <>
          {flights.length > 0 ? (
            <pre>{JSON.stringify(flights, null,2)}</pre>
          ) : (
            <p></p>
          )}
        </>
      )}
    </div>
  );
};

export default FlightResults;
