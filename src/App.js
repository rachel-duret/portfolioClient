
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
import AppLayout from "./components/AppLayout";


function App() {

    return (
        <>

            <BrowserRouter>
                <Routes>
                    {/*<Route path="/" element={<HomePage/>}/>*/}
                    <Route path="/about/:username"  element={<AppLayout><ProfilePage/> </AppLayout>}/>
                    <Route path="/skills/:username" element={<AppLayout><SkillsPage/> </AppLayout>}/>
                    <Route path="/experiences/:username" element={<AppLayout><ExperiencesPage/> </AppLayout>}/>
                    <Route path="/projects/:username" element={<AppLayout><ProjectsPage/> </AppLayout>}/>

                    <Route path="/login" element={<AppLayout> <LoginPage /> </AppLayout>} />
                    <Route path="/register" element={<AppLayout> <RegisterPage /> </AppLayout>} />

                </Routes>
                <Footer/>

            </BrowserRouter>

        </>
    );
}

export default App;
