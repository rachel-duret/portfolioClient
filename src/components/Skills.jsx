import React from 'react'
import PropTypes from 'prop-types'
import {motion} from 'framer-motion'
import skill from "./Skill";
import Skill from "./Skill";

const Skills = props => {
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
                    {props.skills.map((skill)=>(
                        <Skill skill={skill} />
                    ))
                    }
                </div>
            </motion.div>

        </>
    )
}

Skills.propTypes = {
    skills: PropTypes.array,
}
export default Skills
