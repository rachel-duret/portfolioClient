import React, {useState} from 'react'
import PropTypes from 'prop-types'
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase/config";
import axios from "axios";

const NewProject = props => {

    const [projectName, setProjectName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('')
    const [file, setFile] = useState('');
    const authHeader = useAuthHeader();


    const handleAddProject = async (event) => {
        event.preventDefault()
        const newProject = {
            userId: props.userId,
            name: projectName,
            url: url,
            description: description

        }
        // upload file to firebase storage
        if (!file) return;
        const fileName = new Date().getTime() + file.name;
        const imageRef = ref(storage, `images/projects/${fileName}`);


        await uploadBytes(imageRef, file).then(snapshot => {
            getDownloadURL(snapshot.ref).then(downloadURL => {
                newProject.image = downloadURL;
                console.log(downloadURL)
                try {
                    console.log(newProject)
                    axios.post(`http://localhost:8080/projects/project`, newProject, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": authHeader
                        }
                    })
                    props.history.push(`/projects/${props.userId}`)

                } catch (error) {
                    // TODO
                }
            })
        })




    }
    return (
        <div className="w-full flex space-x-5 overflow-scroll p-10 snap-x snap-madatory bg-[#F7AB0A]/10">
            <form className="max-w-lg mx-auto" onSubmit={handleAddProject}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project
                        name</label>
                    <input
                        type="text"
                        id="name"
                        value={projectName}
                        onChange={(event) => setProjectName(event.target.value)}
                        required
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project
                        URL</label>
                    <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>


                <div className="mb-5">
                    <label htmlFor="description"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">Upload
                    an Image for your project</label>
                <input
                    aria-describedby="user_avatar_help"
                    id="image"
                    type="file"
                    onChange={(event) => setFile(event.target.files[0])}

                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>

                <button type="submit" className="text-gray-900 bg-gradient-to-r from-teal-200 ">Submit</button>
            </form>
        </div>
    )
}
NewProject.propTypes = {}
export default NewProject
