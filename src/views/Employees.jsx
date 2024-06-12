import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../redux/employeeSlice'; // Assurez-vous du bon chemin
import "./employees.scss";
import Header from "../components/Header";

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employee.employees || []);
  const searchTerm = useSelector(state => state.employee.searchTerm); 
  const orderBy = useSelector(state => state.employee.orderBy);
  const order = useSelector(state => state.employee.order);
  const page = useSelector(state => state.employee.page);
  const rowsPerPage = useSelector(state => state.employee.rowsPerPage);

  useEffect(() => {
    const employeesData = JSON.parse(localStorage.getItem("employees")) || [];
    dispatch(updateField({ field: 'employees', value: employeesData }));
  }, [dispatch]);
  

  const handleChangeRowsPerPage = (event) => {
    dispatch(updateField({ field: 'rowsPerPage', value: event.target.value }));
    dispatch(updateField({ field: 'page', value: 0 }));
  };

  const handleChangePage = (event, newPage) => {
    dispatch(updateField({ field: 'page', value: newPage }));
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    dispatch(updateField({ field: 'order', value: isAsc ? "desc" : "asc" }));
    dispatch(updateField({ field: 'orderBy', value: property }));
  };

  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((value) => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false; // Ignore non-string values
    })
  );

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    const valueA = a[orderBy] || "";
    const valueB = b[orderBy] || "";

    if (order === "asc") {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  return (
    <div>
      <Header />
      <div className="contain-employees">
        <div className="bloc-search">
          <TextField
          className="texfield"
            variant="outlined"
            label="Search"
            value={searchTerm}
            onChange={(e) => dispatch(updateField({ field: 'searchTerm', value: e.target.value }))}
          />
        </div>
        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
          <TableContainer component={Paper} className="custom-table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "firstName"}
                      direction={orderBy === "firstName" ? order : "asc"}
                      onClick={() => handleRequestSort("firstName")}
                    >
                      First Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "lastName"}
                      direction={orderBy === "lastName" ? order : "asc"}
                      onClick={() => handleRequestSort("lastName")}
                    >
                      Last Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "startDate"}
                      direction={orderBy === "startDate" ? order : "asc"}
                      onClick={() => handleRequestSort("startDate")}
                    >
                      Start Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "department"}
                      direction={orderBy === "department" ? order : "asc"}
                      onClick={() => handleRequestSort("department")}
                    >
                      Department
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "dateOfBirth"}
                      direction={orderBy === "dateOfBirth" ? order : "asc"}
                      onClick={() => handleRequestSort("dateOfBirth")}
                    >
                      Date of birth
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "street"}
                      direction={orderBy === "street" ? order : "asc"}
                      onClick={() => handleRequestSort("street")}
                    >
                      Street
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "city"}
                      direction={orderBy === "city" ? order : "asc"}
                      onClick={() => handleRequestSort("city")}
                    >
                      City
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "state"}
                      direction={orderBy === "state" ? order : "asc"}
                      onClick={() => handleRequestSort("state")}
                    >
                      State
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "zipCode"}
                      direction={orderBy === "zipCode" ? order : "asc"}
                      onClick={() => handleRequestSort("zipCode")}
                    >
                      Zip Code
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9}>No matching records found</TableCell>
                  </TableRow>
                ) : (
                  (rowsPerPage > 0
                    ? sortedEmployees.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : sortedEmployees
                  ).map((employee, index) => (
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
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={filteredEmployees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default EmployeeTable;
