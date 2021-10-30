import React from 'react';

const Country = ({ country, weather }) => {
  return (
    <div>
      <h2>{country.name.common}</h2> <div>capitial {country.capital}</div>
      <div>population {country.population}</div>
      <div>languages</div>
      <ul>
        {Object.keys(country.languages).map((n, i) => {
          return <li key={i}>{country.languages[n]}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt='flag' />
      {Object.keys(weather).length > 0 && (
        <div>
          <h2>weather in {country.capital}</h2>
          <div>temperature: {weather.main.temp} C</div>
          <div>wind: {weather.wind.speed}</div>
          <div>Summary: {weather.weather.description}</div>
        </div>
      )}
    </div>
  );
};

export default Country;
