import React from "react";

import "./App.css";

function App() {
  const [Data, setData] = React.useState();
  const [Value, setValue] = React.useState();

  // Get Data
  const getData = async (location) => {
    const res = await fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?q=${location}&units=metric`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key":
          process.env.REACT_APP_API_KEY,
        },
      }
    );
    const data = await res.json();
    res.status === 200 && setData(data);
  };

  return (
    <div className="app">
      <header className="header">
        <input
          type="search"
          className="input"
          placeholder="Search"
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={() => getData(Value)}>Search</button>
      </header>

      <main>
        {Data ? (
          <section>
            <div className="group">
              <strong>Location: </strong>
              <span>{Data.name}</span>
            </div>

            <div className="group">
              <strong>Temperature: </strong>
              <span>{Data.main.temp} &#176;C</span>
            </div>

            <div className="group">
              <strong>Wind: </strong>
              <span>{Data.wind.speed} km/h</span>
            </div>
          </section>
        ) : (
          <h2>Search by location</h2>
        )}
      </main>
    </div>
  );
}

export default App;
