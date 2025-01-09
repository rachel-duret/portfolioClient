import {motion} from 'framer-motion';
import * as PropTypes from "prop-types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {useState} from "react";
import axios from "axios";
import Delete from "./DeleteSkill";
import DeleteSkill from "./DeleteSkill";


const Skill = props => {
    return (
        <div className="group relative flex cursor-pointer ">
            <motion.img
                transition={{duration: 1}}
                whileInView={{opacity: 1, x: 0}}
                className="rounded-full border border-gray-500 object-cover w-24 h-24 md:w-28 md:h-28 xl:w-24 xl:h-32  filter group-hover:grayscale transition duration-300 ease-in-out"
                src={props.skill.image}
                alt=""
            />
            <div
                className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white h-24 w-24  xl:w-32 xl:h-32 rounded-full z-0">
                <div className="flex items-center justify-center h-full">
                    <p className="text-2xl font-boldtext-black opacity-80">{props.skill.name}</p>
                </div>

            </div>
            {
                props.authUser === props.username && (
                    <DeleteSkill skill={props.skill} userId = {props.skill.userId} />
                )

            }
        </div>
    );
}
Skill.prototype = {
    skill: PropTypes.object
}

export default Skill
