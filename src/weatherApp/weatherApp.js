import React, { useState, useEffect } from "react";
import WeatherInfo from "./weatherInfo.js";

function weatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const apiKey = "0f5823b60f56f54161db530643a59b95";

  const displayItems = () => {
    const storedItems = JSON.parse(sessionStorage.getItem("items"));
    if (storedItems) {
      setItems(storedItems);
    }
  };

  // useEffect(() => {
  //   if (weatherData !== null) {
  //     // <WeatherInfo weatherData={weatherData} />;
  //   }
  // }, [weatherData]);

  const getWeather = () => {
    if (city.trim() !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === 200) {
            setWeatherData(data);

            const items = JSON.parse(sessionStorage.getItem("items")) || [];
            if (!items.includes(city)) {
              items.push(city);
              sessionStorage.setItem("items", JSON.stringify(items));
            }
            sessionStorage.setItem("items", JSON.stringify(items));
            console.log(JSON.parse(sessionStorage.getItem("items")));

            setError("");
          } else {
            setError(
              "Failed to fetch weather data. Please try again later or check the city name."
            );
            setWeatherData(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setError("Failed to fetch weather data. Please try again later.");
          setWeatherData(null);
        });
    } else {
      setError("City field cannot be empty");
      setWeatherData(null);
    }
  };

  const getWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0f5823b60f56f54161db530643a59b95`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.cod === 200) {
              setWeatherData(data);
              setError("");
            } else {
              setError(
                "Failed to fetch weather data for your location. Please try again later."
              );
              setWeatherData(null);
            }
          })
          .catch((error) => {
            console.error(
              "Error fetching weather data for your location:",
              error
            );
            setError(
              "Failed to fetch weather data for your location. Please try again later."
            );
            setWeatherData(null);
          });
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const resetSearch = () => {
    setWeatherData(null);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center">Weather App</h2>
            <div className="form-group form-inline">
              <input
                type="text"
                className="form-control shadow-none mb-2"
                placeholder="Enter City name "
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onFocus={displayItems}
              />

              <ul>
                {items.slice(-5).map((item, index) => (
                  <div className="text-dark d-flex justify-content-start">
                    {
                      <ul>
                        <li key={index} onClick={() => setCity(item)}>
                          {" "}
                          @past search:: {item}
                        </li>
                        <hr />
                      </ul>
                    }
                  </div>
                ))}
              </ul>
              <button
                className="btn btn-outline-primary m-2"
                onClick={getWeather}
              >
                Search City
              </button>
              <button
                className="btn btn-outline-primary m-2"
                onClick={getWeatherByLocation}
              >
                Get Weather for Current Location
              </button>
              <button
                className="btn btn-outline-primary m-2"
                onClick={resetSearch}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div>
          {weatherData !== null ? (
            <WeatherInfo weatherData={weatherData} />
          ) : (
            <> </>
          )}
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default weatherApp;
