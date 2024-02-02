import React, { useState } from 'react';

const DesignationFilter = ({ onFilterChange }) => {
  const [selectedDesignation, setSelectedDesignation] = useState('');

  const designations = ['Mechanical Engineer', 'Computer Engineer', 'Electronics Engineer'];

  const handleDesignationChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedDesignation(selectedValue);
    onFilterChange(selectedValue);
  };

  return (
  <>

      <select className='select formss' value={selectedDesignation} onChange={handleDesignationChange}>
        <option  value="">Designations</option>
        {designations.map((designation) => (
          <option key={designation} value={designation}>
            {designation}
          </option>
        ))}
      </select>
  </>
  );
};

export default DesignationFilter;
