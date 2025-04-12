import React, { useEffect, useState } from 'react';
import Flag from '../components/Flags'; // Update if needed

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [populationRange, setPopulationRange] = useState('');
  const [displayDefault, setDisplayDefault] = useState(true);

  useEffect(() => {
    fetch('https://countries-api-abhishek.vercel.app/countries')
      .then(res => res.json())
      .then(data => setCountries(data.data))
      .catch(err => console.error("Failed to fetch countries:", err));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setDisplayDefault(false);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    setDisplayDefault(false);
  };

  const handlePopulationChange = (e) => {
    setPopulationRange(e.target.value);
    setDisplayDefault(false);
  };

  const matchedCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
    const matchesPopulation = (() => {
      if (!populationRange) return true;
      if (populationRange === 'low') return country.population < 10000000;
      if (populationRange === 'medium') return country.population >= 10000000 && country.population <= 50000000;
      if (populationRange === 'high') return country.population > 50000000;
      return true;
    })();

    return matchesSearch && matchesRegion && matchesPopulation;
  });

  const countriesToDisplay = displayDefault
    ? countries.filter(c => c.name === 'Afghanistan')
    : matchedCountries;

  return (
    <div>
     
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ maxWidth: '200px' }}
        />
        <select className="form-select" value={selectedRegion} onChange={handleRegionChange} style={{ maxWidth: '200px' }}>
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select className="form-select" value={populationRange} onChange={handlePopulationChange} style={{ maxWidth: '200px' }}>
          <option value="">All Populations</option>
          <option value="low">Less than 10M</option>
          <option value="medium">10M - 50M</option>
          <option value="high">More than 50M</option>
        </select>
      </div>

        
      {countriesToDisplay.length > 0 ? (
        countriesToDisplay.map((country, index) => (
          <div key={index} className="mb-5 border rounded p-3 shadow-sm">
            <Flag flag={country.flag} name={country.name} />
            <h3 className="text-center">{country.name}</h3>
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
                      {country.borders.map((border, idx) => (
                        <span key={idx}>
                          <button
                            onClick={() => {
                              setSearchTerm(border);
                              setDisplayDefault(false);
                            }}
                            className="btn btn-link text-decoration-none text-primary"
                            style={{ background: 'none', border: 'none', padding: '0' }}
                          >
                            {border}
                          </button>
                          {idx < country.borders.length - 1 && ', '}
                        </span>
                      ))}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-4">No countries found...</p>
      )}
    </div>
  );
};

export default Home;
