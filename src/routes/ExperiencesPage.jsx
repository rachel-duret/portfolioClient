import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {useParams} from "react-router";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Experience from "../components/experiences/Experience";
import NewExperience from "../components/experiences/NewExperience";

const ExperiencesPage = props => {
    let params = useParams();
    const [user, setUser] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [authUser, setAuthUser] = useState(null);
    const auth = useAuthUser()


    useEffect(() => {
        console.log(params)
        const fetchUser = async () => {
            try {

                const res = await axios.get(`http://localhost:8080/users/${params.id}`)
                setUser(res.data);
                setExperiences(res.data.experiences);
                if (auth) {
                    setAuthUser(auth.username)
                }
            } catch (error) {
                // TODO
            }
        }
        fetchUser()
    }, [auth, params.id])
    return (
        <>
            <motion.div
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 1.5}}
                className="flex flex-col relative text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center h-screen">
                <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl ">
                    Experiences
                </h3>

                <div className="w-full flex space-x-5 overflow-scroll p-10 snap-x snap-madatory ">
                    {
                        experiences.map((experience) => (
                            <Experience exprience={experience} username={user.username} authUser={authUser}/>
                        ))
                    }

                </div>
            </motion.div>
            {
                authUser === user.username &&
                <NewExperience user={user}/>
            }
        </>
    )
}
ExperiencesPage.propTypes = {}
export default ExperiencesPage
