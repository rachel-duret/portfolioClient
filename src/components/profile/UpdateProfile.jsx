import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Select from "react-select/base";
import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase/config";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const UpdateProfile = props => {
    const [file, setFile] = useState("")
    const [phoneNumber, setPhonenumber] = useState(props.user.profile.phone)
    const [aboutMe, setAboutMe] = useState(props.user.profile.aboutMe)
    const [profession, setProfession] = useState(props.user.profile.profession)
    const [sex, setSex] = useState(props.user.profile.sex)
    const [birth, setbirth] = useState(props.user.profile.birthday)
    const authHeader = useAuthHeader();
    const options = [
        {value: "F", label: "Female"},
        {value: "M", label: "Male"}
    ]

    const handUpdateProfile = async (event) => {
        event.preventDefault()
        const updateProfile = {
            birthday: birth,
            phoneNumber: phoneNumber,
            aboutMe: aboutMe,
            profession: profession,
            imageUrl: props.user.profile.imageUrl,
            sex: sex
        }


        try {
            // upload file to firebase storage
            if (file) {
                const fileName = new Date().getTime() + file.name;
                const imageRef = ref(storage, `images/profile/${fileName}`);


                await uploadBytes(imageRef, file).then(snapshot => {
                    getDownloadURL(snapshot.ref).then(downloadURL => {
                        updateProfile.imageUrl = downloadURL;
                        axios.put(`http://localhost:8080/users/${props.user.id}/profile`, updateProfile, {
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": authHeader
                            }
                        })

                        const desertRef = ref(storage, props.user.profile.imageUrl)
                        if (getDownloadURL(desertRef)){
                            deleteObject(desertRef)
                        }
                    })
                })
            }


            await axios.put(`http://localhost:8080/users/${props.user.id}/profile`, updateProfile, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": authHeader
                }
            })

            props.history.push(`/about/${props.user.id}`)

        } catch (error) {
            // TODO
        }

    }

    return (
        <div className="w-full flex space-x-5 overflow-scroll p-10 snap-x snap-madatory bg-[#F7AB0A]/10">
            <form className="max-w-lg mx-auto"
                  onSubmit={handUpdateProfile}>
                <div>
                    <label
                        htmlFor="profession"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    > profession</label>
                    <input
                        type="text"
                        id="profession"
                        value={profession}
                        onChange={(event) => setProfession(event.target.value)}
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >phone number</label>
                    <input
                        type="text"
                        id="phone"
                        value={phoneNumber}
                        onChange={(event) => setPhonenumber(event.target.value)}
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <label
                        htmlFor="birth"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >birthday</label>
                    <input
                        type="date"
                        id="birth"
                        value={birth}
                        onChange={(event) => setbirth(event.target.value)}
                        className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                    />
                    <label
                        htmlFor="sex"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Select your sex</label>
                    <select multiple={false} name="sex">
                        <option value="F" onSelect={setSex}>F</option>
                        <option value="M" onSelect={setSex}>M</option>
                    </select>
                    <label
                        htmlFor="about"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >About me</label>
                    <textarea
                        id="about"
                        rows="4"
                        value={aboutMe}
                        onChange={(event) => setAboutMe(event.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..." required
                    >
                    </textarea>
                    <label
                        htmlFor="image"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    > image</label>
                    <input
                        aria-describedby="user_avatar_help"
                        id="image"
                        type="file"
                        onChange={(event) => setFile(event.target.files[0])}
                    />

                    <button type="submit" className="text-gray-900 bg-gradient-to-r from-teal-200 ">Submit</button>
                </div>
            </form>
        </div>
    )
}
UpdateProfile.propTypes = {}
export default UpdateProfile
