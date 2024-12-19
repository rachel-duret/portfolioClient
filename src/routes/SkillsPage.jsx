import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {motion} from 'framer-motion'
import skill from "../components/Skill";
import Skill from "../components/Skill";
import {useParams} from "react-router";
import axios from "axios";

const SkillsPage = props => {
    let params = useParams();
    const [user, setUser] = useState([]);
    const [skills, setSkills] = useState([]);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [image, setImage] = useState('');



    useEffect(() => {
        console.log(params)
        const fetchUser = async () => {
            try {

                const res = await axios.get(`http://localhost:8080/users/${params.id}`)
                setUser(res.data);
                setSkills(res.data.skills);

            } catch (error) {

            }
        }
        fetchUser()
    }, [params.id])

    const handleAddSkill = async (event) => {
        event.preventDefault()
        const newSkill={
            userId: params.id,
            name: name,
            url:url,
            image:"https://www.alsacreations.com/xmedia/doc/medium/php-logo.png"

        }
        console.log(newSkill)
        await axios.post(`http://localhost:8080/skills/skill`, newSkill)
        window.location.reload()

    }
    return (
        <>

            <motion.div
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 1.5}}
                className="flex relative flex-col text-center md:text-left cl:flex-row max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center ">
                <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl ">
                    Skills
                </h3>

                <h3 className="absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm ">
                    Hover over a skill for currency profieciency
                </h3>
                <div className="grid grid-cols-4 gap-5">
                    {skills.map((skill) => (
                        <Skill skill={skill}/>
                    ))
                    }
                </div>
            </motion.div>

            <div className="w-full flex space-x-5 overflow-scroll p-10 snap-x snap-madatory bg-[#F7AB0A]/10">
                <form className="max-w-lg mx-auto" onSubmit={handleAddSkill}>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill URL</label>
                        <input
                            type="text"
                            id="url"
                            value={url}
                            onChange={(event) => setUrl(event.target.value)}
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">Upload an Image for your skill</label>
                    <input
                        aria-describedby="user_avatar_help"
                        id="image"
                        type="file"
                        value={image}
                        onChange={(event) => setImage(event.target.files[0])}

                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>

                    <button type="submit" className="text-gray-900 bg-gradient-to-r from-teal-200 ">Submit</button>
                </form>
            </div>


        </>
    )
}

SkillsPage.propTypes = {
    skills: PropTypes.array,
}
export default SkillsPage
