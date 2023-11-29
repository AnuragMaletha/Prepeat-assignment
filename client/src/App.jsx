import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';  
import Home from "./pages/home/home"
import Update from "./pages/update/Update"

const App=()=> {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<Home />} />  
            <Route path="/update" element={<Update />} />
      </Routes>  
    </Router>
  );
    
  
  }; 

export default App
