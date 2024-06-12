import React from "react";

const ZipCodeInput = ({ zipCode, setZipCode, errors, clearError  }) => {

  const handleChange = (e) => {
    setZipCode(e.target.value);
    // Appeler la fonction de réinitialisation d'erreur pour effacer le message d'erreur
    clearError();
  };
  return (
    <div className="bloc_adress">
      <label for="zip-code">Zip Code</label>
      <input
        id="zip-code"
        type="number"
        value={zipCode}
        onChange={handleChange}
      />
      {errors.zipCode && (
        <p className="error-message">{errors.zipCode}</p>
      )}
    </div>
  );
};
export default ZipCodeInput;
