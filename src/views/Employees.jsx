import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import './employees.scss';
import Header from "../components/Header";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const employeesData =
      JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(employeesData);
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div>
      <Header />
      <div className="contain-employees">
        <h1 className="title">Current Employees</h1>
        <div className="bloc-search">
          <div className="entries">
            <label>Entries</label>
            <Select
              labelId="rows-per-page-label"
              id="rows-per-page-select"
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </div>
          <div className="entries">
          <label>Search</label>
          <TextField
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </div>
        </div>
        <TableContainer component={Paper} className="custom-table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Street</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Zip Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {filteredEmployees.length === 0 ? (
    <TableRow>
      <TableCell colSpan={9}>No matching records found</TableCell>
    </TableRow>
  ) : (
    filteredEmployees
      .slice(0, rowsPerPage)
      .map((employee, index) => (
        <TableRow key={index}>
          <TableCell>{employee.firstName}</TableCell>
          <TableCell>{employee.lastName}</TableCell>
          <TableCell>{employee.startDate}</TableCell>
          <TableCell>{employee.department}</TableCell>
          <TableCell>{employee.dateOfBirth}</TableCell>
          <TableCell>{employee.street}</TableCell>
          <TableCell>{employee.city}</TableCell>
          <TableCell>{employee.state}</TableCell>
          <TableCell>{employee.zipCode}</TableCell>
        </TableRow>
      ))
  )}
</TableBody>

          </Table>
        </TableContainer>
        <p className="p-results">
          Showing {filteredEmployees.length === 0 ? 0 : 1} to{" "}
          {rowsPerPage < filteredEmployees.length
            ? rowsPerPage
            : filteredEmployees.length}{" "}
          of {filteredEmployees.length} entries (filtered from {employees.length}{" "}
          total entries)
        </p>
       
      </div>
    </div>
  );
};

export default EmployeeTable;
