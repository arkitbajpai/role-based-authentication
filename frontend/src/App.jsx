import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from "../src/pages/Login.jsx";
import AdminDashboard from '../src/pages/AdminDashboard.jsx';

const App=()=>{
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;