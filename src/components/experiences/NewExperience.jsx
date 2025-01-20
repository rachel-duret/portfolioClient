import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase/config";
import DatePicker from "react-datepicker";
import axios from "axios";
import Select from "react-select/base";
import AsyncSelect from "react-select/async";


const NewExperience = props => {
    const [exprienceName, setExprienceName] = useState('');
    const [url, setUrl] = useState('');
    const [file, setFile] = useState('');
    const [description, setDescription]= useState('')
    const [company, setCompany]= useState('')
    const [skills, setSkills]= useState([])
    const [selectSkills, setSeclectSkills] = useState(null)
    const [summaries, setSummaries] = useState([{value:""}])
    const [selectOptions, setSelectOptions] = useState([])
    const [startedAt, setStartedAt] = useState(new Date())
    const [endedAt, setEndedAt] = useState(new Date())
    // const selectRef = useRef();
    const authHeader = useAuthHeader();
    // Select for skills
    const options=[]
        props.user.skills.map((skill)=> options.push({value: skill.name, label: skill.name.toUpperCase()}))
    const handleSelect=(selectOptions)=>{
        setSelectOptions(selectOptions)
        console.log(selectOptions)
       const filterSkills=selectOptions.map((selectOption)=>props.user.skills.find((skill)=>skill.name===selectOption.value))
        setSeclectSkills(filterSkills)
        console.log(selectSkills)
    }
    const loadOptions= (searchValue, callback)=>{
        setTimeout(()=>{
            const filteredOptions = options.filter((option)=>
                option.label.toLowerCase().includes(searchValue.toLowerCase())
            );
            console.log('loadOptions', searchValue, filteredOptions)
            callback(filteredOptions);
        }, 2000)
    }

    const handleAddSummaryInput=()=>{
            setSummaries([...summaries,{value: ""}])
    }
    const handleRemoveSummaryInput=(index)=>{
        const list = [...summaries];
        list.splice(index, 1);
        setSummaries(list)
    }
    const handleSummaryChange=(e, indext)=>{
        const {name, value} = e.target;
        const list = [...summaries];
        list[indext][name] = value;
        setSummaries(list)
        console.log(summaries)

    }

    // new Experience
    const handleAddExperience = async (event) => {
        event.preventDefault()
        const newExperience = {
            userId: props.user.id,
            name: exprienceName,
            company: company,
            url: url,
            description: description,
            technologies:selectSkills,
            startedAt: startedAt,
            endedAt: endedAt,
            summaries:summaries

        }
        // upload file to firebase storage
        if (!file) return;
        const fileName = new Date().getTime() + file.name;
        const imageRef = ref(storage, `images/experiences/${fileName}`);


        await uploadBytes(imageRef, file).then(snapshot => {
            getDownloadURL(snapshot.ref).then(downloadURL => {
                newExperience.image = downloadURL;
                console.log(downloadURL)
                console.log(newExperience)
                try {
                    console.log(newExperience)
                    axios.post(`http://localhost:8080/experiences/experience`, newExperience, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": authHeader
                        }
                    })
                    props.history.push(`/skills/${props.user.userId}`)

                } catch (error) {
                   return <div>Add experience failed</div> // TODO
                }
            })
        })




    }
    return (
        <div className="w-full flex space-x-5 overflow-scroll p-10 snap-x snap-madatory bg-[#F7AB0A]/10">
            <form className="max-w-lg mx-auto" onSubmit={handleAddExperience}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience
                        name</label>
                    <input
                        type="text"
                        id="name"
                        value={exprienceName}
                        onChange={(event) => setExprienceName(event.target.value)}
                        required
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company
                        name</label>
                    <input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}
                        required
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience
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

                <label htmlFor="technologies"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an
                    option</label>

                <AsyncSelect
                    loadOptions={loadOptions}
                    defaultOptions={options}
                    isMulti={true}
                    onChange={handleSelect}
                />
                {/*Summary*/}
                <label htmlFor="summary">Summary</label>
                {
                    summaries.map((summary, index) => (
                        <div className="mb-5" key={index}>
                            <div className="">
                                <input value={summary.value}
                                       name="value"
                                       type="text"
                                       id="summary"
                                    onChange={(e)=>handleSummaryChange(e, index)}
                                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                {/* eslint-disable-next-line no-mixed-operators */}
                                {summaries.length - 1 ===index&& summaries.length < 4 && (
                                    <button className="text-gray-900 bg-gradient-to-r from-teal-200" onClick={handleAddSummaryInput}>Add summary </button>
                                )}
                            </div>
                            {/*TODO remove a summary*/}
                            <div className="">
                                {summaries.length !==1 && (
                                    <button type="button" onClick={()=>handleRemoveSummaryInput(index)}>
                                        Remove
                                    </button>
                                )}
                            </div>

                        </div>
                    ))
                }


                <div className="mb-5">
                    <label htmlFor="started"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Started at</label>
                    <DatePicker
                        selected={startedAt}
                        onChange={(date) => setStartedAt(date)}
                        dateFormat="yyyy-mm-dd"
                        id="started"/>
                    <label htmlFor="ended"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ended at</label>
                    <DatePicker
                        selected={endedAt} onChange={(date) => setEndedAt(date)}
                        id="ended"
                        dateFormat="yyyy-mm-dd"
                        className="border border-red-500"
                    />
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
NewExperience.propTypes = {}
export default NewExperience
