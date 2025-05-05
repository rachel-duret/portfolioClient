
import './App.css';
import ProfilePage from "./pages/ProfilePage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer";


function App() {

    return (
        <>
            {/*<div className="w-full absolute top-[30%] bg-pink-200 opacity-20 left-0 h-[500px] -skew-y-24 "/>*/}
            {/*<div className="w-full absolute top-[20%]  bg-purple-200 opacity-20 left-0 h-[500px] -skew-y-12 "/>*/}

            <BrowserRouter>
                <Routes>
                    {/*<Route path="/" element={<HomePage/>}/>*/}
                    <Route path="/about/:username"  element={<ProfilePage/>}/>
                    <Route path="/skills/:username" element={<SkillsPage/>}/>
                    <Route path="/experiences/:username" element={<ExperiencesPage/>}/>
                    <Route path="/projects/:username" element={<ProjectsPage/>}/>

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                </Routes>
                <Footer/>

            </BrowserRouter>

        </>
    );
}

export default App;
