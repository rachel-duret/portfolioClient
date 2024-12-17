import React from 'react'
import PropTypes from 'prop-types'
import {motion} from 'framer-motion'

const About = props=> {
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
                src="https://pbs.twimg.com/profile_images/1314165969791614977/S_ntW8X4_400x400.jpg"
                className="mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95"
            />

            <div className="space-y-10 px-0 md:px-10">
                <h4 className="text-4xl font-semibold">
                    Here is a <span className="uppercase"> little</span> background about
                    me
                </h4>
                <p className="text-base">
                    {props.profile.aboutMe}
                </p>
            </div>
        </motion.div>
    )
}
About.propTypes = {}
export default About
