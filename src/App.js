import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Profile from "./components/Profile";
import Experiences from "./components/Experiences";
import React, {useEffect, useState} from "react";
import axios from "axios";
import skills from "./components/Skills";


function App() {
    let id = 1// TODO
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const res=await axios.get(`http://localhost:8080/users/${id}`)
                setUser(res.data);

            }catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }
        fetchUser()
    },[])
    if (loading)return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

  return (
  <>

    <Header />
      <div>{user.username}</div>
    <Profile profile={user.profile} username={user.username} />
    <section id="about" className="text-red-400">
         <About profile={user.profile} />
    </section>
    <section id="skills">
        <Skills skills={user.skills} />
    </section>
   <section id="projects">
     <Projects projects={user.projects} />
   </section>
    <section>
      <Experiences experiences={user.experiences} />
    </section>

  </>
  );
}

export default App;
