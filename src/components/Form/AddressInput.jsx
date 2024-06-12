import React from 'react';

const AddressInput = ({ street, setStreet, errors, clearError }) => {
  const handleChange = (e) => {
    setStreet(e.target.value);
    clearError();
  };

  return (
    <div className="bloc_adress">
      <label for="street">Street</label>
      <input
        id="street"
        type="text"
        value={street}
        onChange={handleChange}
      />
      {errors.street && (
        <p className="error-message">{errors.street}</p>
      )}
      
    </div>
  );
};

export default AddressInput;
