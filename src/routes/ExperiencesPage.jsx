import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {useParams} from "react-router";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Experience from "../components/experiences/Experience";
import NewExperience from "../components/experiences/NewExperience";
import AddButton from "../components/buttons/AddButton";

const ExperiencesPage = props => {
    let params = useParams();
    const [user, setUser] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [open, setOpen] = useState(false)
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
    if (open){
        return <NewExperience user={user} setOpen={setOpen} />
    }
    return (
        <>
            <div className="flex flex-col  text-center justify-center">
              <div className="my-5">
                  <h3 className="uppercase tracking-[20px] text-gray-500 text-2xl">
                      Experiences
                  </h3>
              </div>

                <div className="w-full flex justify-center space-x-5 overflow-scroll p-10 snap-x snap-madatory ">
                    {
                        experiences.map((experience) => (
                            <Experience exprience={experience} username={user.username} authUser={authUser}/>
                        ))
                    }

                </div>

                <div className="mt-10">
                    {
                        authUser === user.username &&
                        <AddButton setOpen={setOpen} name="Experience"/>

                    }
                </div>
            </div>
        </>
    )
}
ExperiencesPage.propTypes = {}
export default ExperiencesPage
