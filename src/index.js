import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './output.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import AboutPage from "./routes/AboutPage";
import ProjectsPage from "./routes/ProjectsPage";
import ExperiencesPage from "./routes/ExperiencesPage";
import SkillsPage from "./routes/SkillsPage";




const root = ReactDOM.createRoot(document.getElementById('root'));

const router= createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    },
    {
        path: "/about/:id",
        element: <AboutPage/>
    },
    {
        path: "/skills/:id",
        element: <SkillsPage/>
    },
    {
        path: "/projects/:id",
        element: <ProjectsPage/>
    },
    {
        path: "/experiences/:id",
        element: <ExperiencesPage/>
    }
])

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
