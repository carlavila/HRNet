import React from 'react';

const FirstNameInput = ({ firstName, setFirstName, errors, clearError }) => {
  const handleChange = (e) => {
    setFirstName(e.target.value);
    clearError();
  };

  return (
    <div className="input">
      <label for="first-name">First Name</label>
      <input
        type="text"
        id="first-name"
        value={firstName}
        onChange={handleChange}
      />
      {errors.firstName && (
        <p className="error-message">{errors.firstName}</p>
      )}
    </div>
  );
};

export default FirstNameInput;
