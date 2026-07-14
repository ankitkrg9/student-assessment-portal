import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import SkillSelection from "./pages/SkillSelection/SkillSelection";
import Dashboard from "./pages/Dashboard/Dashboard";
import Instructions from "./pages/Instructions/Instructions";
import SystemCheck from "./pages/SystemCheck/SystemCheck";
import Assessment from "./pages/Assessment/Assessment";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/skills" element={<SkillSelection />} />
                <Route path="/instructions" element={<Instructions />} />
                <Route path="/system-check" element={<SystemCheck />} />
                <Route path="/assessment" element={<Assessment />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;