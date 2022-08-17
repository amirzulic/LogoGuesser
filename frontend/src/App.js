import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from "./components/landing_page/LandingPage";
import Leaderboard from "./components/leaderboard/Leaderboard";
import LoginAdmin from "./components/login_admin/LoginAdmin";
import LogoList from "./components/logo_list/LogoList";
import SingleLogo from "./components/single_logo/SingleLogo";
import AdminPage from "./components/admin_page/AdminPage";
import './App.css';

function App() {
  return (
    <Router>
      <div>
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/leaderboard" element={<Leaderboard/>}/>
          <Route path="/admin" element={<LoginAdmin/>}/>
          <Route path="/list" element={<LogoList/>}/>
          <Route path="/logo/:id" element={<SingleLogo/>}/>
          <Route path="/admin/logo" element={<AdminPage/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
