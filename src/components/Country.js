import React from 'react';

const Country = ({ country }) => {
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
    </div>
  );
};

export default Country;
