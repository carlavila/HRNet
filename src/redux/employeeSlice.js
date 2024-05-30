import { createSlice } from '@reduxjs/toolkit';

const initialEmployeeState = {
  employees: [],
  firstName: "",
  lastName: "",
  dateOfBirth: null,
  startDate: null,
  department: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  errors: {},
  confirmationModal: false,
  searchTerm: "",
  orderBy: "",
  order: "asc",
  page: 0,
  rowsPerPage: 10,
};


const employeeSlice = createSlice({
  name: 'employee',
  initialState: initialEmployeeState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
      state.errors[field] = "";
    },
    setError: (state, action) => {
      const { field, error } = action.payload;
      state.errors[field] = error;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearError: (state, action) => {
      const field = action.payload;
      state.errors[field] = "";
    },
    toggleConfirmationModal: (state, action) => {
      state.confirmationModal = action.payload;
    },
    resetEmployee: () => initialEmployeeState,
  },
});

export const {
  updateField,
  setError,
  setErrors,
  clearError,
  toggleConfirmationModal,
  resetEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
