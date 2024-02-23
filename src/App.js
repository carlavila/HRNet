import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./views/Create";
import Employees from './views/Employees';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Employees/>}></Route>
          <Route exact path="/create" element={<Create/>}></Route>
        </Routes>
      </BrowserRouter>
    </div> 
  );
}

export default App;
