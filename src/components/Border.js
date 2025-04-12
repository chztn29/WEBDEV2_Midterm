import React from 'react';

const Borders = ({ borders, setSearchTerm }) => {
  const handleBorderClick = (borderCountry) => {
    setSearchTerm(borderCountry); // Update the search term with the clicked border country
  };

  return (
    <div>
      {/* <h5>Border Countries:</h5> */}
      <ul className="list-inline">
        {borders.map((border, index) => (
          <li key={index} className="list-inline-item m-1">
            <button onClick={() => handleBorderClick(border)} className="btn btn-outline-primary btn-sm">
              {border}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Borders;
