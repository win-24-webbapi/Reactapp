import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import './AppLayout.css';
import Events from './Events';
import Notifications from './Notifications';
import Profile from './Profile';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="appLayout">
      <Sidebar />
      <main className="mainContent">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App; 