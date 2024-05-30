import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  setErrors,
  clearError,
  toggleConfirmationModal,
} from "../redux/employeeSlice";
import "./create.scss";
import Header from "../components/Header";
import FirstNameInput from "../components/Form/FirstNameInput";
import LastNameInput from "../components/Form/LastNameInput";
import AddressInput from "../components/Form/AddressInput";
import CityInput from "../components/Form/CityInput";
import SelectOptions, {
  departmentOptions,
  stateOptions,
} from "../components/Form/SelectOptions";
import ZipCodeInput from "../components/Form/ZipCodeInput";
import Dates from "../components/Form/Dates";
import Illustration from "../assets/illustration2.jpg";



const EmployeeForm = () => {
  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "street",
      "city",
      "state",
      "zipCode",
      "department",
    ];

    requiredFields.forEach((field) => {
      if (!employee[field].trim()) {
        newErrors[field] = `Please enter ${field}`;
      }
    });

    // Vérification des dates
    if (!employee.dateOfBirth) {
      newErrors.dateOfBirth = "Please select Date of Birth";
    }
    if (!employee.startDate) {
      newErrors.startDate = "Please select Start Date";
    }

    return newErrors;
  };
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const saveEmployee = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      employees.push(employee);
      localStorage.setItem("employees", JSON.stringify(employees));
      setConfirmationVisible(true);
      setTimeout(() => {
        dispatch(toggleConfirmationModal(false));
        window.location.href = "/";
      }, 1000);
    } else {
      dispatch(setErrors(newErrors));
    }
  };

  return (
    <>
      <Header />
      <div id="container">
        <form id="form_create">
          <div className="formulaire">
            <div className="illustration-bloc">
              <img
                className="illustration"
                src={Illustration}
                alt={"Wealth Health logo"}
              />
            </div>
            <div className="bloc-create">
              <div className="create-employee">
                <div className="infos-user">
                  <h2>Informations</h2>
                  <FirstNameInput
                    firstName={employee.firstName}
                    setFirstName={(value) =>
                      handleInputChange("firstName", value)
                    }
                    errors={employee.errors}
                    clearError={() => dispatch(clearError("firstName"))}
                  />
                  <LastNameInput
                    lastName={employee.lastName}
                    setLastName={(value) =>
                      handleInputChange("lastName", value)
                    }
                    errors={employee.errors}
                    clearError={() => dispatch(clearError("lastName"))}
                  />
                  <Dates
                    label="Date of Birth"
                    selectedDate={employee.dateOfBirth}
                    onSelectDate={(date) =>
                      handleInputChange("dateOfBirth", date)
                    }
                    error={employee.errors.dateOfBirth}
                  />
                  <Dates
                    label="Start Date"
                    selectedDate={employee.startDate}
                    onSelectDate={(date) =>
                      handleInputChange("startDate", date)
                    }
                    error={employee.errors.startDate}
                  />
                </div>
                <div className="adress-user">
                  <h2>Address</h2>
                  <AddressInput
                    street={employee.street}
                    setStreet={(value) => handleInputChange("street", value)}
                    errors={employee.errors}
                    clearError={() => dispatch(clearError("street"))}
                  />
                  <CityInput
                    city={employee.city}
                    setCity={(value) => handleInputChange("city", value)}
                    errors={employee.errors}
                    clearError={() => dispatch(clearError("city"))}
                  />
                  <div className="bloc_adress">
                    <label htmlFor="state">State</label>
                    <SelectOptions
                      placeholder="Select option"
                      options={stateOptions}
                      value={stateOptions.find(
                        (option) => option.value === employee.state
                      )}
                      onChange={(selectedOption) =>
                        handleInputChange(
                          "state",
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      errors={employee.errors.state}
                      clearError={() => dispatch(clearError("state"))}
                    />
                  </div>
                  <ZipCodeInput
                    zipCode={employee.zipCode}
                    setZipCode={(value) => handleInputChange("zipCode", value)}
                    errors={employee.errors}
                    clearError={() => dispatch(clearError("zipCode"))}
                  />
                  <div className="bloc_adress">
                    <label htmlFor="department">Department</label>
                    <SelectOptions
                      placeholder="Select option"
                      options={departmentOptions}
                      value={departmentOptions.find(
                        (option) => option.value === employee.department
                      )}
                      onChange={(selectedOption) =>
                        handleInputChange(
                          "department",
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      errors={employee.errors.department}
                      clearError={() => dispatch(clearError("department"))}
                    />
                  </div>
                </div>
              </div>
              <button type="button" className="button" onClick={saveEmployee}>
                Save
              </button>
            </div>
          </div>
          {confirmationVisible && ( // Affichage conditionnel de la div de confirmation
            <div className="modal">Employee Created!</div>
          )}
        </form>
      </div>
    </>
  );
};

export default EmployeeForm;
