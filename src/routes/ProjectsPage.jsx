import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {useParams} from "react-router";
import axios from "axios";
import Project from "../components/projects/Project";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import NewProject from "../components/projects/NewProject";

const ProjectsPage = props => {
    let params = useParams();
    const [user, setUser] = useState([]);
    const [projects, setProjects] = useState([]);
    const [authUser, setAuthUser] = useState(null);
    const auth = useAuthUser()


    useEffect(() => {
        console.log(params)
        const fetchUser = async () => {
            try {

                const res = await axios.get(`http://localhost:8080/users/${params.id}`)
                setUser(res.data);
                setProjects(res.data.projects);
                if (auth) {
                    setAuthUser(auth.username)
                }

            } catch (error) {
                // TODO
            }
        }
        fetchUser()
    }, [params, params.id])
    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 1.5}}
                className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0 ">
                <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl ">
                    Projects
                </h3>


                <div className="relative w-full flex overflow-scroll overflow-y-hidden snap-x snap-mandatory z-20">
                    {projects.map((project, i) => (
                        <Project project={project} username={user.username} authUser={authUser}/>
                    ))}
                </div>

                <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12 "/>
            </motion.div>
            {
                authUser === user.username &&
                <NewProject userId={user.id}/>
            }
        </>
    )
}
ProjectsPage.propTypes = {}
export default ProjectsPage
