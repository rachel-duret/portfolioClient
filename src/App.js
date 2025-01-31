
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
    }, [id])
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

            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/about/:id" element={<AboutPage/>}/>
                    <Route path="/skills/:id" element={<SkillsPage/>}/>
                    <Route path="/experiences/:id" element={<ExperiencesPage/>}/>
                    <Route path="/projects/:id" element={<ProjectsPage/>}/>

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                </Routes>

            </BrowserRouter>
        </>
    );
}

export default App;
