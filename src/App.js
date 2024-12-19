import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import AboutPage from "./routes/AboutPage";
import SkillsPage from "./routes/SkillsPage";
import ProjectsPage from "./routes/ProjectsPage";
import Profile from "./components/Profile";
import ExperiencesPage from "./routes/ExperiencesPage";
import React, {useEffect, useState} from "react";
import axios from "axios";
import skills from "./routes/SkillsPage";
import {createBrowserRouter, Route, Router, Routes} from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";
import RegisterPage from "./routes/RegisterPage";


function App() {
    let id = 1// TODO
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/users/${id}`)
                setUser(res.data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUser()
    }, [])
    if (loading) return <div className="flex flex-col relative text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center h-screen">
        <h4 className="text-4xl font-semibold">
           Loading...
        </h4>

    </div>
    if (error) return <div className="flex flex-col relative text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center h-screen">
        <h4 className="text-4xl font-semibold">
            Something went wrong.
        </h4>

    </div>

    return (
        <>
            <Header/>
            <Profile user={user}/>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/about/:id" element={<AboutPage/>}/>

                </Routes>

            </Router>


            <section id="about" className="text-red-400">
                <AboutPage profile={user.profile}/>
            </section>
            <section id="skills">
                <SkillsPage skills={user.skills}/>
            </section>
            <section id="projects">
                <ProjectsPage projects={user.projects}/>
            </section>
            <section>
                <ExperiencesPage experiences={user.experiences}/>
            </section>
        </>
    );
}

export default App;
