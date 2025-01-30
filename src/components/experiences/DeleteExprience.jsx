import React from 'react'
import PropTypes from 'prop-types'
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {deleteObject, getStorage, ref} from "firebase/storage";
import axios from "axios";

const DeleteExprience = props => {
    const authHeader = useAuthHeader();
    const storage = getStorage()
    // Delete one project
    const deleteOneExperience = async (id) => {

        try {
            await axios.delete(`http://localhost:8080/experiences/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": authHeader
                }
            })

            const  desertRef = ref(storage, props.experience.image)
            await deleteObject(desertRef)

            props.history.push(`/experience/${props.userId}`)

        }catch (error) {
            return <div>Delete Experience with error</div>
        }

    }
    return (
        <div className="flex  justify-center">
            <button className="text-red-400 border-gray-500 " onClick={() => deleteOneExperience(props.experience.id)}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>
            </button>
        </div>
    )
}
DeleteExprience.propTypes = {}
export default DeleteExprience
