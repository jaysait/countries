import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Country from './components/Country';

const App = () => {
  const [countries, setCountries] = useState([]);

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
          console.error('error: ', error.message);
          setCountries([]);
        });
    } else {
      setCountries([]);
    }
  };

  return (
    <div className='App'>
      <form>
        find countries <input type='text' onChange={findCountry} />
      </form>

      {countries.length > 9 ? (
        'Too many matches, specify another filter'
      ) : countries.length === 1 ? (
        <Country country={countries[0]} />
      ) : (
        countries.map((country) => {
          return <div key={country.cioc}>{country.name.common}</div>;
        })
      )}
    </div>
  );
};

export default App;
