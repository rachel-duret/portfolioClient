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
            <button className="text-red-400 border-gray-500 " onClick={() => deleteOneExperience(props.experience.id)}>Delete
            </button>
        </div>
    )
}
DeleteExprience.propTypes = {}
export default DeleteExprience
