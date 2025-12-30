import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/Login.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

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