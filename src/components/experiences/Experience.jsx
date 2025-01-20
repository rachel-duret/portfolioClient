import React from 'react'
import {motion} from "framer-motion";
import DeleteExprience from "./DeleteExprience";


const Experience = props => {
    console.log(props.exprience.summaries)
    return (
        <article
            className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden ">
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
                <p className="font-bold text-2xl mt-1">{props.exprience.description
                }</p>

                {
                    props.exprience.technologies.map((technologie)=> (
                        <div className="flex space-x-2 my-2">
                            <img
                                className="h-10 w-10 rounded-full"
                                src={technologie.image}
                                alt=""
                            />
                        </div>

                    ))

                }
                <p className=" py-5 ">Started work:{props.exprience.startedAt}</p>
                <p className=" py-5 ">Ended work:{props.exprience.endedAt}</p>
                <ul className="list-disc space-y-4 ml-5 text-lg">
                    {props.exprience.summaries.map((summary)=>(
                        <li>{summary.value}</li>
                    ))
                    }

                </ul>
            </div>
            {
                props.authUser === props.username && (
                    <DeleteExprience experience={props.exprience} userId = {props.exprience.userId} />
                )

            }
        </article>
    )
}
Experience.propTypes = {}
export default Experience
