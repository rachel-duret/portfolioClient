import React, {useState} from 'react'
import SubmitButton from "../components/buttons/SubmitButton";
import CancelButton from "../components/buttons/CancelButton";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";


const RegisterPage = props => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const signIn = useSignIn();

    const handleRegister= async (event)=>{
        event.preventDefault()
        const newUser={
            username: username,
            firstname: firstname,
            lastname:lastname,
            email: email,
            password: password
        }

        try {
           const response= await axios.post(`http://localhost:8080/auth/register`, newUser)
            const success=signIn({
                auth:{
                    token: response.data,
                },
                exp: 1735002114,
                userState:{
                    username: username,
                    firstname: firstname,
                    lastname: lastname
                }
            })
            if (success){
                navigate(`/about/${username}`)
            }
        }catch (exception) {

        }

    }


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center mt-6 px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-0.5 bg-white rounded-lg shadow dark:border  md:mt-0 sm:max-w-md xl:p-0 mt-6dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                            <div>
                                <label htmlFor="username"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    username</label>
                                <input type="username" name="username" id="username"
                                       onChange={(event)=>setUsername(event.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="name@company.com" required/>
                            </div>
                            <div>
                                <label htmlFor="firstname"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    firstname</label>
                                <input type="text" name="firstname" id="firstname"
                                       onChange={(event)=>setFirstname(event.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="firstname" required=""/>
                            </div>
                            <div>
                                <label htmlFor="lastname"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    lastname</label>
                                <input type="text" name="lastname" id="lastname"
                                       onChange={(event)=>setLastname(event.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="lastname" required/>
                            </div>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                    email</label>
                                <input type="email" name="email" id="email"
                                       onChange={(event)=>setEmail(event.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="name@company.com" required=""/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       onChange={(event)=>setPassword(event.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required=""/>
                            </div>
                            <div>
                                <label htmlFor="confirm-password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                    password</label>
                                {
                                    password !==confirmPassword &&(
                                        <span className="text-red-500">Confirm password no the same</span>
                                    )
                                }
                                <input type="confirm-password" name="confirm-password" id="confirm-password"
                                       onChange={(event)=>setConfirmPassword(event.target.value)}
                                       placeholder="••••••••"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required=""/>
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox"
                                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                           required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    {/*// TODO to implement Terms*/}
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I
                                        accept the <a
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <SubmitButton/>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to='/login'
                                                               className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login
                                here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default RegisterPage
