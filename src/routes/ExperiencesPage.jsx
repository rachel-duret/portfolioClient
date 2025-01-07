import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {useParams} from "react-router";
import axios from "axios";

const ExperiencesPage = props => {
    let params = useParams();
    const [user, setUser] = useState([]);
    const [experiences, setExperiences] = useState({});


    useEffect(() => {
        console.log(params)
        const fetchUser = async () => {
            try {

                const res = await axios.get(`http://localhost:8080/users/${params.id}`)
                setUser(res.data);
                setExperiences(res.data.experiences);

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
            <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl ">
                Experiences
            </h3>

            <div className="w-full flex space-x-5 overflow-scroll p-10 snap-x snap-madatory ">

                <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden ">
                    <motion.img
                        initial={{
                            y: -100,
                            opacity: 0,
                        }}
                        transition={{duration: 1.2}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        src="https://pbs.twimg.com/profile_images/1314165969791614977/S_ntW8X4_400x400.jpg"
                        alt=""
                        className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center "
                    />

                    <div className="px-0 md:px-10">
                        <h4 className="text-4xl font-light">Developpeur Web</h4>
                        <h5 className="text-3xl text-gray-400">Open Classrooms</h5>
                        <p className="font-bold text-2xl mt-1">valide with 7 projects</p>

                        <div className="flex space-x-2 my-2">
                            <img
                                className="h-10 w-10 rounded-full"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png"
                                alt=""
                            />
                            <img
                                className="h-10 w-10 rounded-full"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png"
                                alt=""
                            />
                        </div>
                        <p className="uppercase py-5 ">Started work: - Ended :</p>

                        <ul className="list-disc space-y-4 ml-5 text-lg">
                            <li>Summary point</li>
                            <li>Summary point</li>
                            <li>Summary point</li>
                            <li>Summary point</li>
                            <li>Summary point</li>
                        </ul>
                    </div>
                </article>
                <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden ">
                    <motion.img
                        initial={{
                            y: -100,
                            opacity: 0,
                        }}
                        transition={{duration: 1.2}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        src="https://pbs.twimg.com/profile_images/1314165969791614977/S_ntW8X4_400x400.jpg"
                        alt=""
                        className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center "
                    />

                    <div className="px-0 md:px-10">
                        <h4 className="text-4xl font-light">Developpeur Web</h4>
                        <h5 className="text-3xl text-gray-400">Open Classrooms</h5>
                        <p className="font-bold text-2xl mt-1">valide with 7 projects</p>

                        <div className="flex space-x-2 my-2">
                            <img
                                className="h-10 w-10 rounded-full"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png"
                                alt=""
                            />
                            <img
                                className="h-10 w-10 rounded-full"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png"
                                alt=""
                            />
                        </div>
                        <p className="uppercase py-5 ">Started work: - Ended :</p>

                        <ul className="list-disc space-y-4 ml-5 text-lg">
                            <li>Summary point</li>
                            <li>Summary point</li>
                            <li>Summary point</li>
                            <li>Summary point</li>
                            <li>Summary point</li>
                        </ul>
                    </div>
                </article>
            </div>
        </motion.div>
    )
}
ExperiencesPage.propTypes = {}
export default ExperiencesPage
