import React from 'react'
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {deleteObject, getStorage, ref} from "firebase/storage";
import axios from "axios";
import DeleteIcon from "../buttons/icons/DeleteIcon";

const DeleteProject = props => {
    const authHeader = useAuthHeader();
    const storage = getStorage()


    // Delete one project
    const deleteOneProject = async (id) => {
        const  desertRef = ref(storage, props.project.image)
        await deleteObject(desertRef)
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/projects/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": authHeader
                }
            })

            props.history.push(`/projects/${props.userId}`)

        }catch (error) {
            return <div>Delete Project with error</div>
        }

    }

    return (
        <div className="flex  justify-center">
            <button className="text-red-400 border-gray-500 " onClick={() => deleteOneProject(props.project.id)}>
                <DeleteIcon/>
            </button>
        </div>
    )
}
DeleteProject.propTypes = {}
export default DeleteProject
