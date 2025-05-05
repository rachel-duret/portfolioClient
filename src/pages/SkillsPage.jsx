import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Skill from "../components/skills/Skill";
import {useParams} from "react-router";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import NewSkill from "../components/skills/NewSkill";
import AddButton from "../components/buttons/AddButton";
import Header from "../components/Header";

const SkillsPage = props => {
    let params = useParams();
    const [user, setUser] = useState([]);
    const [skills, setSkills] = useState([]);
    const [authUser, setAuthUser] = useState(null);
    const [open, setOpen] = useState(false)
    const auth = useAuthUser()


    useEffect(() => {

        const fetchUser = async () => {
            try {

                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/user/${params.username}`)
                setUser(res.data);
                setSkills(res.data.skills);
                if (auth) {
                    setAuthUser(auth.username);
                }

            } catch (error) {
                // TODO
            }
        }
        fetchUser()
    }, [auth, params.username])

    if (open) {
        return <NewSkill user={user} setOpen={setOpen}/>
    }

    return (
        <>
            <Header/>
            <div
                className="flex relative flex-col text-center md:text-left cl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center ">
                <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl ">
                    Skills
                </h3>

                <h3 className="absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm ">
                    Hover over a skill for currency profieciency
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {
                        skills.map((skill) => (
                            <Skill skill={skill} username={user.username} authUser={authUser}/>
                        ))
                    }
                </div>

                <div className="mt-10">
                    {
                        authUser === user.username &&
                        <AddButton setOpen={setOpen} name="Skill"/>

                    }
                </div>

            </div>


        </>
    )
}

SkillsPage.propTypes = {
    skills: PropTypes.array,
}
export default SkillsPage
