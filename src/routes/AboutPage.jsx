import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {motion} from 'framer-motion'
import {useParams} from "react-router";
import axios from "axios";

const AboutPage = ()=> {
    let params = useParams();
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState({});


    useEffect(() => {
        console.log(params)
        const fetchUser = async () => {
            try {

                const res = await axios.get(`http://localhost:8080/users/${params.id}`)
                setUser(res.data);
                setProfile(res.data.profile);

            } catch (error) {

            }
        }
        fetchUser()
    }, [params.id])
    return (


        <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 1.5}}
            className="flex flex-col relative text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center h-screen">
            <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
                About Me
            </h3>

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
                src={profile.imageUrl}
                className="mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95"
            />

            <div className="space-y-10 px-0 md:px-10">
                <h4 className="text-4xl font-semibold">
                    Here is a <span className="uppercase"> little</span> background about
                    me
                </h4>
                <p className="text-base capitalize">

                    {profile.aboutMe}
                </p>
            </div>
        </motion.div>
    )
}
AboutPage.propTypes = {}
export default AboutPage
