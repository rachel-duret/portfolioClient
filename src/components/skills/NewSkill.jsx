import React, {useState} from 'react'
import PropTypes from 'prop-types'
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const NewSkill = props => {
    const [skillName, setSkillName] = useState('');
    const [url, setUrl] = useState('');
    const [image, setImage] = useState('');
    const authHeader = useAuthHeader();

    const handleAddSkill = async (event) => {
        event.preventDefault()
        const newSkill={
            userId: props.userId,
            name: skillName,
            url:url,
            image:"https://www.alsacreations.com/xmedia/doc/medium/php-logo.png"

        }
        console.log(newSkill)
        await axios.post(`http://localhost:8080/skills/skill`, newSkill,{
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": authHeader
            }
        })


    }
    return (
        <div className="w-full flex space-x-5 overflow-scroll p-10 snap-x snap-madatory bg-[#F7AB0A]/10">
            <form className="max-w-lg mx-auto" onSubmit={handleAddSkill}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill name</label>
                    <input
                        type="text"
                        id="name"
                        value={skillName}
                        onChange={(event) => setSkillName(event.target.value)}
                        required
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill URL</label>
                    <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">Upload an Image for your skill</label>
                <input
                    aria-describedby="user_avatar_help"
                    id="image"
                    type="file"
                    onChange={(event) => setImage(event.target.files[0])}

                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>

                <button type="submit" className="text-gray-900 bg-gradient-to-r from-teal-200 ">Submit</button>
            </form>
        </div>
    )
}
NewSkill.propTypes = {}
export default NewSkill
