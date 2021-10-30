import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Country from './components/Country';

const App = () => {
  const WEATHER_API = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [weather, setWeather] = useState({});

  const findCountry = (event) => {
    event.preventDefault();
    if (event.target.value !== '') {
      axios
        .get(
          `https://restcountries.com/v3.1/name/${event.target.value}?fields=name,capital,flags,cioc,population,languages`
        )
        .then((response) => {
          const cts = response.data;
          const sorted = cts.sort((a, b) => {
            return a.cioc - b.cioc;
          });

          setCountries(sorted);
        })
        .catch((error) => {
          console.error(`error getting countries for ${event.target.value}: `, error.message);
          setCountries([]);
        });
    } else {
      setCountries([]);
    }
  };

  useEffect(() => {
    if (countries.length === 1) {
      setCountry(countries[0]);
    } else {
      setCountry({});
    }
  }, [countries]);
  const handleCountryClick = (event) => {
    event.preventDefault();

    axios
      .get(
        `https://restcountries.com/v3.1/alpha/${event.target.value}?fields=name,capital,flags,cioc,population,languages`
      )
      .then((response) => {
        const country = response.data;

        setCountry(country);
      })
      .catch((error) => {
        console.error(`error retrieving country code ${event.target.value}: `, error.message);
        setCountry({});
      });

    if (Object.keys(country).length > 0) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${WEATHER_API}&units=imperial`
        )
        .then((response) => {
          const weather = response.data;
          console.log('weather: ', weather);
          setWeather(weather);
        })
        .catch((error) => {
          console.error(`error retrieving country code ${event.target.value}: `, error.message);
          setWeather({});
        });
    }
  };

  return (
    <div className='App'>
      <form>
        find countries <input type='text' onChange={findCountry} />
      </form>
      {countries.length > 9
        ? 'Too many matches, specify another filter'
        : countries.map((c) => {
            return (
              <div key={c.cioc}>
                {c.name.common}
                <button onClick={handleCountryClick} value={c.cioc}>
                  show
                </button>
              </div>
            );
          })}

      {Object.keys(country).length === 0 || <Country country={country} weather={weather} />}
    </div>
  );
};

export default App;
