import React from 'react'
import PropTypes from 'prop-types'
import {SocialIcon} from "react-social-icons";
import {motion} from 'framer-motion'

const Header = props => {
    return (
        <header className="sticky top-0 p-5 flex items-start justify-between max-w-8xl mx-auto z-20 xl:items-center">
            <motion.div
                initial={{
                    x: -500,
                    opacity: 0,
                    scale: 0.5,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    duration: 2,
                }}
                className="flex flex-row items-center">
                <SocialIcon
                    url="https://github.com/rachel-duret"
                    fgColor="gray"
                    bgColor="transparent"
                />
                <SocialIcon
                    url="https://www.linkedin.com/in/rachelduret"
                    fgColor="gray"
                    bgColor="transparent"
                />
                <SocialIcon
                    url="https://twitter.com/ChuncheungDuret"
                    fgColor="gray"
                    bgColor="transparent"
                />
                <SocialIcon
                    className="cursor-pointer"
                    network="email"
                    fgColor="gray"
                    bgColor="transparent"
                />
            </motion.div>

            <motion.div
                initial={{
                    x: 500,
                    opacity: 0,
                    scale: 0.5,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    duration: 2,
                }}
                className="flex flex-row items-center">
                <SocialIcon
                    className="cursor-pointer"
                    network="email"
                    fgColor="gray"
                    bgColor="transparent"
                />
                <p>Contact me</p>
            </motion.div>
        </header>
    )
}
Header.propTypes = {}
export default Header
