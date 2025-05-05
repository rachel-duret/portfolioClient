import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Select from "react-select/base";
import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase/config";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import SubmitButton from "../buttons/SubmitButton";
import CancelButton from "../buttons/CancelButton";
import {motion} from "framer-motion";
import AddIcon from "../buttons/icons/AddIcon";
import DeleteIcon from "../buttons/icons/DeleteIcon";
import Hobby from "./Hobby";
import hobby from "./Hobby";
import CloseIcon from "../buttons/icons/CloseIcon";

const UpdateProfile = ({user, setOpen}) => {
    const [file, setFile] = useState("")
    const [phoneNumber, setPhonenumber] = useState(user.profile.phone)
    const [aboutMe, setAboutMe] = useState(user.profile.aboutMe)
    const [profession, setProfession] = useState(user.profile.profession)
    const [sex, setSex] = useState(user.profile.sex)
    const [birth, setbirth] = useState(user.profile.birthday)
    const [hobbies, setHobbies] = useState([{
        name: "",
        imageUrl: ""
    }])
    const authHeader = useAuthHeader();
    const options = [
        {value: "F", label: "Female"},
        {value: "M", label: "Male"}
    ]

    // add hobbies
    const handleAddHobbyInput = () => {
        setHobbies([...hobbies, {
            name: "",
            imageUrl: ""
        }])
    }
    const handleRemoveHobbyInput = index => {
        const list = [...hobbies];
        list.splice(index, 1);
        setHobbies(list)
    }
    const handleHobbyChange = (e, indext) => {
        const {name, value} = e.target;
        const list = [...hobbies];
        list[indext][name] = value;
        console.log(list)
        setHobbies(list)
        console.log(hobbies)

    }

    const handUpdateProfile = async event => {
        event.preventDefault()
        const updateProfile = {
            birthday: birth,
            phoneNumber: phoneNumber,
            aboutMe: aboutMe,
            profession: profession,
            imageUrl: user.profile.imageUrl,
            sex: sex,
            hobbies: hobbies
        }

        try {
            // upload file to firebase storage
            if (file) {
                const fileName = new Date().getTime() + file.name;
                const imageRef = ref(storage, `images/profile/${fileName}`);


                await uploadBytes(imageRef, file).then(snapshot => {
                    getDownloadURL(snapshot.ref).then(downloadURL => {
                        updateProfile.imageUrl = downloadURL;
                        console.log(downloadURL)
                        axios.put(`https://portfolio-dev-v1-332485539213.herokuapp.com/users/${user.id}/profile`, updateProfile, {
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": authHeader
                            }
                        })

                        const desertRef = ref(storage, user.profile.imageUrl)
                        if (getDownloadURL(desertRef)) {
                            deleteObject(desertRef)
                        }
                    })
                })
            }


            await axios.put(`https://portfolio-dev-v1-332485539213.herokuapp.com/users/${user.id}/profile`, updateProfile, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": authHeader
                }
            })

            user.history.push(`/about/${user.id}`)

        } catch (error) {
            // TODO
        }

    }
    const handleDeleteOneHobby = async (hobby) => {
        try {
            await axios.delete(`https://portfolio-dev-v1-332485539213.herokuapp.com/hobbies/${hobby.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": authHeader
                }
            })
            const desertRef = ref(storage, hobby.imageUrl)
            if (await getDownloadURL(desertRef)) {
                await deleteObject(desertRef)
            }
        } catch (error) {
            return <div>Delete Hobby with error</div>
        }
    }

    return (
        <div className="relative flex justify-center p-4 w-full  max-h-full">
            <form className="p-4 md:p-5"
                  onSubmit={handUpdateProfile}>
                <div>
                    <div className="mb-5">
                        <label
                            htmlFor="profession"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        > Profession</label>
                        <input
                            type="text"
                            id="profession"
                            value={profession}
                            onChange={event => setProfession(event.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Phone number</label>
                        <input
                            type="text"
                            id="phone"
                            value={phoneNumber}
                            onChange={event => setPhonenumber(event.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="birth"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Birthday</label>
                        <input
                            type="date"
                            id="birth"
                            value={birth}
                            onChange={event => setbirth(event.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="sex"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Select your sex</label>
                        <select
                            multiple={false}
                            name="sex"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                            <option value="F" onSelect={setSex}>F</option>
                            <option value="M" onSelect={setSex}>M</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="about"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >About me</label>
                        <textarea
                            id="about"
                            rows="4"
                            value={aboutMe}
                            onChange={event => setAboutMe(event.target.value)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your thoughts here..." required
                        >
                </textarea>
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="image"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        > Image</label>
                        <img
                            src={user.profile.imageUrl}
                            className="h-10 w-10 rounded-full my-2"
                            alt={user.username}/>

                        <input
                            aria-describedby="user_avatar_help"
                            id="image"
                            type="file"
                            onChange={event => setFile(event.target.files[0])}
                        />
                    </div>
                    <div className="mb-5 flex flex-row justify-between">
                        {
                            user.hobbies.map((hobby) => (
                                <div className=" relative flex-col justify-center pt-3 pr-4 ">
                                    <img
                                        src={hobby.imageUrl}
                                        className="mb-20 md:mb-0 flex-shrink-0 w-10 h-10 rounded-full object-cover md:rounded-lg md:w-50 md:h-50"
                                        alt={hobby.name}/>

                                    <button className="absolute top-0  right-0 text-red-400 border-gray-500 "
                                            onClick={() => handleDeleteOneHobby(hobby)}>
                                        <CloseIcon/>
                                    </button>
                                </div>
                            ))
                        }
                    </div>

                    {/* Hobbies*/}
                    {
                        hobbies.map((hobby, index) => (
                            <div className="mb-5" key={index}>

                                <div className="grid gap-4 mb-4 grid-cols-3 content-center">
                                    <div className="col-span-3 sm:col-span-1">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >Hobby name</label>
                                        <input value={hobby.name}
                                               name="name"
                                               type="text"
                                               id="name"
                                               required={true}
                                               onChange={(e) => handleHobbyChange(e, index)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="col-span-3 sm:col-span-1">
                                        <label
                                            htmlFor="imageUrl"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >Image</label>
                                        <input
                                            value={hobby.imageUrl}
                                            name="imageUrl"
                                            type="file"
                                            id="imageUrl"
                                            onChange={(e) => handleHobbyChange(e, index)}
                                            // className=" text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"

                                        />
                                    </div>


                                    {/* eslint-disable-next-line no-mixed-operators */}
                                    <div className="col-span-3 sm:col-span-1  flex justify-center pt-2">
                                        {hobbies.length !== 0 && (
                                            <button type="button" onClick={() => handleRemoveHobbyInput(index)}>
                                                <DeleteIcon/>
                                            </button>
                                        )}
                                        {/*TODO*/}
                                        {hobbies.length - 1 === index && hobbies.length < 6 && (
                                            <button className="bg-white "
                                                    onClick={handleAddHobbyInput}>
                                                <AddIcon/>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="mt-5 pt-5 flex justify-end">
                        <SubmitButton/>
                        <CancelButton setOpen={setOpen}/>
                    </div>

                </div>
            </form>

        </div>
    )


}
UpdateProfile.propTypes = {}
export default UpdateProfile
