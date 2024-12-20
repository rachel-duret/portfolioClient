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
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";




const root = ReactDOM.createRoot(document.getElementById('root'));

const store= createStore({
    authName:"_auth",
    authType:"cookie",
    cookieDomain:window.location.hostname,
    cookieSecure:false// TODO should set to trie in production
});

root.render(
  <React.StrictMode>
      <AuthProvider store={store} >
          <App/>
      </AuthProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
