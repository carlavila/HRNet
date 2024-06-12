import React from 'react';

const CityInput = ({ city, setCity, errors, clearError }) => {
  const handleChange = (e) => {
    setCity(e.target.value);
    clearError();
  };
  return (
    <div className="bloc_adress">
      <label for="city">City</label>
      <input
        id="city"
        type="text"
        value={city}
        onChange={handleChange}
      />
       {errors.city && (
        <p className="error-message">{errors.city}</p>
      )}
    </div>
  );
};

export default CityInput;
