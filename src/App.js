import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [drivers, setDrivers] = useState([]);
  const [year, setYear] = useState('');

  useEffect(() => {
    async function fetchDriversByYear(year) {
      try {
        await fetch(`http://localhost:3001/api/drivers/${year}`)
            .then((response) => response.json()
            ).then((data) => {
                setDrivers(data.MRData.DriverTable[0].Driver || []);
            });
        console.log(drivers);
      } catch (error) {
        console.error(error);
      }
    }

    if (year.length === 4) {
      fetchDriversByYear(year);
    }
  },[year]);

  return (
      <div className="App">
        <input
            type="text"
            placeholder="Enter a year"
            onChange={(e) => setYear(e.target.value)}
            value={year}
        />
          <p>Driver List</p>
          <ul>
              {drivers.map((driver, index) => (
                  <li key={index} className="driver-container">
                      <div className="driver-info">
                          <p>Name: {driver.GivenName} {driver.FamilyName}</p>
                          <p>Date of Birth: {driver.DateOfBirth}</p>
                          <p>Nationality: {driver.Nationality}</p>
                          <p>Driver ID: {driver.$.driverId}</p>
                          <p>Wiki Page: <a href={driver.$.url} target={"_blank"}>Link</a></p>
                      </div>
                      <div className="driver-image">
                          <img src= {`${driver.$.url}`}  alt={`Image of ${driver.GivenName} ${driver.FamilyName}`} />
                      </div>
                  </li>
              ))}
          </ul>

      </div>
  );
}

export default App;
