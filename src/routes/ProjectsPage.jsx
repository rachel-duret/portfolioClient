import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {useParams} from "react-router";
import axios from "axios";
import Project from "../components/projects/Project";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import NewProject from "../components/projects/NewProject";
import NewSkill from "../components/skills/NewSkill";
import AddButton from "../components/buttons/AddButton";

const ProjectsPage = props => {
    let params = useParams();
    const [user, setUser] = useState([]);
    const [projects, setProjects] = useState([]);
    const [open, setOpen] = useState(false)
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

    if (open) {
        return <NewProject user={user} setOpen={setOpen}/>
    }
    return (
        <>
            <div
                className="flex flex-col  text-center justify-center ">
                <div className="my-5">
                    <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl ">
                        Projects
                    </h3>
                </div>

                <div className="w-full flex justify-center space-x-5 overflow-scroll p-10 snap-x snap-madatory">
                    {projects.map((project, i) => (
                        <Project project={project} username={user.username} authUser={authUser}/>
                    ))}
                </div>

                {/*<div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12 "/>*/}
                <div className="mt-10">
                    {
                        authUser === user.username &&
                        <AddButton setOpen={setOpen} name="Project"/>

                    }
                </div>
            </div>

        </>
    )
}
ProjectsPage.propTypes = {}
export default ProjectsPage
