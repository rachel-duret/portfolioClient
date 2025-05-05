import React, {useState} from 'react'
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {Link, useNavigate} from "react-router-dom";
import SubmitButton from "../components/buttons/SubmitButton";

const LoginPage = props => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const signIn = useSignIn();
    const handleLogin = async (event) => {
        event.preventDefault()
        const login = {
            username: username,
            password: password
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, login);
            console.log(response.data)
            console.log(username)

            const success = signIn({
                auth: {
                    token: response.data,
                },
                exp: 1735002114,
                userState: {
                    username: username,
                }
            })
            if (success) {
                navigate(`/about/${username}`)
            } else {
                alert('Authentication failed');
            }


        } catch (error) {
            alert('Invalid credentials');
            console.log(error)
        }

    }


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center mt-6 px-6 py-8 mx-auto h-screen lg:py-0">
                <div
                    className="w-0.5 bg-white rounded-lg shadow dark:border  md:mt-0 sm:max-w-md xl:p-0 mt-6dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div className="mb-5">
                                <label htmlFor="username"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    required
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
                            </div>

                            <SubmitButton/>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Need an account? <Link to='/register'
                                                       className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register
                                here</Link>
                            </p>
                        </form>
                    </div>
                </div>

            </div>
        </section>

    )
}
LoginPage.propTypes = {}
export default LoginPage
