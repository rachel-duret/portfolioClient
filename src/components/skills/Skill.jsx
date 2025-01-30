import {motion} from 'framer-motion';
import * as PropTypes from "prop-types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {useState} from "react";
import axios from "axios";
import Delete from "./DeleteSkill";
import DeleteSkill from "./DeleteSkill";


const Skill = props => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4  ">

            <div className="group relative bottom-2 cursor-pointer ">
                <div
                    className="flex justify-center capitalize ">
                    <p className="text-blue-100xl opacity-80 capitalize ">{props.skill.name}</p>
                    {
                        props.authUser === props.username && (
                            <DeleteSkill skill={props.skill} userId = {props.skill.userId} />
                        )

                    }
                </div>
                <div>
                    <motion.img
                        transition={{duration: 1}}
                        whileInView={{opacity: 1, x: 0}}
                        className="rounded-full border border-gray-500 object-cover w-24 h-24 md:w-28 md:h-28 xl:w-34 xl:h-40  filter group-hover:grayscale transition duration-300 ease-in-out"
                        src={props.skill.image}
                        alt=""
                    />
                </div>

            </div>
        </div>

    );
}
Skill.prototype = {
    skill: PropTypes.object
}

export default Skill
