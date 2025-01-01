import React, {useContext, useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {loginCall} from "../apiCalls";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {useNavigate} from "react-router-dom";

const LoginPage = props => {
    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const signIn = useSignIn();
    const handleLogin =async (event) => {
        event.preventDefault()
        const  login= {
            username: username,
            password: password
        }
        try{
            const response = await axios.post(`http://localhost:8080/auth/login`, login);
          console.log(response.data)
          console.log(username)

            const success=signIn({
               auth:{
                   token: response.data,
               },
                exp: 1735002114,
                userState:{
                    username: username,
                }
            })
            if (success){
                navigate("/")
            }else {
                alert('Authentication failed');
            }


        }catch(error){
            alert('Invalid credentials');
          console.log(error)
        }

    }



    return (
        <div className="h-screen flex flex-col space-y-8 items-center justify-center ">


            <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
                <div className="mb-5">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login </button>
            </form>

        </div>
    )
}
LoginPage.propTypes = {}
export default LoginPage
