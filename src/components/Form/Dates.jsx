import React from "react";
import { DatePicker } from "library-date-react";

const Dates = ({ label, selectedDate, onSelectDate, error }) => {
  return (
    <div className="dates">
      <label for={label}>{label}</label>
      <DatePicker
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};
export default Dates;