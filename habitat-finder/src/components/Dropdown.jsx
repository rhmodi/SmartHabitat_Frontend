import React from 'react';

function Dropdown({value,onChange}) {
  return (
    <div className='city-selector'>
      <label htmlFor="city">Where do you want to relocate?</label>
      <select id="city" name="city" value={value} onChange={onChange}>
        <option value="any">Any</option>
        <option value="chicago">Chicago</option>
        <option value="los-angeles">Los Angeles</option>
      </select>
    </div>
  );
}

export default Dropdown;
