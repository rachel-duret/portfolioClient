import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {useParams} from "react-router";
import axios from "axios";
import Profile from "../components/Profile";
import {Link} from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UpdateProfile from "../components/profile/UpdateProfile";
import Hobby from "../components/profile/Hobby";
import UpdateButton from "../components/buttons/UpdateButton";

const AboutPage = ({user}) => {
    const [open, setOpen] =useState(false)

    const auth = useAuthUser()
    let authUser = null;
    if (auth){
        authUser=auth.username
    }
    if (open){
        return <UpdateProfile user={user}/>
    }

    return (

        <>
            <div
                className="flex flex-col relative text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center h-screen">
                <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
                    About {user.username}
                </h3>
                <div className="flex  md: flex-row md: space-y-10 px-0 md:px-10">
                    <div className="mb-20 md:mb-0  w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95">
                        <motion.img
                            initial={{
                                x: -200,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 1.2,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{once: true}}
                            src={user.profile.imageUrl}
                            className="mb-20 md:mb-0 flex-shrink-0 justify-center w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95"
                        />
                    </div>
                    <div className=" space-y-10 px-10">

                        <h2 className="text-2xl uppercase text-gray-500 pb-2 tracking-[10px]">
                            {user.profile.profession}
                        </h2>
                        <p className="text-base capitalize">

                            {user.profile.aboutMe}
                        </p>
                        <Hobby hobbies={user.hobbies}/>
                    </div>

                </div>


                {
                    authUser === user.username &&
                    <UpdateButton setOpen={setOpen}/>
                }
            </div>

        </>
    )
}
AboutPage.propTypes = {}
export default AboutPage
