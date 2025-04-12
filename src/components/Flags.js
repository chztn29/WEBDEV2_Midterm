import React from 'react';

const Flag = ({ flag, name }) => {
  return (
    <div className="my-3 text-center">
      <img src={flag} alt={`${name} flag`} style={{ maxWidth: '300px', width: '100%' }} />
    </div>
  );
};

export default Flag;
