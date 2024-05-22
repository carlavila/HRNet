import React, { useState } from "react";
import Select from "react-select";
import Modal from "react-modal";
import { DatePicker } from "library-date-react";
import "./create.scss";
import Header from "../components/Header";
 
Modal.setAppElement("#root");

const EmployeeForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [department, setDepartment] = useState("Sales");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);

  const departmentOptions = [
    { label: "Sales", value: "Sales" },
    { label: "Marketing", value: "Marketing" },
    { label: "Engineering", value: "Engineering" },
    { label: "Human Resources", value: "Human Resources" },
    { label: "Legal", value: "Legal" },
  ];

  const stateOptions = [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "American Samoa", value: "AS" },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "District Of Columbia", value: "DC" },
    { label: "Federated States Of Micronesia", value: "FM" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Guam", value: "GU" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Marshall Islands", value: "MH" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Northern Mariana Islands", value: "MP" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Palau", value: "PW" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Puerto Rico", value: "PR" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virgin Islands", value: "VI" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" },
  ];

  const saveEmployee = () => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employee = {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      department,
      street,
      city,
      state,
      zipCode,
    };
    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));
    setConfirmationModal(true);
    setTimeout(() => {
      setConfirmationModal(false);
      window.location.href = "/";
    }, 1000);
  };

  const handleDateBirthSelect = () => {
    setDateOfBirth(); 
  };
 
  const handleDateStartSelect = () => {
    setStartDate();  
  };
  return (
    <>
      <Header />
      <div id="container">
        <h1>Create Employee</h1>
        <form id="form_create">
          <div className="formulaire">
            <div className="infos-user">
              <h2>Informations</h2>
              <div className="input">
                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="dates">
            
                <label htmlFor="date-of-birth">Date of Birth</label>
                <DatePicker onSelectDate={handleDateBirthSelect} />
              </div>

              <div className="dates">
                <label htmlFor="start-date">Start Date</label>
                <DatePicker onSelectDate={handleDateStartSelect} />
              </div> 
            </div>
            <div className="separator"></div>

            <div className="adress-user">
              <h2>Address</h2>
              <div className="bloc_adress">
                <label htmlFor="street">Street</label>
                <input
                  id="street"
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="bloc_adress">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="bloc_adress">
                <label htmlFor="state">State</label>
                <Select
                  placeholder="Sélectionner..."
                  options={stateOptions}
                  value={{ label: state, value: state }}
                  onChange={(selectedOption) => setState(selectedOption.value)}
                />
              </div>
              <div className="bloc_adress">
                <label htmlFor="zip-code">Zip Code</label>
                <input
                  id="zip-code"
                  type="number"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
              <div className="bloc_adress">
                <label htmlFor="department">Department</label>
                <Select
                  placeholder="Sélectionner..."
                  options={departmentOptions}
                  value={{ label: department, value: department }}
                  onChange={(selectedOption) =>
                    setDepartment(selectedOption.value)
                  }
                />
              </div>
            </div>
          </div>
          <button type="button" className="button" onClick={saveEmployee}>
            Save
          </button>

          <Modal
            isOpen={confirmationModal}
            onRequestClose={() => setConfirmationModal(false)}
            contentLabel="Employee Created Modal"
          >
            <div className="modal">Employee Created!</div>
          </Modal>
        </form>
      </div>
    </>
  );
};

export default EmployeeForm;
