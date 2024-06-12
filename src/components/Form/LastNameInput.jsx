import React from 'react';

const LastNameInput = ({ lastName, setLastName, errors, clearError }) => {
  const handleChange = (e) => {
    setLastName(e.target.value);
    // Appeler la fonction de réinitialisation d'erreur pour effacer le message d'erreur
    clearError();
  };

  return (
    <div className="input">
      <label for="last-name">Last Name</label>
      <input
        type="text"
        id="last-name"
        value={lastName}
        onChange={handleChange}
      />
      {/* Affichage du message d'erreur */}
      {errors.lastName && (
        <p className="error-message">{errors.lastName}</p>
      )}
    </div>
  );
};

export default LastNameInput;
