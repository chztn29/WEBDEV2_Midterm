import React from 'react';
import Flag from './Flags';

const CountryDetails = ({ country }) => {
  if (!country) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-center">{country.name}</h2>
      <Flag flag={country.flag} name={country.name} />
      <ul className="list-group my-3">
        <li className="list-group-item"><strong>Capital:</strong> {country.capital}</li>
        <li className="list-group-item"><strong>Region:</strong> {country.region}</li>
        <li className="list-group-item"><strong>Subregion:</strong> {country.subregion}</li>
        <li className="list-group-item"><strong>Population:</strong> {country.population.toLocaleString()}</li>
        <li className="list-group-item"><strong>Area:</strong> {country.area.toLocaleString()} km²</li>
        <li className="list-group-item">
          <strong>Coordinates:</strong> {country.coordinates.latitude}, {country.coordinates.longitude}
        </li>
        <li className="list-group-item"><strong>Timezones:</strong> {country.timezones.join(', ')}</li>
        <li className="list-group-item"><strong>Currency:</strong> {country.currency}</li>
        <li className="list-group-item"><strong>Languages:</strong> {country.languages.join(', ')}</li>
      </ul>
    </div>
  );
};

export default CountryDetails;
