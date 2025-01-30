import React from 'react'
import {motion} from "framer-motion";
import DeleteExprience from "./DeleteExprience";


const Experience = props => {
    const formatDate = (timestamp) => {
        const format = {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        }
        return new Date(timestamp).toLocaleDateString(undefined, format)
    }
    const startedAt = formatDate(props.exprience.startedAt);
    const endedAt = formatDate(props.exprience.endedAt);
    return (
        <article
            className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[300px] md:w-[500px] xl:w-[600px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden ">
            <motion.img
                initial={{
                    y: -100,
                    opacity: 0,
                }}
                transition={{duration: 1.2}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                src={props.exprience.image}
                alt=""
                className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center "
            />

            <div className="px-0 md:px-10">
                <h4 className="text-4xl font-light">{props.exprience.name}</h4>
                <h5 className="text-3xl text-gray-400">{props.exprience.company}</h5>
                <p className=" py-3 ">{startedAt} to {endedAt}</p>
                <p className="font-bold text-2xl mt-1">{props.exprience.description}</p>

                <div className="flex flex-row flex-wrap space-x-2 my-2">
                    {
                        props.exprience.technologies.map((technology) => (

                            <img
                                className="h-10 w-10 rounded-full"
                                src={technology.image}
                                alt="technologie"
                            />
                        ))
                    }
                </div>
                <div className="px-4">
                    <ul className=" list-disc text-left space-x-3 ">
                        {props.exprience.summaries.map((summary) => (
                            <li>{summary.value}</li>
                        ))
                        }

                    </ul>
                </div>


            </div>
            {
                props.authUser === props.username && (
                    <DeleteExprience experience={props.exprience} userId={props.exprience.userId}/>
                )
            }
        </article>
    )
}
Experience.propTypes = {}
export default Experience
