import React from 'react'
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {getStorage, ref, deleteObject} from "firebase/storage";


const DeleteSkill = props => {
    const authHeader = useAuthHeader();
    const storage = getStorage()


    // Delete one skill
    const deleteOneSkill = async (id) => {
        // const fileRef = storage.ref().refFromURL(props.image)
        const  desertRef = ref(storage, props.skill.image) //
        console.log(props.skill.image)
        await deleteObject(desertRef)
        try {
            await axios.delete(`http://localhost:8080/skills/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": authHeader
                }
            })

            props.history.push(`/skills/${props.userId}`)

        }catch (error) {
            return <div>Delete Skill with error</div>
        }

    }
    return (
        <div className="flex  justify-center">
            <button className="text-red-400 border-gray-500 " onClick={() => deleteOneSkill(props.skill.id)}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>
            </button>
        </div>
    )
}
DeleteSkill.propTypes = {}
export default DeleteSkill
