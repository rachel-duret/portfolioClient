import React, {useEffect, useState} from 'react'

import axios from "axios";
import AboutPage from "./AboutPage";
import {useParams} from "react-router";

const HomePage = props => {
    let params = useParams();
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const res = await axios.get(`http://localhost:8080/users/user/${params.username}`)
    //             setUser(res.data);
    //
    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchUser()
    // }, [params.username])
    //
    // if (loading) return <div className="flex flex-col relative text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center h-screen">
    //     <h4 className="text-4xl font-semibold">
    //         Loading... {params}
    //     </h4>
    //
    // </div>
    // if (error) return <div className="flex flex-col relative text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center h-screen">
    //     <h4 className="text-4xl font-semibold">
    //         Something went wrong.
    //     </h4>
    //
    // </div>
    return (
     <>
         <div>homepage</div>

     </>
    )
}
HomePage.propTypes = {}
export default HomePage
