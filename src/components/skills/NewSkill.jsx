import React, {useState} from 'react'
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../../firebase/config";
import SubmitButton from "../buttons/SubmitButton";
import CancelButton from "../buttons/CancelButton";


const NewSkill = ({user, setOpen}) => {

    const [skillName, setSkillName] = useState('');
    const [url, setUrl] = useState('');
    const [file, setFile] = useState('');
    const authHeader = useAuthHeader();


    const handleAddSkill = async (event) => {
        event.preventDefault()
        const newSkill = {
            userId: user.id,
            name: skillName,
            url: url,

        }
        // upload file to firebase storage
        if (!file) return;
        const fileName = new Date().getTime() + file.name;
        const imageRef = ref(storage, `images/skills/${fileName}`);


        await uploadBytes(imageRef, file).then(snapshot => {
            getDownloadURL(snapshot.ref).then(downloadURL => {
                newSkill.image = downloadURL;
                console.log(downloadURL)
                try {
                    console.log(newSkill)
                     axios.post(`https://portfolio-dev-v1-332485539213.herokuapp.com/skills/skill`, newSkill, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": authHeader
                        }
                    })
                    user.history.push(`/skills/${user.id}`)

                } catch (error) {
                    // TODO
                }
            })
        })




    }
    return (
        <div className="relative flex justify-center p-4 w-full  max-h-full">
            <form className="p-4 md:p-5" onSubmit={handleAddSkill}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill
                        name</label>
                    <input
                        type="text"
                        id="name"
                        value={skillName}
                        onChange={(event) => setSkillName(event.target.value)}
                        required
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill
                        URL</label>
                    <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        required
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">
                        Upload an Image for your skill
                    </label>
                    <input
                        aria-describedby="user_avatar_help"
                        id="image"
                        type="file"
                        onChange={(event) => setFile(event.target.files[0])}/>
                </div>
                <div className="mb-5 flex justify-end">
                    <SubmitButton/>
                    <CancelButton setOpen={setOpen}/>
                </div>
            </form>
        </div>
    )
}
NewSkill.propTypes = {}
export default NewSkill
