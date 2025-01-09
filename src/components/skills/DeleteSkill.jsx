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
            <button className="text-red-400 border-gray-500 " onClick={() => deleteOneSkill(props.skill.id)}>Delete
            </button>
        </div>
    )
}
DeleteSkill.propTypes = {}
export default DeleteSkill
