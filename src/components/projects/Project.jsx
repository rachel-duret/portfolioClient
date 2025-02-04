import React from 'react'
import {motion} from "framer-motion";
import DeleteSkill from "../skills/DeleteSkill";
import DeleteProject from "./DeleteProject";
import {Link} from "react-router-dom";
import EditIcon from "../buttons/icons/EditIcon";

const Project = props => {
    return (
        <div
            className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[500px] xl:w-[600px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden ">
            <Link to={props.project.url} target="_blank" rel="noopener noreferrer">
                <img
                    src={props.project.image}
                    alt={props.project.name}
                    className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center "
                />
                <h4 className="text-4xl font-semibold text-center uppercase">
                    {props.project.name}
                </h4>

            </Link>
            <div className="flex justify-between mt-4 md:mt-6">
                {
                    props.authUser === props.username && (
                        <DeleteProject project={props.project} userId={props.project.userId}/>
                    )

                }
                {/*TODO to implement update project compnent*/}
                <div className="flex  justify-center">
                    <button className="text-red-400 border-gray-500 ">
                        <EditIcon/>
                    </button>
                </div>
            </div>


        </div>
    )
}
Project.propTypes = {}
export default Project
