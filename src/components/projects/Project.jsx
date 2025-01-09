import React from 'react'
import {motion} from "framer-motion";
import DeleteSkill from "../skills/DeleteSkill";
import DeleteProject from "./DeleteProject";

const Project = props => {
    return (
        <div
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen ">
            <a href={props.project.url} target="_blank" rel="noopener noreferrer">
                <motion.img
                    initial={{
                        y: -300,
                        opacity: 0,
                    }}
                    transition={{duration: 1.2}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    src={props.project.image}
                    alt=""
                />
                <div className="space-y-10 px-0 md:px-10 max-w-6xl">
                    <h4 className="text-4xl font-semibold text-center">
                        {props.project.name}
                    </h4>
                </div>
            </a>
            {
                props.authUser === props.username && (
                    <DeleteProject project={props.project} userId = {props.project.userId} />
                )

            }
        </div>
    )
}
Project.propTypes = {}
export default Project
