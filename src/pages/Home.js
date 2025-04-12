import React, { useEffect, useState } from 'react';
import Flag from '../components/Flags';  // Ensure the correct path

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://countries-api-abhishek.vercel.app/countries')
      .then(res => res.json())
      .then(data => setCountries(data.data)); 
  }, []);

  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  
  const matchedCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const country = matchedCountries.length > 0
    ? matchedCountries[0] 
    : countries.find(c => c.name === 'Afghanistan');

  return (
    <div>
      <input
        type="text"
        className="form-control mb-1"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
            maxWidth: '500px', 
            margin: '0 auto',  
            display: 'block'   
          }}
      />
      {country ? (
        <div>
          <h3 className="text-center">{country.name}</h3>
          <Flag flag={country.flag} name={country.name} />
          <div className="row">
          
            <div className="col-md-6">
              <ul className="list-group my-3">
                <li className="list-group-item"><strong>Capital:</strong> {country.capital}</li>
                <li className="list-group-item"><strong>Region:</strong> {country.region}</li>
                <li className="list-group-item"><strong>Subregion:</strong> {country.subregion}</li>
                <li className="list-group-item"><strong>Population:</strong> {country.population.toLocaleString()}</li>
                <li className="list-group-item"><strong>Area:</strong> {country.area.toLocaleString()} km²</li>
              </ul>
            </div>

          
            <div className="col-md-6">
              <ul className="list-group my-3">
                <li className="list-group-item">
                  <strong>Coordinates:</strong> {country.coordinates.latitude}, {country.coordinates.longitude}
                </li>
                <li className="list-group-item"><strong>Timezones:</strong> {country.timezones.join(', ')}</li>
                <li className="list-group-item"><strong>Currency:</strong> {country.currency}</li>
                <li className="list-group-item"><strong>Languages:</strong> {country.languages.join(', ')}</li>

                
                {country.borders && country.borders.length > 0 && (
                  <li className="list-group-item">
                    <strong>Border Countries: </strong>
                    {country.borders
                      .map((border, index) => (
                        <span key={index}>
                          <button
                            onClick={() => setSearchTerm(border)}  
                            className="btn btn-link text-decoration-none text-primary"
                            style={{ background: 'none', border: 'none', padding: '0' }} 
                          >
                            {border}
                          </button>
                          
                          {index < country.borders.length - 1 && ', '}
                        </span>
                      ))}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>No country found or loading...</p>
      )}
    </div>
  );
};

export default Home;
