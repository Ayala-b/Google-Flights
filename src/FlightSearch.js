import React, { useState } from "react";
import axios from "axios";
import FlightResults from "./FlightResults";

const FlightSearch = () => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const usaCities = [
    "New york", "Los Angeles", "Chicago", "Houston", "Phoenix",
    "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setFlights([]);

    const today = new Date().toISOString().split("T")[0];
    if (date < today) {
      setErrorMessage("The travel date has passed, please choose a future date.");
      return;
    }

    if (departure.toLowerCase() !== "london") {
      setErrorMessage("Departure city must be London.");
      return;
    }

    const lowerCaseDestination = destination.toLowerCase();
    if (!usaCities.some(city => city.toLowerCase() === lowerCaseDestination)) {
      setErrorMessage(`Destination city must be in the USA and from the list of allowed cities: ${usaCities.join(", ")}.`);
      return;
    }

    setIsLoading(true);

    try {
      const destinationCityId = usaCities.findIndex(city => city.toLowerCase() === lowerCaseDestination) + 1;

      const response = await axios.get("https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights", {
        headers: {
          "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
          "X-RapidAPI-Key": "e424896683msh18bdeb5fdabbdb1p10ac4fjsn4ea0b16b8f05",
        },
        params: {
          originSkyId: "LOND",
          destinationSkyId: destinationCityId,
          originEntityId: "27544008",
          destinationEntityId: "27537542",
          date: date,
          returnDate: returnDate,
          cabinClass: "economy",
          adults: 1,
          sortBy: "best",
          currency: "USD",
          market: "en-US",
          countryCode: "US",
        },
      });

      const itineraries = response.data?.data?.itineraries || [];

      if (itineraries.length === 0) {
        setErrorMessage("No flights available for the selected origin or destination.");
      } else {
        setFlights(itineraries);
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching flights. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="departure">Departure City</label>
        <input
          type="text"
          id="departure"
          placeholder="Enter departure city"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />

        <label htmlFor="destination">Destination City</label>
        <input
          type="text"
          id="destination"
          placeholder="Enter destination city"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <label htmlFor="date">Travel Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="returnDate">Return Date</label>
        <input
          type="date"
          id="returnDate"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />

        <button type="submit">Search Flights</button>
      </form>

      {!isLoading && errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <FlightResults flights={flights} isLoading={isLoading} />
    </div>
  );
};
export default FlightSearch;
