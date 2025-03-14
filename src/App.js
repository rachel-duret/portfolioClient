
import './App.css';
import AboutPage from "./routes/AboutPage";
import SkillsPage from "./routes/SkillsPage";
import ProjectsPage from "./routes/ProjectsPage";
import ExperiencesPage from "./routes/ExperiencesPage";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {BrowserRouter, createBrowserRouter, Route, Router, Routes} from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";
import RegisterPage from "./routes/RegisterPage";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {

    return (
        <>
            {/*<div className="w-full absolute top-[30%] bg-pink-200 opacity-20 left-0 h-[500px] -skew-y-24 "/>*/}
            {/*<div className="w-full absolute top-[20%]  bg-purple-200 opacity-20 left-0 h-[500px] -skew-y-12 "/>*/}

            <BrowserRouter>
                <Header />
                <Routes>
                    {/*<Route path="/" element={<HomePage/>}/>*/}
                    <Route path="/about/:username"  element={<AboutPage/>}/>
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
