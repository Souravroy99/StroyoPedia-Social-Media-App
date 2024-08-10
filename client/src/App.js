import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "pages/homePage";
import LoginPage from "./pages/loginPage";
import Navbar from "pages/navbar";
import ProfilePage from "pages/profilePage";

function App() {
  return (
    <div className="app">
        <BrowserRouter>
          <Navbar />
            
            <Routes>
            
                <Route path="/" element={<LoginPage/>} />
                <Route path="/home" element={<HomePage/>} />
                <Route path="/profile/:userId" element={<ProfilePage/>} />

            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
