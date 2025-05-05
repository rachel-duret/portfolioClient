import {motion} from 'framer-motion';
import * as PropTypes from "prop-types";
import React from "react";
import DeleteSkill from "./DeleteSkill";
import EditIcon from "../buttons/icons/EditIcon";


const Skill = props => {
    return (
        <div className="flex flex-col items-center pb-10 ">
            <motion.img
                transition={{duration: 1}}
                whileInView={{opacity: 1, x: 0}}
                className="rounded-full border border-gray-500 object-cover w-24 h-24 md:w-28 md:h-28 xl:w-34 xl:h-40  filter group-hover:grayscale transition duration-300 ease-in-out"
                src={props.skill.image}
                alt=""
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white ">{props.skill.name}</h5>
            <div
                className="flex mt-4 md:mt-6 ">
                {
                    props.authUser === props.username && (
                        <DeleteSkill skill={props.skill} userId={props.skill.userId}/>

                    )
                }
                {/*TODO to implement update one skill*/}
                {
                    props.authUser === props.username && (
                        <div className="flex  justify-center">
                            <button className="text-red-400 border-gray-500 ">
                                <EditIcon/>
                            </button>
                        </div>
                    )
                }

            </div>
        </div>
    );
}
Skill.prototype = {
    skill: PropTypes.object
}

export default Skill
