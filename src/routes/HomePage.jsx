import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Header from "../components/Header";
import Profile from "../components/Profile";

import axios from "axios";

const HomePage = props => {
    let id = 1// TODO
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/users/${id}`)
                setUser(res.data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUser()
    }, [])
    if (loading) return <div className="flex flex-col relative text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center h-screen">
        <h4 className="text-4xl font-semibold">
            Loading...
        </h4>

    </div>
    if (error) return <div className="flex flex-col relative text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center h-screen">
        <h4 className="text-4xl font-semibold">
            Something went wrong.
        </h4>

    </div>
    return (
     <>
         <Header/>
         <Profile user={user} />
     </>
    )
}
HomePage.propTypes = {}
export default HomePage
